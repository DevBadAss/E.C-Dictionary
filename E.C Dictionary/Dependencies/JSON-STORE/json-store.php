<?php

$Location = $_POST["dir"].$_POST["name"];

if(move_uploaded_file($_FILES["file"]["tmp_name"], $Location)){
    echo "SUCCESS";
}else{
    echo "FAILED";
}

?>