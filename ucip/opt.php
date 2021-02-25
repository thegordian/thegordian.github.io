<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$k = $_REQUEST['k'];
$l = $_REQUEST['l'];
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://hermes.infra.kth.se:8080/opt');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"k\":$k,\"l\":$l}");

$headers = array();
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}

echo json_encode($result);
curl_close($ch);