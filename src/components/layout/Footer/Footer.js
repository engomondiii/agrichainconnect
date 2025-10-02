import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribe email:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  // Define routes inline
  const PUBLIC_ROUTES = {
    MARKETPLACE: '/marketplace',
    HOW_IT_WORKS: '/how-it-works',
    IMPACT: '/impact',
    ABOUT: '/about',
    CONTACT: '/contact'
  };

  // Define social links inline
  const SOCIAL_LINKS = {
    FACEBOOK: 'https://facebook.com',
    TWITTER: 'https://twitter.com',
    LINKEDIN: 'https://linkedin.com',
    INSTAGRAM: 'https://instagram.com'
  };

  // Define app info inline
  const APP_INFO = {
    NAME: 'Agri-Chain Connect',
    VERSION: '1.0.0'
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Footer Top */}
        <div className="footer__top">
          {/* Company Info */}
          <div className="footer__section">
            <div className="footer__logo">
              <span className="footer__logo-icon">🌾</span>
              <span className="footer__logo-text">Agri-Chain Connect</span>
            </div>
            <p className="footer__description">
              Empowering smallholder farmers through A Decentralized "Food Futures" Commodity Exchange. 
              Direct market access, transparent pricing, and financial inclusion 
              for agricultural communities worldwide.
            </p>
            <div className="footer__social">
              <a 
                href={SOCIAL_LINKS.FACEBOOK} 
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <span>f</span>
              </a>
              <a 
                href={SOCIAL_LINKS.TWITTER} 
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <span>𝕏</span>
              </a>
              <a 
                href={SOCIAL_LINKS.LINKEDIN} 
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span>in</span>
              </a>
              <a 
                href={SOCIAL_LINKS.INSTAGRAM} 
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <span>📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="footer__links">
              <li><Link to={PUBLIC_ROUTES.MARKETPLACE}>Marketplace</Link></li>
              <li><Link to={PUBLIC_ROUTES.HOW_IT_WORKS}>How It Works</Link></li>
              <li><Link to={PUBLIC_ROUTES.IMPACT}>Impact</Link></li>
              <li><Link to={PUBLIC_ROUTES.ABOUT}>About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__section">
            <h3 className="footer__title">Resources</h3>
            <ul className="footer__links">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/documentation">Documentation</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__section">
            <h3 className="footer__title">Legal</h3>
            <ul className="footer__links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to={PUBLIC_ROUTES.CONTACT}>Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__section">
            <h3 className="footer__title">Stay Updated</h3>
            <p className="footer__newsletter-text">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="footer__newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer__newsletter-input"
                required
              />
              <button type="submit" className="footer__newsletter-button">
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="footer__newsletter-success">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {APP_INFO.NAME}. All rights reserved.
          </p>
          <p className="footer__version">
            Version {APP_INFO.VERSION}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;