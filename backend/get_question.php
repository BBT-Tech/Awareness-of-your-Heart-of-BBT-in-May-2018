<?php

require_once "config.php";

if (!isset($_POST["data"])) {
    exit (json_encode([
        "errcode" => 1,
        "errmsg" => "数据缺失"
    ]));
}

$type = json_decode($_POST["data"], true)["type"];

if (is_int($type) && $type > -1 && $type < 3) {
    exit (json_encode([
        "errcode" => 2,
        "errmsg" => "非法的数据"
    ]));
}

try {
    $con = new PDO($config["dsn"], $config["user"], $config["password"]);
} catch (PDOException $e) {
    exit (json_encode([
        "errcode" => 3,
        "errmsg" => "数据库连接失败"
    ]));
}
$con->query("SET NAMES UTF8");

$stm = $con->prepare("SELECT * FROM {$config["table"]["question"]} WHERE `type` = ?");
$stm->execute([$type]);

$question = [];

while ($result = $stm->fetch(PDO::FETCH_ASSOC)) {
    $question[] = [
        "text" => $result["text"], 
        "click" => $result["click"]
    ];
}

exit (json_encode([
    "errcode" => 0,
    "errmsg" => "",
    "question" => $question
]));