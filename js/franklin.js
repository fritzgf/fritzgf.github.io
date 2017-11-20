// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({



            url: "http://api.wunderground.com/api/78335efd30710b80/geolookup/conditions/forecast/q/" + lat + "," + long +
                ".json",
            dataType: "jsonp",
            success: function (data) {
                var cityName = data.location.city;
                var stateName = data.location.state;
                var temp_f = data.current_observation.dewpoint_f;
                var forecastH = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
                var forecastL = data.forecast.simpleforecast.forecastday[0].low.fahrenheit;

                var precipitation = data.current_observation.precip_today_metric;
                var windDir = data.current_observation.wind_dir;
                var windMph = data.current_observation.wind_mph

                var weather = data.current_observation.weather;

                var icon = data.current_observation.icon_url;




                /*   console.log("Current temperature in " + cityName + " is: " + temp_f);*/


                document.getElementById("cityDisplay").innerHTML = cityName + "," + " " + stateName;

                document.getElementById("wind").innerHTML = "Wind" + ":" + " " + windDir;
                document.getElementById("windDirec").innerHTML = "@"+ " " + windMph+ " " + "mph";




                document.getElementById("precipitation").innerHTML = "Precipitation" + ":" +  " " +   precipitation + " %";
                let summary = document.getElementById("summary");
                summary.innerHTML = weather + '<img src="' + icon + '"  alt=" the weather is sunny">';
                console.log(data);

                document.getElementById("highAndLow").innerHTML = "Today's High and Low " + '<br/>' +
                    forecastH + "&#8457";
                document.getElementById("lowAndHigh").innerHTML = forecastL + "&#8457";

                $("#cover").fadeOut(250);

            }
        });

    }

    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});
