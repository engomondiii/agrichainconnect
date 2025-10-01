import React from 'react';
import './Loader.css';

const Loader = ({
  size = 'medium',
  variant = 'spinner',
  fullScreen = false,
  text,
  className = '',
}) => {
  if (fullScreen) {
    return (
      <div className="loader__fullscreen">
        <div className={`loader loader--${size} loader--${variant} ${className}`}>
          <div className="loader__spinner"></div>
        </div>
        {text && <p className="loader__text">{text}</p>}
      </div>
    );
  }

  return (
    <div className={`loader loader--${size} loader--${variant} ${className}`}>
      <div className="loader__spinner"></div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;