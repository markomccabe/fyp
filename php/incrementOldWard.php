<?php
	//assign local variables to objects being posted
	$avail = $_POST['postOldAvailable'];
	$ward = $_POST['postOldWard'];
	
//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
// if there is an error echo it
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//update the available feild of ward = $ward to $avail	
$result =  $db->query("
UPDATE WARD
SET AVAILABLE='$avail'
WHERE WARD='$ward' 

"
) or die(mysql_error());

}	
?>