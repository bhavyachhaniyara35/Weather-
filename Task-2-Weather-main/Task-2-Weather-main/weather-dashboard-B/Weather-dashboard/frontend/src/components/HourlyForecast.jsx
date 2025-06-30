import React, { useRef, useState, useEffect } from 'react';
import { formatDate } from '../utils/formatDate';
import '../styles/HourlyForecast.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HourlyForecast = ({ hourlyData }) => {
  const [activeTab, setActiveTab] = useState('temperature');
  const [chartData, setChartData] = useState(null);
  const scrollContainerRef = useRef(null);
  const chartRef = useRef(null);
  
  if (!hourlyData || hourlyData.length === 0) return null;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!hourlyData) return;
    
    const hours = hourlyData.map(hour => formatDate(new Date(hour.dt * 1000), 'hour'));
    let values, label, lineColor;
    
    switch (activeTab) {
      case 'temperature':
        values = hourlyData.map(hour => hour.temperature);
        label = 'Temperature (°C)';
        lineColor = '#059669'; // emerald-600
        break;
      case 'precipitation':
        values = hourlyData.map(hour => hour.precipitation || 0);
        label = 'Precipitation (%)';
        lineColor = '#0284c7'; // sky-600
        break;
      case 'humidity':
        values = hourlyData.map(hour => hour.humidity || 0);
        label = 'Humidity (%)';
        lineColor = '#0891b2'; // cyan-600
        break;
      case 'wind':
        values = hourlyData.map(hour => hour.windSpeed || 0);
        label = 'Wind Speed (km/h)';
        lineColor = '#7c3aed'; // violet-600
        break;
      default:
        values = hourlyData.map(hour => hour.temperature);
        label = 'Temperature (°C)';
        lineColor = '#059669'; // emerald-600
    }
    
    setChartData({
      labels: hours,
      datasets: [
        {
          label,
          data: values,
          borderColor: lineColor,
          backgroundColor: `${lineColor}20`, // 12% opacity
          borderWidth: 2,
          pointRadius: 3,
          pointBorderWidth: 2,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: lineColor,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: lineColor,
          tension: 0.4,
          fill: true
        }
      ]
    });
  }, [hourlyData, activeTab]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#64748b', // slate-500
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          },
          maxRotation: 0
        }
      },
      y: {
        grid: {
          color: '#e2e8f0', // slate-200
          drawBorder: false,
          lineWidth: 1
        },
        ticks: {
          color: '#64748b', // slate-500
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          }
        },
        beginAtZero: activeTab !== 'temperature'
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#1e293b', // slate-800
        bodyColor: '#475569', // slate-600
        titleFont: {
          size: 13,
          weight: 600,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 12,
        borderColor: '#e2e8f0', // slate-200
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        caretSize: 6,
        caretPadding: 8,
        callbacks: {
          title: (items) => hours[items[0].dataIndex],
          label: (item) => {
            const value = item.formattedValue;
            switch (activeTab) {
              case 'temperature':
                return `${value}°C`;
              case 'precipitation':
              case 'humidity':
                return `${value}%`;
              case 'wind':
                return `${value} km/h`;
              default:
                return value;
            }
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="hourly-forecast card" style={{boxShadow: '0 8px 32px rgba(127,90,240,0.15)', borderRadius: '2rem', border: '1.5px solid #7f5af0', background: 'rgba(255,255,255,0.08)', color: '#fff', backdropFilter: 'blur(8px)'}}>
      <div className="card-header">
        <h3>Hourly Forecast</h3>
        
        <div className="forecast-tabs">
          <button 
            className={`tab-button ${activeTab === 'temperature' ? 'active' : ''}`}
            onClick={() => setActiveTab('temperature')}
            aria-label="Show temperature forecast"
          >
            <span className="tab-icon">🌡️</span>
            <span className="tab-text">Temperature</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'precipitation' ? 'active' : ''}`}
            onClick={() => setActiveTab('precipitation')}
            aria-label="Show precipitation forecast"
          >
            <span className="tab-icon">💧</span>
            <span className="tab-text">Precipitation</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'humidity' ? 'active' : ''}`}
            onClick={() => setActiveTab('humidity')}
            aria-label="Show humidity forecast"
          >
            <span className="tab-icon">💦</span>
            <span className="tab-text">Humidity</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'wind' ? 'active' : ''}`}
            onClick={() => setActiveTab('wind')}
            aria-label="Show wind forecast"
          >
            <span className="tab-icon">🌬️</span>
            <span className="tab-text">Wind</span>
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        {chartData && <Line ref={chartRef} data={chartData} options={chartOptions} />}
      </div>
      
      <div className="scroll-controls">
        <button 
          className="scroll-button scroll-left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="hourly-container" ref={scrollContainerRef}>
          {hourlyData.map((hour, index) => (
            <div key={index} className="hourly-item">
              <p className="time">{formatDate(new Date(hour.dt * 1000), 'hour')}</p>
              <div className="weather-icon-container">
                {hour.condition && <img src={hour.icon} alt={hour.description} className="weather-icon" loading="lazy" />}
              </div>
              <p className="temperature numeric-data">{Math.round(hour.temperature)}°</p>
              <p className="precipitation">
                <span className="precipitation-icon">💧</span> 
                {hour.precipitation || '0'}%
              </p>
            </div>
          ))}
        </div>
        
        <button 
          className="scroll-button scroll-right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HourlyForecast;