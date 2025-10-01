import React, { useState } from 'react';
import './Alert.css';

const Alert = ({
  type = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) return null;

  const alertClasses = [
    'alert',
    `alert--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={alertClasses} role="alert">
      <div className="alert__icon">{icons[type]}</div>
      
      <div className="alert__content">
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__message">{children}</div>
      </div>

      {dismissible && (
        <button
          className="alert__close"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;