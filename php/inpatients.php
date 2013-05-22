<?php 
//include the database credentials	
require 'conn.php';
//set up a new database connection
$db = new PDO('mysql:host='.$host.';dbname='.$dbName.';user='.$user.';pass='.$pass);
//if there is an error echo it
if($db->connect_error){
	echo 'error connecting'.$db->connect_error;
}
else{
//select the pid, forename, surname, dob, gender, ward, doa, risk_alert, admspec, admsource, mrsa, infected, clical priority
//from pas and inpatient table where pas.pid=inpatinet.pid and dod is null
//order by clinical priority	
$result =  $db->query('
SELECT `PAS`.`PID`, `PAS`.`FORENAME`, `PAS`.`SURNAME`, `PAS`.`DOB`, `PAS`.`GENDER`, `INPATIENT`.`WARD`, `INPATIENT`.`DOA`, `INPATIENT`.`RISK_ALERT`,`INPATIENT`.`ADMSPEC`,`INPATIENT`.`ADMSOURCE`, `INPATIENT`.`MRSA`, `INPATIENT`.`INFECTED`, `INPATIENT`.`CLINICAL_PRIORITY`
FROM PAS, INPATIENT
WHERE (PAS.PID=INPATIENT.PID)
AND (INPATIENT.WARD IS NULL)
AND (INPATIENT.DOD IS NULL)
AND (INPATIENT.ADMSOURCE <> "WL")
ORDER BY `INPATIENT`.`CLINICAL_PRIORITY` ASC

');
//tester variable gets all rows
$tester = $result->fetchAll(PDO::FETCH_ASSOC);
//count is equal to the row count
$count = $result->rowCount();
//the json variable encodes the tester object and this is echoed to the script
 $json=json_encode($tester);
 echo $json;

}
?>