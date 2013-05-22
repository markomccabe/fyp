<?php
//function to force download the logexcel.csv file
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename=logexcel.csv');
header('Pragma: no-cache');
readfile("logexcel.csv");

?>