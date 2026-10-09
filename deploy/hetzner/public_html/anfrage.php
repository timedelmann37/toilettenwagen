<?php
declare(strict_types=1);

// Diese Datei liegt auf Hetzner direkt in public_html.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

try {
    $privateDirectory = dirname(__DIR__) . '/tw-mailer';
    if (!is_file($privateDirectory . '/config.php') || !is_file($privateDirectory . '/mailer.php')) {
        throw new RuntimeException('Missing private mailer files');
    }
    require_once $privateDirectory . '/mailer.php';
    $config = require $privateDirectory . '/config.php';
    $request = fopen('php://input', 'rb');
    if ($request === false) {
        throw new RuntimeException('Request unavailable');
    }
    $body = stream_get_contents($request, 16385);
    fclose($request);
    if ($body === false) {
        throw new RuntimeException('Request unavailable');
    }
    [$status, $response] = TwInquiry\handle(
        $_SERVER,
        $body,
        $config,
        $privateDirectory . '/state.json',
        'TwInquiry\\sendMail'
    );
} catch (Throwable $error) {
    // Keine Formulardaten, Adressen oder Zugangsdaten in Logs schreiben.
    error_log('TW inquiry: mailer unavailable');
    $status = 503;
    $response = ['ok' => false];
}

if ($status === 405) {
    header('Allow: POST');
}
if ($status === 429) {
    header('Retry-After: 900');
}
http_response_code($status);
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
