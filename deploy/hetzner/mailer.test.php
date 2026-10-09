<?php
declare(strict_types=1);

require __DIR__ . '/tw-mailer/mailer.php';

function check(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

$directory = sys_get_temp_dir() . '/tw-inquiry-test-' . bin2hex(random_bytes(8));
mkdir($directory, 0700);
$server = ['REQUEST_METHOD' => 'POST', 'CONTENT_TYPE' => 'application/json',
    'HTTP_ORIGIN' => 'https://www.example.com', 'REMOTE_ADDR' => '127.0.0.1'];
$config = ['enabled' => true, 'to' => 'inbox@example.com', 'from' => 'sender@example.com',
    'origins' => ['https://www.example.com', 'https://example.com']];
$payload = [
    'name' => 'Test Person', 'email' => 'visitor@example.com', 'phone' => '0123456789',
    'location' => 'Testort', 'company' => '', 'billingAddress' => '',
    'billingSameAsLocation' => true, 'deliveryDate' => '2026-10-10',
    'startDate' => '2026-10-11', 'endDate' => '', 'collectionMethod' => 'delivery',
    'model' => 's', 'customerType' => 'private', 'occasion' => 'Hochzeit',
    'occasionOther' => '', 'message' => 'Ein lokaler Test mit äöüß.',
    'website' => '', 'privacyAccepted' => true,
];
$calls = [];
$accepted = static function (array $actualConfig, array $data) use (&$calls): bool {
    $calls[] = TwInquiry\resendPayload($actualConfig, $data, "TEST-REF");
    return true;
};
$never = static function (): bool {
    throw new RuntimeException('Must not send');
};
$request = static function (array $data, string $file, callable $send, array $headers = [], ?array $settings = null, int $now = 10000) use ($server, $config): array {
    return TwInquiry\handle(array_replace($server, $headers), json_encode($data, JSON_THROW_ON_ERROR),
        $settings ?? $config, $file, $send, $now);
};

try {
    $file = $directory . '/accepted.json';
    $withInjectedRecipient = array_replace($payload, ['to' => 'attacker@example.com']);
    check($request($withInjectedRecipient, $file, $accepted) === [200, ['ok' => true]], 'Valid inquiry');
    check($request($payload, $file, $accepted) === [200, ['ok' => true]], 'Persistent duplicate response');
    check(count($calls) === 1, 'Duplicate must not send again');
    check($calls[0]['to'] === [$config['to']], 'Only fixed recipient');
    check($calls[0]['reply_to'] === $payload['email'], 'Visitor reply-to');
    check(str_contains($calls[0]['from'], $config['from']), 'Fixed sender');
    $text = $calls[0]['text'];
    check(str_contains($text, 'Rechnungsanschrift: Testort'), 'Billing fallback');
    check(str_contains($text, 'äöüß'), 'UTF-8 message');
    $stored = file_get_contents($file);
    check(!str_contains($stored, 'visitor@example.com') && !str_contains($stored, 'Testort')
        && !str_contains($stored, '127.0.0.1'), 'State contains no raw personal data');
    echo "PASS fixed recipient, reply-to, UTF-8, persistent deduplication and private hashed state\n";

    $invalid = [
        ['email' => "visitor@example.com\r\nBcc: attacker@example.com"],
        ['privacyAccepted' => false], ['billingSameAsLocation' => 'true'],
        ['startDate' => '2026-02-30'], ['deliveryDate' => '2026-10-12'],
        ['endDate' => '2026-10-09'], ['customerType' => 'business'],
        ['model' => 'xl'], ['message' => str_repeat('x', 5001)],
        ['name' => ['wrong type']], ['location' => "Test\0ort"],
        ['collectionMethod' => 'invalid'], ['occasion' => 'Sonstiges'],
        ['billingSameAsLocation' => false, 'billingAddress' => ''],
    ];
    foreach ($invalid as $change) {
        check($request(array_replace($payload, $change), $directory . '/invalid.json', $never)[0] === 400,
            'Invalid fields must not send: ' . json_encode($change));
    }
    check($request(array_replace($payload, ['website' => 'bot']), $directory . '/invalid.json', $never)
        === [400, ['ok' => false, 'code' => 'spam']], 'Honeypot');
    check(!file_exists($directory . '/invalid.json'), 'Rejected requests do not create mail state');
    echo "PASS header injection, consent, field types, dates, pickup rules and honeypot\n";

    foreach ([['REQUEST_METHOD' => 'GET', 'status' => 405],
        ['HTTP_ORIGIN' => 'https://attacker.example', 'status' => 403],
        ['HTTP_ORIGIN' => '', 'status' => 403],
        ['CONTENT_TYPE' => 'text/plain', 'status' => 415],
        ['CONTENT_LENGTH' => '20000', 'status' => 413]] as $case) {
        $status = $case['status'];
        unset($case['status']);
        check($request($payload, $directory . '/invalid.json', $never, $case)[0] === $status, 'Request guard');
    }
    check(TwInquiry\handle($server, str_repeat('x', 16385), $config, $file, $never)[0] === 413, 'Actual body size');
    foreach (['{', '[]', 'null', '"text"'] as $body) {
        check(TwInquiry\handle($server, $body, $config, $file, $never)[0] === 400, 'Malformed/non-object JSON');
    }
    check($request($payload, $file, $never, [], array_replace($config, ['enabled' => false]))[0] === 503, 'Disabled config');
    check($request($payload, $file, $never, [], array_replace($config, ['from' => "sender@example.com\nX: value"]))[0] === 503, 'Invalid sender');
    echo "PASS method, origin, content type, body size, JSON and disabled configuration\n";

    $pickup = array_replace($payload, ['collectionMethod' => 'self-pickup']);
    check($request($pickup, $directory . '/pickup.json', $accepted)[0] === 200, 'Valid self-pickup');
    $pickupText = $calls[1]['text'];
    check(str_contains($pickupText, 'Selbstabholung') && str_contains($pickupText, 'Abholtag: 2026-10-10'), 'Pickup mail content');
    check($request(array_replace($payload, ['customerType' => 'business', 'company' => 'Testfirma']),
        $directory . '/business.json', $accepted)[0] === 200, 'Valid company');
    echo "PASS self-pickup and company inquiries\n";

    $failureFile = $directory . '/failure.json';
    $failures = 0;
    $failure = static function () use (&$failures): bool { $failures++; return false; };
    for ($n = 0; $n < 5; $n++) {
        check($request($payload, $failureFile, $failure)[0] === 502, 'Mail failure remains error');
    }
    check($request($payload, $failureFile, $failure)[0] === 429 && $failures === 5, 'Email attempt limit survives requests');
    check($request($payload, $failureFile, $accepted, [], null, 10901)[0] === 200, 'Limit expires');
    check($request($payload, $directory . '/exception.json', static function (): bool { throw new RuntimeException('Offline'); })[0] === 502, 'Transport exceptions');
    echo "PASS failed delivery, persistent attempt limits, expiry and transport exceptions\n";

    $ipFile = $directory . '/ip.json';
    for ($n = 0; $n < 10; $n++) {
        check($request(array_replace($payload, ['email' => 'visitor' . $n . '@example.com']), $ipFile, $failure)[0] === 502, 'IP attempts');
    }
    check($request(array_replace($payload, ['email' => 'next@example.com']), $ipFile, $failure)[0] === 429, 'IP limit');
    $globalFile = $directory . '/global.json';
    for ($n = 0; $n < 30; $n++) {
        check($request(array_replace($payload, ['email' => 'visitor' . $n . '@example.com']), $globalFile,
            $failure, ['REMOTE_ADDR' => '192.0.2.' . ($n + 1)])[0] === 502, 'Global attempts');
    }
    check($request($payload, $globalFile, $failure, ['REMOTE_ADDR' => '192.0.2.100'])[0] === 429, 'Global limit');
    echo "PASS independent IP and global limits\n";

    $badState = $directory . '/corrupt.json';
    file_put_contents($badState, '{');
    check($request($payload, $badState, $never)[0] === 503, 'Corrupt state fails closed');
    check($request($payload, $directory . '/missing/state.json', $never)[0] === 503, 'Unwritable state fails closed');
    check($request($payload, $file, $accepted, [], null, 10601)[0] === 200, 'Dedupe expires');
    echo "PASS unavailable state and duplicate expiry\n";
    foreach (['s', 'm', 'l', 'unknown'] as $model) {
        check(TwInquiry\validate(array_replace($payload, ['collectionMethod' => 'self-pickup', 'model' => $model])) !== null, 'Pickup for every model');
    }
    $sent = [];
    $data = TwInquiry\validate(array_replace($payload, ['message' => '<script>test</script>']));
    $transport = static function (array $mail) use (&$sent): bool { $sent[] = $mail; return true; };
    check(TwInquiry\sendMessages($config, $data, $transport), 'Both messages accepted');
    check(count($sent) === 2 && $sent[0]['to'] === [$config['to']] && $sent[1]['to'] === [$payload['email']], 'Separate recipients');
    check($sent[1]['reply_to'] === $config['to'], 'Receipt replies go to business');
    check(str_contains($sent[1]['text'], 'keine Buchungsbestätigung'), 'Receipt is not a booking');
    check(!str_contains($sent[0]['html'], '<script>') && str_contains($sent[0]['html'], '&lt;script&gt;'), 'Escape user HTML');
    TwInquiry\sendMessages($config, $data, $transport);
    check($sent[0]['subject'] !== $sent[2]['subject'], 'Unique inquiry subjects');
    $count = 0;
    check(!TwInquiry\sendMessages($config, $data, static function () use (&$count): bool { $count++; return false; }) && $count === 1, 'No receipt after rejected inquiry');
    $count = 0;
    check(TwInquiry\sendMessages($config, $data, static function () use (&$count): bool { return ++$count === 1; }), 'Receipt failure does not duplicate business inquiry');
    echo "All PHP checks passed; no emails sent.\n";
} finally {
    foreach (glob($directory . '/*.json') as $path) {
        unlink($path);
    }
    rmdir($directory);
}
