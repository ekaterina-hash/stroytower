<?php
/**
 * Строй Тауэр — Обработчик заказа
 * Файл: php/order.php
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true) ?: $_POST;

function sanitize(string $v): string {
    return htmlspecialchars(trim(strip_tags($v)), ENT_QUOTES, 'UTF-8');
}

$name     = sanitize($data['name']     ?? '');
$phone    = sanitize($data['phone']    ?? '');
$email    = sanitize($data['email']    ?? '');
$address  = sanitize($data['address']  ?? '');
$delivery = sanitize($data['delivery'] ?? '');
$comment  = sanitize($data['comment']  ?? '');
$items    = $data['items'] ?? [];

$errors = [];
if (empty($name))  $errors[] = 'Укажите имя.';
if (empty($phone)) $errors[] = 'Укажите телефон.';
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Некорректный email.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

$deliveryLabels = [
    'pickup'  => 'Самовывоз',
    'city'    => 'Доставка по городу',
    'region'  => 'Доставка по региону',
];
$deliveryLabel = $deliveryLabels[$delivery] ?? $delivery;

// Формирование строк с товарами
$itemsHtml = '';
if (!empty($items) && is_array($items)) {
    $itemsHtml .= '<table style="width:100%;border-collapse:collapse;margin-top:12px">';
    $itemsHtml .= '<tr style="background:#e8a020;color:#000"><th style="padding:8px;text-align:left">Товар</th><th style="padding:8px;text-align:right">Кол-во</th><th style="padding:8px;text-align:right">Цена</th><th style="padding:8px;text-align:right">Итого</th></tr>';
    $total = 0;
    foreach ($items as $item) {
        $iName  = sanitize((string)($item['name']  ?? ''));
        $iQty   = (int)($item['qty']   ?? 0);
        $iPrice = (float)($item['price'] ?? 0);
        $iTotal = $iQty * $iPrice;
        $total += $iTotal;
        $itemsHtml .= "<tr style='border-bottom:1px solid #eee'>";
        $itemsHtml .= "<td style='padding:8px'>{$iName}</td>";
        $itemsHtml .= "<td style='padding:8px;text-align:right'>{$iQty} пог. м</td>";
        $itemsHtml .= "<td style='padding:8px;text-align:right'>" . number_format($iPrice, 0, '.', ' ') . " ₽</td>";
        $itemsHtml .= "<td style='padding:8px;text-align:right'>" . number_format($iTotal, 0, '.', ' ') . " ₽</td>";
        $itemsHtml .= "</tr>";
    }
    $itemsHtml .= "<tr style='font-weight:bold;background:#f5f5f5'><td colspan='3' style='padding:8px;text-align:right'>ИТОГО:</td><td style='padding:8px;text-align:right;color:#e8a020'>" . number_format($total, 0, '.', ' ') . " ₽</td></tr>";
    $itemsHtml .= '</table>';
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$orderId = 'ST-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid()), 0, 6));

$mailSubject = "[Заказ #{$orderId}] от {$name} — Строй Тауэр";

$mailBody = <<<HTML
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;color:#333;margin:0;padding:0">
  <div style="background:#0f0f0e;padding:24px;text-align:center">
    <h2 style="color:#e8a020;margin:0;letter-spacing:2px">СТРОЙ ТАУЭР</h2>
    <p style="color:#aaa;margin:4px 0 0;font-size:13px">Новый заказ #{$orderId}</p>
  </div>
  <div style="padding:32px">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px">Покупатель</div>
    <div style="font-size:15px;margin-bottom:16px">{$name}</div>

    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px">Телефон</div>
    <div style="font-size:15px;margin-bottom:16px"><a href="tel:{$phone}">{$phone}</a></div>

    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px">Email</div>
    <div style="font-size:15px;margin-bottom:16px">{$email}</div>

    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px">Доставка</div>
    <div style="font-size:15px;margin-bottom:16px">{$deliveryLabel}</div>

    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px">Адрес</div>
    <div style="font-size:15px;margin-bottom:16px">{$address}</div>

    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px">Комментарий</div>
    <div style="background:#f5f5f5;padding:12px;border-left:4px solid #e8a020;font-size:14px;margin-bottom:24px">{$comment}</div>

    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:8px">Состав заказа</div>
    {$itemsHtml}

    <p style="margin-top:24px;font-size:12px;color:#aaa">ID: {$orderId} · IP: {$ip} · {$_SERVER['HTTP_USER_AGENT']}</p>
  </div>
  <div style="background:#f9f9f9;padding:16px 32px;font-size:12px;color:#aaa;border-top:1px solid #eee">
    stroytower.ru · 8 800 123-45-67
  </div>
</body>
</html>
HTML;

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Строй Тауэр <noreply@stroytower.ru>',
    'Reply-To: ' . ($email ?: 'info@stroytower.ru'),
]);

mail('info@stroytower.ru', $mailSubject, $mailBody, $headers);

// Лог
$logFile = __DIR__ . '/../logs/orders.log';
if (!is_dir(dirname($logFile))) {
    @mkdir(dirname($logFile), 0755, true);
}
$logLine = date('Y-m-d H:i:s') . " | {$orderId} | {$ip} | {$name} | {$phone} | {$deliveryLabel}\n";
@file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX);

echo json_encode([
    'success'  => true,
    'order_id' => $orderId,
    'message'  => "Заказ #{$orderId} принят. Ожидайте звонка менеджера.",
]);
