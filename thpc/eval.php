<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$ids = $_REQUEST['ids'];
$l = $_REQUEST['l'];
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://hermes.infra.kth.se:8080/eval');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"ids\":[$ids],\"l\":$l}");

$headers = array();
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
echo json_encode($result);
curl_close($ch);