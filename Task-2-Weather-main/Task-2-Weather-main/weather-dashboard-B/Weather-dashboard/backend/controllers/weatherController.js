const { fetchCurrentWeather, fetchForecast } = require('../services/weatherService');
const { ApiError } = require('../utils/apiClient');

const getCurrentWeather = async (req, res, next) => {
  try {
    const { city } = req.params;
    
    if (!city) {
      throw new ApiError('City parameter is required', 400);
    }

    const weatherData = await fetchCurrentWeather(city);
    res.json(weatherData);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ 
        error: error.message,
        status: error.statusCode 
      });
    } else {
      console.error('Error fetching current weather:', error);
      next(error);
    }
  }
};

const getForecast = async (req, res, next) => {
  try {
    const { city } = req.params;
    
    if (!city) {
      throw new ApiError('City parameter is required', 400);
    }

    const forecastData = await fetchForecast(city);
    res.json(forecastData);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ 
        error: error.message,
        status: error.statusCode 
      });
    } else {
      console.error('Error fetching forecast:', error);
      next(error);
    }
  }
};

module.exports = {
  getCurrentWeather,
  getForecast,
}; 