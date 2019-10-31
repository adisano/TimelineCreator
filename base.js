var dateArray = new Array();
var cellArray = new Array();

//allow user to set a custom unit of time
var setTimeUnit = function(timeUnit){
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


var addEvent = function(eventName){
	var table = document.getElementById("table1");
	//create a new row to contain the event
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	//create containers for the event delete button, name, date, description, and
	//description accordion button
	var div0 = document.createElement("div");
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var div3 = document.createElement("div");
	var div4 = document.createElement("div");
	cell1.appendChild(div0);
	cell1.appendChild(div1);
	cell1.appendChild(div2);
	cell1.appendChild(div3);
	cell1.appendChild(div4);

	cellArray.push(cell1);
	//placeholder text
	//indicates the center of the timeline
	cell2.innerHTML = "o";
	addEventContents(cell1, cell2, eventName);
}

var addEventContents = function(cell1, cell2, eventname){
	//event deletion button
	createDeleteButton(cell1);
	//time/date container
	cell1.childNodes[1].innerHTML = $("#timeUnitInput").val() + " " + $("#eventTimeInput").val();
	//event name container
	var div = cell1.childNodes[2];
	div.innerHTML = eventname.value;
	createEditBox(div);
	 dateArray.push($("#eventTimeInput").val());
	 if (dateArray.length > 1){
	 orderEvents();
	 }
	 else{}
}

var createDeleteButton = function(cell){
	var eventDelete = document.createElement("button");
	eventDelete.classList.add("btn", "btn-small", "btn-primary");
	eventDelete.innerHTML = "Delete";
	cell.childNodes[0].appendChild(eventDelete);
	eventDelete.addEventListener("click", function(){
		var index = cellArray.indexOf(this.parentNode.parentNode);
		cellArray.splice(index, 1);
		dateArray.splice(index, 1);
		this.parentNode.parentNode.parentNode.remove();
	});
}

var createEditBox = function(div){
	div.addEventListener("click", function(){
		var content = div.innerHTML;
		var txt = document.createElement("INPUT");
		txt.setAttribute("type", "text");
		txt.setAttribute("placeholder", div.innerHTML);
		var parent = div.parentNode;
		parent.replaceChild(txt, div);
		createSubmitButton(txt, parent);
	});
}

var createSubmitButton = function(txt, parent){
	var submitTxt = document.createElement("button");
	submitTxt.classList.add("btn", "btn-small", "btn-primary");
	submitTxt.innerHTML = "Submit";
	parent.appendChild(submitTxt);
	submitTxt.addEventListener("click", function(){
		if (txt.value != ""){
		var div = document.createElement("div");
		createEditBox(div);
		div.innerHTML = txt.value;
		parent.replaceChild(div, txt);
		this.remove();
		}
	})
}

//re-orders event text in ascending order
var orderEvents = function(){
	var x;
	var y;
	//iterate through dateArray from end to beginning
	for (i = dateArray.length; i > 1; i--){
		x = i - 1;
		y = i - 2;
		if (Number(dateArray[x]) < Number(dateArray[y])){
			//repeat once for every child node you want to swap between cells
			//NOTE: i can fix this number so it's not hard-coded
			for(z = 0; z <= 4; z++){
				var nodeType = "div";
				swapNodes(cellArray[x].childNodes[z], cellArray[y].childNodes[z], nodeType);
			}
			swapArray(x, y, dateArray);
		}
		else{}
	}
}

var swapNodes = function(node1, node2, nodetype){
	// create marker element and insert it where obj1 is
	var temp = document.createElement(nodetype);
	node1.parentNode.insertBefore(temp, node1);
	// move obj1 to right before obj2
	node2.parentNode.insertBefore(node1, node2);
	// move obj2 to right before where obj1 used to be
	temp.parentNode.insertBefore(node2, temp);
	// remove temporary marker node
	temp.parentNode.removeChild(temp);
}

var swapArray = function(x, y, array){
	var temp = array[x];
	array[x] = array[y];
	array[y] = temp;
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
