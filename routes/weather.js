const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// WeatherAPI configuration
const WEATHER_API_URL = `http://api.weatherapi.com/v1/current.json`;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Weather API route
router.get('/:city', async (req, res) => {
  const { city } = req.params;
  
  try {
    const response = await axios.get(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}&lang="ar"`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

module.exports = router;
