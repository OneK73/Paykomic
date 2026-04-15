<?php
header('Content-Type: application/json');
$ref = $_GET['ref'] ?? '';
if (empty($ref)) { echo json_encode(["paid" => false]); exit; }
$file = 'paid_logs.txt';
if (file_exists($file)) {
    $paid = file($file, FILE_IGNORE_NEW_LINES);
    if (in_array($ref, $paid)) {
        echo json_encode(["paid" => true, "link" => "https://chat.whatsapp.com/EhovAIyjanh6y55sXt45ib?mode=gi_t"]);
        exit;
    }
}
echo json_encode(["paid" => false]);
?>