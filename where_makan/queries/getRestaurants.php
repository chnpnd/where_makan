<?php
$sql = "SELECT * FROM `singapore resaurant`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = array();
}

header('Content-Type: application/json');
echo json_encode($data);
?>