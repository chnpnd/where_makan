<?php
    include "../config.php";
    
    $restaurantData= mysqli_query($con,"select * from singapore_restaurant"); 
    $response = array(); 
    while($row = mysqli_fetch_assoc($restaurantData)){ 
        $response[] = $row; 
    } 
    echo json_encode($response); 
    exit;
?>