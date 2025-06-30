import React from 'react';
import '../styles/ParallaxBackground.css';

const ParallaxBackground = () => {
  /* Weather-related SVG background elements for parallax effect */
  const backgroundElements = [
    {
      type: "cloud",
      size: "large",
      position: { top: "10%", left: "5%" },
      opacity: 0.4,
      speed: 0.03
    },
    {
      type: "cloud",
      size: "medium",
      position: { top: "15%", left: "25%" },
      opacity: 0.3,
      speed: 0.05
    },
    {
      type: "cloud",
      size: "small",
      position: { top: "8%", left: "65%" },
      opacity: 0.2,
      speed: 0.08
    },
    {
      type: "sun",
      size: "medium",
      position: { top: "5%", right: "10%" },
      opacity: 0.15,
      speed: 0.02
    },
    {
      type: "raindrop",
      size: "small",
      position: { top: "25%", left: "80%" },
      opacity: 0.2,
      speed: 0.1
    }
  ];
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      // Get viewport dimensions
      const { innerWidth: width, innerHeight: height } = window;
      // Calculate mouse position as percentage of viewport
      const x = e.clientX / width;
      const y = e.clientY / height;
      setMousePosition({ x, y });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
    
    // SVG elements for different weather elements
    const renderElement = (element) => {
      // Calculate position with parallax effect
      const xOffset = (0.5 - mousePosition.x) * element.speed * 100;
      const yOffset = (0.5 - mousePosition.y) * element.speed * 100;
      
      const style = {
        position: 'absolute',
        opacity: element.opacity,
        ...element.position,
        transform: `translate(${xOffset}px, ${yOffset}px)`,
        transition: 'transform 0.2s ease-out'
      };
      
      switch (element.type) {
        case 'cloud':
          return (
            <div className={`parallax-element cloud-${element.size}`} style={style}>
              <svg width={element.size === 'large' ? "180" : element.size === 'medium' ? "120" : "80"} height={element.size === 'large' ? "100" : element.size === 'medium' ? "70" : "50"} viewBox="0 0 200 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M178.5,90.2c0-0.1,0-0.2,0-0.4c0-16.6-13.4-30-30-30c-6.3,0-12.1,1.9-16.9,5.2c-4.9-20.6-23.3-36-45.4-36c-25.6,0-46.4,20.8-46.4,46.4c0,1,0,1.9,0.1,2.9C16.4,82.1,0,101,0,124h185C185,107.1,183.2,97.7,178.5,90.2z" />
              </svg>
            </div>
          );
        case 'sun':
          return (
            <div className={`parallax-element sun-${element.size}`} style={style}>
              <svg width={element.size === 'large' ? "150" : element.size === 'medium' ? "100" : "60"} height={element.size === 'large' ? "150" : element.size === 'medium' ? "100" : "60"} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="20" />
                <g>
                  <line x1="50" y1="15" x2="50" y2="0" strokeWidth="2" />
                  <line x1="50" y1="100" x2="50" y2="85" strokeWidth="2" />
                  <line x1="85" y1="50" x2="100" y2="50" strokeWidth="2" />
                  <line x1="0" y1="50" x2="15" y2="50" strokeWidth="2" />
                  <line x1="75" y1="25" x2="85" y2="15" strokeWidth="2" />
                  <line x1="15" y1="85" x2="25" y2="75" strokeWidth="2" />
                  <line x1="75" y1="75" x2="85" y2="85" strokeWidth="2" />
                  <line x1="15" y1="15" x2="25" y2="25" strokeWidth="2" />
                </g>
              </svg>
            </div>
          );
        case 'raindrop':
          return (
            <div className={`parallax-element raindrop-${element.size}`} style={style}>
              <svg width={element.size === 'large' ? "60" : element.size === 'medium' ? "40" : "20"} height={element.size === 'large' ? "90" : element.size === 'medium' ? "60" : "30"} viewBox="0 0 60 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M30,0.1c0,0-30,45-30,64.9C0,84.6,13.4,90,30,90c16.6,0,30-5.4,30-25C60,45.1,30,0.1,30,0.1z" />
              </svg>
            </div>
          );
        default:
          return null;
      }
    };
    
    return (      <div className="parallax-background">
        {backgroundElements.map((element, index) => (
          <React.Fragment key={index}>
            {renderElement(element)}
          </React.Fragment>
        ))}
      </div>
    );
};

export default ParallaxBackground;
