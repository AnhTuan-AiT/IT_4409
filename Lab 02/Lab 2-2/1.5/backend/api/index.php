<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('content-type: application/json; charset=utf-8');
http_response_code(200);
date_default_timezone_set('Asia/Ho_Chi_Minh');

$_body = file_get_contents('php://input');
$data = json_decode($_body, true);

$name = $data['name'];
$date = strtotime(substr($data['date'], 0, strpos($data['date'], '(')));

echo json_encode(
	[
		"isSuccess" => true,
		"name" => $name,
		"date" => date("d/m/Y", $date),
        "24-hourTime" => date("H:i:s", $date),
        "12-hourTime" => date("h:i:s A", $date),
		"noDays" => cal_days_in_month(CAL_GREGORIAN, (int)date("m/", $date), (int)date("Y", $date))
	]
);
