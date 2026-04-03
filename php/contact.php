<?php
/**
 * Строй Тауэр — Обработчик формы обратной связи
 * Файл: php/contact.php
 *
 * Требования:
 *  - PHP 7.4+
 *  - Настроенный mail() или SMTP через PHPMailer
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// ── Настройки ──────────────────────────────────
define('ADMIN_EMAIL',   'info@stroytower.ru');
define('ADMIN_NAME',    'Строй Тауэр');
define('SITE_NAME',     'Строй Тауэр');
define('SITE_URL',      'https://stroytower.ru');

// ── Входные данные ──────────────────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    // Fallback to POST fields
    $data = $_POST;
}

// ── Санитизация ─────────────────────────────────
function sanitize(string $value): string
{
    return htmlspecialchars(trim(strip_tags($value)), ENT_QUOTES, 'UTF-8');
}

$name    = sanitize($data['name']    ?? '');
$phone   = sanitize($data['phone']   ?? '');
$email   = sanitize($data['email']   ?? '');
$subject = sanitize($data['subject'] ?? '');
$message = sanitize($data['message'] ?? '');

// ── Валидация ───────────────────────────────────
$errors = [];

if (empty($name)) {
    $errors[] = 'Поле «Имя» обязательно для заполнения.';
}

if (empty($phone)) {
    $errors[] = 'Поле «Телефон» обязательно для заполнения.';
} elseif (!preg_match('/^[\+7\-\(\)\d\s]{7,20}$/', $phone)) {
    $errors[] = 'Некорректный формат телефона.';
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Некорректный адрес электронной почты.';
}

if (mb_strlen($name) > 120) {
    $errors[] = 'Имя слишком длинное.';
}

if (mb_strlen($message) > 3000) {
    $errors[] = 'Сообщение слишком длинное (максимум 3000 символов).';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// ── Rate limiting (простая защита от спама) ─────
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ratefile = sys_get_temp_dir() . '/st_rate_' . md5($ip) . '.json';
$now      = time();
$limit    = 5;          // максимум 5 отправок
$window   = 3600;       // за 1 час

$rateData = ['count' => 0, 'first' => $now];
if (file_exists($ratefile)) {
    $loaded = json_decode(file_get_contents($ratefile), true);
    if ($loaded && ($now - $loaded['first']) < $window) {
        $rateData = $loaded;
    }
}

if ($rateData['count'] >= $limit) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Слишком много запросов. Попробуйте позже.']);
    exit;
}

$rateData['count']++;
file_put_contents($ratefile, json_encode($rateData), LOCK_EX);

// ── Формирование темы письма ────────────────────
$subjectLabels = [
    'order'    => 'Оформление заказа',
    'price'    => 'Уточнение цены',
    'delivery' => 'Вопрос по доставке',
    'wholesale'=> 'Оптовые поставки',
    'other'    => 'Другое',
];
$subjectLabel = $subjectLabels[$subject] ?? 'Новая заявка';

$mailSubject = "[{$subjectLabel}] Заявка от {$name} — " . SITE_NAME;

// ── Тело письма (HTML) ──────────────────────────
$mailBody = <<<HTML
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
    .header { background: #0f0f0e; padding: 24px; text-align: center; }
    .header h2 { color: #e8a020; font-size: 22px; margin: 0; letter-spacing: 2px; }
    .content { padding: 32px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
    .value { font-size: 15px; margin-bottom: 20px; }
    .message-box { background: #f5f5f5; padding: 16px; border-left: 4px solid #e8a020; font-size: 14px; line-height: 1.7; }
    .footer { background: #f9f9f9; padding: 16px 32px; font-size: 12px; color: #aaa; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="header">
    <h2>СТРОЙ ТАУЭР</h2>
    <p style="color:#aaa;margin:4px 0 0;font-size:13px">Новая заявка с сайта</p>
  </div>
  <div class="content">
    <div class="label">Тип обращения</div>
    <div class="value"><strong>{$subjectLabel}</strong></div>

    <div class="label">Имя</div>
    <div class="value">{$name}</div>

    <div class="label">Телефон</div>
    <div class="value"><a href="tel:{$phone}">{$phone}</a></div>

    <div class="label">Email</div>
    <div class="value">{$email}</div>

    <div class="label">Сообщение</div>
    <div class="message-box">{$message}</div>

    <p style="margin-top:24px;font-size:13px;color:#888">
      IP: {$ip} · Время: {$now}
    </p>
  </div>
  <div class="footer">
    Это письмо сгенерировано автоматически сайтом <a href="https://stroytower.ru">stroytower.ru</a>
  </div>
</body>
</html>
HTML;

// ── Отправка письма ──────────────────────────────
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . SITE_NAME . ' <noreply@stroytower.ru>',
    'Reply-To: ' . ($email ?: ADMIN_EMAIL),
    'X-Mailer: PHP/' . phpversion(),
]);

$sent = mail(ADMIN_EMAIL, $mailSubject, $mailBody, $headers);

// ── Подтверждение клиенту ───────────────────────
if (!empty($email)) {
    $confirmSubject = 'Ваша заявка принята — ' . SITE_NAME;
    $confirmBody = <<<HTML
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;color:#333;padding:32px">
  <h2 style="color:#e8a020">Строй Тауэр</h2>
  <p>Здравствуйте, <strong>{$name}</strong>!</p>
  <p>Ваша заявка успешно принята. Наш менеджер свяжется с вами в ближайшее рабочее время.</p>
  <p style="color:#888;font-size:13px">Если вы не оставляли заявку на stroytower.ru, проигнорируйте это письмо.</p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
  <p style="font-size:12px;color:#aaa">ООО «Строй Тауэр» · 8 800 123-45-67 · info@stroytower.ru</p>
</body>
</html>
HTML;

    $confirmHeaders = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . SITE_NAME . ' <noreply@stroytower.ru>',
    ]);

    mail($email, $confirmSubject, $confirmBody, $confirmHeaders);
}

// ── Логирование ──────────────────────────────────
$logFile = __DIR__ . '/../logs/contact.log';
if (!is_dir(dirname($logFile))) {
    @mkdir(dirname($logFile), 0755, true);
}
$logLine = date('Y-m-d H:i:s') . " | {$ip} | {$name} | {$phone} | {$email} | {$subjectLabel}\n";
@file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX);

// ── Ответ ────────────────────────────────────────
echo json_encode([
    'success' => true,
    'message' => 'Заявка успешно отправлена. Ожидайте звонка.',
]);
