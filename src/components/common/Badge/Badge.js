import React from 'react';
import './Badge.css';

const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  dot = false,
  className = '',
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    rounded && 'badge--rounded',
    dot && 'badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (dot) {
    return <span className={badgeClasses}></span>;
  }

  return <span className={badgeClasses}>{children}</span>;
};

export default Badge;