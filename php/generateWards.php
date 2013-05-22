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
SELECT `WARD`.`WARD`, `WARD`.`LOCATION`, `WARD`.`MANAGER`, `WARD`.`EXTENSION`, `WARD`.`SPECIALITY`, `WARD`.`CAPACITY`, `WARD`.`V_CAPACITY`, `WARD`.`AVAILABLE`, `WARD`.`S_CAPACITY`, `WARD`.`S_AVAILABLE`, `WARD`.`DAYWARD`
FROM WARD
ORDER BY `WARD`.`WARD` ASC
');
//Set tester variable = all rows returned
$tester = $result->fetchAll(PDO::FETCH_ASSOC);
//count = num of rows returned
$count = $result->rowCount();
//json variable encodes $tester and it is echoed to the script file
 $json=json_encode($tester);
 echo $json;
}
?>