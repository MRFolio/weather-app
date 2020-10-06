import key from "./key.js";

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

let city = "Tartu";

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${city}&appid=${key}&units=metric`;
  try {
    const response = await fetch(urlToFetch);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

getForecast();
