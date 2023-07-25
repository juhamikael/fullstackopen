import axios from "axios";

const getWeather = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const baseUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=metric`;

  
  const response = await axios.get(baseUrl);

  return response.data;
};

export { getWeather };
