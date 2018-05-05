<?php

require_once "config.php";

try {
    $con = new PDO($config["dsn"], $config["user"], $config["password"]);
} catch (PDOException $e) {
    exit (json_encode([
        "errcode" => 3,
        "errmsg" => "数据库连接失败"
    ]));
}
$con->query("SET NAMES UTF8");

$stm = $con->prepare("SELECT * FROM {$config["table"]["answer"]}");
$stm->execute();

$rand = rand(0, $stm->rowCount() - 1);

exit (json_encode([
    "errcode" => 0,
    "errmsg" => "",
    "text" => $stm->fetchAll(PDO::FETCH_COLUMN)[$rand]
]));