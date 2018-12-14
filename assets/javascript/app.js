

// Theme topics array (food)
var topics = ["apple", "banana", "carrot", "doughnut", "eggplant", "pizza", "sushi"]
var searchTerm;

function makeButtons() {
    // Generates buttons for each index in topics array
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info mr-1");
        button.text(topics[i]);
        button.val(topics[i]);
        $("#buttonDisplay").append(button); // appends button to the buttonDisplay div
    }
}

makeButtons(); // default

// onclick event handler for submit button
$("#submitButton").on("click", function () {
    // event.preventDefault(); // prevents the submit button default behavior but didn't need it here
    var newTopic = $("#form").val().trim();
    if (!topics.includes(newTopic)) { // won't add a new button if the newTopic is already in the topics array
        topics.push(newTopic); // adding the new topic from the form to the topics array
        $("#buttonDisplay").empty(); // remove the previous buttons
        makeButtons(); // display the new updated array for buttons
    } else {
        alert("You already have this topic displayed")
    }
});


// onclick event handler for buttons
$(document).on("click", "button", function () { // needs to be document because my buttons change if form is entered
    searchTerm = $(this).val().trim();
    $("#gifDisplay").empty();
    displayGif(); // ajax call
});

// onclick event handler for the gifts (to start and stop)
$(document).on("click", "#gif", function () {
    // store state and url to local variables
    var state = $(this).attr("gifState");
    var dataStill = $(this).attr("data-still");
    var dataActive = $(this).attr("data-active");

    if (state == "still") { // from still to active
        $(this).attr("src", dataActive);
        $(this).attr("gifState", "active")
    } else { // active to still
        $(this).attr("src", dataStill);
        $(this).attr("gifState", "still")
    }
});


function displayGif() {
    // URL format // WglqBM8Efyi3PduzHHOCmsshRvMJ8Sep
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WglqBM8Efyi3PduzHHOCmsshRvMJ8Sep&q=" + searchTerm + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var j = 0; j < response.data.length; j++) { //each gif
            var stillUrl = response.data[j].images.fixed_height_still.url;
            var activeUrl = response.data[j].images.fixed_height.url;
            var rating = response.data[j].rating;
            var gif = $("<img>"); // create image tag
            gif.attr("id", "gif"); // adding an id of gif
            gif.attr("src", stillUrl); // start off with src being the still version
            gif.attr("gifState", "still"); // and start off with gifState attribute being still
            gif.attr("data-still", stillUrl); // store the still version gif into 'data-still' attribute
            gif.attr("data-active", activeUrl); // store the active version gif into 'data-active' attribute
            gif.attr("alt", "gifimage"); // if gif link breaks, at least it'll show the alternative name text

            // Putting together the gif with the rating and prepending to gifDisplay
            var card = $("<div>");
            card.addClass("card img-fluid"); // adding class for card 
            card.append(gif);
            card.append("<p>Rating: " + rating + "</p>");
            $("#gifDisplay").prepend(card);
        } // close for loop for each gif

    }); // close AJAX call
}