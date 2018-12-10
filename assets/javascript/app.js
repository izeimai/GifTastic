

// Theme topics array (food)
var topics = ["apple", "banana", "carrot", "doughnut", "eggplant", "pizza", "sushi"]
var searchTerm;

// Generates buttons for each index in topics array
for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("btn btn-info mr-1");
    button.text(topics[i]);
    button.val(topics[i]);
    $("#buttonDisplay").append(button); // appends button to the buttonDisplay div
}

// onclick event handler for buttons
$("button").on("click", function () {
    searchTerm = $(this).val().trim();
    $("#gifDisplay").empty();
    displayGif(); // ajax call
});

// onclick event handler for the gifts (to start and stop)
$("img").on("click", function () {
    // store state and url to local variables
    var state = $(this).attr("gifState");
    var dataStill = $(this).attr("data-still");
    var dataActive = $(this).attr("data-active");
    console.log(state, dataStill, dataActive)
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
        console.log(response);
        for (var j = 0; j < response.data.length; j++) {
            var stillUrl = response.data[j].images.fixed_height_still.url;
            var activeUrl = response.data[j].images.fixed_height.url;
            var gif = $("<img>"); // create image tag
            gif.attr("src", stillUrl); // start off with src being the still version
            gif.attr("gifState", "still"); // and start off with gifState attribute being still
            gif.attr("data-still", stillUrl); // store the still version gif into 'data-still' attribute
            gif.attr("data-active", activeUrl); // store the active version gif into 'data-active' attribute
            gif.attr("alt", "gifimage"); // if gif link breaks, at least I'll see the alternative name text
            $("#gifDisplay").prepend(gif);
        }

    });
}