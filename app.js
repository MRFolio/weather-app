import key from "./key.js";

const container = document.querySelector(".result");
const userInput = document.getElementById("city");

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const getForecast = async (city) => {
  const urlToFetch = `${weatherUrl}?&q=${city}&appid=${key}&units=metric`;
  try {
    const response = await fetch(urlToFetch);
    const data = await response.json();
    console.log(data);
    const { name, main: { temp }, wind: { speed }, weather: [{ icon, main }] } = data
    return { name, temp, speed, icon, main };
  } catch (error) {
    console.log(error);
  }
};

const displayData = async (city) => {
  const { name, temp, speed, icon, main } = await getForecast(city);
 /*  const date = new Date();
  const string = date.toString();
  const dateArray = string.split(" ")
  const dateDisplayText = dateArray.slice(0,5)
  console.log(dateDisplayText); */
  const result = `<h4 class="city-name">${name}</h4>
  <div class="content"><p>Temperature is ${temp.toFixed(1)} &#8451</p></div>
  <div class="city-icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon"><p>Condition: ${main}</p><p>Wind Speed: ${speed} m/s</p></div>
  `;
  container.innerHTML = result;
  getDate();
};

userInput.addEventListener("input", (e) => {
  e.preventDefault();
  const inputCity = e.target.value.trim();
  displayData(inputCity);
});



const getDate = () => {
  const date = new Date();
  const result = date.toLocaleTimeString([], {timeStyle: 'short'});
  /* const result2 = date.toLocaleDateString()
  const result3 = date.toLocaleString()
  console.log(result3);
  console.log(result2);
  console.log(result);const now = date.getDate();
  console.log(now);
  console.log(date);
  const string = date.toString();
  const dateArray = string.split(" ")
  const dateDisplayText = dateArray.slice(0,5) */
  container.innerHTML += date;
  console.log(dateDisplayText);

}

