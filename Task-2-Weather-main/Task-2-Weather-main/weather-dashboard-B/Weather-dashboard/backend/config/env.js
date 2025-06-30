require('dotenv').config();

const {
  PORT = 5051,
  WEATHER_API_KEY,
  WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5',
} = process.env;

if (!WEATHER_API_KEY) {
  console.error('\n❌ Error: WEATHER_API_KEY is missing!');
  console.error('\nTo fix this:');
  console.error('1. Create a .env file in the backend directory');
  console.error('2. Add the following line to your .env file:');
  console.error('   WEATHER_API_KEY=1ad3d8f5da606b33859a312e52e9d6cc');
  console.error('\nGet your API key from: https://openweathermap.org/api');
  console.error('\nExample .env file:');
  console.error('PORT=5000');
  console.error('WEATHER_API_KEY=your_api_key_here');
  console.error('WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5\n');
  process.exit(1);
}

module.exports = {
  PORT,
  WEATHER_API_KEY,
  WEATHER_BASE_URL,
}; 