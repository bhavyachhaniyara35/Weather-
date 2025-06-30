import React, { useState, useEffect, useRef } from 'react';
import '../styles/Dashboard.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);
  
  // Load recent searches from local storage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (err) {
        console.error('Failed to parse recent searches:', err);
        localStorage.removeItem('recentSearches');
      }
    }
  }, []);
  
  // Save recent searches to local storage when updated
  useEffect(() => {
    if (recentSearches.length) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);
  
  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateRecentSearches = (search) => {
    // Add to recent searches (no duplicates and max 5)
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== search.toLowerCase());
      return [search, ...filtered].slice(0, 5);
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query.trim());
  };
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm) return;
    
    onSearch(searchTerm);
    updateRecentSearches(searchTerm);
    setQuery(searchTerm);
    setShowSuggestions(false);
    setError(null);
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    if (value.length > 1) {
      setIsLoading(true);
      // Set debounced timer for suggestions
      debounceTimer.current = setTimeout(() => {
        // This would normally call an API
        // For now just filter recent searches
        const matches = recentSearches.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(matches);
        setIsLoading(false);
        setShowSuggestions(true);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const getLocation = () => {
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSearch(`${latitude},${longitude}`);
        setQuery('Current Location');
        updateRecentSearches('Current Location');
        setIsLoading(false);
        setShowSuggestions(false);
      },
      (error) => {
        setIsLoading(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred while getting location.');
        }
      }
    );
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="search-bar"
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search for a city"
        style={{fontFamily: 'Quicksand, Segoe UI, Arial, sans-serif', fontWeight: 600}}
      />
      <button className="search-btn" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;