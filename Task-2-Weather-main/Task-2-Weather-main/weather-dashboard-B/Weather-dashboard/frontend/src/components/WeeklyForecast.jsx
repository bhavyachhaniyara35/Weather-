import React, { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import '../styles/WeeklyForecast.css';

const WeeklyForecast = ({ dailyData }) => {
  if (!dailyData || dailyData.length === 0) return null;
  
  const [expandedDay, setExpandedDay] = useState(null);
  
  const toggleExpand = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };
  
  const renderTemperatureBar = (min, max) => {
    const minTemp = Math.round(min);
    const maxTemp = Math.round(max);
    
    // Find the min and max across all days for scale
    const allMin = Math.min(...dailyData.map(day => Math.round(day.minTemp)));
    const allMax = Math.max(...dailyData.map(day => Math.round(day.maxTemp)));
    const range = allMax - allMin;
    
    // Calculate positions as percentages
    const leftPos = ((minTemp - allMin) / range) * 100;
    const rightPos = 100 - ((allMax - maxTemp) / range) * 100;
    const barWidth = rightPos - leftPos;
    
    return (
      <div className="temp-bar-container">
        <div className="temp-bar-scale"></div>
        <div 
          className="temp-bar-fill" 
          style={{
            left: `${leftPos}%`,
            width: `${barWidth}%`
          }}
        ></div>
        <span className="temp-min">{minTemp}°</span>
        <span className="temp-max">{maxTemp}°</span>
      </div>
    );
  };
  
  return (
    <div className="weekly-forecast card" style={{boxShadow: '0 8px 32px rgba(127,90,240,0.15)', borderRadius: '2rem', border: '1.5px solid #7f5af0', background: 'rgba(255,255,255,0.08)', color: '#fff', backdropFilter: 'blur(8px)'}}>
      <div className="card-header">
        <h3>7-Day Forecast</h3>
      </div>
      
      <div className="daily-container">
        {dailyData.map((day, index) => (
          <div 
            key={index} 
            className={`daily-item ${expandedDay === index ? 'expanded' : ''}`}
            onClick={() => toggleExpand(index)}
          >
            <div className="daily-item-header">
              <p className="day">{formatDate(new Date(day.dt * 1000), 'weekday')}</p>
              <div className="day-icon-container">
                <img 
                  src={day.icon} 
                  alt={day.description} 
                  className="weather-icon" 
                  loading="lazy" 
                />
                <p className="condition-text">{day.description}</p>
              </div>
              <div className="temperature-range">
                {renderTemperatureBar(day.minTemp, day.maxTemp)}
              </div>
              <span className="expand-icon">
                {expandedDay === index ? '−' : '+'}
              </span>
            </div>
            
            {expandedDay === index && (
              <div className="daily-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="label">Precipitation</span>
                    <span className="value">{day.precipitation || '0'}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Humidity</span>
                    <span className="value">{day.humidity}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Wind</span>
                    <span className="value">{day.windSpeed} km/h</span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="label">UV Index</span>
                    <span className="value">{day.uvIndex || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Sunrise</span>
                    <span className="value">{day.sunrise}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Sunset</span>
                    <span className="value">{day.sunset}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;