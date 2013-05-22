<?php
//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
// if there is an error echo it
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//select ward, location, manager, extension, speciality, capacity, virtual capacity, available, side room capacity, side room availablity and dayward
//feilds from the ward table and order them by ward ascending	
$result =  $db->query('
SELECT `Log`.`DATE`
FROM Log
ORDER BY `Log`.`DATE` ASC      
');
$tester = $result->fetchAll(PDO::FETCH_ASSOC);
$count = $result->rowCount();
}
$json=json_encode($tester);
echo $json;


?>
