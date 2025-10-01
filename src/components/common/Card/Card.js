import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  hover = false,
  clickable = false,
  onClick,
  className = '',
  ...rest
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hover && 'card--hover',
    clickable && 'card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = clickable || onClick ? onClick : undefined;
  const handleKeyPress = clickable || onClick 
    ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(e);
        }
      }
    : undefined;

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

// Card Header Component
Card.Header = ({ children, className = '' }) => (
  <div className={`card__header ${className}`}>{children}</div>
);

// Card Body Component
Card.Body = ({ children, className = '' }) => (
  <div className={`card__body ${className}`}>{children}</div>
);

// Card Footer Component
Card.Footer = ({ children, className = '' }) => (
  <div className={`card__footer ${className}`}>{children}</div>
);

export default Card;