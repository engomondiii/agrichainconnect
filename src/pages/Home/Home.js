import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">
              Empowering Farmers Through Direct Market Access
            </h1>
            <p className="hero__subtitle">
              Transform your harvest into opportunity. Connect directly with global buyers, 
              eliminate middlemen, and build a sustainable farming future.
            </p>
            <div className="hero__actions">
              <Link to="/auth/register" className="btn btn--primary btn--large">
                Get Started
              </Link>
              <Link to="/how-it-works" className="btn btn--secondary btn--large">
                Learn More
              </Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">5,000+</span>
                <span className="hero__stat-label">Active Farmers</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">$2.4M</span>
                <span className="hero__stat-label">Transactions</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">65%</span>
                <span className="hero__stat-label">Income Increase</span>
              </div>
            </div>
          </div>
          <div className="hero__image">
            <div className="hero__image-placeholder">
              {/* Replace with actual image */}
              <span>🌾</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Revolutionary Features</h2>
            <p className="section__description">
              Four unprecedented innovations working together to transform agricultural markets
            </p>
          </div>

          <div className="features__grid">
            <div className="feature-card card card--bordered">
              <div className="feature-card__icon">
                <span>🪙</span>
              </div>
              <h3 className="feature-card__title">Fractionalized Futures</h3>
              <p className="feature-card__description">
                Transform your harvest into tradeable micro-investment opportunities. 
                Each 0.1kg becomes a token accessible to buyers worldwide.
              </p>
              <Link to="/how-it-works#dffts" className="feature-card__link">
                Learn more →
              </Link>
            </div>

            <div className="feature-card card card--bordered">
              <div className="feature-card__icon">
                <span>🤖</span>
              </div>
              <h3 className="feature-card__title">AI Oracle Verification</h3>
              <p className="feature-card__description">
                Real-time crop monitoring using satellite imagery, weather data, 
                and IoT sensors for transparent yield predictions.
              </p>
              <Link to="/how-it-works#oracle" className="feature-card__link">
                Learn more →
              </Link>
            </div>

            <div className="feature-card card card--bordered">
              <div className="feature-card__icon">
                <span>🛡️</span>
              </div>
              <h3 className="feature-card__title">Community Safety Net</h3>
              <p className="feature-card__description">
                Liquidity pools protect both farmers and buyers against crop failures, 
                with automated compensation systems.
              </p>
              <Link to="/how-it-works#liquidity" className="feature-card__link">
                Learn more →
              </Link>
            </div>

            <div className="feature-card card card--bordered">
              <div className="feature-card__icon">
                <span>⭐</span>
              </div>
              <h3 className="feature-card__title">Trust Score System</h3>
              <p className="feature-card__description">
                Build your reputation through successful deliveries. Higher scores 
                unlock better lending rates and premium buyers.
              </p>
              <Link to="/how-it-works#trust" className="feature-card__link">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="impact section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Real Impact, Real Results</h2>
            <p className="section__description">
              Our platform is creating measurable change for farming communities
            </p>
          </div>

          <div className="impact__metrics">
            <div className="impact-metric">
              <div className="impact-metric__value">65%</div>
              <div className="impact-metric__label">Average Income Increase</div>
              <p className="impact-metric__description">
                Farmers earn significantly more by selling directly to buyers
              </p>
            </div>

            <div className="impact-metric">
              <div className="impact-metric__value">80%</div>
              <div className="impact-metric__label">Price Volatility Reduction</div>
              <p className="impact-metric__description">
                Futures contracts provide income stability and predictability
              </p>
            </div>

            <div className="impact-metric">
              <div className="impact-metric__value">70%</div>
              <div className="impact-metric__label">Access to Capital</div>
              <p className="impact-metric__description">
                Of active farmers now have access to microloans and financing
              </p>
            </div>

            <div className="impact-metric">
              <div className="impact-metric__value">10x</div>
              <div className="impact-metric__label">Market Reach</div>
              <p className="impact-metric__description">
                Farmers connect with exponentially more buyers globally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">How It Works</h2>
            <p className="section__description">
              Simple steps to transform your farming business
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step__number">1</div>
              <div className="step__content">
                <h3 className="step__title">List Your Harvest</h3>
                <p className="step__description">
                  Create a listing for your future or ready crop with photos, 
                  quantity, and expected delivery date.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step__number">2</div>
              <div className="step__content">
                <h3 className="step__title">Get Discovered</h3>
                <p className="step__description">
                  Your listing reaches thousands of buyers worldwide looking 
                  for quality produce at fair prices.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step__number">3</div>
              <div className="step__content">
                <h3 className="step__title">Receive Payment</h3>
                <p className="step__description">
                  Funds are held securely in escrow and released immediately 
                  upon verified delivery.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step__number">4</div>
              <div className="step__content">
                <h3 className="step__title">Build Your Future</h3>
                <p className="step__description">
                  Use your earnings and growing trust score to access loans 
                  and expand your farming operations.
                </p>
              </div>
            </div>
          </div>

          <div className="how-it-works__cta">
            <Link to="/how-it-works" className="btn btn--primary btn--large">
              See Full Details
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Trusted by Farmers Worldwide</h2>
            <p className="section__description">
              Real stories from farmers who transformed their livelihoods
            </p>
          </div>

          <div className="testimonials__grid">
            <div className="testimonial card">
              <div className="testimonial__rating">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="testimonial__quote">
                "Before Agri-Chain, I was selling my coffee to middlemen for 
                barely enough to survive. Now I connect directly with buyers 
                in Europe and earn 3x more. My family's life has completely changed."
              </p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">
                  <span>JK</span>
                </div>
                <div className="testimonial__info">
                  <div className="testimonial__name">Joseph Kamau</div>
                  <div className="testimonial__meta">Coffee Farmer, Kenya</div>
                  <div className="badge badge--trust-high badge--small">
                    Trust Score: 920
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial card">
              <div className="testimonial__rating">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="testimonial__quote">
                "The trust score system helped me access my first loan to buy 
                better seeds and equipment. My yields increased by 40% and I 
                can finally plan for the future."
              </p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">
                  <span>MW</span>
                </div>
                <div className="testimonial__info">
                  <div className="testimonial__name">Mary Wanjiku</div>
                  <div className="testimonial__meta">Tea Farmer, Uganda</div>
                  <div className="badge badge--trust-high badge--small">
                    Trust Score: 885
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial card">
              <div className="testimonial__rating">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="testimonial__quote">
                "As a buyer, I love the transparency. I can see exactly where 
                my coffee comes from, track its growth in real-time, and know 
                I'm paying farmers fairly. It's a win-win."
              </p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">
                  <span>SC</span>
                </div>
                <div className="testimonial__info">
                  <div className="testimonial__name">Sarah Chen</div>
                  <div className="testimonial__meta">Coffee Roaster, USA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section section--lg">
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">Ready to Transform Your Farming Future?</h2>
            <p className="cta__description">
              Join thousands of farmers already earning more and building sustainable futures
            </p>
            <div className="cta__actions">
              <Link to="/register" className="btn btn--primary btn--large">
                Start Selling Today
              </Link>
              <Link to="/contact" className="btn btn--secondary btn--large">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;