<?php
// log.php — debug logger for the Monday login page
// Appends one JSON line per call, then trims to MAX_LINES so the file never grows unbounded.

const MAX_LINES = 500;

// Log file lives outside the web root so it can't be fetched directly.
// From site/api/ that's ../../logs/debug.log  →  <project root>/logs/debug.log
$log_file = __DIR__ . '/../../logs/debug.log';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    http_response_code(400);
    exit;
}

// Ensure the logs directory exists
$log_dir = dirname($log_file);
if (!is_dir($log_dir)) {
    mkdir($log_dir, 0755, true);
}

// Append the new entry
file_put_contents($log_file, json_encode($data) . "\n", FILE_APPEND | LOCK_EX);

// Trim to last MAX_LINES lines so the file self-manages its size
$lines = file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
if (count($lines) > MAX_LINES) {
    file_put_contents($log_file, implode("\n", array_slice($lines, -MAX_LINES)) . "\n", LOCK_EX);
}

http_response_code(204);
