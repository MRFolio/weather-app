import yek from "./extra.js";

const container = document.querySelector(".result");
const searchForm = document.getElementById("form");
const userInput = document.getElementById("city");
const bodyClass = document.querySelector("body");
const title = document.querySelector(".title");
const convertBtn = document.querySelector(".convert");

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const getForecast = async (city) => {
  const urlToFetch = `${weatherUrl}?&q=${city}&appid=${yek}&units=metric`;
  try {
    const response = await fetch(urlToFetch);
    const data = await response.json();
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
  const time = date.toLocaleTimeString("en-US", { timeStyle: "short" });
  const dateArray = date.toString().split(" ");
  const dateResult = `<div class="date-time"><span class="date">${dateArray[0]} ${dateArray[1]} ${dateArray[2]}</span><span class="time">, ${time}</span></div>`;
  container.innerHTML = dateResult;
};

function coldClassAdd() {
  bodyClass.classList.add("cold");
  container.classList.add("cold");
}

function removeClassList(element, className) {
  element.classList.remove(className);
}

function coldClassRemove() {
  /* bodyClass.classList.remove("cold");
  container.classList.remove("cold"); */
  removeClassList(bodyClass, "cold");
  removeClassList(container, "cold");
}

const backgroundColorChange = (temp) =>
  temp < 15 ? coldClassAdd() : coldClassRemove();

const titleChange = () => (title.style.display = "none");

const showContainerAndBtn = () => {
  container.classList.add("show");
  convertBtn.classList.add("show");
};

const displayData = async (inputUser) => {
  const { name, temp, country, icon, main } = await getForecast(inputUser);
  getDate();
  const result = `<div class="content">
  <h4 class="city-name">${name}, ${country}</h4><p class="temp">${temp.toFixed(
    1
  )} <span class="degree">°C</span></p></div>
  <div class="city-icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon"><span class="description">${main}</span></div>
  `;
  container.innerHTML += result;
  titleChange();
  showContainerAndBtn();
  backgroundColorChange(temp);
};

const showCity = (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  displayData(input);
  searchForm.reset();
};

const convertF = () => {
  const temp = document.querySelector(".temp");
  const celcius = temp.textContent.slice(0, 3);
  const fahrenheit = ((celcius / 5) * 9 + 32).toFixed(1);
  temp.textContent = `${fahrenheit} °F`;
  convertBtn.classList.remove("show");
};

searchForm.addEventListener("submit", showCity);
convertBtn.addEventListener("click", convertF);
