function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; 
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; 
}

function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    console.log("Clicked Estimate Price with values: sqft =", sqft, "bhk =", bhk, "bathrooms =", bathrooms, "location =", location);

    var url = "/predict_home_price";

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json', 
        data: JSON.stringify({
            total_sqft: parseFloat(sqft),
            bhk: bhk,
            bath: bathrooms,
            location: location
        }),
        success: function(data) {
            console.log("Response received:", data);
            if (data && data.estimated_price) {
                console.log("Estimated price:", data.estimated_price);
                estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
            } else {
                console.log("Failed to receive valid price from server");
                estPrice.innerHTML = "<h2>Unable to estimate price. Please try again later.</h2>";
            }
        },
        error: function() {
            console.log("Request failed");
            estPrice.innerHTML = "<h2>Failed to get the estimated price. Please try again later.</h2>";
        }
    });
}

function onPageLoad() {
    console.log("Page loaded, fetching location names...");
    var url = "/get_location_names";

    $.get(url, function (data, status) {
        console.log("Got location names:", data);
        if (data && data.locations) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            $('#uiLocations').append(new Option("Select Location", ""));
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        } else {
            console.log("Failed to get locations");
        }
    }).fail(function() {
        console.log("Request failed to get locations");
    });
}

window.onload = onPageLoad;
