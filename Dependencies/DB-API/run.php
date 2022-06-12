<?php

$command = json_decode(rawurldecode(file_get_contents("php://input")));

$db = new SQLite3($command->db);

$db_exec = $db->exec(rawurldecode($command->command));
echo rawurlencode(json_encode(array("result"=>"SUCCESS")));



?>