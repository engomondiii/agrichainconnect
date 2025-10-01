import React from 'react';
import { NavLink } from 'react-router-dom';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '@config/routes';
import './Navigation.css';

const Navigation = ({ onLinkClick }) => {
  // Public navigation items
  const publicNavItems = [
    { path: PUBLIC_ROUTES.HOME, label: 'Home' },
    { path: PUBLIC_ROUTES.MARKETPLACE, label: 'Marketplace' },
    { path: PUBLIC_ROUTES.HOW_IT_WORKS, label: 'How It Works' },
    { path: PUBLIC_ROUTES.IMPACT, label: 'Impact' },
    { path: PUBLIC_ROUTES.ABOUT, label: 'About' },
    { path: PUBLIC_ROUTES.CONTACT, label: 'Contact' },
  ];

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {publicNavItems.map((item) => (
          <li key={item.path} className="navigation__item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `navigation__link ${isActive ? 'navigation__link--active' : ''}`
              }
              onClick={onLinkClick}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;