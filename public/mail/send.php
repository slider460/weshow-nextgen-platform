<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP config not found']);
    exit;
}

$config = require $configPath;
$smtp = $config['smtp'] ?? [];
$mail = $config['mail'] ?? [];
$allowInsecure = (bool)($smtp['allow_insecure'] ?? false);

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    $payload = $_POST;
}

function sanitize_value($value): string {
    if (is_bool($value)) {
        $value = $value ? 'true' : 'false';
    } elseif (is_numeric($value)) {
        $value = (string)$value;
    } elseif (!is_string($value)) {
        $value = '';
    }
    return trim(strip_tags($value));
}

function json_fail(string $message, int $status = 400): void {
    http_response_code($status);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

$formName = sanitize_value($payload['form'] ?? 'Форма сайта');
$email = sanitize_value($payload['email'] ?? '');

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_fail('Неверный формат email');
}

// Собираем все поля в тело письма
$lines = [];
$lines[] = 'Форма: ' . ($formName !== '' ? $formName : 'Не указано');
$lines[] = 'Время: ' . date('d.m.Y H:i:s');
$lines[] = '';

$labelMap = [
    'name' => 'Имя',
    'phone' => 'Телефон',
    'email' => 'Email',
    'company' => 'Компания',
    'service' => 'Услуга',
    'serviceType' => 'Тип услуги',
    'message' => 'Сообщение',
];

$usedKeys = [];
foreach ($labelMap as $key => $label) {
    $value = $payload[$key] ?? '';
    if (is_array($value)) {
        $value = implode(', ', $value);
    }
    $clean = sanitize_value($value);
    $lines[] = $label . ': ' . ($clean !== '' ? $clean : '—');
    $usedKeys[$key] = true;
}

foreach ($payload as $key => $value) {
    if ($key === 'form' || isset($usedKeys[$key])) {
        continue;
    }
    if (is_array($value)) {
        $value = implode(', ', $value);
    }
    $clean = sanitize_value($value);
    if ($clean === '') {
        continue;
    }
    $lines[] = $key . ': ' . $clean;
}

$body = implode("\r\n", $lines);

$subject = 'Заявка с сайта: ' . ($formName !== '' ? $formName : 'Форма');
$subject = mb_encode_mimeheader($subject, 'UTF-8');

$fromEmail = sanitize_value($mail['from'] ?? $smtp['username'] ?? '');
$fromName = sanitize_value($mail['from_name'] ?? 'WESHOW');
$toList = $mail['to'] ?? [];

if ($fromEmail === '' || empty($toList)) {
    json_fail('SMTP config invalid', 500);
}

if (is_string($toList)) {
    $toList = [$toList];
}

$replyTo = $email !== '' ? $email : $fromEmail;

function smtp_read($socket): string {
    $data = '';
    while ($line = fgets($socket, 515)) {
        $data .= $line;
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }
    return $data;
}

function smtp_expect($socket, $expected, string $context = ''): void {
    $resp = smtp_read($socket);
    $code = (int)substr($resp, 0, 3);
    $expectedCodes = is_array($expected) ? $expected : [$expected];
    if (!in_array($code, $expectedCodes, true)) {
        json_fail('SMTP error' . ($context ? ' (' . $context . ')' : '') . ': ' . trim($resp), 500);
    }
}

function smtp_cmd($socket, string $cmd, $expected, string $context = ''): void {
    fwrite($socket, $cmd . "\r\n");
    smtp_expect($socket, $expected, $context);
}

function smtp_send_message(array $smtp, array $mail, array $toList, string $fromEmail, string $fromName, string $replyTo, string $subject, string $body, bool $allowInsecure): void {
    $host = $smtp['host'] ?? '';
    $port = (int)($smtp['port'] ?? 0);
    $encryption = $smtp['encryption'] ?? '';
    $username = $smtp['username'] ?? '';
    $password = $smtp['password'] ?? '';

    if ($host === '' || $port === 0 || $username === '' || $password === '') {
        json_fail('SMTP config incomplete', 500);
    }

    $remoteHost = $encryption === 'ssl' ? ('ssl://' . $host) : $host;
    $context = null;
    if ($encryption === 'ssl') {
        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => !$allowInsecure,
                'verify_peer_name' => !$allowInsecure,
                'allow_self_signed' => $allowInsecure,
            ],
        ]);
    }

    $socket = $context
        ? stream_socket_client($remoteHost . ':' . $port, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context)
        : stream_socket_client($remoteHost . ':' . $port, $errno, $errstr, 15);
    if (!$socket) {
        json_fail('SMTP connection failed: ' . $errstr, 500);
    }

    smtp_expect($socket, 220, 'connect');
    smtp_cmd($socket, 'EHLO weshow.su', 250, 'ehlo');

    if ($encryption === 'tls') {
        smtp_cmd($socket, 'STARTTLS', 220, 'starttls');
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            json_fail('SMTP TLS negotiation failed', 500);
        }
        smtp_cmd($socket, 'EHLO weshow.su', 250, 'ehlo_tls');
    }

    smtp_cmd($socket, 'AUTH LOGIN', 334, 'auth_login');
    smtp_cmd($socket, base64_encode($username), 334, 'auth_user');
    smtp_cmd($socket, base64_encode($password), 235, 'auth_pass');

    smtp_cmd($socket, 'MAIL FROM:<' . $fromEmail . '>', 250, 'mail_from');
    foreach ($toList as $to) {
        $to = sanitize_value((string)$to);
        if ($to !== '') {
            smtp_cmd($socket, 'RCPT TO:<' . $to . '>', [250, 251], 'rcpt_to');
        }
    }

    smtp_cmd($socket, 'DATA', 354, 'data');

    $headers = [];
    $headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
    $headers[] = 'Reply-To: ' . $replyTo;
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';
    $headers[] = 'Subject: ' . $subject;

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n";
    fwrite($socket, $message);
    smtp_expect($socket, 250, 'send');
    smtp_cmd($socket, 'QUIT', 221, 'quit');
    fclose($socket);
}

$handler = set_error_handler(static function ($severity, $message): bool {
    throw new RuntimeException($message);
});

try {
    smtp_send_message($smtp, $mail, $toList, $fromEmail, $fromName, $replyTo, $subject, $body, $allowInsecure);
    restore_error_handler();
} catch (Throwable $error) {
    restore_error_handler();
    json_fail('SMTP error: ' . $error->getMessage(), 500);
}

echo json_encode(['success' => true, 'message' => 'Отправлено']);
