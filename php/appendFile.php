<?php
//assign local variables to the objecting being posted
$id = $_POST['postID'];
$ward = $_POST['postWard'];
$fname = $_POST['postfname'];
$sname = $_POST['postsname'];
$oldWard=$_POST['postOldWard'];


//create a variable to hold the current timestamp
$date = date("Y-m-d H:i:s");

if($oldWard == NULL){
	//open the log.txt file
$open = fopen("log.txt", 'a');
	if($open){
	fwrite($open, PHP_EOL);//means take a new line
	fwrite($open, 'Inpatient: ');
	fwrite($open,  $id. " - ".$fname." ".$sname);
	fwrite($open, PHP_EOL);
	fwrite($open, "Allocated to: ");
	fwrite($open, $ward);
	fwrite($open, PHP_EOL);
	fwrite($open, "Timestamp ".$date);
	fwrite($open, PHP_EOL);
	}
}else{
$open = fopen("log.txt", 'a');
//if the log file is opened write to it

if($open){
	
	fwrite($open, PHP_EOL);//means take a new line
	fwrite($open, 'Patient: ');
	fwrite($open,  $id. " - ".$fname." ".$sname);
	fwrite($open, PHP_EOL);
	fwrite($open, "Allocated to: ");
	fwrite($open, $ward);
	fwrite($open, PHP_EOL);
	fwrite($open, "From Ward: ");
	fwrite($open, $oldWard);
	fwrite($open, PHP_EOL);
	fwrite($open, "Timestamp ".$date);
	fwrite($open, PHP_EOL);
	}
}
?>