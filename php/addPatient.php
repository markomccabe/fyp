<?php

	//assign local variable to objects being posted
	$id = $_POST['postID'];
	$ward = $_POST['postWard'];
	
	
//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
// if there is an error echo it
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//update the WARD feild on the inpatient table where PID = $id
$result =  $db->query("
UPDATE INPATIENT
SET WARD='$ward'
WHERE PID='$id' 
"
) or die(mysql_error());

}
?>