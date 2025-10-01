import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('farmers');

  return (
    <div className="how-it-works">
      {/* Hero Section */}
      <section className="how-hero">
        <div className="container">
          <h1 className="how-hero__title">How Agri-Chain Works</h1>
          <p className="how-hero__subtitle">
            Simple steps to transform agricultural markets through blockchain technology
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">The Complete Ecosystem</h2>
            <p className="section__description">
              Four revolutionary innovations working together seamlessly
            </p>
          </div>

          <div className="overview__grid">
            <div className="overview-card card card--bordered">
              <div className="overview-card__badge">
                <span className="badge badge--primary">Innovation 1</span>
              </div>
              <h3 className="overview-card__title">Dynamic Fractionalized Tokens</h3>
              <p className="overview-card__text">
                Your harvest becomes thousands of micro-investment opportunities. 
                Each 0.1kg = 1 tradeable token accessible to buyers worldwide.
              </p>
            </div>

            <div className="overview-card card card--bordered">
              <div className="overview-card__badge">
                <span className="badge badge--info">Innovation 2</span>
              </div>
              <h3 className="overview-card__title">AI Oracle Verification</h3>
              <p className="overview-card__text">
                Satellite imagery, weather data, and IoT sensors provide real-time 
                crop monitoring and tamper-proof yield predictions.
              </p>
            </div>

            <div className="overview-card card card--bordered">
              <div className="overview-card__badge">
                <span className="badge badge--success">Innovation 3</span>
              </div>
              <h3 className="overview-card__title">Community Liquidity Pools</h3>
              <p className="overview-card__text">
                Distributed risk protection for both farmers and buyers. Automated 
                compensation system and emergency support network.
              </p>
            </div>

            <div className="overview-card card card--bordered">
              <div className="overview-card__badge">
                <span className="badge badge--warning">Innovation 4</span>
              </div>
              <h3 className="overview-card__title">Gamified Trust System</h3>
              <p className="overview-card__text">
                Build your on-chain reputation through successful deliveries. 
                Unlock better rates, premium buyers, and exclusive opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="user-flows section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Step-by-Step Guides</h2>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'farmers' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('farmers')}
            >
              For Farmers
            </button>
            <button
              className={`tab ${activeTab === 'buyers' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('buyers')}
            >
              For Buyers
            </button>
          </div>

          {/* Farmers Flow */}
          {activeTab === 'farmers' && (
            <div className="flow">
              <div className="flow-step">
                <div className="flow-step__number">Step 1</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Create Your Account</h3>
                  <p className="flow-step__text">
                    Sign up using your mobile phone. Verify your identity and farm 
                    registration. Complete your farmer profile with photos and details 
                    about your farming practices.
                  </p>
                  <div className="flow-step__details card card--soft-success">
                    <h4 className="flow-step__details-title">What You'll Need:</h4>
                    <ul className="flow-step__list">
                      <li>Valid phone number</li>
                      <li>Government ID for verification</li>
                      <li>Farm location (GPS coordinates)</li>
                      <li>Photos of your farm</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 2</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">List Your Harvest</h3>
                  <p className="flow-step__text">
                    Create a listing for your crop - either future harvest (DFFT) or 
                    ready produce (DFRT). Upload photos, specify quantity, quality grade, 
                    and expected delivery date.
                  </p>
                  <div className="flow-step__details card card--soft-info">
                    <h4 className="flow-step__details-title">Listing Options:</h4>
                    <ul className="flow-step__list">
                      <li><strong>DFFT (Futures):</strong> List expected harvest 3-6 months ahead</li>
                      <li><strong>DFRT (Ready):</strong> List harvested produce available now</li>
                      <li>Set your own price per kilogram</li>
                      <li>Minimum quantity requirements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 3</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Get Discovered by Buyers</h3>
                  <p className="flow-step__text">
                    Your listing appears in the global marketplace. Buyers from around 
                    the world can discover your produce, view your trust score, and 
                    purchase tokens directly.
                  </p>
                  <div className="flow-step__details card card--soft-primary">
                    <h4 className="flow-step__details-title">What Happens:</h4>
                    <ul className="flow-step__list">
                      <li>Listing appears in searchable marketplace</li>
                      <li>AI oracle begins monitoring your crop (for DFFTs)</li>
                      <li>Buyers can purchase fractional amounts</li>
                      <li>Funds held securely in smart contract escrow</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 4</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Access Capital (Optional)</h3>
                  <p className="flow-step__text">
                    Once your tokens are purchased, qualified farmers can access 
                    microloans using DFFTs as collateral. Get capital for seeds, 
                    equipment, or farm improvements before harvest.
                  </p>
                  <div className="flow-step__details card card--soft-warning">
                    <h4 className="flow-step__details-title">Loan Benefits:</h4>
                    <ul className="flow-step__list">
                      <li>Interest rates: 3-10% based on trust score</li>
                      <li>No traditional collateral required</li>
                      <li>Flexible repayment after harvest</li>
                      <li>Build credit history for better rates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 5</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Deliver & Get Paid</h3>
                  <p className="flow-step__text">
                    Complete your harvest according to the listing specifications. 
                    Partner agents verify quality and quantity. Funds automatically 
                    released from escrow upon confirmation.
                  </p>
                  <div className="flow-step__details card card--soft-success">
                    <h4 className="flow-step__details-title">Payment Process:</h4>
                    <ul className="flow-step__list">
                      <li>Partner agent verifies delivery</li>
                      <li>Photos and GPS confirmation required</li>
                      <li>Smart contract releases payment instantly</li>
                      <li>Money sent to your mobile wallet or bank</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 6</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Build Your Reputation</h3>
                  <p className="flow-step__text">
                    Each successful delivery increases your trust score. Higher scores 
                    unlock better opportunities: lower loan rates, access to premium 
                    buyers, and priority marketplace visibility.
                  </p>
                  <div className="flow-step__details card card--soft-primary">
                    <h4 className="flow-step__details-title">Trust Score Benefits:</h4>
                    <ul className="flow-step__list">
                      <li>800+: Premium buyer access, 3-5% loan rates</li>
                      <li>600-799: Standard marketplace, 5-7% rates</li>
                      <li>Build score through deliveries, quality, reviews</li>
                      <li>View score improvement tips in dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Buyers Flow */}
          {activeTab === 'buyers' && (
            <div className="flow">
              <div className="flow-step">
                <div className="flow-step__number">Step 1</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Register as a Buyer</h3>
                  <p className="flow-step__text">
                    Create your buyer account with company details. Complete verification 
                    process. Set up payment methods and shipping addresses for seamless 
                    purchasing.
                  </p>
                  <div className="flow-step__details card card--soft-info">
                    <h4 className="flow-step__details-title">Buyer Requirements:</h4>
                    <ul className="flow-step__list">
                      <li>Company registration documents</li>
                      <li>Business verification</li>
                      <li>Payment method setup (card/crypto/M-Pesa)</li>
                      <li>Delivery address confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 2</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Browse the Marketplace</h3>
                  <p className="flow-step__text">
                    Search and filter crops by type, location, quality, and price. 
                    View detailed farmer profiles including trust scores, certifications, 
                    and past delivery history.
                  </p>
                  <div className="flow-step__details card card--soft-primary">
                    <h4 className="flow-step__details-title">Search Features:</h4>
                    <ul className="flow-step__list">
                      <li>Filter by crop type, region, organic status</li>
                      <li>Sort by price, trust score, delivery date</li>
                      <li>View real-time AI crop health data</li>
                      <li>Compare multiple farmers side-by-side</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 3</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Purchase Tokens</h3>
                  <p className="flow-step__text">
                    Select quantity and complete purchase. Funds held securely in smart 
                    contract escrow. You receive tokens representing ownership of the 
                    harvest.
                  </p>
                  <div className="flow-step__details card card--soft-success">
                    <h4 className="flow-step__details-title">Purchase Benefits:</h4>
                    <ul className="flow-step__list">
                      <li>Lock in prices months in advance</li>
                      <li>Buy fractional amounts (minimum 1kg)</li>
                      <li>Protected by escrow smart contracts</li>
                      <li>Trade tokens on secondary market</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 4</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Track Your Investment</h3>
                  <p className="flow-step__text">
                    Monitor crop progress in real-time through AI oracle updates. 
                    Receive notifications about growth milestones, weather events, 
                    and estimated delivery dates.
                  </p>
                  <div className="flow-step__details card card--soft-warning">
                    <h4 className="flow-step__details-title">Tracking Features:</h4>
                    <ul className="flow-step__list">
                      <li>Satellite imagery of your specific crops</li>
                      <li>Weather impact analysis and alerts</li>
                      <li>Yield prediction updates</li>
                      <li>Direct messaging with farmer</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 5</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Receive Your Produce</h3>
                  <p className="flow-step__text">
                    Once harvested and verified, your produce is shipped to your 
                    specified address. Track logistics in real-time. Confirm receipt 
                    to complete the transaction.
                  </p>
                  <div className="flow-step__details card card--soft-info">
                    <h4 className="flow-step__details-title">Delivery Process:</h4>
                    <ul className="flow-step__list">
                      <li>Logistics partner coordinates pickup</li>
                      <li>Real-time shipping tracking</li>
                      <li>Quality guarantee upon delivery</li>
                      <li>Issue resolution process if needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flow-step">
                <div className="flow-step__number">Step 6</div>
                <div className="flow-step__content">
                  <h3 className="flow-step__title">Trade on Secondary Market</h3>
                  <p className="flow-step__text">
                    Before delivery, trade your tokens on the secondary market. 
                    Sell at profit if prices rise, or diversify your portfolio across 
                    multiple farmers and crops.
                  </p>
                  <div className="flow-step__details card card--soft-primary">
                    <h4 className="flow-step__details-title">Trading Options:</h4>
                    <ul className="flow-step__list">
                      <li>List tokens for sale at your price</li>
                      <li>Browse buy/sell orders from other buyers</li>
                      <li>Profit locked until successful delivery</li>
                      <li>1% trading fee on secondary transactions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Key Features Deep Dive */}
      <section className="features-deep section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Understanding the Technology</h2>
            <p className="section__description">
              How each innovation works to empower farmers
            </p>
          </div>

          <div className="feature-deep" id="dffts">
            <div className="feature-deep__content">
              <div className="feature-deep__badge">
                <span className="badge badge--primary badge--large">
                  Dynamic Fractionalized Futures Tokens
                </span>
              </div>
              <h3 className="feature-deep__title">
                Transforming Harvests into Investment Opportunities
              </h3>
              <p className="feature-deep__text">
                Traditional futures contracts require large minimum purchases (often tons 
                of produce), making them accessible only to major corporations. Our DFFT 
                system breaks down each harvest into 0.1kg tokens, allowing anyone to 
                invest.
              </p>
              <div className="feature-deep__example card">
                <h4 className="feature-deep__example-title">Example:</h4>
                <p>
                  A Kenyan farmer expects a 500kg coffee harvest in 3 months. The platform 
                  creates 5,000 tokens (1 token = 0.1kg). A small café in Berlin buys 
                  1,000 tokens (100kg) for $400. The farmer gets access to capital now, 
                  the café locks in supply and price, and both benefit from transparency.
                </p>
              </div>
            </div>
          </div>

          <div className="feature-deep" id="oracle">
            <div className="feature-deep__content">
              <div className="feature-deep__badge">
                <span className="badge badge--info badge--large">
                  AI Oracle Verification System
                </span>
              </div>
              <h3 className="feature-deep__title">
                Tamper-Proof Crop Monitoring
              </h3>
              <p className="feature-deep__text">
                Our AI oracle combines satellite imagery, local weather data, and optional 
                IoT soil sensors to provide real-time crop health assessments. This creates 
                transparency for buyers and protects farmers from false claims.
              </p>
              <div className="feature-deep__stats">
                <div className="stat-box">
                  <div className="stat-box__value">90%+</div>
                  <div className="stat-box__label">Yield Prediction Accuracy</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box__value">Daily</div>
                  <div className="stat-box__label">Satellite Updates</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box__value">3-10m</div>
                  <div className="stat-box__label">Image Resolution</div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-deep" id="liquidity">
            <div className="feature-deep__content">
              <div className="feature-deep__badge">
                <span className="badge badge--success badge--large">
                  Community Liquidity Pools
                </span>
              </div>
              <h3 className="feature-deep__title">
                Distributed Risk Protection
              </h3>
              <p className="feature-deep__text">
                Platform fees and voluntary contributions fund a community pool that 
                protects against crop failures. If a farmer's harvest fails due to 
                weather or pests, buyers receive compensation, and farmers get emergency 
                support.
              </p>
              <div className="feature-deep__benefits">
                <div className="benefit-item">
                  <span className="benefit-item__icon">🛡️</span>
                  <div>
                    <h4 className="benefit-item__title">Buyer Protection</h4>
                    <p>Automatic refund if verified crop failure occurs</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-item__icon">🤝</span>
                  <div>
                    <h4 className="benefit-item__title">Farmer Support</h4>
                    <p>Emergency payments help farmers recover from disasters</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-item__icon">💰</span>
                  <div>
                    <h4 className="benefit-item__title">Microloan Funding</h4>
                    <p>Pool provides capital for low-interest farmer loans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-deep" id="trust">
            <div className="feature-deep__content">
              <div className="feature-deep__badge">
                <span className="badge badge--warning badge--large">
                  Gamified Trust Score System
                </span>
              </div>
              <h3 className="feature-deep__title">
                Building Reputation, Unlocking Opportunities
              </h3>
              <p className="feature-deep__text">
                Every transaction on the platform builds your on-chain reputation. 
                Successful deliveries, quality ratings, and buyer reviews all contribute 
                to your trust score. Higher scores mean better opportunities.
              </p>
              <div className="trust-tiers">
                <div className="trust-tier card card--bordered">
                  <div className="trust-tier__header">
                    <span className="badge badge--trust-high">800-1000</span>
                    <h4 className="trust-tier__title">Premium Tier</h4>
                  </div>
                  <ul className="trust-tier__benefits">
                    <li>3-5% loan interest rates</li>
                    <li>Access to premium buyers</li>
                    <li>Priority marketplace listing</li>
                    <li>Exclusive partnership opportunities</li>
                  </ul>
                </div>

                <div className="trust-tier card card--bordered">
                  <div className="trust-tier__header">
                    <span className="badge badge--trust-medium">600-799</span>
                    <h4 className="trust-tier__title">Standard Tier</h4>
                  </div>
                  <ul className="trust-tier__benefits">
                    <li>5-7% loan interest rates</li>
                    <li>Full marketplace access</li>
                    <li>Standard listing visibility</li>
                    <li>Good buyer selection</li>
                  </ul>
                </div>

                <div className="trust-tier card card--bordered">
                  <div className="trust-tier__header">
                    <span className="badge badge--trust-low">400-599</span>
                    <h4 className="trust-tier__title">Building Tier</h4>
                  </div>
                  <ul className="trust-tier__benefits">
                    <li>7-8% loan interest rates</li>
                    <li>Marketplace access</li>
                    <li>Mentor program support</li>
                    <li>Score improvement guidance</li>
                  </ul>
                </div>

                <div className="trust-tier card card--bordered">
                  <div className="trust-tier__header">
                    <span className="badge badge--trust-new">New User</span>
                    <h4 className="trust-tier__title">Starter Tier</h4>
                  </div>
                  <ul className="trust-tier__benefits">
                    <li>8-10% loan interest rates</li>
                    <li>Basic marketplace access</li>
                    <li>Cooperative guarantor program</li>
                    <li>Training and onboarding</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Frequently Asked Questions</h2>
          </div>

          <div className="faq__content">
            <div className="faq-item card">
              <h3 className="faq-item__question">
                What's the difference between DFFT and DFRT?
              </h3>
              <p className="faq-item__answer">
                DFFT (Dynamic Fractionalized Futures Tokens) represent future harvests 
                that haven't been completed yet - typically listed 3-6 months before 
                harvest. DFRT (Dynamic Fractionalized Ready Tokens) represent produce 
                that's already harvested and ready for immediate delivery. DFFTs allow 
                farmers to access capital before harvest, while DFRTs provide quick 
                liquidity for completed harvests.
              </p>
            </div>

            <div className="faq-item card">
              <h3 className="faq-item__question">
                What happens if a crop fails?
              </h3>
              <p className="faq-item__answer">
                If a verified crop failure occurs (confirmed by our AI oracle and 
                partner agents), the community liquidity pool automatically compensates 
                buyers with a full refund. The farmer also receives emergency support 
                to help recover. The AI oracle monitors for weather events, pest 
                infestations, and other factors that could lead to crop failure, 
                providing early warnings when possible.
              </p>
            </div>

            <div className="faq-item card">
              <h3 className="faq-item__question">
                How do I improve my trust score?
              </h3>
              <p className="faq-item__answer">
                Your trust score improves through: (1) Successful deliveries on time 
                and as specified (40% weight), (2) High quality ratings from buyers 
                (25% weight), (3) Timely loan repayments if you use the lending feature 
                (20% weight), (4) Positive community contributions and peer reviews 
                (15% weight). Your dashboard shows specific recommendations for 
                improving your score.
              </p>
            </div>

            <div className="faq-item card">
              <h3 className="faq-item__question">
                What are the fees?
              </h3>
              <p className="faq-item__answer">
                Platform fees are: 2.5% on primary marketplace transactions (farmer to 
                buyer), 1% on secondary market trading (buyer to buyer), and 5-10% 
                annual interest on microloans (based on your trust score). These fees 
                are significantly lower than traditional intermediaries who often charge 
                15-30% per layer.
              </p>
            </div>

            <div className="faq-item card">
              <h3 className="faq-item__question">
                How is the AI oracle different from traditional insurance?
              </h3>
              <p className="faq-item__answer">
                Traditional crop insurance requires extensive paperwork, has long claim 
                processes, and often disputes losses. Our AI oracle provides objective, 
                tamper-proof verification using satellite data and weather information. 
                If crop failure is detected, compensation is automatic and instant 
                through smart contracts - no paperwork or waiting.
              </p>
            </div>

            <div className="faq-item card">
              <h3 className="faq-item__question">
                Can I cancel after purchasing tokens?
              </h3>
              <p className="faq-item__answer">
                Yes, you can sell your tokens on the secondary market before delivery. 
                The platform facilitates buyer-to-buyer trading. If prices have increased, 
                you can sell at a profit. If you simply want to exit your position, you 
                can sell at current market rates. Note: Your profit is only realized 
                after successful delivery to the new token holder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="how-cta section section--lg">
        <div className="container">
          <div className="how-cta__content">
            <h2 className="how-cta__title">Ready to Get Started?</h2>
            <p className="how-cta__description">
              Join thousands of farmers and buyers already benefiting from transparent, 
              fair agricultural markets.
            </p>
            <div className="how-cta__actions">
              <Link to="/register" className="btn btn--primary btn--large">
                Create Account
              </Link>
              <Link to="/contact" className="btn btn--secondary btn--large">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;