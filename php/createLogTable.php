<?php

//assign local variables to the objecting being posted
$id = $_POST['postID'];
$ward = $_POST['postWard'];
$fname = $_POST['postfname'];
$sname = $_POST['postsname'];
$oldWard=$_POST['postOldWard'];
$dateTime = date("Y-m-d H:i:s");
$DTEXPLODE = explode(" ", $dateTime);
$date = $DTEXPLODE[0];
$time = $DTEXPLODE[1];

//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
// if there is an error echo it
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//INSERT THE DATA INTO THE LOG TABLE BY EXECUTING THIS SQL STATMENT
$result =  $db->query("
INSERT INTO Log (PID, FORENAME, SURNAME, WARD, OLDWARD, TIME,DATE)
VALUES ('$id','$fname','$sname','$ward','$oldWard','$time','$date')

");

if($result){
	echo "horray";
}else{
	echo "fail";
}
}

?>