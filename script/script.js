var wardArray = []; //holds ward information
var inpatientArray = []; //holds inpatient information
var patientArray = []; //holds current patient information
var wardDetailsArray = []; //holds current ward details
var showWards = false; //boolean to show wards
var showInpatients = false; //boolean to show inpatients
var patientID; //global variable for current patient id
var patientFname; //global variable for current patient forename
var patientSname; //global variable for current patient surname
var ward; //global variable for current ward
var oldWard; //global variable for previous ward
var context; //global variable to decide which context the application is in
var patientLoaded = false; //boolean to check if a patient has been selected
var fileCreated = false; //boolean to check if a log file has been created
var available; //global variable for current ward availablity
var oldAvailable; //global variable for previous ward availablity
var sAvailable; //global variable for current ward side room availablity
var oldSavailable; //global variable for pevious ward side room availablity
var patientInfected; //global variable checks if current patient is infected



//called when page is loaded
$(document).ready(function() {
	console.log("CALLED emptyFile()");
	//called to check if the log file needs emptied
	emptyFile();
	getWards();
	//hide various buttons and divs
	$("#wardShow").hide();
	$("#wardHide").hide();
	console.log("CALLED setContext()");
	//set the context to overview
	setContext("overview");
	
	//when wardHide is clicked the details of the ward will be 
	//hidden and the wardShow button will be shown
	$("#wardHide").click(function(){
		$("#wardLeft").toggle();
		$("#wardRight").toggle();
		$("#patientTable").css("height","100%");
		$("#wardHide").hide();
		$("#wardShow").show();
	});
	
	//when wardShow is clicked the details of the ward will be 
	//shown and the wardHide button will be shown
	$("#wardShow").click(function(){
		$("#wardLeft").toggle();
		$("#wardRight").toggle();
		$("#patientTable").css("height","70%");
		$("#wardShow").hide();
		$("#wardHide").show();
	});
	
	//when the view ward button is clicked the wards will be displayed
	$("#viewWardBTN").click(function(event) {
		console.log("CALLED getWards()");
		getWards();
	});
	
	//when the hospital div is clicked reload the page
	$("#hospital").on("click", function() {
		console.log("CALLED location.reload()");
			location.reload();
	});
	
	//when a green ward is clicked set the ward = to the H2
	//generate the ward, set showWards to false and set the
	//context to ward
	$("#display").on("click", "#imagegreen", function() {
		ward = ($('h2',this).text());
		console.log("CALLED generateWard()");
		generateWard(ward);
		console.log("CALLED setContext()");
		setContext("ward");
		showWards = false;
	});
	
	//when a red ward is clicked set the ward = to the H2
	//generate the ward, set showWards to false and set the
	//context to ward
	$("#display").on("click", "#imagered", function() {
		ward = ($('h2',this).text());
		console.log("CALLED generateWard()");
		generateWard(ward);
		console.log("CALLED setContext()");
		setContext("ward");
		showWards = false;
	});
	
	//when an amber ward is clicked set the ward = to the H2
	//generate the ward, set showWards to false and set the
	//context to ward
	$("#display").on("click", "#imageamber", function() {
		ward = ($('h2',this).text());
		console.log("CALLED generateWard()");
		generateWard(ward);
		console.log("CALLED setContext()");
		setContext("ward");
		showWards = false;
	});
	
	//when the inpatient button is pressed get the inpatient list
	$("#inpatientBTN").click(function(event) {
		console.log("CALLED getInpatients()");
		getInpatients();
		getWards();	
	});
	
	//when a patient is clicked split the info into an array and set the 
	//global variables, get the patients details and display them on screen,
	//set showWards = false and set the context to patient
	$("#left").on("click", "h3", function() {
		var a = ($(this).text());
		var array = a.split(',');
		patientInfected=array[3];
		console.log(patientInfected,array[3])
		patientID = array[2];
		patientFname=array[1];
		patientSname=array[0];
		console.log("CALLED getPatientDetails()");
		getPatientDetails(patientID);
		setContext("patient");
		showWards = false;
		patientLoaded - false;
		oldWard = "";
		console.log(oldWard)
	});
	
	//when the add button is pressed switch the curent context and perform the apropriate function 
	$("#addBTN").click(function(){
		switch(context){
			case "patient":patientBtnPressedPatientContext(patientFname, patientSname, patientID);
			console.log("CALLED patientBtnPressedPatientContext()");
			break;
			case "ward": patientBtnPressedWardContext(patientFname, patientSname, patientID);
			console.log("CALLED patientBtnPressedWardContext()");
			break;		
		}
	});
	
	//when the move button is pressed display the patients to be moved
	//and hide the apropriate buttons
	$("#moveBTN").click(function(){
		console.log("CALLED generatePatientsForMove()");
		generatePatientsForMove(ward);
		$("#display").css("overflow", "auto");
		$("#wardShow").hide();
		$("#wardHide").hide();
	});
	
	//when a patient is clicked set the old variables = current variables
	//generate an array and assign the global variables and generate the patient 
	//for move
	$("#display").on("click"," a.patient ", function() { 
		oldWard = ward;
		oldAvailable=available;
		oldSavailable=sAvailable;
		var a = ($(this).text());		
		var array = a.split(' ');
		console.log(array)
		patientInfected= array[7];
		patientID = array[0];
		patientFname = array[2];
		patientSname = array[3];
		console.log("CALLED generatePatientsForMove()"+patientInfected);
		generatePatientForMove(patientFname, patientSname, patientID, patientInfected);
	});
	
	//when a green patient is clicked set the old variables = current variables
	//generate an array and assign the global variables and generate the patient 
	//for move
	$("#display").on("click"," a.patientGreen ", function() { 
		oldWard = ward;
		oldAvailable=available;
		oldSavailable=sAvailable;
		var a = ($(this).text());
		var array = a.split(' ');
		patientInfected= array[7];
		patientID = array[0];
		patientFname = array[2];
		patientSname = array[3];
		console.log(array);
		console.log("CALLED generatePatientsForMove()");
		generatePatientForMove(patientFname, patientSname, patientID, patientInfected);
	});
	
	//when a yellow patient is clicked set the old variables = current variables
	//generate an array and assign the global variables and generate the patient 
	//for move
	$("#display").on("click"," a.patientYellow ", function() { 
		oldWard = ward;
		oldAvailable=available;
		oldSavailable=sAvailable;
		var a = ($(this).text());
		var array = a.split(' ');
		patientInfected= array[7];
		patientID = array[0];
		patientFname = array[2];
		patientSname = array[3];
		console.log("CALLED generatePatientsForMove()");
		generatePatientForMove(patientFname, patientSname, patientID, patientInfected);
	});
	
	//when a red patient is clicked set the old variables = current variables
	//generate an array and assign the global variables and generate the patient 
	//for move
	$("#display").on("click"," a.patientRed ", function() { 
		oldWard = ward;
		oldAvailable=available;
		oldSavailable=sAvailable;
		var a = ($(this).text());	
		var array = a.split(' ');
		patientInfected= array[7];
		patientID = array[0];
		patientFname = array[2];
		patientSname = array[3];
		console.log("CALLED generatePatientsForMove()");
		generatePatientForMove(patientFname, patientSname, patientID, patientInfected);
	});

	//when the download button is clicked open the log file in a seperate tab or
	//in the case of android downlaod it directly
	$("#download").click(function(){
		console.log("CALLED window.open()");
		window.open('php/log.php','LogBook');
	});
	$("#downloadExcel").click(function(){
		//called the php
		
		$.get("php/genExcel.php");
		//$.get("php/downloadExcel.php");
		//console.log("CALLED window.open()");
		window.open('php/downloadExcel.php','LogBook');
	});
});

//open a dialog box stating which ward to place the current patient in
//when ok is pressed generate the wards
function patientBtnPressedPatientContext (fName, sName, id) {
 	console.log("-----------patientBtnPressedPatientContext function");
   	$("#display").empty();
	$("#dialog1").empty();
  	$("#dialog1").append("<p>Please select the ward to place patient</p><p>"+fName+" "+sName+"</p>");
  	patientLoaded=true;
   
    $( "#dialog1" ).dialog({
      modal: true,
      buttons: {
        Ok: function() {
        	console.log("CALLED getWards()");
        	 getWards();  			
          $( this ).dialog( "close" );
        }
      }     
    }).dialog("open");
}

//if a patient is loaded call the addPatient function
function patientBtnPressedWardContext(fName, sName, id) {
   console.log("-----------patientButtonPressedWardContext function"+patientLoaded);
   if(patientLoaded){
   	console.log("CALLED addPatient()");
  addpatient(fName, sName, id);  
   }  
}

//open dialog 2 if confirm is pressed call the checkPatient function and refresh the inpatients
function addpatient(fName, sName, id){
	console.log("-----------addPatient function");
	$("#dialog2").empty();
	$("#dialog2").append("<p>Confirm Patient:</p><p>"+fName+" "+sName+"</p>");
	$("#dialog2").append("<p>Confirm Ward:</p><p>"+ward+"</p>");  
    $( "#dialog2" ).dialog({
      modal: true,
      buttons: {
        Confirm: function() {
        	console.log("CALLED checkPatient()");
	        checkPatient(id, ward);
	        getInpatients();      
			$( this ).dialog( "close" );	 
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }     
    }).dialog("open");	
}

// if showWards=false
//ajax call to php file generateWARDS
//the display div is emptyed
//data recieved is parsed into an array and assigned to local variables
//a series of if statements will determine the colour of the ward and if there is a speciality
//it will also be displayed 
//set showWards =true
function getWards() {
	console.log("-----------getWards function");
	setContext("overview");

	if (!showWards) {
		$("#display").empty();
		$.ajax({
			type : "GET",
			url : "php/generateWARDS.php",

			success : function(data) {
				var a = $.parseJSON(data)
				//loop throught each object
				for (var b = 0; b < a.length; b++) {
					//assign the content to the global wardArray
					wardArray = a[b];
					var ward = a[b]["WARD"];
					var available = a[b]["AVAILABLE"];
					var capacity = a[b]["CAPACITY"];
					var vCapacity = a[b]["V_CAPACITY"];
					var sCapacity = a[b]["S_CAPACITY"];
					var sAvailable = a[b]["S_AVAILABLE"];
					var speciality = a[b]["SPECIALITY"];
					//if specialty = gen then dont display it
					if (speciality=="GEN"){
						speciality="";
					}
					
					//if there are more than two available beds display amber
					if (available > 2) {
						$("#display").append('<div id="imageamber"><h2>' + ward + '</h2><p class="speciality">'+speciality+'</p></div>');
					}
					//else if there are less than 3 and more than -1 and there is more than -1 siderooms available display green
					else if (available < 3 && available >= 0 && sAvailable>-1) {
						$("#display").append('<div id="imagegreen"><h2>' + ward + '</h2><p class="speciality">'+speciality+'</p></div>');
					} 
					//else display a red ward
					else {
						$("#display").append('<div id="imagered"><h2>' + ward + '</h2><p class="speciality">'+speciality+'</p></div>');
					}
				}
			}
		});
		showWards = true;
	} 
	else {
		showWards = false;

	}
}

//if inpatients are not shown ajax to php to get inpateints
//loog throught the data and assign each object to the inpatientArray
//if mrsa = y the inpatient will be green , likewise for risk patient will
//be yellow and infected will be red
//make the left div bigger to accommadate the inpatients set showInpatients to true
function getInpatients() {
	console.log("-----------addInpatient function");
	if (!showInpatients) {
		$("#left").empty();
		$.ajax({
			type : "GET",
			url : "php/inpatients.php",
			success : parseXml
		});

		function parseXml(data) {
			
			var a = $.parseJSON(data)
			for (var b = 0; b < a.length; b++) {
				inpatientArray = a[b];
				var surname = inpatientArray["SURNAME"];
				var forname = inpatientArray["FORENAME"];
				var pid = inpatientArray["PID"];
				var infected = inpatientArray["INFECTED"];
				var mrsa = inpatientArray["MRSA"];
				var risk = inpatientArray["RISK_ALERT"];
			
				
				if (mrsa == "Y") {
					$("#left").append('<h3><a class="green">  ' + surname + ", " + forname + '</a><a class="test2"> ,' + pid +','+infected+ '</a></h3>');
				}
				else
				if (infected == "Y") {
					$("#left").append('<h3><a class="red">  ' + surname + ", " + forname + '</a><a class="test2"> ,' + pid + ','+infected+'</a></h3>');
				}
				else
				if (risk == "Y") {
					$("#left").append('<h3><a class="yellow">  ' + surname + ", " + forname + '</a><a class="test2"> ,' + pid + ','+infected+'</a></h3>');
				}
				else
				if (risk == "N" && mrsa == "N" && infected == "N") {
					$("#left").append('<h3><a class="test">  ' + surname + ", " + forname + '</a><a class="test2"> ,' + pid + ','+infected+'</a></h3>');
				}
			}
			$("#left").css("width", "19%");
			$("#left").css("border-right", "solid");
			
			$("#left").css("border-color", "white");
			$("#display").css("width", "75%");
			
		}

		showInpatients = true;
	
	} 
	//else set showInpatients to false and make the left div smalled
	else {
		$("#left").empty();
		$("#left").css("border", "none");
		$("#left").css("width", "0.1%");
		$("#display").css("width", "95%");
		showInpatients = false;	
	}
}

//ajax to php when function is called and return ward details
//if the ward name = the query then assign the local variables and the global array wardDetailsArray
//append the details to the display div and call the getWardPatients function
function generateWard(ward) {
	console.log("-----------generateWard function");
	$("#display").empty();
	var g = ward;
	$("#left").empty();
		$("#left").css("border", "none");
		$("#left").css("width", "0.1%");
		$("#display").css("width", "95%");
		showInpatients = false;	
	$.ajax({
		type : "GET",
		url : "php/generateWards.php",
		success : function(data) {
			$("#left").empty();
		$("#left").css("border", "none");
		$("#left").css("width", "0.1%");
			var a = $.parseJSON(data)
			for (var b = 0; b < a.length; b++) {
				wardArray = a[b];
				var wardQuery = wardArray["WARD"];
				if (wardQuery == g) {

					var wards = wardArray["WARD"];
					var loc = wardArray["LOCATION"];
					var mgr = wardArray["MANAGER"];
					var ext = wardArray["EXTENSION"];
					var spec = wardArray["SPECIALITY"];
					var capacity = wardArray["CAPACITY"];
					var vCapacity = wardArray["V_CAPACITY"];
					available = wardArray["AVAILABLE"];
					var sCapacity = wardArray["S_CAPACITY"];
					sAvailable = wardArray["S_AVAILABLE"];
					var dayWard = wardArray["DAYWARD"];
					wardDetailsArray = [wards,capacity,vCapacity,available,sCapacity, sAvailable];
				}
			}
		
			$("#display").append('<div id="wardLeft"> </div>');
			$("#wardLeft").append("<table width=950px><tr><th colspan='5'><p class=header>"+wards+"</p></th></tr>"+
			"<tr><td>Capacity</td><td>Available</td><td>Virtual Capacity</td><td>Side Rooms</td><td>Available Side Rooms</td></tr>"+
			"<tr><td>"+capacity+"</td><td>"+available+"</td><td>"+vCapacity+"</td><td>"+sCapacity+"</td><td>"+sAvailable+"</td></tr>"+
			"</table");
		
			console.log("CALLED getWardPatients");
			getWardPatients(ward);
		}
	});
}

//empty the display div
//ajax to php to get inpatient details
//if the patient pid = the wuery then assign local variables
//append these variable to the pateintDetails div
function getPatientDetails(patient) {
	console.log("-----------addPatientDetails function");
	$("#display").empty();
	$.ajax({
		type : "GET",
		url : "php/inpatients.php",
		success : function(data) {
			var a = $.parseJSON(data)
			for (var b = 0; b < a.length; b++) {
				inpatientArray = a[b];
				
				var patientQuery = inpatientArray["PID"];
				if (patientQuery == patient) {
				
					var pid = inpatientArray["PID"];
					var forname = inpatientArray["FORENAME"];
					var surname = inpatientArray["SURNAME"];
					var dob = inpatientArray["DOB"];
					var gender = inpatientArray["GENDER"];
					var wards = inpatientArray["WARD"];
					var admspec = inpatientArray["ADMSPEC"];
					var doa = inpatientArray["DOA"];
					var risk = inpatientArray["RISK_ALERT"];
					var mrsa = inpatientArray["MRSA"];
					var infected = inpatientArray["INFECTED"];
					var priority = inpatientArray["CLINICAL_PRIORITY"];
					var source = inpatientArray["ADMSOURCE"];
					
				}
			}
			$("#display").append("<div id=patientDetails> <div>");
			$("#patientDetails").append("<h1>Patient Details</h1>");
			$("#patientDetails").append("<h3>H&C : " + pid + "</h3>");
			$("#patientDetails").append("<h3>Name :" + forname + " " + surname + "</h3>");
			$("#patientDetails").append("<h3>Date of Birth : " + dob + "</h3>");
			$("#patientDetails").append("<h3>Gender : " + gender + "</h3>");
			$("#patientDetails").append("<h3>Admission Specialaity : " + admspec + "</h3>");
			$("#patientDetails").append("<h3>Admission Source : " + source + "</h3>");
			$("#patientDetails").append("<h3>Date of Admission: " + doa + "</h3>");
			$("#patientDetails").append("<h3>Risk Factor : " + risk + "</h3>");
			$("#patientDetails").append("<h3>MRSA +ve : " + mrsa + "</h3>");
			$("#patientDetails").append("<h3>Infected : " + infected + "</h3>");
			$("#patientDetails").append("<h3>Priority : " + priority + "</h3>");
		}
	});
}

//ajax to php to get patients in wards
//append a table with heading of the information to be displayed
//assign the patient array = the json objects
//if the ward name matches the query then assign local variables
//and append them to the table
function getWardPatients(g) {
	console.log("-----------getWardPatients function");
	var x = g;
	$.ajax({
		type : "GET",
		url : "php/patients.php",
		success : function(data) {
			var a = $.parseJSON(data)
			$("#display").append("<div id=patientTable> <div>");
			$("#patientTable").append("<table id='Table'><colgroup style='width:125px'></colgroup><colgroup style='width:95px'></colgroup><colgroup style='width:121px'></colgroup><colgroup style='width:93.5px'></colgroup><colgroup style='width:47.5px'></colgroup><colgroup style='width:58.5px'></colgroup><colgroup style='width:107.5px'></colgroup><colgroup style='width:61.5px'></colgroup><colgroup style='width:60px'></colgroup><colgroup style='width:60px'></colgroup><thead><tr id = 'header-row'><th style='padding-right:12px; width:125px; padding-left:15px'><b> H&C number </b></th><th style='width:95px; padding-right:10px'><b>" 
			+"Forename </b></th><th style='width:121px; padding-right:13px'><b> Surname </b></th><th style='width:85px'><b> DOB </b></th><th style='padding-right:11px; width:47px'><b> Gender </b></th>"
			+"<th style='width:58px; padding-right:6px'><b> Ward </b></th><th style='padding-right:9px; width:107px'><b> DOA </b></th>"
			+"<th style='width:60px; padding-right:5px'> <b>MRSA </b</th><th style='padding-right:6px; width:60px'><b> Infected </b></th><th style='width:60px'><b> Priority </b></th></tr></thead>");
			$("#patientTable thead").after("<tbody>");
		$('#patientTable tbody').append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><hr>");
			for (var b = 0; b < a.length; b++) {
				patientArray = a[b];
				var wardQuery = patientArray["WARD"];	
				if (wardQuery == x) {
					var pid = patientArray["PID"];
					var forname = patientArray["FORENAME"];
					var surname = patientArray["SURNAME"];
					var dob = patientArray["DOB"];
					var gender = patientArray["GENDER"];
					var ward = patientArray["WARD"];
					var doa = patientArray["DOA"];
					var mrsa = patientArray["MRSA"];
					var infected = patientArray["INFECTED"];
					var priority = patientArray["CLINICAL_PRIORITY"];
				$('#patientTable tbody').append("<tr><td>" + pid + "</td><td>" + forname + "</td><td>" + surname + "</td><td>" + dob + "</td><td>" + gender + "</td><td>" + ward + "</td><td>" + doa + "</td><td>" + mrsa + "</td><td>" + infected + "</td><td>" + priority + "</td><hr>");
				}
			}
			$("#patientTable tr:last").after("</tbody></table>");	
			
		}
	});
	
	
	
	
}

//function to set the context of the application
//deals with css changes when in different contexts and assigns the 
//global variable context
function setContext(string) {
	console.log("-----------setContext function");
	var a = string;
	switch(a) {
		case "patient":
			$("#wardHide").hide();
			$("#wardShow").hide();
			$("#patientBTN").css("color", "white");
			$("#patientBTN").css("border-bottom", "solid");
			$("#wardBTN").css("border-bottom", "none");
			$("#overviewBTN").css("border-bottom", "none");
			$("#wardBTN").css("color", "grey");
			$("#overviewBTN").css("color", "grey");
			$("#addBTN").show();
			$("#moveBTN").hide();
			$("#display").css("overflow", "auto");
			context = "patient";
			break;
		case "ward":
		
			$("#patientBTN").css("color", "grey");
			$("#wardBTN").css("color", "white");
			$("#overviewBTN").css("color", "grey");
			$("#wardBTN").css("border-bottom", "solid ");
			$("#overviewBTN").css("border-bottom", "none");
			$("#patientBTN").css("border-bottom", "none");
			$("#display").css("overflow", "hidden");
			$("#wardShow").hide();
			$("#wardHide").show();
			$("#moveBTN").show();
			context = "ward";
			//if a patient is loaded show the add button and not the move button
			if(patientLoaded){
				 $("#addBTN").show();
				$("#moveBTN").hide(); console.log(patientLoaded)
			}
			//else show the move button and hide the add button
			else{
			$("#addBTN").hide();	
			$("#moveBTN").show();
			}
			break;
		case "overview":
			$("#wardHide").hide();
			$("#wardShow").hide();
			$("#patientBTN").css("color", "grey");
			$("#wardBTN").css("color", "grey");
			$("#overviewBTN").css("color", "white");
			$("#overviewBTN").css("border-bottom", "solid ");
			$("#wardTN").css("border-bottom", "none");
			$("#patientBTN").css("border-bottom", "none");
			$("#addBTN").hide();
			$("#moveBTN").hide();
			$("#display").css("overflow", "auto");
			context = "overview";
			break;
	}
}

//function to decide whether a patient can be placed in a ward
//sets local variables from global variables and arrays
//decides which function to call based on wether the patient is infected
//or not
function checkPatient(id,w){
	console.log("-----------checkPatient function");
	
	var wcapacity = wardDetailsArray[1];
	var wvCapacity = wardDetailsArray[2];
	var wvAvailable = wardDetailsArray[3];
	var wsCapacity = wardDetailsArray[4];
	var wsAvailable = wardDetailsArray[5];
	var updatedS_Available = wsAvailable--;
	
	
	//var x represents the lowest possible availablity
	//it is found by taking the virtual capacity from the actual capacity
	var x = wcapacity - wvCapacity;	
	// switch patientInfected and call the correct function  
			
		switch(patientInfected){
			case 'Y':assignInfectedPatient(id,ward,wsAvailable);
			console.log("CALLED ASSIGNINFECTEDPATIENT")
			break;
			case 'N':assignPatient(id,ward,wvAvailable, x);
			console.log("CALLED ASSIGNPATIENT")
			break;
		}
}

//function will assign patient to a ward with available beds
function assignPatient(id, w, wvAvailable,x){
	console.log("-----------assignPatient function");
	//if available is greater than x then decrement available
	//set patient loaded=false, set the context to ward, change the 
	//old wards availablity, post the variables to php script,
	//reload the ward and write to the file
	console.log(oldWard, ward)
	if (ward==oldWard){
		patientLoaded=false;
		setContext("ward");
		showInpatients=false;
	}
	else{
		if (wvAvailable>x){
			$("#display").empty();
			available--;
		$("#patientTable").empty()
				patientLoaded=false;
				console.log("CALLED setContext()"); 
				setContext("ward");	
				console.log("CALLED changeAvailable");
				changeAvailable(oldWard, available);	
				console.log("CALLED postToPHP");
				postToPHP(id,w);	
				$("#display").empty();
				console.log("CALLED generateWard()");
				generateWard(ward); 
				showInpatients = false;
				console.log("CALLED writeToFile()");
				writeToFile(id, w, oldWard);
				writeToExcel(id,w,oldWard);
		}
		//else there is no room in the ward so show dialog 1 to inform
		//user that the action cannot be performed
		//patientLoaded will be set to false
		else{
			$("#dialog1").empty();
			 	$("#dialog1").append("<p>Not allowed</p>");
			 	$("#dialog1").append("<p>"+ward+"</p>");
			 	$("#dialog1").append("<p>is at Capacity</p>");
	  	
	   
		    $( "#dialog1" ).dialog({
		      modal: true,
		      buttons: {
		        Ok: function() {
		        	patientLoaded=false;
		          $( this ).dialog( "close" );
		        }
		      }     
		    }).dialog("open");
		}
	}		
}

//function will assign patient to a ward with available side rooms
function assignInfectedPatient(id, w, wsAvailable){
console.log("-----------assignInfectedPatient function");
console.log(ward,oldWard);
	$("#patientTable").empty()
	console.log(wsAvailable);
	//if available is greater than -1 then decrement available
	//set patient loaded=false, set the context to ward, change the 
	//old wards side room availablity, post the variables to php script,
	//reload the ward and write to the file
	
	if (ward==oldWard){
		patientLoaded=false;
		setContext("ward");
		showInpatients=false;
		generateWard(ward);
	}else{
		
	
	if(wsAvailable>-1){
		patientLoaded=false; 
			console.log("CALLED setContext()");
			setContext("ward");				
			console.log("CALLED changeS_Available()");
			changeS_Available(oldWard,wsAvailable);	
			console.log("CALLED postToPHP()");
			postToPHP(id,w);	
			$("#display").empty();
			console.log("CALLED generateWard");
			generateWard(ward); 
			showInpatients = false;
			console.log("CALLED writeToFile()");
			writeToFile(id, w, oldWard);	
			writeToExcel(id,w,oldWard);
	}
	//else there is no side rooms in the ward so show dialog 1 to inform
	//user that the action cannot be performed
	//patientLoaded will be set to false
	else{
		$("#dialog1").empty();
		 	$("#dialog1").append("<p>Not allowed</p>");
		 	$("#dialog1").append("<p>"+ward+"</p>");
		 	$("#dialog1").append("<p>has no more siderooms</p>");
		 	
		    $( "#dialog1" ).dialog({
		      modal: true,
		      buttons: {
		        Ok: function() {
		        		patientLoaded=false; 
		  			getWards();
		          $( this ).dialog( "close" );
		        }
		      }  
		    }).dialog("open");
		}		
}
}
// function to display the patients of the current ward that can be moved
//the display div is emptied
// an ajax call to php is made to ensure patients are up to date
// patients with a ward = current ward then assign the local variables
//and colour them accordingly based on their circumstances
function generatePatientsForMove(g){
	console.log("-----------generatePatientsForMove function");
	$("#display").empty();
	var genWard = g;
	ward = g;
	var x = g;
	$.ajax({
		type : "GET",
		url : "php/patients.php",
		success : function(data) {
			var a = $.parseJSON(data)
			$("#display").append('<div id="patient"> </div>');
			var count = 0;		
			for (var b = 0; b < a.length; b++) {
				patientArray = a[b];
				var wardQuery = patientArray["WARD"];
				if (wardQuery == x) {
					var pid = patientArray["PID"];
					var forname = patientArray["FORENAME"];
					var surname = patientArray["SURNAME"];
					var dob = patientArray["DOB"];
					var gender = patientArray["GENDER"];
					var ward = patientArray["WARD"];
					var doa = patientArray["DOA"];
					var risk = patientArray["RISK_ALERT"];
					var mrsa = patientArray["MRSA"];
					var infected = patientArray["INFECTED"];
					var priority = patientArray["CLINICAL_PRIORITY"];	
					
					if (mrsa == "Y") {			
						$("#patient").append('<div id="patientGreen"><a class="patientGreen"><h2>'+ pid + ' - ' + forname + " " + surname + ' - '+dob+' - '+infected+'</a></h2><div>');	
					}
					else if (infected == "Y") {
						$("#patient").append('<div id="patientRed"><h2><a class="patientRed">'+ pid + ' - ' + forname + " " + surname + ' - '+dob+' - '+infected+'</a></h2><div>');	
					}
					else if (risk == "Y") {
						$("#patient").append('<div id="patientYellow"><h2><a class="patientYellow">'+ pid + ' - ' + forname + " " + surname + ' - '+dob+' - '+infected+'</a></h2><div>');	
					}
					else if (risk == "N" && mrsa == "N" && infected == "N") {
						$("#patient").append('<div id="patientWhite"><h2><a class="patient">'+ pid + ' - ' + forname + " " + surname + ' - '+dob+' - '+infected+'</a></h2><div>');
					}
					
					//increment count
					count++;
				}
			}
			// if there is no patients then show a dialog stating there is no
			//patients to be moved
			if (count==0){
				
				$("#display").empty();
				$("#dialog1").empty();
			
			  	$("#dialog1").append("<p>There is patients to move</p>");
			  	
			   
			    $( "#dialog1" ).dialog({
			      modal: true,
			      buttons: {
			        Ok: function() {
			        	console.log("CALLED generateWard()");
			        	//when ok is pressed generate the ward
			        	generateWard(genWard);
			          $( this ).dialog( "close" );
			        }
			      }
			      
			    }).dialog("open");
							
			}
		}
	});
}

//this function will set the patientForMove = true and open
//a dialog with then name of the patient
//when ok is pressed it will show the all the wards and set patientLoaded = true
function generatePatientForMove(fName, sName, id, patientInfected){
console.log("-----------generatePatientForMove function");	
	$("#display").empty();
	patientForMove=true;
	console.log(fName,sName,id,patientInfected);
	$("#dialog1").empty();
  	$("#dialog1").append("<p>Please select the ward to place patient</p><p>"+fName+" "+sName+" </p>");
    $( "#dialog1" ).dialog({
      modal: true,
      buttons: {
        Ok: function() {
        	console.log("CALLED getWards()");
        	getWards();
  			patientLoaded=true;
          $( this ).dialog( "close" );
        }
      }  
    }).dialog("open");
};

//function to post the new ward of the patient to php
//when ok is pressed the ward will be regenerated and 
//patientLoaded will be false
function postToPHP(id,w){
	console.log("-----------postToPHP function");
	
	$id = id;
	$ward = w;
	
	//post to addPatient.php variables $id and $ward
	$.post('PHP/addPatient.php',{postID:$id,postWard:$ward},
	function(data){
	$("#dialog1").empty();
  	$("#dialog1").append("<p>Patient:</p><p> "+patientFname+" "+patientSname+" </p><p>has been placed in</p>");
  	$("#dialog1").append("Ward: "+w);
  	
    $( "#dialog1" ).dialog({
      modal: true,
      buttons: {
        Ok: function() {
     	patientLoaded=false;
     	generateWard(ward);
          $( this ).dialog( "close" );
        }
      }
    }).dialog("open");
	});	
}

//function will decrement the availablity of the ward and call
//incrementOldAvailable()
function changeAvailable(oldWard, available){
	console.log("-----------changeAvailable function");
	$available =available;
	$ward = ward;
	
	//post decremented available to changeAvailable.php
	$.post('PHP/changeAvailable.php',{postAvailable:$available, postWard:$ward},
	function(data){	
	});
	console.log("CALLED incrementoldAvailable");
	incrementoldAvailable();	
}

//this function will increase the availablity of the old ward
function incrementoldAvailable(){
	console.log("-----------incrementoldAvailable function");
	oldAvailable++;
	console.log("CALLED incrementOldWard");
	incrementOldWard(oldAvailable);
}

//function will post the updated old ward availablity
//to php
function incrementOldWard(b){
	
	console.log("-----------incrementOldWard function");
	$old= b;
	$oldWard = oldWard;
	console.log("this is the old ward being incremented"+oldWard, ward)
	
	//post oldAvaialble and oldWard to incrementOldWard.php
	$.post('PHP/incrementOldWard.php',{postOldAvailable:$old, postOldWard:$oldWard},
	function(data){
	});
}

//function will decrement the availablity of the side rooms
//and calls incrementoldSAvailable()
function changeS_Available(oldWard, sAvailable){
	console.log("-----------changeS_Available function");
	$available =sAvailable;
	$oldWard = oldWard;
	$ward = ward;
	
	//post the available and ward variables to changeS_Available.php
	$.post('PHP/changeS_Available.php',{postAvailable:$available, postWard:$ward},
	function(data){	
	});
	console.log("CALLED incrementoldSAvailable");
	incrementoldSAvailable();	
}

//function will increment the oldSavailable variable and call incrementSOldeWard()
function incrementoldSAvailable(){
	console.log("-----------incrementoldSAvailable function");
	oldSavailable++;
	console.log("CALLED incrementSOldWard()");
	incrementSOldWard(oldSavailable);
}
	
//function to post old ward side room availablity to php
function incrementSOldWard(b){
	console.log("-----------incrementSOldWard function");
	
	$old= b;
	$oldWard = oldWard;
	//post SOldAvailable and oldWard to incrementSOldWard.php
	$.post('PHP/incrementSOldWard.php',{postSOldAvailable:$old, postSOldWard:$oldWard},
	function(data){
	});
}

//function to write details of moves to a log file
function writeToFile(id,w, oldWard){
	console.log("-----------writeToFile function");
	
	//assigns local variables
	$id = id;
	$fname = patientFname;
	$sname = patientSname;
	$ward = w;
	$oldWard = oldWard;
	
	
	//post the id, forename, surname and ward to appendFile.php
	$.post('php/appendFile.php',{postID:$id,postfname:$fname,postsname:$sname,postWard:$ward,postOldWard:$oldWard},
	function(data){
	});	

}

//function to write details of moves to a log file
function writeToExcel(id,w,oldWard){
	console.log("-----------writeToExcel function");
	
	$id = id;
	$fname = patientFname;
	$sname = patientSname;
	$ward = w;
	$oldWard = oldWard;
	console.log($id,$fname,$sname,$ward,$oldWard);
	
	//post the id, forename, surname and ward to appendFile.php
	$.post('php/createLogTable.php',{postID:$id,postfname:$fname,postsname:$sname,postWard:$ward,postOldWard:$oldWard},
	function(data){
		
	});	
}


//function to clear the log file by posting to php to create a new file
function emptyFile(){
	console.log("-----------emptyFile function");
	var date = new Date();
	var month = date.getMonth()+1;
	if (month<10){
		month="0"+month;
	}
	var day = date.getDate();	
	if (day<10){
		day="0"+day;
	}
	$output = date.getFullYear() + '-' +
    month + '-' + day;
    
    var theDate = day+"/"+month+"/"+date.getFullYear();
  
	//post the date to createLog if the server date matches the date sent then a 
	//new log is not created
	$.ajax({
		type : "GET",
		url : "php/getTheLastRecord.php",
		success : function(data) { 
			
			var a = $.parseJSON(data)
			var count = 0;		
			for (var b = 0; b < a.length; b++){
				var array = a[b];
				count++;
			}
		var s=array["DATE"];
		if ($output!=s){
			createLog();
		}
		
		}		
	});	
}
function createLog(){
	$.get('PHP/createLog.php',{},function(){
		
	});
}
