const apidetails = {
    geocoding_api: "http://api.openweathermap.org/geo/1.0/direct?",
    key: "35661353de63618c88de50d7692bc34f",
    weather_api: "http://api.openweathermap.org/data/2.5/forecast?"
}
var search = document.getElementById("searchInput");
search.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        console.log(search.value);
        ladlong(search.value);
    }
});

function ladlong(city) {
    fetch(`${apidetails.geocoding_api}q=${city}&limit=1&appid=${apidetails.key}&units=metric`).then(loccoords => {
        return loccoords.json();
    }).then(extractor).then(weatherreport);
}
function extractor(loccoords) {
    console.log(loccoords);
    const name = loccoords[0].name;
    const country = loccoords[0].country;
    const latitude = loccoords[0].lat;
    const longitude = loccoords[0].lon;
    console.log(name);
    console.log(country);
    console.log(latitude);
    console.log(longitude);
    document.getElementById("city").innerHTML = `&#128205; ${name} , ${country}`;
    return loccoords;
}

function weatherreport(loccoords) {
    const latitude = loccoords[0].lat;
    const longitude = loccoords[0].lon;
    fetch(`${apidetails.weather_api}lat=${latitude}&lon=${longitude}&appid=${apidetails.key}&units=metric`).then(showreport => {
        return showreport.json();
    }).then(reports);
}
function reports(showreport) {
    console.log(showreport);
    var temptoday = Math.trunc(showreport.list[0].main.temp);
    var mintemp = Math.floor(showreport.list[0].main.temp_min);
    var maxtemp = Math.ceil(showreport.list[0].main.temp_max);
    var windsp = Math.round((showreport.list[0].wind.speed) * 360) / 100;
    var humid = showreport.list[0].main.humidity;
    var weathertype = showreport.list[0].weather[0].main;
    if (weathertype == "Clouds") {
        document.getElementById(`icon`).innerHTML = `&#x26C5;`
        document.getElementById(`icon`).style.color = "gray";
        document.body.style.backgroundImage = "url('clouds.jpg')";
    }
    else if (weathertype == "Rain") {
        document.getElementById(`icon`).innerHTML = `&#x2614;`;
        document.getElementById(`icon`).style.color = "skyblue";
        document.body.style.backgroundImage = "url('rainy2.jpg')";
        document.getElementsByClassName(`items`).style.color=`white`;
    }
    else if (weathertype == "Clear") {
        document.getElementById(`icon`).innerHTML = `&#x2600;`;
        document.getElementById(`icon`).style.color = "yellow";
        document.body.style.backgroundImage = "url('sunny.jpg')";
    }
    document.getElementById("today").innerHTML = `${temptoday}&deg;C`;
    document.getElementById("minmax").innerHTML = `${mintemp}&deg;C / ${maxtemp}&deg;C`;
    document.getElementById("humidity").innerHTML = `Humidity: ${humid}%`;
    document.getElementById("wind-speed").innerHTML = `Wind-Speed: ${windsp} Km/h`;
    document.getElementById("weather-type").innerHTML = `${weathertype}`;
    for (i = 1; i <= 7; i++) {
        var str = String.fromCharCode(i + 98);
        var forecast = Math.trunc(showreport.list[i].main.temp);
        var minforecast = Math.floor(showreport.list[i].main.temp_min);
        var maxforecast = Math.ceil(showreport.list[i].main.temp_max);
        var typeofw = showreport.list[i].weather[0].main;
        document.getElementById(`${str}2`).innerHTML = `${forecast}&deg;C`;
        document.getElementById(`${str}3`).innerHTML = `${minforecast}&deg;C / ${maxforecast}&deg;C`;
        document.getElementById(`${str}4`).innerHTML = `${typeofw}`;
        if (typeofw == "Clouds") {
            document.getElementById(`${str}1`).innerHTML = `&#x2601;`
            document.getElementById(`${str}1`).style.color = "#a49595"
        }
        else if (typeofw == "Clear") {
            document.getElementById(`${str}1`).innerHTML = `&#x2600;`;
            document.getElementById(`${str}1`).style.color = "yellow";
        }
        else if (typeofw == "Rain") {
            document.getElementById(`${str}1`).innerHTML = `&#x1F327;`;
            document.getElementById(`${str}1`).style.color = "skyblue";
            document.getElementsByClassName(`items`).style.color=`white`;
        }

    }
    timemaker();



}
function timemaker() {
    let now = new Date();
    console.log(now);
    let dayofw = now.getDay();
    console.log(dayofw);
    let month = now.getMonth();
    let day = now.getDate();
    let hours = now.getHours();
    let mins = now.getMinutes();
    let ampm = "AM"
    if (hours > 12) {
        ampm = "PM";
        hours = hours - 12;
    }
    else if (hours == 12) {
        ampm = "PM";
    }
    else {
        ampm = "AM";
    }

    if (mins < 10) {
        mins = "0" + mins;
    }
    let dayarray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let montharray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById("date").innerHTML = `${montharray[month]} ${day}, ${dayarray[dayofw]}`;
    document.getElementById("time").innerHTML = `${hours}:${mins} ${ampm}`;
    var temp = dayofw;
    for (i = 1; i <= 7; i++) {
        var str = String.fromCharCode(i + 98);
        if (temp >= 6) {
            temp = temp - 7;
            document.getElementById(`${str}0`).innerHTML = dayarray[temp + 1];
        }
        else {
            document.getElementById(`${str}0`).innerHTML = dayarray[temp + 1];
        }
        temp++;
    }
}

