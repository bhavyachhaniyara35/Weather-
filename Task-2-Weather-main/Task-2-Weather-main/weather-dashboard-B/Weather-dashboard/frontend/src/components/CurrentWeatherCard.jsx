import React from 'react';
import WeatherIcon from './WeatherIcon';

const CurrentWeatherCard = ({ weatherData }) => {
  // Determine background gradient based on weather condition and time of day
  const getWeatherClass = () => {
    const condition = (weatherData.condition || weatherData.description || '').toLowerCase();
    const hours = new Date().getHours();
    const isNighttime = hours < 6 || hours > 18;
    
    if (isNighttime) return 'night-theme';
    if (condition.includes('clear') || condition.includes('sun')) return 'sunny-theme';
    if (condition.includes('cloud')) return 'cloudy-theme';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy-theme';
    if (condition.includes('storm') || condition.includes('thunder')) return 'stormy-theme';
    return 'default-theme';
  };
  
  // Get a contextual description about the weather
  const getWeatherContext = () => {
    const temp = Math.round(weatherData.temperature);
    const condition = (weatherData.condition || weatherData.description || '').toLowerCase();
    
    if (temp > 30) return 'Very hot today. Stay hydrated!';
    if (temp > 25) return 'Perfect weather for outdoor activities';
    if (temp > 18) return 'Pleasant temperatures today';
    if (temp > 10) return 'A bit cool today, bring a light jacket';
    if (temp <= 10) return 'Cold weather today, bundle up!';
    return '';
  };
  
  return (
    <div className={`weather-card current-weather-card ${getWeatherClass()}`}
      style={{boxShadow: '0 8px 32px rgba(127,90,240,0.15)', borderRadius: '2rem', border: '1.5px solid #7f5af0', background: 'rgba(255,255,255,0.08)', color: '#fff', backdropFilter: 'blur(8px)'}}>
      <div className="current-weather-content">
        <div className="location">
          <i className="location-icon"></i>
          <h2>{weatherData.city || weatherData.location}</h2>
          <p className="last-updated">Updated just now</p>
        </div>
        <div className="current-weather-main">
          <WeatherIcon condition={weatherData.condition || weatherData.description} size="large" className="main-weather-icon" />
          <div className="temperature-container">
            <h1 className="temperature">{Math.round(weatherData.temperature)}°</h1>
            <p className="condition">{weatherData.condition || weatherData.description}</p>
            <p className="feels-like">Feels like {Math.round(weatherData.feelsLike)}°</p>
          </div>
        </div>
        <p className="weather-context">{getWeatherContext()}</p>
        <div className="current-weather-details">
          <div className="detail-item">
            <span className="label">Humidity</span>
            <span className="value numeric-data">{weatherData.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind</span>
            <span className="value numeric-data">{weatherData.windSpeed} km/h</span>
          </div>
          <div className="detail-item">
            <span className="label">UV Index</span>
            <span className="value numeric-data">{weatherData.uvIndex}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;