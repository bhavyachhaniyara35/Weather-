import React from 'react';
import '../styles/ExtraInfoPanel.css';

const ExtraInfoPanel = ({ weatherData }) => {
  if (!weatherData) return null;

  const {
    pressure,
    visibility,
    sunrise,
    sunset,
    uvIndex,
    precipitation,
  } = weatherData;
  
  // Helper function to determine UV index description
  const getUVIndexDescription = (index) => {
    if (!index) return "N/A";
    const uvValue = Number(index);
    if (uvValue <= 2) return "Low";
    if (uvValue <= 5) return "Moderate";
    if (uvValue <= 7) return "High";
    if (uvValue <= 10) return "Very High";
    return "Extreme";
  };
  
  // Get visibility description
  const getVisibilityDescription = (vis) => {
    if (!vis) return "";
    const visValue = Number(vis);
    if (visValue >= 10) return "Excellent";
    if (visValue >= 5) return "Good";
    if (visValue >= 2) return "Moderate";
    return "Poor";
  };

  return (
    <div className="extra-info-panel card" style={{boxShadow: '0 8px 32px rgba(127,90,240,0.15)', borderRadius: '2rem', border: '1.5px solid #7f5af0', background: 'rgba(255,255,255,0.08)', color: '#fff', backdropFilter: 'blur(8px)'}}>
      <div className="card-header">
        <h3>Weather Details</h3>
      </div>
      
      <div className="info-grid">
        <div className="info-item">
          <div className="info-icon humidity-icon"></div>
          <div className="info-content">
            <h4>Humidity</h4>
            <p className="info-value">{weatherData.humidity}%</p>
            <p className="info-description">{weatherData.humidity > 60 ? 'High' : weatherData.humidity < 30 ? 'Low' : 'Comfortable'}</p>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon wind-icon"></div>
          <div className="info-content">
            <h4>Wind</h4>
            <p className="info-value">{weatherData.windSpeed} km/h</p>
            <p className="info-description">{
              weatherData.windSpeed > 30 ? 'Strong' : 
              weatherData.windSpeed > 15 ? 'Moderate' : 
              'Light'
            }</p>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon pressure-icon"></div>
          <div className="info-content">
            <h4>Pressure</h4>
            <p className="info-value">{pressure} hPa</p>
            <p className="info-description">{
              pressure > 1013 ? 'High' : 
              pressure < 1000 ? 'Low' : 
              'Normal'
            }</p>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon uv-icon"></div>
          <div className="info-content">
            <h4>UV Index</h4>
            <p className="info-value">{uvIndex || 'N/A'}</p>
            <p className="info-description">{getUVIndexDescription(uvIndex)}</p>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon visibility-icon"></div>
          <div className="info-content">
            <h4>Visibility</h4>
            <p className="info-value">{visibility} km</p>
            <p className="info-description">{getVisibilityDescription(visibility)}</p>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon sun-icon"></div>
          <div className="info-content">
            <h4>Sunrise & Sunset</h4>
            <p className="info-value">{sunrise} / {sunset}</p>
            <p className="info-description">Day length: 12h 34m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraInfoPanel;