//allow user to set a custom unit of time
var setTimeUnit = function(timeUnit){
	//get a list of all columns with the col-timeline classname
	var columns = document.getElementsByClassName("col-timeline");
	//iterate through our list and assign them a new timeUnit attribute
	//based on user input
		for (var i = 0; i < columns.length; i++) {
	    console.log(columns[i]);
	    columns[i].setAttribute("data-timeUnit", timeUnit.value);
	}
	//change the unit of time in the "Event Time:" textbox
		$("#eventTimeInput").val("How many " +
			$("#timeUnitInput").val() + "?");
}

//adds new events to the timeline in descending chronological order
var addEvent = function(eventName){
	//check that the user has typed a valid integer into the "Event Time" textbox
	if ($.isNumeric($("#eventTimeInput").val()))
	{
	//if so, check that the event name is not blank (or equal to the alert)
		if (!$.isEmptyObject($("#eventNameInput").val()) && $("#eventNameInput").val() !== "Enter a Name!"){
		//if not, start creating the event
		//create a new row to contain the event
		createRow();
		//if "Left" checked, insert event on the left column
		if(document.getElementById("leftRightLeft").checked){
			//should read like: "Event Name - x Unit of Time"
			cell1.innerHTML = eventName.value
			+ " - " + $("#eventTimeInput").val() + " "
			 + $("#timeUnitInput").val();
		}
		//or insert on the right
		else if(!document.getElementById("leftRightLeft").checked){
			//should read like: "Event Name - x Unit of Time"
			cell3.innerHTML = eventName.value
			+ " - " + $("#eventTimeInput").val() + " "
			 + $("#timeUnitInput").val();
		}
		//lol fill this with something reasonable later
		cell2.innerHTML = "o";
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
		alert ("There has been an error! We can't figure out if this is a number or not! Since we're suspicious you may be some kind of 4th-dimensional Eldritch being, please get in contact with the creator of this program immediately and smooch her!");
	}
}

var createRow = function(){
	var table = document.getElementById("table1");
	var row = table.insertRow(-1);
	row.id = "row" + $(".col1").attr("data-rowAmount");
	alert(row.id);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
}

var sortEvents = function(){

}

$(document).ready(function(){
//allow users to open and close the "custom unit of time" selection menu
	$("#timeUnitButton").click(function(){
		$(".timeUnitContainer").toggle();
	}
);
	$("#addEventButton").click(function(){
		$(".addEventContainer").toggle();
	}
);
	$("#eventTimeInput").val($("#eventTimeInput").val() +
		$("#timeUnitInput").val() + "?");
});
