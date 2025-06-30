const express = require('express');
const { getCurrentWeather, getForecast } = require('../controllers/weatherController');

const router = express.Router();

// Get current weather for a city
router.get('/current/:city', getCurrentWeather);

// Get weather forecast for a city
router.get('/forecast/:city', getForecast);

module.exports = router; 