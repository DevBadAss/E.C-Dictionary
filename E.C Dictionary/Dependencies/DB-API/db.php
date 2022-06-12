<?php

$name = rawurldecode(file_get_contents("php://input"));

if($db =new SQLite3($name)){
    echo rawurlencode(json_encode(array("result"=>"SUCCESS")));
}

?>