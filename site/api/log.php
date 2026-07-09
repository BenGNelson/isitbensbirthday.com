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
if (!is_array($data)) {
    http_response_code(400);
    exit;
}

// Ensure the logs directory exists
$log_dir = dirname($log_file);
if (!is_dir($log_dir) && !mkdir($log_dir, 0755, true) && !is_dir($log_dir)) {
    http_response_code(500);
    exit;
}

// Append + trim as ONE locked read-modify-write, so concurrent POSTs near the
// MAX_LINES boundary can't lose or corrupt each other's entries. 'c+' opens for
// read/write and creates the file without truncating.
$fp = fopen($log_file, 'c+');
if ($fp === false) {
    http_response_code(500);
    exit;
}
if (flock($fp, LOCK_EX)) {
    $existing = stream_get_contents($fp);
    $lines = $existing === '' ? [] : explode("\n", rtrim($existing, "\n"));
    $lines[] = json_encode($data);
    if (count($lines) > MAX_LINES) {
        $lines = array_slice($lines, -MAX_LINES);
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, implode("\n", $lines) . "\n");
    fflush($fp);
    flock($fp, LOCK_UN);
}
fclose($fp);

http_response_code(204);
