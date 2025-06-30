import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast';
import ExtraInfoPanel from '../components/ExtraInfoPanel';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { useWeatherData } from '../hooks/useWeatherData';
import '../styles/Dashboard.css';

// Lazy load the parallax background for better performance
const ParallaxBackground = lazy(() => import('../components/ParallaxBackground'));

const Dashboard = ({ darkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const { weatherData, hourlyData, dailyData, loading, error } = useWeatherData(searchQuery);
  
  // Update the last updated timestamp whenever data refreshes
  useEffect(() => {
    if (weatherData) {
      setLastUpdated(new Date());
    }
  }, [weatherData]);
  
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    
    // Format as "Updated at 10:30 AM" or "Updated just now" if less than a minute ago
    const now = new Date();
    const diffMinutes = Math.floor((now - lastUpdated) / 60000);
    
    if (diffMinutes < 1) {
      return 'Updated just now';
    } else if (diffMinutes === 1) {
      return 'Updated 1 minute ago';
    } else if (diffMinutes < 60) {
      return `Updated ${diffMinutes} minutes ago`;
    } else {
      return `Updated at ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // Handle refresh button click
  const handleRefresh = () => {
    // Re-fetch data with the same query
    setSearchQuery(prev => prev); // This triggers a re-fetch in useWeatherData
  };
  return (
    <div className="dashboard">
      {/* Parallax Background */}
      <Suspense fallback={<div className="parallax-background-placeholder"></div>}>
        <ParallaxBackground />
      </Suspense>
      
      <header className="dashboard-header custom-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="custom-title">Weather Dashboard</h1>
            <p className="custom-tagline">Real-time weather updates at your fingertips</p>
            {lastUpdated && (
              <p className="last-updated-info">{formatLastUpdated()}</p>
            )}
          </div>
          <div className="header-right">
            <SearchBar onSearch={handleSearch} />
            <div className="header-actions">
              <button 
                className="refresh-button" 
                onClick={handleRefresh} 
                aria-label="Refresh weather data"
                title="Refresh weather data"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12C4 7.58 7.58 4 12 4c4.42 0 8 3.58 8 8s-3.58 8-8 8c-2.75 0-5.13-1.3-6.61-3.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 4v4H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="theme-toggle" 
                onClick={toggleDarkMode} 
                aria-label="Toggle dark mode"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M17.66 6.34l-1.41-1.41M6.34 17.66l-1.41 1.41M6.34 6.34L4.93 4.93M17.66 17.66l1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <Link 
                to="/settings" 
                className="settings-button" 
                aria-label="Weather Settings"
                title="Open Settings"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : weatherData ? (
          <>
            <section className="hourly-forecast-section">
              <HourlyForecast hourlyData={hourlyData} />
            </section>
            <section className="current-weather-section">
              <CurrentWeatherCard weatherData={weatherData} />
            </section>
            <section className="extra-info-section">
              <ExtraInfoPanel weatherData={weatherData} />
            </section>
            <section className="weekly-forecast-section">
              <WeeklyForecast dailyData={dailyData} />
            </section>
          </>
        ) : searchQuery ? (
          <div className="no-results-message">
            <div className="welcome-icon">❓</div>
            <h2>No weather data found</h2>
            <p>We couldn't find weather data for "{searchQuery}". Please check the city name and try again.</p>
          </div>
        ) : (
          <></>
        )}
      </main>
      
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p className="copyright">© 2025 Weather Dashboard | <a href="#">Terms</a> | <a href="#">Privacy</a></p>
          <p className="attribution">Data provided by <a href="#">WeatherAPI</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;