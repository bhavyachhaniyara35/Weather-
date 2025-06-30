import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import '../styles/WeatherIcon.css';

const WeatherIcon = ({ condition = 'clear-day', size = 'medium', className = '' }) => {
  const [lottieData, setLottieData] = useState(null);
  const normalizedCondition = normalizeCondition(condition);
  
  // Map weather conditions to appropriate icons and animations
  useEffect(() => {
    const loadLottieAnimation = async () => {
      try {
        // Dynamic import of Lottie JSON files based on condition
        const animationData = await import(`../assets/animations/${normalizedCondition}.json`)
          .catch(() => import(`../assets/animations/default.json`));
        setLottieData(animationData.default);
      } catch (error) {
        console.error('Failed to load animation:', error);
        // Fallback to SVG icons if Lottie fails
        setLottieData(null);
      }
    };
    
    loadLottieAnimation();
  }, [normalizedCondition]);

  // Helper function to normalize weather condition strings
  function normalizeCondition(condition) {
    if (!condition) return 'clear-day';
    
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      // Check if it's night time (6PM - 6AM)
      const hours = new Date().getHours();
      return (hours < 6 || hours >= 18) ? 'clear-night' : 'clear-day';
    }
    
    if (conditionLower.includes('cloud') && conditionLower.includes('part')) {
      const hours = new Date().getHours();
      return (hours < 6 || hours >= 18) ? 'partly-cloudy-night' : 'partly-cloudy-day';
    }
    
    if (conditionLower.includes('cloud')) return 'cloudy';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'fog';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return 'rain';
    if (conditionLower.includes('snow') || conditionLower.includes('sleet')) return 'snow';
    if (conditionLower.includes('thunder') || conditionLower.includes('storm')) return 'thunderstorm';
    
    return 'clear-day'; // default
  }

  // Render SVG icon when Lottie is not available
  const renderSVGIcon = () => {
    const iconMap = {
      'clear-day': (
        <svg viewBox="0 0 100 100" className="sun-icon">
          <circle className="sun" cx="50" cy="50" r="20" />
          <g className="sun-rays">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line 
                key={i}
                className="ray"
                x1="50"
                y1="50"
                x2={50 + 30 * Math.cos(angle * Math.PI / 180)}
                y2={50 + 30 * Math.sin(angle * Math.PI / 180)}
              />
            ))}
          </g>
        </svg>
      ),
      'clear-night': (
        <svg viewBox="0 0 100 100">
          <path className="moon" d="M50 15C32.25 15 18 29.25 18 47C18 64.75 32.25 79 50 79C67.75 79 82 64.75 82 47C82 45.25 81.75 43.5 81.5 42C81.5 42 76 47 68 47C60 47 54 41 54 33C54 25 60 20 60 20C56.75 16.75 53.5 15 50 15Z" />
        </svg>
      ),
      'cloudy': (
        <svg viewBox="0 0 100 100">
          <path className="cloud" d="M25,60 Q17,60 15,52 Q13,44 20,44 Q17,37 24,35 Q31,33 36,37 Q36,27 45,27 Q54,27 56,37 Q61,33 67,35 Q73,37 73,44 Q80,44 77,52 Q74,60 65,60 Z" />
        </svg>
      ),
      'partly-cloudy-day': (
        <svg viewBox="0 0 100 100">
          <circle className="sun" cx="30" cy="30" r="15" />
          <path className="cloud" d="M25,60 Q17,60 15,52 Q13,44 20,44 Q17,37 24,35 Q31,33 36,37 Q36,27 45,27 Q54,27 56,37 Q61,33 67,35 Q73,37 73,44 Q80,44 77,52 Q74,60 65,60 Z" />
        </svg>
      ),
      'partly-cloudy-night': (
        <svg viewBox="0 0 100 100">
          <path className="moon" d="M30,30 Q20,30 15,20 Q10,10 20,10 Q30,10 35,20 Q40,30 30,30 Z" />
          <path className="cloud" d="M25,60 Q17,60 15,52 Q13,44 20,44 Q17,37 24,35 Q31,33 36,37 Q36,27 45,27 Q54,27 56,37 Q61,33 67,35 Q73,37 73,44 Q80,44 77,52 Q74,60 65,60 Z" />
        </svg>
      ),
      'rain': (
        <svg viewBox="0 0 100 100">
          <path className="cloud" d="M25,40 Q17,40 15,32 Q13,24 20,24 Q17,17 24,15 Q31,13 36,17 Q36,7 45,7 Q54,7 56,17 Q61,13 67,15 Q73,17 73,24 Q80,24 77,32 Q74,40 65,40 Z" />
          {[30, 40, 50, 60, 70].map((x, i) => (
            <path 
              key={i}
              className="raindrop" 
              d={`M${x},${50 + (i % 2) * 5} q-2,10 0,20 q2,10 0,0 z`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      ),
      'snow': (
        <svg viewBox="0 0 100 100">
          <path className="cloud" d="M25,40 Q17,40 15,32 Q13,24 20,24 Q17,17 24,15 Q31,13 36,17 Q36,7 45,7 Q54,7 56,17 Q61,13 67,15 Q73,17 73,24 Q80,24 77,32 Q74,40 65,40 Z" />
          {[30, 40, 50, 60, 70].map((x, i) => (
            <circle 
              key={i}
              className="snowflake" 
              cx={x}
              cy={60 + (i % 2) * 10}
              r="3"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      ),
      'thunderstorm': (
        <svg viewBox="0 0 100 100">
          <path className="cloud" d="M25,40 Q17,40 15,32 Q13,24 20,24 Q17,17 24,15 Q31,13 36,17 Q36,7 45,7 Q54,7 56,17 Q61,13 67,15 Q73,17 73,24 Q80,24 77,32 Q74,40 65,40 Z" />
          <path 
            className="lightning" 
            d="M50,40 L45,60 L55,60 L42,90 L45,70 L35,70 Z" 
          />
        </svg>
      ),
      'fog': (
        <svg viewBox="0 0 100 100">
          {[20, 35, 50, 65, 80].map((y, i) => (
            <path 
              key={i}
              className="fog-layer" 
              d={`M20,${y} h60`} 
              strokeWidth="5"
              strokeLinecap="round"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      )
    };

    return iconMap[normalizedCondition] || iconMap['clear-day'];
  };

  return (
    <div className={`weather-icon weather-icon-${size} weather-${normalizedCondition} ${className}`}>
      {lottieData ? (
        <Player
          src={lottieData}
          className="lottie-player"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        renderSVGIcon()
      )}
    </div>
  );
};

export default WeatherIcon;