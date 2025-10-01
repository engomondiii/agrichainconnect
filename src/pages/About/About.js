import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero__title">
            Transforming Agriculture Through Technology and Trust
          </h1>
          <p className="about-hero__subtitle">
            We're on a mission to empower smallholder farmers worldwide by 
            connecting them directly to global markets, eliminating exploitation, 
            and creating sustainable farming futures.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision section">
        <div className="container">
          <div className="mission-vision__grid">
            <div className="mission-vision__card card card--accent-primary">
              <h2 className="mission-vision__title">Our Mission</h2>
              <p className="mission-vision__text">
                To revolutionize agricultural markets by providing smallholder 
                farmers with direct access to global buyers, transparent pricing, 
                and financial tools that transform farming from survival to 
                thriving entrepreneurship.
              </p>
            </div>

            <div className="mission-vision__card card card--accent-info">
              <h2 className="mission-vision__title">Our Vision</h2>
              <p className="mission-vision__text">
                A world where every smallholder farmer has equal access to global 
                markets, fair pricing, and the financial resources needed to build 
                sustainable, profitable farming businesses that support their families 
                and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="problem section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">The Global Agricultural Crisis</h2>
            <p className="section__description">
              500 million smallholder farmers face systematic exploitation and poverty
            </p>
          </div>

          <div className="problem__grid">
            <div className="problem-card">
              <div className="problem-card__icon">📉</div>
              <h3 className="problem-card__title">Middleman Exploitation</h3>
              <p className="problem-card__text">
                Farmers receive only 10-20% of the final consumer price, with 
                4-7 intermediaries extracting 15-30% margins each.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-card__icon">📊</div>
              <h3 className="problem-card__title">Price Volatility</h3>
              <p className="problem-card__text">
                30-60% annual price fluctuations make income planning impossible, 
                preventing investment in farm improvements.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-card__icon">🚫</div>
              <h3 className="problem-card__title">Limited Market Access</h3>
              <p className="problem-card__text">
                Geographic isolation and lack of market information force farmers 
                to accept whatever local buyers offer.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-card__icon">💰</div>
              <h3 className="problem-card__title">Capital Constraints</h3>
              <p className="problem-card__text">
                Without collateral, farmers cannot access loans. Informal lenders 
                charge 20-40% monthly interest rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="solution section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Our Revolutionary Solution</h2>
            <p className="section__description">
              Four interconnected innovations working together
            </p>
          </div>

          <div className="solution__content">
            <div className="solution-item">
              <div className="solution-item__header">
                <span className="solution-item__number">01</span>
                <h3 className="solution-item__title">
                  Fractionalized Futures Tokens
                </h3>
              </div>
              <p className="solution-item__text">
                Transform harvests into thousands of micro-investment opportunities. 
                A 500kg coffee harvest becomes 5,000 tradeable tokens, accessible 
                to buyers worldwide.
              </p>
            </div>

            <div className="solution-item">
              <div className="solution-item__header">
                <span className="solution-item__number">02</span>
                <h3 className="solution-item__title">
                  AI-Powered Oracle Verification
                </h3>
              </div>
              <p className="solution-item__text">
                Real-time crop monitoring using satellite imagery, weather data, 
                and IoT sensors creates tamper-proof yield predictions and quality 
                verification.
              </p>
            </div>

            <div className="solution-item">
              <div className="solution-item__header">
                <span className="solution-item__number">03</span>
                <h3 className="solution-item__title">
                  Community Liquidity Pools
                </h3>
              </div>
              <p className="solution-item__text">
                Distributed risk management protects both farmers and buyers. 
                Automated compensation for crop failures and emergency support 
                for farmers in crisis.
              </p>
            </div>

            <div className="solution-item">
              <div className="solution-item__header">
                <span className="solution-item__number">04</span>
                <h3 className="solution-item__title">
                  Gamified Trust System
                </h3>
              </div>
              <p className="solution-item__text">
                On-chain reputation scores unlock better lending rates, premium 
                buyers, and enhanced opportunities. Success builds verifiable 
                credibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Meet Our Team</h2>
            <p className="section__description">
              Passionate professionals dedicated to agricultural transformation
            </p>
          </div>

          <div className="team__grid">
            <div className="team-member card">
              <div className="team-member__avatar">
                <span>JM</span>
              </div>
              <h3 className="team-member__name">John Mwangi</h3>
              <div className="team-member__role">Chief Executive Officer</div>
              <p className="team-member__bio">
                Former agricultural economist with 15 years of experience in 
                emerging markets. Passionate about using technology to empower 
                smallholder farmers.
              </p>
            </div>

            <div className="team-member card">
              <div className="team-member__avatar">
                <span>SK</span>
              </div>
              <h3 className="team-member__name">Sarah Kimani</h3>
              <div className="team-member__role">Chief Technology Officer</div>
              <p className="team-member__bio">
                Blockchain architect and AI specialist. Led development of 
                multiple DeFi platforms. MIT graduate with expertise in 
                decentralized systems.
              </p>
            </div>

            <div className="team-member card">
              <div className="team-member__avatar">
                <span>DO</span>
              </div>
              <h3 className="team-member__name">David Ochieng</h3>
              <div className="team-member__role">Chief Operating Officer</div>
              <p className="team-member__bio">
                Operations expert with deep knowledge of African agricultural 
                supply chains. Former head of operations at major agricultural 
                cooperative.
              </p>
            </div>

            <div className="team-member card">
              <div className="team-member__avatar">
                <span>GW</span>
              </div>
              <h3 className="team-member__name">Grace Wanjiru</h3>
              <div className="team-member__role">Chief Impact Officer</div>
              <p className="team-member__bio">
                Social impact measurement specialist. PhD in Development Economics. 
                Ensures our platform creates measurable positive change for 
                farming communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Our Journey</h2>
            <p className="section__description">
              Building the future of agriculture, one milestone at a time
            </p>
          </div>

          <div className="timeline__content">
            <div className="timeline-item">
              <div className="timeline-item__marker"></div>
              <div className="timeline-item__content card">
                <div className="timeline-item__date">Q1 2024</div>
                <h3 className="timeline-item__title">Project Conception</h3>
                <p className="timeline-item__text">
                  Research phase begins. Team conducts extensive field research 
                  with 2,800+ farmers across Kenya, Uganda, and Tanzania.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-item__marker"></div>
              <div className="timeline-item__content card">
                <div className="timeline-item__date">Q3 2024</div>
                <h3 className="timeline-item__title">Platform Development</h3>
                <p className="timeline-item__text">
                  Smart contracts developed and audited. AI oracle system tested 
                  with satellite imagery and weather data integration.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-item__marker"></div>
              <div className="timeline-item__content card">
                <div className="timeline-item__date">Q4 2024</div>
                <h3 className="timeline-item__title">Pilot Launch</h3>
                <p className="timeline-item__text">
                  Beta platform launched with 100 farmers in Kenya. First 
                  successful transactions completed with international buyers.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-item__marker timeline-item__marker--active"></div>
              <div className="timeline-item__content card card--accent-primary">
                <div className="timeline-item__date">Q1 2025</div>
                <h3 className="timeline-item__title">Full Platform Launch</h3>
                <p className="timeline-item__text">
                  Expanding to 1,000+ farmers. Launching DeFi lending features 
                  and secondary market trading capabilities.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-item__marker"></div>
              <div className="timeline-item__content card">
                <div className="timeline-item__date">Q3 2025</div>
                <h3 className="timeline-item__title">Regional Expansion</h3>
                <p className="timeline-item__text">
                  Scaling to 5,000 farmers across East Africa. Partnerships with 
                  major international buyers and impact investors.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-item__marker"></div>
              <div className="timeline-item__content card">
                <div className="timeline-item__date">2026</div>
                <h3 className="timeline-item__title">Global Reach</h3>
                <p className="timeline-item__text">
                  Expanding to Southeast Asia and Latin America. Target of 
                  25,000+ farmers with continental presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Our Partners</h2>
            <p className="section__description">
              Working together to transform agricultural markets
            </p>
          </div>

          <div className="partners__grid">
            <div className="partner-card card">
              <div className="partner-card__logo">
                <span>🏦</span>
              </div>
              <h3 className="partner-card__name">Equity Bank</h3>
              <p className="partner-card__description">
                Banking and financial services partnership for fiat integration
              </p>
            </div>

            <div className="partner-card card">
              <div className="partner-card__logo">
                <span>🌐</span>
              </div>
              <h3 className="partner-card__name">Polygon Network</h3>
              <p className="partner-card__description">
                Layer-2 blockchain infrastructure for scalable transactions
              </p>
            </div>

            <div className="partner-card card">
              <div className="partner-card__logo">
                <span>🛰️</span>
              </div>
              <h3 className="partner-card__name">SatSure</h3>
              <p className="partner-card__description">
                Satellite imagery and AI-powered agricultural analytics
              </p>
            </div>

            <div className="partner-card card">
              <div className="partner-card__logo">
                <span>☕</span>
              </div>
              <h3 className="partner-card__name">Premium Coffee Buyers</h3>
              <p className="partner-card__description">
                Direct relationships with specialty coffee roasters globally
              </p>
            </div>

            <div className="partner-card card">
              <div className="partner-card__logo">
                <span>🤝</span>
              </div>
              <h3 className="partner-card__name">Farmer Cooperatives</h3>
              <p className="partner-card__description">
                15+ cooperative partnerships representing 8,000+ farmers
              </p>
            </div>

            <div className="partner-card card">
              <div className="partner-card__logo">
                <span>🌍</span>
              </div>
              <h3 className="partner-card__name">Impact Investors</h3>
              <p className="partner-card__description">
                Strategic funding from development finance institutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section section--lg">
        <div className="container">
          <div className="about-cta__content">
            <h2 className="about-cta__title">Join Our Mission</h2>
            <p className="about-cta__description">
              Whether you're a farmer looking to transform your livelihood or a 
              buyer seeking transparent, ethical sourcing, we'd love to have you 
              on this journey.
            </p>
            <div className="about-cta__actions">
              <Link to="/register" className="btn btn--primary btn--large">
                Get Started
              </Link>
              <Link to="/contact" className="btn btn--secondary btn--large">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;