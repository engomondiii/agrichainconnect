import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PROTECTED_ROUTES } from '@config/routes';
import './Sidebar.css';

const Sidebar = ({ userRole, isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (userRole === 'farmer') {
      return [
        {
          label: 'Dashboard',
          path: PROTECTED_ROUTES.FARMER_DASHBOARD,
          icon: '📊',
        },
        {
          label: 'My Listings',
          path: PROTECTED_ROUTES.FARMER_LISTINGS,
          icon: '🌾',
        },
        {
          label: 'Orders',
          path: PROTECTED_ROUTES.FARMER_ORDERS,
          icon: '📦',
        },
        {
          label: 'Earnings',
          path: PROTECTED_ROUTES.FARMER_EARNINGS,
          icon: '💰',
        },
        {
          label: 'Loans',
          path: PROTECTED_ROUTES.LOAN_STATUS,
          icon: '🏦',
          submenu: [
            { label: 'Apply for Loan', path: PROTECTED_ROUTES.LOAN_APPLICATION },
            { label: 'My Loans', path: PROTECTED_ROUTES.LOAN_STATUS },
          ],
        },
      ];
    } else if (userRole === 'buyer') {
      return [
        {
          label: 'Dashboard',
          path: PROTECTED_ROUTES.BUYER_DASHBOARD,
          icon: '📊',
        },
        {
          label: 'Marketplace',
          path: '/marketplace',
          icon: '🛒',
        },
        {
          label: 'Portfolio',
          path: PROTECTED_ROUTES.BUYER_PORTFOLIO,
          icon: '💼',
        },
        {
          label: 'Orders',
          path: PROTECTED_ROUTES.BUYER_ORDERS,
          icon: '📦',
        },
        {
          label: 'Analytics',
          path: PROTECTED_ROUTES.BUYER_ANALYTICS,
          icon: '📈',
        },
        {
          label: 'Secondary Market',
          path: PROTECTED_ROUTES.SECONDARY_MARKET,
          icon: '🔄',
        },
      ];
    } else if (userRole === 'admin') {
      return [
        {
          label: 'Dashboard',
          path: PROTECTED_ROUTES.ADMIN_DASHBOARD,
          icon: '📊',
        },
        {
          label: 'Users',
          path: PROTECTED_ROUTES.ADMIN_USERS,
          icon: '👥',
        },
        {
          label: 'Transactions',
          path: PROTECTED_ROUTES.ADMIN_TRANSACTIONS,
          icon: '💳',
        },
        {
          label: 'Disputes',
          path: PROTECTED_ROUTES.ADMIN_DISPUTES,
          icon: '⚖️',
        },
        {
          label: 'Settings',
          path: PROTECTED_ROUTES.ADMIN_SETTINGS,
          icon: '⚙️',
        },
      ];
    }
    return [];
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar__overlay" onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__content">
          {/* Sidebar Header */}
          <div className="sidebar__header">
            <h2 className="sidebar__title">{userRole} Menu</h2>
            <button className="sidebar__close" onClick={onClose} aria-label="Close sidebar">
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="sidebar__nav">
            <ul className="sidebar__list">
              {navigationItems.map((item) => (
                <li key={item.path} className="sidebar__item">
                  {item.submenu ? (
                    <>
                      <button
                        className="sidebar__link sidebar__link--expandable"
                        onClick={() => toggleSection(item.label)}
                      >
                        <span className="sidebar__link-icon">{item.icon}</span>
                        <span className="sidebar__link-text">{item.label}</span>
                        <span className={`sidebar__link-arrow ${expandedSection === item.label ? 'sidebar__link-arrow--expanded' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedSection === item.label && (
                        <ul className="sidebar__submenu">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.path}>
                              <NavLink
                                to={subItem.path}
                                className={({ isActive }) =>
                                  `sidebar__sublink ${isActive ? 'sidebar__sublink--active' : ''}`
                                }
                                onClick={onClose}
                              >
                                {subItem.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                      }
                      onClick={onClose}
                    >
                      <span className="sidebar__link-icon">{item.icon}</span>
                      <span className="sidebar__link-text">{item.label}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;