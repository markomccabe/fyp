<?php
	//assign local variable with the objects being posted
	$avail = $_POST['postAvailable'];
	$ward = $_POST['postWard'];
//require the database credentials	
require 'conn.php';

//create a connection to the database
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
//if there is an error echo it else perform the query
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//update the S_AVAILABLE feild of the ward table where WARD is equal to $ward	
$result =  $db->query("
UPDATE WARD
SET S_AVAILABLE='$avail'
WHERE WARD='$ward' 
"
) or die(mysql_error());
}
	//echo the variables - used for testing
	echo "data updated";
	echo $avail;
	echo $ward;

	
?>