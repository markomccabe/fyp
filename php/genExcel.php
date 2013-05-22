<?php

//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);

$sql = "SELECT PID,FORENAME,SURNAME,WARD,OLDWARD,TIME,DATE FROM Log ORDER BY DATE ASC"; 
$results = $db->query($sql); 
  
// Pick a filename and destination directory for the file 
// Remember that the folder where you want to write the file has to be writable 
$filename = "logexcel.csv"; 
  
// Actually create the file 
// The w+ parameter will wipe out and overwrite any existing file with the same name 
$handle = fopen($filename, 'w+'); 
  
// Write the spreadsheet column titles / labels 
fputcsv($handle, array('PID','FORENAME','SURNAME','WARD','OLDWARD','TIME','DATE'	)); 
  
// Write all the user records to the spreadsheet 
foreach($results as $row) 
{ 
    fputcsv($handle, array($row['PID'], $row['FORENAME'], $row['SURNAME'], $row['WARD'], $row['OLDWARD'], $row['TIME'], $row['DATE'])); 
} 
  
// Finish writing the file 
fclose($handle); 


  
?>