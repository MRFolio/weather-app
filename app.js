const openWeatherKey = "75eb612d588ade5eca1053da5b38275c";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

/* const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${city}&appid=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}; */

getForecast();
