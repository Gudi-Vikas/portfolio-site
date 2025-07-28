import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let fadeTimeout, completeTimeout, textTimeout;
    textTimeout = setTimeout(() => setShowText(true), 900);
    fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
      completeTimeout = setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete();
      }, 700);
    }, 2600);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
      clearTimeout(textTimeout);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`vlogo-loading-screen${isFadingOut ? ' fade-out' : ''}`}>
      <div className="vlogo-loading-content">
        <div className="vlogo-loader premium-loader">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle className="premium-ring1" cx="45" cy="45" r="36" />
            <circle className="premium-ring2" cx="45" cy="45" r="28" />
            <path className="premium-v" d="M30 40 L45 65 L60 25" />
          </svg>
        </div>
        <div className={`premium-loading-text${showText ? ' show' : ''}`}>
          <div className="premium-headline">Crafting Digital Excellence...</div>
          <div className="premium-tagline">Loading Vikas Gudi’s Portfolio</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 