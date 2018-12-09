

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

$("button").on("click", function () {
    searchTerm = $(this).val().trim();
    $("#gifDisplay").empty();
    displayGif(); // ajax call
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
            var imageUrl = response.data[j].images.fixed_height_still.url;
            console.log(imageUrl);
            var gif = $("<img>");
            gif.attr("src", imageUrl);
            gif.attr("alt", "gif image");
            $("#gifDisplay").prepend(gif);
        }

    });
}