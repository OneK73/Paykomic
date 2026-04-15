<?php
$json = file_get_contents('php://input');
$data = json_decode($json, true);
if (isset($data['status']) && $data['status'] == 'Success') {
    $reference = $data['reference'];
    file_put_contents('paid_logs.txt', $reference . PHP_EOL, FILE_APPEND);
    http_response_code(200);
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(400);
}
?>