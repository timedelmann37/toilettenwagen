<?php
declare(strict_types=1);

namespace TwInquiry;

use DateTimeImmutable;
use JsonException;
use RuntimeException;
use Throwable;


/**
 * Prüft, ob eine E-Mail-Adresse formal gültig ist.
 */
function emailValid(string $email): bool
{
    return strlen($email) <= 254
        && preg_match('/^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/D', $email) === 1
        && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}


/**
 * Prüft ein Datum im Format YYYY-MM-DD.
 */
function dateValid(string $date): bool
{
    $parsed = DateTimeImmutable::createFromFormat('!Y-m-d', $date);

    return $parsed !== false
        && $parsed->format('Y-m-d') === $date;
}


/**
 * Validiert und normalisiert die Formulardaten.
 */
function validate(array $input): ?array
{
    $fields = [
        'name' => 160,
        'email' => 254,
        'phone' => 80,
        'location' => 500,
        'company' => 200,
        'billingAddress' => 500,
        'deliveryDate' => 10,
        'startDate' => 10,
        'endDate' => 10,
        'model' => 20,
        'customerType' => 20,
        'occasion' => 80,
        'occasionOther' => 300,
        'message' => 5000,
        'website' => 200,
    ];

    $data = [];

    foreach ($fields as $field => $maximum) {
        if (
            !isset($input[$field])
            || !is_string($input[$field])
            || strpos($input[$field], "\0") !== false
        ) {
            return null;
        }

        $length = preg_match_all('/./us', $input[$field]);

        if ($length === false || $length > $maximum) {
            return null;
        }

        $data[$field] = trim($input[$field]);
    }

    if (
        ($input['privacyAccepted'] ?? null) !== true
        || !isset($input['billingSameAsLocation'])
        || !is_bool($input['billingSameAsLocation'])
        || $data['name'] === ''
        || $data['phone'] === ''
        || $data['location'] === ''
        || !emailValid($data['email'])
    ) {
        return null;
    }

    $data['collectionMethod'] = $input['collectionMethod'] ?? 'delivery';

    if (
        !in_array($data['collectionMethod'], ['delivery', 'self-pickup'], true)
        || !in_array($data['customerType'], ['private', 'business'], true)
        || !in_array($data['model'], ['s', 'm', 'l', 'unknown'], true)
        || (
            $data['customerType'] === 'business'
            && $data['company'] === ''
        )
    ) {
        return null;
    }

    if ($input['billingSameAsLocation']) {
        $data['billingAddress'] = $data['location'];
    }

    if (
        $data['billingAddress'] === ''
        || !dateValid($data['startDate'])
        || !dateValid($data['deliveryDate'])
        || $data['deliveryDate'] > $data['startDate']
        || (
            $data['endDate'] !== ''
            && (
                !dateValid($data['endDate'])
                || $data['endDate'] < $data['startDate']
            )
        )
    ) {
        return null;
    }

    $occasions = [
        '',
        'Hochzeit',
        'Private Feier',
        'Festival oder Großveranstaltung',
        'Firmenfeier',
        'Markt',
        'Sportveranstaltung',
        'Gewerbliche Veranstaltung',
        'Kommune oder öffentlicher Einsatz',
        'Sonstiges',
    ];

    if (
        !in_array($data['occasion'], $occasions, true)
        || (
            $data['occasion'] === 'Sonstiges'
            && $data['occasionOther'] === ''
        )
    ) {
        return null;
    }

    return $data;
}


/**
 * Baut den Klartext-Inhalt der E-Mail.
 */
function message(array $data): string
{
    $labels = [
        'name' => 'Name',
        'email' => 'E-Mail',
        'phone' => 'Telefon',
        'customerType' => 'Kundentyp',
        'company' => 'Firma',
        'location' => 'Aufstellort',
        'billingAddress' => 'Rechnungsanschrift',
        'collectionMethod' => 'Lieferung / Selbstabholung',
        'deliveryDate' => $data['collectionMethod'] === 'self-pickup'
            ? 'Abholtag'
            : 'Liefertag',
        'startDate' => 'Nutzungsbeginn',
        'endDate' => 'Nutzungsende',
        'model' => 'Modell',
        'occasion' => 'Anlass',
        'occasionOther' => 'Sonstiger Anlass',
        'message' => 'Nachricht',
    ];

    $data['customerType'] = $data['customerType'] === 'business'
        ? 'Firma'
        : 'Privat';

    $data['collectionMethod'] = $data['collectionMethod'] === 'self-pickup'
        ? 'Selbstabholung'
        : 'Lieferung';

    $data['model'] = $data['model'] === 'unknown'
        ? 'Noch offen'
        : strtoupper($data['model']);

    $lines = [];

    foreach ($labels as $field => $label) {
        $lines[] = $label . ': ' . (
            $data[$field] === ''
                ? '—'
                : $data[$field]
        );
    }

    $lines[] = 'Datenschutz: Verarbeitung für diese Anfrage bestätigt.';

    return implode("\r\n\r\n", $lines);
}


/**
 * Baut die Nutzlast für die Resend API.
 */
function htmlMessage(string $text): string
{
    $paragraphs = array_map(static function (string $paragraph): string {
        $parts = explode(': ', $paragraph, 2);
        if (count($parts) === 2) {
            return '<p style="margin:0 0 16px"><strong>' . htmlspecialchars($parts[0], ENT_QUOTES, 'UTF-8') . '</strong><br>' . nl2br(htmlspecialchars($parts[1], ENT_QUOTES, 'UTF-8')) . '</p>';
        }
        return '<p style="margin:0 0 16px">' . nl2br(htmlspecialchars($paragraph, ENT_QUOTES, 'UTF-8')) . '</p>';
    }, explode("\r\n\r\n", $text));
    return '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#142b3b">' . implode('', $paragraphs) . '</div>';
}

function resendPayload(array $config, array $data, string $reference = ''): array
{
    $fromName = $config['from_name'] ?? 'Website-Anfragen';

    if (!is_string($fromName) || trim($fromName) === '') {
        $fromName = 'Website-Anfragen';
    }

    // Verhindert Header-/Formatierungsprobleme durch Zeilenumbrüche.
    $fromName = str_replace(["\r", "\n"], '', trim($fromName));

    return [
        'from' => $fromName . ' <' . $config['from'] . '>',
        'to' => [
            $config['to'],
        ],
        'reply_to' => $data['email'],
        'subject' => 'Toilettenwagen-Anfrage ' . $reference . ' · ' . $data['startDate'],
        'text' => message($data),
        'html' => '<h1>Neue Toilettenwagen-Anfrage</h1><p>Referenz: ' . htmlspecialchars($reference, ENT_QUOTES, 'UTF-8') . '</p>' . htmlMessage(message($data)),
    ];
}


/**
 * Sendet die Anfrage über die Resend HTTP API.
 */
function sendMail(array $config, array $data): bool
{
    return sendMessages($config, $data, __NAMESPACE__ . '\\sendPayload');
}

/** Sends the receipt only after the business inquiry was accepted. */
function sendMessages(array $config, array $data, callable $send): bool
{
    $reference = strtoupper(bin2hex(random_bytes(6)));
    $inquiry = resendPayload($config, $data, $reference);
    if (!$send($inquiry)) return false;
    $text = "Vielen Dank für Ihre Anfrage.\r\n\r\nWir haben Ihre Anfrage erhalten und melden uns bei Ihnen. Dies ist eine Eingangsbestätigung, keine Buchungsbestätigung. Verfügbarkeit und Konditionen stimmen wir persönlich mit Ihnen ab.\r\n\r\nReferenz: " . $reference . "\r\n\r\n" . message($data);
    $receipt = [
        'from' => $inquiry['from'], 'to' => [$data['email']], 'reply_to' => $config['to'],
        'subject' => 'Ihre Toilettenwagen-Anfrage ' . $reference,
        'text' => $text,
        'html' => htmlMessage($text),
    ];
    try {
        if (!$send($receipt)) error_log('TW inquiry: receipt delivery failed');
    } catch (Throwable $error) {
        error_log('TW inquiry: receipt delivery failed');
    }
    // Do not invite a duplicate business inquiry if only the receipt failed.
    return true;
}

function sendPayload(array $payload): bool
{
    $secretsPath = __DIR__ . '/secrets.php';

    if (!is_file($secretsPath)) {
        error_log('TW inquiry: secrets.php fehlt');
        return false;
    }

    $secrets = require $secretsPath;

    if (!is_array($secrets)) {
        error_log('TW inquiry: secrets.php ist ungültig');
        return false;
    }

    $apiKey = $secrets['resend_api_key'] ?? '';

    if (
        !is_string($apiKey)
        || trim($apiKey) === ''
        || !str_starts_with(trim($apiKey), 're_')
    ) {
        error_log('TW inquiry: Resend API-Key fehlt oder ist ungültig');
        return false;
    }

    if (!function_exists('curl_init')) {
        error_log('TW inquiry: PHP cURL ist nicht verfügbar');
        return false;
    }

    try {
        $json = json_encode(
            $payload,
            JSON_UNESCAPED_UNICODE
            | JSON_UNESCAPED_SLASHES
            | JSON_THROW_ON_ERROR
        );
    } catch (JsonException $error) {
        error_log('TW inquiry: Resend JSON konnte nicht erstellt werden');
        return false;
    }

    $curl = curl_init('https://api.resend.com/emails');

    if ($curl === false) {
        error_log('TW inquiry: cURL konnte nicht initialisiert werden');
        return false;
    }

    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . trim($apiKey),
            'Content-Type: application/json',
            'Accept: application/json',
        ],
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 20,
    ]);

    $response = curl_exec($curl);

    if ($response === false) {
        $curlError = curl_error($curl);

        error_log(
            'TW inquiry: Verbindung zu Resend fehlgeschlagen: '
            . $curlError
        );

        curl_close($curl);

        return false;
    }

    $status = (int) curl_getinfo(
        $curl,
        CURLINFO_HTTP_CODE
    );

    curl_close($curl);

    if ($status < 200 || $status >= 300) {
        /*
         * Resend-Antwort nur ins Server-Log schreiben.
         * Sie wird niemals an den Browser weitergegeben.
         */
        error_log(
            'TW inquiry: Resend HTTP '
            . $status
            . ' – '
            . substr((string) $response, 0, 1000)
        );

        return false;
    }

    return true;
}


/**
 * Speichert Rate-Limit- und Deduplizierungsstatus.
 */
function saveState($file, array $state): void
{
    $encoded = json_encode(
        $state,
        JSON_THROW_ON_ERROR
    );

    if (
        !rewind($file)
        || !ftruncate($file, 0)
        || fwrite($file, $encoded) !== strlen($encoded)
        || !fflush($file)
    ) {
        throw new RuntimeException('State unavailable');
    }
}


/**
 * Führt Rate-Limiting, Deduplizierung und Versand aus.
 */
function deliver(
    array $data,
    array $config,
    string $statePath,
    callable $send,
    int $now,
    string $ip
): array {
    $file = @fopen($statePath, 'c+b');

    if ($file === false) {
        throw new RuntimeException('State unavailable');
    }

    @chmod($statePath, 0600);

    try {
        /*
         * Sperre gilt auch zwischen mehreren PHP-Prozessen
         * und verhindert parallelen Doppelversand.
         */
        if (!flock($file, LOCK_EX)) {
            throw new RuntimeException('State unavailable');
        }

        $stored = stream_get_contents(
            $file,
            1048577
        );

        if (
            $stored === false
            || strlen($stored) > 1048576
        ) {
            throw new RuntimeException('State invalid');
        }

        $state = $stored === ''
            ? [
                'secret' => bin2hex(random_bytes(32)),
                'attempts' => [],
                'recent' => [],
            ]
            : json_decode(
                $stored,
                true,
                32,
                JSON_THROW_ON_ERROR
            );

        if (
            !is_array($state)
            || !is_string($state['secret'] ?? null)
            || !is_array($state['attempts'] ?? null)
            || !is_array($state['recent'] ?? null)
        ) {
            throw new RuntimeException('State invalid');
        }

        $state['attempts'] = array_values(
            array_filter(
                $state['attempts'],
                static fn(array $entry): bool =>
                    $entry['time'] > $now - 3600
            )
        );

        $state['recent'] = array_filter(
            $state['recent'],
            static fn(int $expires): bool =>
                $expires > $now
        );

        $fingerprint = hash_hmac(
            'sha256',
            json_encode(
                [
                    $config['from'],
                    $config['to'],
                    $data,
                ],
                JSON_THROW_ON_ERROR
            ),
            $state['secret']
        );

        /*
         * Gleiche Anfrage wurde in den letzten
         * 10 Minuten bereits erfolgreich versendet.
         */
        if (isset($state['recent'][$fingerprint])) {
            saveState($file, $state);

            return [
                200,
                ['ok' => true],
            ];
        }

        $email = hash_hmac(
            'sha256',
            strtolower($data['email']),
            $state['secret']
        );

        $ipHash = hash_hmac(
            'sha256',
            $ip,
            $state['secret']
        );

        $emailAttempts = 0;
        $ipAttempts = 0;

        foreach ($state['attempts'] as $entry) {
            if ($entry['time'] > $now - 900) {
                $emailAttempts += (int) (
                    $entry['email'] === $email
                );

                $ipAttempts += (int) (
                    $entry['ip'] === $ipHash
                );
            }
        }

        /*
         * Maximal:
         * - 30 Versuche pro Stunde insgesamt
         * - 5 pro E-Mail in 15 Minuten
         * - 10 pro IP in 15 Minuten
         */
        if (
            count($state['attempts']) >= 30
            || $emailAttempts >= 5
            || $ipAttempts >= 10
        ) {
            saveState($file, $state);

            return [
                429,
                ['ok' => false],
            ];
        }

        $state['attempts'][] = [
            'time' => $now,
            'email' => $email,
            'ip' => $ipHash,
        ];

        saveState($file, $state);

        try {
            $accepted = $send(
                $config,
                $data
            ) === true;
        } catch (Throwable $error) {
            error_log(
                'TW inquiry: Versand fehlgeschlagen: '
                . $error->getMessage()
            );

            $accepted = false;
        }

        if (!$accepted) {
            return [
                502,
                ['ok' => false],
            ];
        }

        /*
         * Erfolgreiche Anfrage für 10 Minuten merken.
         */
        $state['recent'][$fingerprint] = $now + 600;

        saveState($file, $state);

        return [
            200,
            ['ok' => true],
        ];
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}


/**
 * Verarbeitet den HTTP-Request des Kontaktformulars.
 */
function handle(
    array $server,
    string $body,
    array $config,
    string $statePath,
    callable $send,
    ?int $now = null
): array {
    if (($server['REQUEST_METHOD'] ?? '') !== 'POST') {
        return [
            405,
            ['ok' => false],
        ];
    }

    /*
     * Mailer muss explizit aktiviert sein.
     * Absender und Empfänger müssen gültige E-Mail-Adressen sein.
     */
    if (
        ($config['enabled'] ?? false) !== true
        || !is_string($config['to'] ?? null)
        || !is_string($config['from'] ?? null)
        || !emailValid($config['to'])
        || !emailValid($config['from'])
        || !is_array($config['origins'] ?? null)
        || $config['origins'] === []
    ) {
        return [
            503,
            ['ok' => false],
        ];
    }

    /*
     * Nur Requests von der echten Website zulassen.
     */
    if (
        !in_array(
            $server['HTTP_ORIGIN'] ?? '',
            $config['origins'],
            true
        )
    ) {
        return [
            403,
            ['ok' => false],
        ];
    }

    /*
     * Nur JSON akzeptieren.
     */
    if (
        preg_match(
            '/^application\/json(?:;|$)/i',
            $server['CONTENT_TYPE'] ?? ''
        ) !== 1
    ) {
        return [
            415,
            ['ok' => false],
        ];
    }

    /*
     * Request-Body auf 16 KB begrenzen.
     */
    if (
        strlen($body) > 16384
        || (int) ($server['CONTENT_LENGTH'] ?? 0) > 16384
    ) {
        return [
            413,
            ['ok' => false],
        ];
    }

    try {
        $input = json_decode(
            $body,
            false,
            32,
            JSON_THROW_ON_ERROR
        );
    } catch (JsonException $error) {
        return [
            400,
            ['ok' => false],
        ];
    }

    if (!is_object($input)) {
        return [
            400,
            ['ok' => false],
        ];
    }

    $input = (array) $input;

    /*
     * Honeypot:
     * Echte Benutzer lassen "website" leer.
     */
    if (
        isset($input['website'])
        && is_string($input['website'])
        && trim($input['website']) !== ''
    ) {
        return [
            400,
            [
                'ok' => false,
                'code' => 'spam',
            ],
        ];
    }

    $data = validate($input);

    if ($data === null) {
        return [
            400,
            ['ok' => false],
        ];
    }

    try {
        return deliver(
            $data,
            $config,
            $statePath,
            $send,
            $now ?? time(),
            $server['REMOTE_ADDR'] ?? 'unknown'
        );
    } catch (Throwable $error) {
        error_log(
            'TW inquiry: private state unavailable: '
            . $error->getMessage()
        );

        return [
            503,
            ['ok' => false],
        ];
    }
}
