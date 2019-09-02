//allow user to set a custom unit of time
var setTimeUnit = function(timeUnit){
	//NOTE: remove later
	alert(timeUnit.value);
	//get a list of all columns with the col-timeline classname
	var columns = document.getElementsByClassName("col-timeline");
	//iterate through our list and assign them a new timeUnit attribute
	//based on user input
		for (var i = 0; i < columns.length; i++) {
	    console.log(columns[i]);
			//NOTE: remove later
			alert(columns[i].id);
	    columns[i].setAttribute("data-timeUnit", timeUnit.value);
	}
}

$(document).ready(function(){
//allow users to open and close the "custom unit of time" selection menu
	$("#timeUnitButton").click(function(){
		$(".timeUnitContainer").toggle();
	}
);

});
