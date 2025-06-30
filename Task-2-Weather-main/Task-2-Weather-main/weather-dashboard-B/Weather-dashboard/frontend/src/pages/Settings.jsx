import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = ({ darkMode, toggleDarkMode }) => {
  const [settings, setSettings] = useState({
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    timeFormat: '24h',
    defaultLocation: '',
    notifications: false,
    language: 'en',
    theme: darkMode ? 'dark' : 'light',
    animationsEnabled: true,
    dataUpdateFrequency: '30min',
    mapView: 'standard'
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('weatherSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Update theme setting when darkMode changes
  useEffect(() => {
    setSettings(prev => ({...prev, theme: darkMode ? 'dark' : 'light'}));
  }, [darkMode]);

  const handleSettingChange = (setting, value) => {
    if (setting === 'theme') {
      toggleDarkMode(value === 'dark');
    }
    
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    localStorage.setItem('weatherSettings', JSON.stringify(newSettings));
    
    // Show saved indicator
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-content">
          <h1>Settings</h1>
          <p className="settings-description">Customize your weather experience</p>
        </div>        <Link to="/" className="back-button" aria-label="Back to Dashboard">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="back-icon">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="settings-container">
        {saved && <div className="settings-saved">Settings saved successfully!</div>}
        
        <form className="settings-form">
          <div className="settings-section">
            <div className="section-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.4 7.2L20 8.4L16 12.6L17.2 18L12 15.6L6.8 18L8 12.6L4 8.4L9.6 7.2L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2>Display Preferences</h2>
            </div>
            
            <div className="settings-grid">
              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <div className="theme-selector">
                  <button 
                    type="button" 
                    className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleSettingChange('theme', 'light')}
                    aria-label="Light theme"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Light
                  </button>
                  <button 
                    type="button" 
                    className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleSettingChange('theme', 'dark')}
                    aria-label="Dark theme"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Dark
                  </button>
                  <button 
                    type="button" 
                    className={`theme-option ${settings.theme === 'auto' ? 'active' : ''}`}
                    onClick={() => handleSettingChange('theme', 'auto')}
                    aria-label="Auto theme"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8C10.93 8 9.86998 8.21 8.87998 8.61C7.88998 9.01 6.99998 9.59 6.21998 10.34C5.43998 11.09 4.79998 12.01 4.34998 13.02C3.89998 14.03 3.64998 15.11 3.64998 16.19C3.64998 17.27 3.89998 18.35 4.34998 19.36C4.79998 20.37 5.43998 21.29 6.21998 22.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8C13.07 8 14.13 8.21 15.12 8.61C16.11 9.01 17 9.59 17.78 10.34C18.56 11.09 19.2 12.01 19.65 13.02C20.1 14.03 20.35 15.11 20.35 16.19C20.35 17.27 20.1 18.35 19.65 19.36C19.2 20.37 18.56 21.29 17.78 22.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Auto
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="animationsEnabled">Animations</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="animationsEnabled"
                    checked={settings.animationsEnabled}
                    onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
                  />
                  <label htmlFor="animationsEnabled" className="toggle-label">
                    <span className="toggle-text">{settings.animationsEnabled ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>          <div className="settings-section">
            <div className="section-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2>Units & Measurements</h2>
            </div>
            
            <div className="settings-grid">
              <div className="form-group">
                <label htmlFor="temperatureUnit">Temperature Unit</label>
                <select
                  id="temperatureUnit"
                  value={settings.temperatureUnit}
                  onChange={(e) => handleSettingChange('temperatureUnit', e.target.value)}
                  className="styled-select"
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Wind Speed Unit</label>
                <select
                  value={settings.windSpeedUnit}
                  onChange={(e) => handleSettingChange('windSpeedUnit', e.target.value)}
                >
                  <option value="kmh">Kilometers per hour (km/h)</option>
                  <option value="mph">Miles per hour (mph)</option>
                  <option value="ms">Meters per second (m/s)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h2>Display</h2>
            </div>
            <div className="settings-grid">
              <div className="form-group">
                <label>Time Format</label>
                <select
                  value={settings.timeFormat}
                  onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
                >
                  <option value="12h">12-hour (AM/PM)</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>

              <div className="form-group">
                <label>Dark Mode</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={darkMode} 
                      onChange={toggleDarkMode}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <span style={{ marginLeft: '10px' }}>{darkMode ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h2>Location</h2>
            </div>
            <div className="settings-grid">
              <div className="form-group">
                <label>Default Location</label>
                <input
                  type="text"
                  placeholder="Enter your default city"
                  value={settings.defaultLocation}
                  onChange={(e) => handleSettingChange('defaultLocation', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2"/>
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h2>Notifications</h2>
            </div>
            <div className="settings-grid">
              <div className="form-group">
                <label>Weather Alerts</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications} 
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <span style={{ marginLeft: '10px' }}>{settings.notifications ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>          </div>        
          
          <button 
            type="button" 
            className="save-button" 
            onClick={() => setSaved(true)}
            aria-label="Save all settings"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;