var searchbar = document.getElementById("myInput");
searchbar.addEventListener("search", function success(main) {
    dataServer(searchbar.value);
})


function dataServer(name) {
    var url = fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=metric&APPID=bae361571622d4eb8454684b20036e73", {
            method: "GET",
        })
        .then(function (response) {
            if (response.ok)
                return response.json()
        })
        .then(function (json) {
            main = json;
            console.log(main);

            success(main)
            showPage()
        })
        .catch(function (error) {
            console.log(error);
        })
}

function success(main) {
    var tempDiv = document.getElementById("temprature");
    var cityDiv = document.getElementById("location");
    var currentWeather = document.getElementById("display");
    var timeSlot = document.getElementById("timingTable");
   
    
    tempDiv.innerHTML = '';
    cityDiv.innerHTML = '';
    currentWeather.innerHTML = '';
    timeSlot.innerHTML = '';



    var city = main.city.name;
    var cityname = document.createElement('h1');
    cityname.innerHTML = city;
   


    var navTime = main.list["0"].dt_txt;
    var timeCurrent = document.createElement('a');
    timeCurrent.innerHTML = navTime

    var temp = main.list[0].main.temp;
    var div = document.createElement('h1');
    div.innerHTML = temp + '°C' + ' ';

    var dec = main.list["0"].weather["0"].main;
    var current = document.createElement('h2');
    current.innerHTML = ' ' + ' | ' + dec ;
    

    tempDiv.appendChild(div);
    cityDiv.appendChild(cityname);
    currentWeather.appendChild(current);


    for (var i = 0; i < 9; i++) {
        var tr = document.createElement('tr');
        var diffrentTime = main.list[i].dt_txt;
        var div = document.createElement('td');
        div.innerHTML = diffrentTime;
        tr.appendChild(div);

        var timeTemp = main.list[i].main.temp;
        var div = document.createElement('td');
        div.innerHTML = timeTemp + '°C';
       tr.appendChild(div);

        var timeWind = main.list[i].wind.speed;
        var div = document.createElement('td');
        div.innerHTML = timeWind + 'm/s';
       tr.appendChild(div);

        var situation = main.list[i].weather[0].main;
        var div = document.createElement('td');
        var icon = setWeatherIcon(situation);
        div.appendChild(icon);
        tr.appendChild(div);
        
timeSlot.append(tr)
    
    }
}
function setWeatherIcon(weather) {
    var icon = document.createElement('i');
    icon.classList.add('wi');
    icon.classList.add('every-day-weather');
    if (weather == 'Clouds') {
      icon.classList.add('wi-day-cloudy');
    }if (weather == 'Rain') {
      icon.classList.add('wi-day-rain');  
    }if (weather == 'Clear') {
      icon.classList.add('wi-day-sunny'); 
    }if (weather == 'Snow') {
      icon.classList.add('wi-day-snow'); 
    }
    return icon;
}


function showPage() {
    document.getElementById("showPage").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
}
