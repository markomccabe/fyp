<?php 

//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
//if there is an error connecting echo it
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//select pid, forename, surname, dob, gender, ward, dod, doa, risk alert, mrsa, infected, clinical priority
//from the pas and inpatient tables
//where the pas.pid = inpatient.pid,
// the ward is not null and the dod is null
//organise then by clical priority
$result =  $db->query('
SELECT `PAS`.`PID`, `PAS`.`FORENAME`, `PAS`.`SURNAME`, `PAS`.`DOB`, `PAS`.`GENDER`, `INPATIENT`.`WARD`,`INPATIENT`.`DOD`, `INPATIENT`.`DOA`, `INPATIENT`.`RISK_ALERT`, `INPATIENT`.`MRSA`, `INPATIENT`.`INFECTED`, `INPATIENT`.`CLINICAL_PRIORITY`
FROM PAS, INPATIENT
WHERE (PAS.PID=INPATIENT.PID)
AND (INPATIENT.WARD IS NOT NULL)
AND (INPATIENT.DOD IS NULL)
ORDER BY `PAS`.`SURNAME` ASC
');

//tester variable containes all resulting rows
//count variable hold the number of rows resulted
$tester = $result->fetchAll(PDO::FETCH_ASSOC);
$count = $result->rowCount();
//json variable encodes the tester variable and this is echoed to the script
 $json=json_encode($tester);
 echo $json;

}


?>