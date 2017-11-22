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



            url: "https://api.wunderground.com/api/78335efd30710b80/geolookup/conditions/q/" + lat + "," + long +
                ".json",
            dataType: "jsonp",
            success: function (data) {
                var cityName = data.location.city;
                var stateName = data.location.state;
                var temp_f = 
                data.current_observation.dewpoint_f;
                var icon= data.current_observation.icon_url;
                var weather = data.current_observation.weather;
                var humidity = data.current_observation.relative_humidity;
                var wind = data.current_observation.wind_mph;
                var feels_like = data.current_observation.feelslike_f;
               
                console.log("Current temperature in " + cityName + " is: " + temp_f);

             
                document.getElementById("cityDisplay").innerHTML = cityName + "," + " "+ stateName;
                console.log(data);
                document.getElementById("currentTemp").innerHTML = temp_f + " " + "&#8457";
               
                let summary= document.getElementById("summary");
                summary.innerHTML=weather + " " +'<img src= " '+ icon + ' " alt =" the weather is sunny">';            
                document.getElementById("humidity").innerHTML = "Humidity" + " " + humidity;
                document.getElementById("feels_like").innerHTML = "Feels like" + " " + feels_like +"&#8457";
                document.getElementById("wind").innerHTML = "Wind speed" + " " + wind + " " + "mph";


                $("#cover").fadeOut(250);

            }
        });

    }

    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            console.log(data);
        });
    }
});
