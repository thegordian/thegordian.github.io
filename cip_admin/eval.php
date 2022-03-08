<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$ids = $_REQUEST['ids'];
$capacity = $_REQUEST['capacity'];
$power = $_REQUEST['power'];
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://localhost:8081/eval');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"ids\":[$ids],\"capacity\":$capacity,\"power\":$power}");

$headers = array();
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
echo json_encode($result);
curl_close($ch);