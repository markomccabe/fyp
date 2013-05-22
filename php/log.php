<?php
//require FPDF plugin
require('../fpdf17/fpdf.php');
//open log file read only
$file = fopen("log.txt", "r") or exit("Unable to open file!");
//Output a line of the file until the end is reached
//get date
$info = getdate();
$day = $info['mday'];
$month = $info['mon'];
$year = $info['year'];
//format date
$date= $year."/".$month."/".$day;
$formattedDate = $day."/".$month."/".$year;

//variable pdf = new FPDF
//align the number of pages
//set the font
//display the title in larger font centred with no cell lines
$pdf = new FPDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Arial','',36);
$pdf->Cell(0,10,'Log for '.$formattedDate,0,0,'C');
    // Line break
    $pdf->Ln(20);
//set the font smaller
$pdf->SetFont('Arial','',14);
//while there are lines to read
while(!feof($file))
  {
  //assign thte variable change to the line
  $change= fgets($file);
  //append the cell to the pdf object
  $pdf->Cell(0,10,$change,0,1);
  }
 //create a name for the outputed file
$name = "Log_".$formattedDate;
//output the file inline with the browser with the name $name
$pdf->Output($name,'I');
//close the $file
fclose($file);
?>

