import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      title: 'Home',
      description: 'Go back to the homepage',
      icon: '🏠',
      path: '/'
    },
    {
      title: 'Marketplace',
      description: 'Browse available agricultural tokens',
      icon: '🛒',
      path: '/marketplace'
    },
    {
      title: 'Dashboard',
      description: 'Access your personal dashboard',
      icon: '📊',
      path: '/dashboard'
    },
    {
      title: 'Contact Us',
      description: 'Get help from our support team',
      icon: '💬',
      path: '/contact'
    }
  ];

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        {/* 404 Illustration */}
        <div className="not-found-illustration">
          <div className="error-code">404</div>
          <div className="illustration-image">
            <span className="illustration-icon">🌾</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="not-found-message">
          <h1>Page Not Found</h1>
          <p className="message-subtitle">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="not-found-actions">
          <Button 
            variant="primary" 
            onClick={() => navigate(-1)}
            className="action-btn"
          >
            ← Go Back
          </Button>
          <Link to="/">
            <Button variant="secondary" className="action-btn">
              Go to Homepage
            </Button>
          </Link>
        </div>

        {/* Suggestions */}
        <div className="not-found-suggestions">
          <h2>Where would you like to go?</h2>
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <Link 
                key={index} 
                to={suggestion.path} 
                className="suggestion-card"
              >
                <div className="suggestion-icon">{suggestion.icon}</div>
                <div className="suggestion-content">
                  <h3>{suggestion.title}</h3>
                  <p>{suggestion.description}</p>
                </div>
                <div className="suggestion-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="not-found-help">
          <p>
            Still can't find what you're looking for?{' '}
            <Link to="/contact" className="help-link">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;