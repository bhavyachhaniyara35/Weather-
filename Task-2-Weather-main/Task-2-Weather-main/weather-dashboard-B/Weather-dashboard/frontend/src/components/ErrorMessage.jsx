import React, { useState, useEffect } from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    if (!message) return;
    
    // Reset state on new message
    setVisible(true);
    setExitAnimation(false);
    
    // Auto-dismiss after delay
    const timer = setTimeout(() => {
      handleDismiss();
    }, 8000);

    return () => clearTimeout(timer);
  }, [message]);
  
  // Handle graceful dismissal with animation
  const handleDismiss = () => {
    setExitAnimation(true);
    setTimeout(() => {
      setVisible(false);
    }, 300); // Match animation duration
  };

  if (!message || !visible) {
    return null;
  }
  
  // Helper function to get action guidance based on error type
  const getErrorGuidance = (errorMsg) => {
    const lowercasedError = errorMsg.toLowerCase();
    
    if (lowercasedError.includes('network') || lowercasedError.includes('connection')) {
      return 'Check your internet connection and try again.';
    } else if (lowercasedError.includes('not found') || lowercasedError.includes('location')) {
      return 'Try checking the spelling or search for a different location.';
    } else if (lowercasedError.includes('permission') || lowercasedError.includes('access')) {
      return 'Please enable location access in your browser settings.';
    } else if (lowercasedError.includes('api') || lowercasedError.includes('limit')) {
      return 'Please try again later.';
    }
    
    return 'Try refreshing the page or searching again later.';
  };

  return (
    <div className={`error-container ${exitAnimation ? 'exit' : 'enter'}`}>
      <div className="error-message" role="alert">
        <div className="error-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="error-content">
          <h4 className="error-title">Unable to load weather data</h4>
          <p className="error-text">{message}</p>
          <p className="error-guidance">{getErrorGuidance(message)}</p>
        </div>
        
        <button 
          className="error-close" 
          onClick={handleDismiss} 
          aria-label="Dismiss error message"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="error-actions">
        <button className="retry-button" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;