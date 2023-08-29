// Import the API key correctly
import { myApi } from './api.js';

// Get the API key
const apiKey = myApi();

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    weatherReport(data);
                })
                .catch((error) => {
                    console.error("Error fetching weather data: ", error);
                });
        });
    }
});

// Search button click event
document.getElementById('search').addEventListener('click', () => {
    var place = document.getElementById('input').value;
    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;

    fetch(urlsearch)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            weatherReport(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data: ", error);
        });
});

// Handle Enter key press in the input field
document.getElementById('input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        // Simulate a click on the search button when Enter is pressed
        document.getElementById('search').click();
    }
});

function weatherReport(data) {
    var urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}`;

    fetch(urlcast)
        .then((res) => res.json())
        .then((forecast) => {
            console.log(forecast);
            hourForecast(forecast);
            dayForecast(forecast);

            // City
            document.getElementById('city').innerText = forecast.city.name + ', ' + forecast.city.country;

            // Day
            const timestamp = forecast.list[0].dt * 1000; // Use the first forecasted time
            const date = new Date(timestamp);

            // Format options for date and time
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };

            // Format the date and time
            const formattedDate = date.toLocaleString('en-US', options);

            // Update the content of the <h3> element
            const h3Element = document.getElementById('day');
            h3Element.textContent = formattedDate;

            // Temperature
            document.getElementById('temperature').innerText = Math.floor(forecast.list[0].main.temp - 273) + '°C';

            // Clouds
            document.getElementById('clouds').innerText = forecast.list[0].weather[0].description;

            // Icons
            let icon = forecast.list[0].weather[0].icon;
            let iconurl = "https://api.openweathermap.org/img/w/" + icon + ".png";
            document.getElementById('img').src = iconurl;
        })
        .catch((error) => {
            console.error("Error fetching forecast data: ", error);
        });
}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = '';
    for (let i = 0; i < 5; i++) {
        let date = new Date(forecast.list[i].dt * 1000);

        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');

        let time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = (date.toLocaleTimeString(undefined, { timeZone: 'Africa/Nairobi' })).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + '°C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273) + '°C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast) {
    document.querySelector('.weekF').innerHTML = '';

    for (let i = 8; i < forecast.list.length; i += 8) {
        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecast.list[i].dt * 1000).toLocaleDateString(undefined, { timeZone: 'Africa/Nairobi' });
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + '°C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273) + '°C';
        div.appendChild(temp);

        let description = document.createElement('p');
        description.setAttribute('class', 'description');
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div);
    }
}
