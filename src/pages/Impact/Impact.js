import React from 'react';
import { Link } from 'react-router-dom';
import './Impact.css';

const Impact = () => {
  return (
    <div className="impact-page">
      {/* Hero Section */}
      <section className="impact-hero">
        <div className="container">
          <h1 className="impact-hero__title">Our Global Impact</h1>
          <p className="impact-hero__subtitle">
            Measuring real change for farming communities and the environment
          </p>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="metrics-dashboard section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Impact by the Numbers</h2>
            <p className="section__description">
              Real-time data showing the transformation we're creating together
            </p>
          </div>

          <div className="metrics-grid">
            <div className="metric-card card card--highlight-primary">
              <div className="metric-card__icon">👨‍🌾</div>
              <div className="metric-card__value">5,247</div>
              <div className="metric-card__label">Farmers Empowered</div>
              <div className="metric-card__change">
                <span className="metric-card__change-value positive">+23%</span>
                <span className="metric-card__change-label">this quarter</span>
              </div>
            </div>

            <div className="metric-card card card--highlight-success">
              <div className="metric-card__icon">💰</div>
              <div className="metric-card__value">65%</div>
              <div className="metric-card__label">Average Income Increase</div>
              <div className="metric-card__change">
                <span className="metric-card__change-value positive">+5%</span>
                <span className="metric-card__change-label">vs last year</span>
              </div>
            </div>

            <div className="metric-card card card--highlight-info">
              <div className="metric-card__icon">🌍</div>
              <div className="metric-card__value">12</div>
              <div className="metric-card__label">Countries Reached</div>
              <div className="metric-card__change">
                <span className="metric-card__change-value positive">+3</span>
                <span className="metric-card__change-label">new this year</span>
              </div>
            </div>

            <div className="metric-card card card--highlight-warning">
              <div className="metric-card__icon">📊</div>
              <div className="metric-card__value">$2.4M</div>
              <div className="metric-card__label">Total Transactions</div>
              <div className="metric-card__change">
                <span className="metric-card__change-value positive">+127%</span>
                <span className="metric-card__change-label">year over year</span>
              </div>
            </div>

            <div className="metric-card card card--highlight-primary">
              <div className="metric-card__icon">🏦</div>
              <div className="metric-card__value">$487K</div>
              <div className="metric-card__label">Loans Disbursed</div>
              <div className="metric-card__change">
                <span className="metric-card__change-value positive">+94%</span>
                <span className="metric-card__change-label">this year</span>
              </div>
            </div>

            <div className="metric-card card card--highlight-success">
              <div className="metric-card__icon">✅</div>
              <div className="metric-card__value">98.7%</div>
              <div className="metric-card__label">Successful Deliveries</div>
              <div className="metric-card__change">
                <span className="metric-card__change-value positive">+1.2%</span>
                <span className="metric-card__change-label">improvement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Income Comparison */}
      <section className="income-comparison section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Transforming Farmer Livelihoods</h2>
            <p className="section__description">
              Comparing income before and after joining our platform
            </p>
          </div>

          <div className="comparison-visual">
            <div className="comparison-side">
              <h3 className="comparison-side__title">Before Agri-Chain</h3>
              <div className="comparison-side__content card">
                <div className="income-bar income-bar--before">
                  <div className="income-bar__fill" style={{width: '35%'}}>
                    <span className="income-bar__label">$245/month</span>
                  </div>
                </div>
                <ul className="comparison-side__list">
                  <li>4-7 middlemen taking 15-30% each</li>
                  <li>Receive only 10-20% of final price</li>
                  <li>No price predictability</li>
                  <li>Limited market access</li>
                  <li>No access to capital</li>
                  <li>Exploitative loan rates (20-40%)</li>
                </ul>
              </div>
            </div>

            <div className="comparison-arrow">→</div>

            <div className="comparison-side">
              <h3 className="comparison-side__title">After Agri-Chain</h3>
              <div className="comparison-side__content card card--accent-success">
                <div className="income-bar income-bar--after">
                  <div className="income-bar__fill" style={{width: '100%'}}>
                    <span className="income-bar__label">$700/month</span>
                  </div>
                </div>
                <ul className="comparison-side__list">
                  <li>Direct connection to global buyers</li>
                  <li>Receive 85-90% of final price</li>
                  <li>Lock in prices months ahead</li>
                  <li>Access to thousands of buyers</li>
                  <li>Microloans at 3-10% based on trust score</li>
                  <li>Build credit history and reputation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Stories of Transformation</h2>
            <p className="section__description">
              Real farmers, real impact, real change
            </p>
          </div>

          <div className="stories-grid">
            <div className="story-card card">
              <div className="story-card__image">
                <div className="story-card__image-placeholder">
                  <span>👨‍🌾</span>
                </div>
                <div className="story-card__badge">
                  <span className="badge badge--trust-high">Trust Score: 920</span>
                </div>
              </div>
              <div className="story-card__content">
                <h3 className="story-card__title">From Survival to Thriving</h3>
                <div className="story-card__author">
                  <strong>Joseph Kamau</strong> • Coffee Farmer, Kenya
                </div>
                <p className="story-card__excerpt">
                  "Before Agri-Chain, I was barely surviving. Middlemen paid me $2/kg 
                  for coffee that sold for $15/kg in Nairobi. Now I sell directly to 
                  buyers in Europe for $8/kg. I've expanded my farm, hired 3 workers, 
                  and my children are in good schools."
                </p>
                <div className="story-card__stats">
                  <div className="story-stat">
                    <span className="story-stat__value">4x</span>
                    <span className="story-stat__label">Income Growth</span>
                  </div>
                  <div className="story-stat">
                    <span className="story-stat__value">47</span>
                    <span className="story-stat__label">Deliveries</span>
                  </div>
                  <div className="story-stat">
                    <span className="story-stat__value">2 years</span>
                    <span className="story-stat__label">On Platform</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card card">
              <div className="story-card__image">
                <div className="story-card__image-placeholder">
                  <span>👩‍🌾</span>
                </div>
                <div className="story-card__badge">
                  <span className="badge badge--trust-high">Trust Score: 885</span>
                </div>
              </div>
              <div className="story-card__content">
                <h3 className="story-card__title">Breaking Barriers</h3>
                <div className="story-card__author">
                  <strong>Mary Wanjiku</strong> • Tea Farmer, Uganda
                </div>
                <p className="story-card__excerpt">
                  "As a woman farmer, banks wouldn't give me loans. My trust score 
                  on Agri-Chain opened doors. I got a loan at 5% interest, bought 
                  irrigation equipment, and my yields increased 40%. I'm now a mentor 
                  to 15 other women farmers."
                </p>
                <div className="story-card__stats">
                  <div className="story-stat">
                    <span className="story-stat__value">40%</span>
                    <span className="story-stat__label">Yield Increase</span>
                  </div>
                  <div className="story-stat">
                    <span className="story-stat__value">$3,200</span>
                    <span className="story-stat__label">Loan Accessed</span>
                  </div>
                  <div className="story-stat">
                    <span className="story-stat__value">1.5 years</span>
                    <span className="story-stat__label">On Platform</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card card">
              <div className="story-card__image">
                <div className="story-card__image-placeholder">
                  <span>🧑‍🌾</span>
                </div>
                <div className="story-card__badge">
                  <span className="badge badge--trust-high">Trust Score: 795</span>
                </div>
              </div>
              <div className="story-card__content">
                <h3 className="story-card__title">Building a Legacy</h3>
                <div className="story-card__author">
                  <strong>David Omondi</strong> • Maize Farmer, Tanzania
                </div>
                <p className="story-card__excerpt">
                  "I used to lose 30% of my harvest to spoilage waiting for buyers. 
                  With futures tokens, I sell my harvest 4 months before it's ready. 
                  I use that money to improve my farm. My income stability changed 
                  everything for my family."
                </p>
                <div className="story-card__stats">
                  <div className="story-stat">
                    <span className="story-stat__value">85%</span>
                    <span className="story-stat__label">Less Waste</span>
                  </div>
                  <div className="story-stat">
                    <span className="story-stat__value">32</span>
                    <span className="story-stat__label">Deliveries</span>
                  </div>
                  <div className="story-stat">
                    <span className="story-stat__value">18 months</span>
                    <span className="story-stat__label">On Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="sdg-alignment section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">UN Sustainable Development Goals</h2>
            <p className="section__description">
              Our direct contribution to global development targets
            </p>
          </div>

          <div className="sdg-grid">
            <div className="sdg-card card">
              <div className="sdg-card__number">1</div>
              <h3 className="sdg-card__title">No Poverty</h3>
              <p className="sdg-card__text">
                Increasing farmer incomes by 65% lifts thousands of families out 
                of poverty and creates sustainable livelihoods.
              </p>
              <div className="sdg-card__metric">
                <strong>3,840 farmers</strong> moved above poverty line
              </div>
            </div>

            <div className="sdg-card card">
              <div className="sdg-card__number">2</div>
              <h3 className="sdg-card__title">Zero Hunger</h3>
              <p className="sdg-card__text">
                Improved farmer income means better nutrition for farming families 
                and increased food production efficiency.
              </p>
              <div className="sdg-card__metric">
                <strong>12,400 people</strong> with improved food security
              </div>
            </div>

            <div className="sdg-card card">
              <div className="sdg-card__number">5</div>
              <h3 className="sdg-card__title">Gender Equality</h3>
              <p className="sdg-card__text">
                42% of our farmers are women. Trust-based lending removes gender 
                discrimination in agricultural finance.
              </p>
              <div className="sdg-card__metric">
                <strong>2,204 women farmers</strong> accessing capital
              </div>
            </div>

            <div className="sdg-card card">
              <div className="sdg-card__number">8</div>
              <h3 className="sdg-card__title">Decent Work</h3>
              <p className="sdg-card__text">
                Fair pricing and direct market access transform farming from 
                exploitation to dignified entrepreneurship.
              </p>
              <div className="sdg-card__metric">
                <strong>5,247 farmers</strong> with fair work conditions
              </div>
            </div>

            <div className="sdg-card card">
              <div className="sdg-card__number">10</div>
              <h3 className="sdg-card__title">Reduced Inequalities</h3>
              <p className="sdg-card__text">
                Blockchain technology gives smallholder farmers equal access to 
                global markets previously dominated by large corporations.
              </p>
              <div className="sdg-card__metric">
                <strong>10x market reach</strong> for rural farmers
              </div>
            </div>

            <div className="sdg-card card">
              <div className="sdg-card__number">13</div>
              <h3 className="sdg-card__title">Climate Action</h3>
              <p className="sdg-card__text">
                AI monitoring helps farmers adapt to climate change. Sustainable 
                practices rewarded through premium pricing.
              </p>
              <div className="sdg-card__metric">
                <strong>1,847 hectares</strong> using climate-smart practices
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="environmental-impact section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Environmental Stewardship</h2>
            <p className="section__description">
              Measuring our ecological footprint and improvements
            </p>
          </div>

          <div className="environmental-grid">
            <div className="environmental-card card card--accent-success">
              <div className="environmental-card__icon">🌱</div>
              <div className="environmental-card__value">67%</div>
              <div className="environmental-card__label">
                Organic Certified Farms
              </div>
              <p className="environmental-card__text">
                Platform incentivizes organic practices through premium pricing, 
                leading to healthier soil and reduced chemical use.
              </p>
            </div>

            <div className="environmental-card card card--accent-info">
              <div className="environmental-card__icon">💧</div>
              <div className="environmental-card__value">2.4M L</div>
              <div className="environmental-card__label">
                Water Saved Annually
              </div>
              <p className="environmental-card__text">
                Efficient irrigation systems funded through platform loans reduce 
                water consumption by 35% on average.
              </p>
            </div>

            <div className="environmental-card card card--accent-warning">
              <div className="environmental-card__icon">🌳</div>
              <div className="environmental-card__value">18,400</div>
              <div className="environmental-card__label">
                Trees Planted
              </div>
              <p className="environmental-card__text">
                Agroforestry programs supported through farmer education and 
                cooperative initiatives on the platform.
              </p>
            </div>

            <div className="environmental-card card card--accent-primary">
              <div className="environmental-card__icon">♻️</div>
              <div className="environmental-card__value">420 tons</div>
              <div className="environmental-card__label">
                CO₂ Offset
              </div>
              <p className="environmental-card__text">
                Reduced transportation emissions through optimized logistics and 
                local buyer connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="community-impact section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Ripple Effects in Communities</h2>
            <p className="section__description">
              How improved farmer income transforms entire villages
            </p>
          </div>

          <div className="ripple-effects">
            <div className="ripple-effect card">
              <div className="ripple-effect__icon">🏫</div>
              <h3 className="ripple-effect__title">Education</h3>
              <div className="ripple-effect__stat">4,820 children</div>
              <p className="ripple-effect__text">
                Increased farmer income means children stay in school instead of 
                working in fields. Secondary school enrollment up 73%.
              </p>
            </div>

            <div className="ripple-effect card">
              <div className="ripple-effect__icon">🏥</div>
              <h3 className="ripple-effect__title">Healthcare</h3>
              <div className="ripple-effect__stat">12,400 people</div>
              <p className="ripple-effect__text">
                Farming families can now afford healthcare. Hospital visits for 
                preventable diseases down 54%.
              </p>
            </div>

            <div className="ripple-effect card">
              <div className="ripple-effect__icon">💼</div>
              <h3 className="ripple-effect__title">Employment</h3>
              <div className="ripple-effect__stat">840 jobs created</div>
              <p className="ripple-effect__text">
                Successful farmers hire workers, creating employment in rural 
                areas and reducing urban migration.
              </p>
            </div>

            <div className="ripple-effect card">
              <div className="ripple-effect__icon">🏠</div>
              <h3 className="ripple-effect__title">Infrastructure</h3>
              <div className="ripple-effect__stat">27 communities</div>
              <p className="ripple-effect__text">
                Farmer cooperatives pool resources to improve roads, water 
                access, and community facilities.
              </p>
            </div>

            <div className="ripple-effect card">
              <div className="ripple-effect__icon">👩‍🏫</div>
              <h3 className="ripple-effect__title">Women Empowerment</h3>
              <div className="ripple-effect__stat">2,204 women</div>
              <p className="ripple-effect__text">
                Female farmers gain financial independence, decision-making 
                power, and leadership roles in communities.
              </p>
            </div>

            <div className="ripple-effect card">
              <div className="ripple-effect__icon">🌾</div>
              <h3 className="ripple-effect__title">Food Security</h3>
              <div className="ripple-effect__stat">45 villages</div>
              <p className="ripple-effect__text">
                Diversified crop production and improved farming techniques increase local food availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Report */}
      <section className="transparency section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Transparency & Accountability</h2>
            <p className="section__description">
              We believe in honest reporting of both successes and challenges
            </p>
          </div>

          <div className="transparency-content">
            <div className="transparency-item card card--soft-success">
              <h3 className="transparency-item__title">What's Working Well</h3>
              <ul className="transparency-item__list">
                <li>98.7% successful delivery rate exceeds expectations</li>
                <li>Farmer income increase of 65% surpasses initial 50% target</li>
                <li>Trust score system effectively builds reputation</li>
                <li>AI oracle 90%+ accurate in yield predictions</li>
                <li>Secondary market trading provides liquidity for buyers</li>
              </ul>
            </div>

            <div className="transparency-item card card--soft-warning">
              <h3 className="transparency-item__title">Current Challenges</h3>
              <ul className="transparency-item__list">
                <li>Internet connectivity issues in remote farming areas</li>
                <li>Need for more local-language support and training</li>
                <li>Scaling verification agents to match farmer growth</li>
                <li>Weather-related crop failures still affect 3-5% of listings</li>
                <li>Building trust with traditional farming communities</li>
              </ul>
            </div>

            <div className="transparency-item card card--soft-info">
              <h3 className="transparency-item__title">Our Commitments</h3>
              <ul className="transparency-item__list">
                <li>Publish quarterly impact reports with verified data</li>
                <li>Third-party audits of our social impact metrics</li>
                <li>Open-source our AI oracle algorithms for transparency</li>
                <li>Maintain 2.5% or lower platform fees</li>
                <li>Invest 10% of profits into farmer education programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="impact-cta section section--lg">
        <div className="container">
          <div className="impact-cta__content">
            <h2 className="impact-cta__title">Be Part of This Transformation</h2>
            <p className="impact-cta__description">
              Every transaction on our platform creates ripples of positive change. 
              Join us in building a fairer, more sustainable agricultural future.
            </p>
            <div className="impact-cta__actions">
              <Link to="/register" className="btn btn--primary btn--large">
                Start Making Impact
              </Link>
              <Link to="/about" className="btn btn--secondary btn--large">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;