var object;

$('#query').keyup(function () {
    $("#searchResults").css("display", "block");
    // All code will be inside of this block
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");

    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {



        // Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="https://api.wunderground.com/api/ffbbf1db03d22000/geolookup/conditions/forecast' + val.l + ".json" + '"title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
                object = data;
            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // end each

        //send the results to the page

    }); // end getJSON

}); // end keyup

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();
    console.log('click occured');
    // With the text value get the needed value from the weather.json file
    var index = $(this).index("a");
    var zmw = object.RESULTS[index].zmw;
    getData(zmw);

});



// Get weather data from wunderground.com
function getData(input) {
    // Get the data from the wunderground API
    $.ajax({
        url: "https://api.wunderground.com/api/ffbbf1db03d22000/geolookup/conditions/forecast/q/" +
            input + ".json",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var temp_f = data.current_observation.temp_f;
            var forecastH = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
            var forecastL = data.forecast.simpleforecast.forecastday[0].low.fahrenheit;
            console.log('Location is: ' + location);
            console.log('Temp is: ' + temp_f);
            console.log('forecast High is' + forecastH);
            $("#cityDisplay").text(location);
            $("#highAndLow").text(simpleforecast);
            $("#lowAndHigh").text(simpleforecast);
            $("title").html(location + " | Weather Center");
            $("#currentTemp").html(Math.round(temp_f) + '°');
            /*$("highAndLow").innerHTML = "Today's High and Low " + '<br/>' +
                    forecastH + "&#8457";
            $("lowAndHigh").innerHTML = forecastL + "&#8457";
*/
           
            $("#summary").text(toTitleCase(data.current_observation.icon));
            $("#cover").fadeOut(250);
        }
    });




    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

}
