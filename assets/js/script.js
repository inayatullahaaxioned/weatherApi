/* Author: 
Inayatullah
*/
const container = document.querySelector('.weather-container'),
  weatherBox = document.querySelector('.weather-box'),
  search = document.querySelector('.search'),
  form = document.querySelector('.form'),
  submitBtn = document.querySelector('.submit-btn'),
  section = document.querySelector('.weather');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const key = search.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${key}&appid=0ed9043796b6da0760c67c4f9a09071d&units=metric`;
  fetch(url)
    .then(function (response) {
      if (response.status == 404) {
        throw ('City not found');
      }
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (response) {
      getData(response);
    })
    .catch(function (error) {
      let spanError = document.createElement('div'),
        inputBox = document.querySelector('.input');
      spanError.className = "not-found";
      spanError.innerText = "City not found";
      weatherBox.remove();
      section.className = "weather";
      inputBox.appendChild(spanError);
    })
});

//function for data append start
function getData(result) {
  weatherBox.className = "weather-box";
  section.className = "weather";
  const notFound = document.querySelector('.not-found');
  if (notFound) {
    notFound.remove();
  }
  weatherBox.innerHTML = `<div class="weather-data">
      <span class="degree">${result.main.temp}<sup>°C</sup></span>
      <div class="data">
        <h2>${result.name}</h2>
        <span class="date">${new Date()}</span>
      </div>
      <div class="temp">
        <figure><img src="http://openweathermap.org/img/wn/${result.weather[0].icon}.png" alt="Weather Icon">
          <figcaption class="weather-name">${result.weather[0].main}</figcaption>
        </figure>
      </div>
    </div>
    <div class="weather-details">
      <h3>Weather Details</h3>
      <ul class="detail-list">
        <li class="detail">
          <h5 class="weather-name">Feels Like</h5>
          <span>${result.main.feels_like}<sup>°C</sup></span>
        </li>
        <li class="detail">
          <h5 class="weather-name">Max Temp</h5>
          <span>${result.main.temp_max}<sup>°C</sup></span>
        </li>
        <li class="detail">
          <h5 class="weather-name">Min Temp</h5>
          <span>${result.main.temp_min}<sup>°C</sup></span>
        </li>
        <li class="detail">
          <h5 class="weather-name">Humidity</h5>
          <span>${result.main.humidity}%</span>
        </li>
        <li class="detail">
          <h5 class="weather-name">Wind</h5>
          <span>${result.wind.speed}Km/h</span>
        </li>
      </ul>
    </div>`
  weatherBox.classList.add(`${result.weather[0].main.toLowerCase()}`);
  section.classList.add(`${result.weather[0].main.toLowerCase()}`);
  console.log(`${result.weather[0].main}`);
  container.appendChild(weatherBox);
};
//function for data append end