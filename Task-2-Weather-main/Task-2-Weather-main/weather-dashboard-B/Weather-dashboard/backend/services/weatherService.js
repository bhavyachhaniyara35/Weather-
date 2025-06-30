const { makeApiRequest } = require('../utils/apiClient');
const { WEATHER_API_KEY, WEATHER_BASE_URL } = require('../config/env');

const fetchCurrentWeather = async (city) => {
  if (!WEATHER_API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  const url = `${WEATHER_BASE_URL}/weather`;
  const params = {
    q: city,
    appid: WEATHER_API_KEY,
    units: 'metric',
  };

  const data = await makeApiRequest(url, params);
  
  // Process and format the weather data
  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    city: data.name,
    country: data.sys.country,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    pressure: data.main.pressure,
    visibility: (data.visibility / 1000).toFixed(1),
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    uvIndex: data.uvi || 'N/A',
    precipitation: data.rain ? data.rain['1h'] || 0 : 0,
    timestamp: new Date().toISOString(),
  };
};

const fetchForecast = async (city) => {
  if (!WEATHER_API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  const url = `${WEATHER_BASE_URL}/forecast`;
  const params = {
    q: city,
    appid: WEATHER_API_KEY,
    units: 'metric',
  };

  const data = await makeApiRequest(url, params);
  
  // Process hourly forecast
  const hourly = data.list.slice(0, 8).map(item => ({
    dt: item.dt,
    temperature: Math.round(item.main.temp),
    description: item.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    humidity: item.main.humidity,
    windSpeed: Math.round(item.wind.speed),
    precipitation: item.rain ? item.rain['3h'] || 0 : 0,
  }));

  // Process daily forecast
  const daily = data.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 7)
    .map(item => ({
      dt: item.dt,
      maxTemp: Math.round(item.main.temp_max),
      minTemp: Math.round(item.main.temp_min),
      description: item.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed),
      precipitation: item.rain ? item.rain['3h'] || 0 : 0,
    }));

  return {
    hourly,
    daily,
    city: data.city.name,
    country: data.city.country,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  fetchCurrentWeather,
  fetchForecast,
}; 