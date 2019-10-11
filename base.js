//allow user to set a custom unit of time
var setTimeUnit = function(timeUnit){
	/* NOTE: REMOVE
	//get a list of all columns with the col-timeline classname
	var columns = document.getElementsByClassName("col-timeline");
	//iterate through our list and assign them a new timeUnit attribute
	//based on user input
		for (var i = 0; i < columns.length; i++) {
	    console.log(columns[i]);
	    columns[i].setAttribute("data-timeUnit", timeUnit.value);
	}
	*/
	//change the unit of time in the "Event Time:" textbox
		$("#eventTimeInput").val("How many " +
			$("#timeUnitInput").val() + "s?");
}

//checks input fields for valid input, alerts user if necessary, otherwise
//adds new events to the timeline in descending chronological order
var checkFields = function(eventname){
	//check that the user has typed a valid integer into the "Event Time" textbox
	if ($.isNumeric($("#eventTimeInput").val()))
	{
	//if so, check that the event name is not blank (or equal to the alert)
		if (!$.isEmptyObject($("#eventNameInput").val()) && $("#eventNameInput").val() !== "Enter a Name!"){
		//if not, start creating the event
		addEvent(eventname)
		}
		else if ($.isEmptyObject($("#eventNameInput").val())){
			//if so, alert the user to create a name
			$("#eventNameInput").val("Enter a Name!");
		}
	}
	//alert the user to enter a valid number if they enter a string,etc.
	else if (!$.isNumeric($("#eventTimeInput").val()))
	{
		$("#eventTimeInput").val("Enter a number!");
			//check if the user has entered a name, and alert them to enter one if not
			if ($.isEmptyObject($("#eventNameInput").val())){
				$("#eventNameInput").val("Enter a Name!");
			}
	}
	else
	{
		alert ("Error: invalid number");
	}
}

var cellOrderArray = new Array();

var addEvent = function(eventName){
	var table = document.getElementById("table1");
	//create a new row to contain the event
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	//placeholder text
	//indicates the center of the timeline
	cell2.innerHTML = "o";
	cellOrderArray.push(cell1);
	addEventContents(cell1, eventName);
}

var addRow = function() {
	var table = document.getElementById("table1");
	//create a new row to contain the event
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell2.innerHTML = "o";
	cellOrderArray.push(cell1);
}

var eventOrderArray = new Array();

var addEventContents = function(cell, eventname){
	cell.innerHTML = eventname.value
	+ ": " + $("#timeUnitInput").val() + " " + $("#eventTimeInput").val();
	 eventOrderArray.push($("#eventTimeInput").val());
	 orderEvents();
}

//re-orders event text in ascending order based on the eventTimeInput value
var orderEvents = function(){
	var i;
	var x;
	var temp;
	if (eventOrderArray.length >= 2){
		for (i = eventOrderArray.length; i > 0; i--) {
 			x = i - 1;
			if (Number(eventOrderArray[i]) < Number(eventOrderArray[x])){
				temp = eventOrderArray[x];
				eventOrderArray[x] = eventOrderArray[i];
				eventOrderArray[i] = temp;
				temp = cellOrderArray[x].innerHTML;
				cellOrderArray[x].innerHTML = cellOrderArray[i].innerHTML;
				cellOrderArray[i].innerHTML = temp;
			}
			else{}
		}
	}
}

//text generation, for the user to copy to "save" their progress
var exportText = function(){
	var text = "";
	for (i = 0; i < eventOrderArray.length; i++) {
		text += (cellOrderArray[i].innerHTML) + "\n"
	}
	document.getElementById("textarea").innerHTML = text.slice("\n", -1);
}

var importText = function(){
	var textArray = document.getElementById("textarea").value.split("\n");
	if (textArray.length > cellOrderArray.length){
		for (i = cellOrderArray.length; i < textArray.length; i++) {
			addRow();
		}
	}
	for (i = 0; i < cellOrderArray.length; i++) {
		cellOrderArray[i].innerHTML = textArray[i];
	}
}

//accordion animations animated-panel


var acc = document.getElementsByClassName("accordion");
var a;

for (a = 0; a < acc.length; a++) {
  acc[a].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

$(document).ready(function(){
	$("#eventTimeInput").val($("#eventTimeInput").val() +
		$("#timeUnitInput").val() + "s?");
});
