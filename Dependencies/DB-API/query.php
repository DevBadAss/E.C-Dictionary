<?php

$command = json_decode(rawurldecode(file_get_contents("php://input")));

$db = new SQLite3($command->db);

$stmt = $db->query(rawurldecode($command->query));

while ($result = $stmt->fetchArray(SQLITE3_ASSOC)) {
    if ($result !== false) {
        $RESULT[] = $result;
    }
    if ($result === false) {
        $RESULT = null;
    }
}
echo rawurlencode(json_encode(array("result" => $RESULT)));


?>