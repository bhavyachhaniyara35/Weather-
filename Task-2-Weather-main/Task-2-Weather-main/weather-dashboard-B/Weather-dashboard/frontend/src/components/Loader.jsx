import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="skeleton-layout">
        <div className="skeleton-section-top">
          <div className="skeleton-current">
            <div className="skeleton-header">
              <div className="skeleton-line-short"></div>
            </div>
            <div className="skeleton-temperature"></div>
            <div className="skeleton-line-medium"></div>
            <div className="skeleton-line-short"></div>
          </div>
          <div className="skeleton-hourly">
            <div className="skeleton-header">
              <div className="skeleton-line-short"></div>
            </div>
            <div className="skeleton-hours">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="skeleton-hour-item">
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-line-xsmall"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="skeleton-weekly">
          <div className="skeleton-header">
            <div className="skeleton-line-short"></div>
          </div>
          <div className="skeleton-days">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="skeleton-day-item">
                <div className="skeleton-line-xsmall"></div>
                <div className="skeleton-circle-sm"></div>
                <div className="skeleton-bar"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="loader-message">
          <div className="pulse-loader"></div>
          <p className="loader-text">Loading weather data...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;