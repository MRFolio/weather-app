import key from "./key.js";

const container = document.querySelector(".result");
const userInput = document.getElementById("city");
const bodyClass = document.querySelector("body");

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const getForecast = async (city) => {
  const urlToFetch = `${weatherUrl}?&q=${city}&appid=${key}&units=metric`;
  try {
    const response = await fetch(urlToFetch);
    const data = await response.json();
    console.log(data);
    const {
      name,
      main: { temp },
      sys: { country },
      weather: [{ icon, main }],
    } = data;
    return { name, temp, country, icon, main };
  } catch (error) {
    console.log(error);
  }
};

const getDate = () => {
  const date = new Date();
  const result = date.toLocaleTimeString([], { timeStyle: "short" });
  const string = date.toString();
  const dateArray = string.split(" ");
  const dateDisplayText = dateArray.slice(0, 5);
  const res = `<div class="date-time"><span class="date">${dateDisplayText[0]} ${dateDisplayText[1]} ${dateDisplayText[2]}</span><span class="time">, ${result}</span></div>`;
  container.innerHTML = res;
};

const backgroundColor = (temp) => {
  if (temp < 15) {
    bodyClass.classList.add("cold");
    container.classList.add("cold");
  } else {
    container.classList.remove("cold");
    bodyClass.classList.remove("cold");
  }
};

const displayData = async (city) => {
  const { name, temp, country, icon, main } = await getForecast(city);
  getDate();
  const result = `<div class="content">
  <h4 class="city-name">${name}, ${country}</h4><p class="temp">${temp.toFixed(
    1
  )} <span class="degree">&#8451</span></p></div>
  <div class="city-icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon"><span class="description">${main}</span></div>
  `;
  container.innerHTML += result;
  container.classList.add("show");
  backgroundColor(temp);
};

function showCity(e) {
  e.preventDefault();
  const inputCity = e.target.value.trim();
  displayData(inputCity);
}

userInput.addEventListener("input", showCity);
