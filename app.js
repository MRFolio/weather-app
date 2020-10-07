import key from "./key.js";

const container = document.querySelector(".result");
const userInput = document.getElementById("city");

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const getForecast = async (city) => {
  const urlToFetch = `${weatherUrl}?&q=${city}&appid=${key}&units=metric`;
  try {
    const response = await fetch(urlToFetch);
    const data = await response.json();
    const { name } = data;
    const { temp } = data.main;
    return { name, temp };
  } catch (error) {
    console.log(error);
  }
};

const displayData = async () => {
  /* const fetchData = getForecast(userInput.value); */
  const fetchData = await getForecast("Tartu");

  console.log(fetchData);
  /* const result = `<h4 class="city-name">${name}</h4>
<div class="city-icon"></div>
<div class="content">Temperature is ${main.temp} </div>`;
  container.innerHTML = result */
};

displayData();

/* const tere = (tere2) => {
  const tere3 = getForecast("Tartu");
  console.log(tere3);
};
tere(); */
/* userInput.addEventListener("submit", (e) => {
  e.preventDefault();
  displayData();
}); */
