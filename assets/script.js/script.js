// Change the buttons!!!!!!! Pick A Topic!!!
var buttons = ["Overwatch", "Resident Evil 5", "GTA V", "Battlefield 1", "Call of Duty", "Dishonored"];
var request = "";
var gData = false;
var imageArray = [];

var apiCall = function() {

	request = this.value;
	var queryURL = "https://api.giphy.com/v1/gifs/search?&limit=10&api_key=46bafe89ff3a4d47bf9a382d6a0e1005&q=" + request ;

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
		$(".gif").empty();


	  	var newGif = $("<div class='gif'>");

	  	gData = response;

	  	for(i = 0; i < gData.data.length; i ++) {

	  		var imgURL = gData.data[i].images.original_still.url;
	  		var image = $("<img>").addClass("still").attr("src", imgURL).val(gData.data[i].images);
	  		newGif.append(image);
	  		var rating = gData.data[i].rating;
	  		var h1Temp = $("<h1>").text("Rating: " + rating);
	  		newGif.append(h1Temp);
			$("#stuffDisplay").prepend(newGif);
	  	}
	});
}

var makeButtons = function() {
	$("#btnDisplay").empty();
	for (var i = 0; i < buttons.length; i++) {
		var choice = $("<button>");
	  	choice.addClass("button");
	  	choice.attr("value", buttons[i]);
	  	choice.text(buttons[i]);
		$("#btnDisplay").append(choice);
	}
}

$("#submit").on("click", function(event) {
	event.preventDefault();
	var choice = $("#textValue").val().trim();
	$("#textValue").val("");
	buttons.push(choice);
	makeButtons();
});
var animate = function() {
	var tempVal = $(this).val();
	$(this).attr("src", tempVal.original.url);
	$(this).attr("class", "animated");
}
var freeze = function() {
	var tempVal = $(this).val();
	$(this).attr("src", tempVal.original_still.url);
	$(this).attr("class", "still");
}

$(document).on("click", "button", apiCall);
$(document).on("click", ".still", animate);
$(document).on("click", ".animated", freeze);

makeButtons();