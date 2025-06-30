import { useState, useEffect } from 'react';

export const useWeatherData = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const currentResponse = await fetch(`/api/weather/current/${city}`);
        if (!currentResponse.ok) throw new Error('Failed to fetch current weather');
        const currentData = await currentResponse.json();
        setWeatherData(currentData);

        // Fetch forecast
        const forecastResponse = await fetch(`/api/weather/forecast/${city}`);
        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast');
        const forecastData = await forecastResponse.json();
        setHourlyData(forecastData.hourly);
        setDailyData(forecastData.daily);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return { weatherData, hourlyData, dailyData, loading, error };
}; 