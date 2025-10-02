import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo" onClick={closeMobileMenu}>
          <img 
            src="/images/Agri-Chain Connect Protocol Logo.png" 
            alt="Agri-Chain Connect" 
            className="header__logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="header__nav-desktop">
          <Navigation onLinkClick={closeMobileMenu} />
        </div>

        {/* Right Side Actions */}
        <div className="header__actions">
          {isAuthenticated && user ? (
            <div className="header__user">
              <button
                className="header__user-button"
                onClick={toggleUserMenu}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="header__user-avatar">
                  {user.fullName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="header__user-name">{user.fullName || user.email}</span>
                <span className="header__user-arrow">▼</span>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div 
                    className="header__dropdown-overlay" 
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="header__user-dropdown">
                    <div className="header__user-info">
                      <div className="header__user-info-name">{user.fullName || user.email}</div>
                      <div className="header__user-info-email">{user.email}</div>
                      <div className="header__user-info-role">{user.role}</div>
                    </div>
                    <div className="header__user-divider" />
                    <Link 
                      to="/dashboard" 
                      className="header__user-menu-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="header__user-menu-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="header__user-menu-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <div className="header__user-divider" />
                    <button 
                      className="header__user-menu-item header__user-menu-item--logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="header__auth-buttons">
              <Link to="/auth/login" className="header__auth-link">
                Login
              </Link>
              <Link to="/auth/register" className="header__auth-button">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`header__mobile-toggle ${mobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="header__mobile-toggle-line"></span>
            <span className="header__mobile-toggle-line"></span>
            <span className="header__mobile-toggle-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          <div className="header__mobile-overlay" onClick={closeMobileMenu} />
          <div className="header__nav-mobile">
            <Navigation onLinkClick={closeMobileMenu} />
            
            {!isAuthenticated && (
              <div className="header__mobile-auth">
                <Link to="/auth/login" className="header__mobile-auth-button" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/auth/register" className="header__mobile-auth-button header__mobile-auth-button--primary" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;