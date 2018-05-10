<?php

require_once "config.php";

if (!isset($_POST["data"])) {
    exit (json_encode([
        "errcode" => 1,
        "errmsg" => "数据缺失"
    ]));
}

$type = json_decode($_POST["data"], true)["type"];

if (!is_int($type) && $type > -1 && $type < 3) {
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
$result = $stm->fetchAll(PDO::FETCH_ASSOC);
$total = $stm->rowCount();
$rest = $total % $config["question_select_num"];
$rand = rand(0, $total - 1);

for ($i = 1; $i <= $rest; $i++) {
    $j = ($rand - $i + $total) % $total;
    $question[] = [
        "text" => $result[$j]["text"], 
        "click" => $result[$j]["click"]
    ];
}

for ($i = 0; $i < $total; $i += $config["question_select_num"]) {
    $j = ($rand + $i + rand($i, $i + $config["question_select_num"] - 1)) % $total;
    $question[] = [
        "text" => $result[$j]["text"], 
        "click" => $result[$j]["click"]
    ];
}

exit (json_encode([
    "errcode" => 0,
    "errmsg" => "",
    "question" => $question
]));