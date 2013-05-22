<?php
	//assign local variables to the objects being posted
	$avail = $_POST['postAvailable'];
	$ward = $_POST['postWard'];
	echo $avail;
//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
//if there is an error echo it else perform the query
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//update the AVAILABLE feild of the ward table where WARD = $ward
$result =  $db->query("
UPDATE WARD
SET AVAILABLE='$avail'
WHERE WARD='$ward' 
"
) or die(mysql_error());
}
	//echo data updated
	echo "data updated";

	
?>