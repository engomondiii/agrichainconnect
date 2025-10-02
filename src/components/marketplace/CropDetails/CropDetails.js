import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CropDetails.css';

const CropDetails = ({ crop, onPurchase, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  if (!crop) return null;

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get trust score badge
  const getTrustScoreBadge = (score) => {
    if (score >= 800) return 'badge--trust-high';
    if (score >= 600) return 'badge--trust-medium';
    if (score >= 400) return 'badge--trust-low';
    return 'badge--trust-new';
  };

  // Default images if none provided
  const images = crop.images && crop.images.length > 0 
    ? crop.images 
    : ['/assets/images/placeholder-crop.jpg'];

  return (
    <div className="crop-details">
      {/* Close Button */}
      {onClose && (
        <button className="crop-details__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      )}

      <div className="crop-details__container">
        {/* Left Side - Images */}
        <div className="crop-details__gallery">
          {/* Main Image */}
          <div className="crop-details__main-image">
            <img 
              src={images[selectedImage]} 
              alt={`${crop.name} - ${selectedImage + 1}`}
              className="crop-details__image"
            />
            {crop.tokenType && (
              <div className="crop-details__badge">
                <span className={`badge ${crop.tokenType === 'DFFT' ? 'badge--primary' : 'badge--success'}`}>
                  {crop.tokenType}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="crop-details__thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`crop-details__thumbnail ${selectedImage === index ? 'crop-details__thumbnail--active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Information */}
        <div className="crop-details__info">
          {/* Header */}
          <div className="crop-details__header">
            <h2 className="crop-details__name">{crop.name}</h2>
            <div className="crop-details__meta">
              <span className="crop-details__type">{crop.type}</span>
              <span className="crop-details__separator">•</span>
              <span className="crop-details__location">
                {crop.location}
              </span>
            </div>
          </div>

          {/* Farmer Profile Preview */}
          <div className="crop-details__farmer card card--soft-secondary">
            <div className="crop-details__farmer-header">
              <div className="crop-details__farmer-avatar">
                {crop.farmer?.avatar ? (
                  <img src={crop.farmer.avatar} alt={crop.farmer.name} />
                ) : (
                  <span>{crop.farmer?.name?.charAt(0) || 'F'}</span>
                )}
              </div>
              <div className="crop-details__farmer-info">
                <h4 className="crop-details__farmer-name">{crop.farmer?.name || 'Unknown Farmer'}</h4>
                <div className="crop-details__farmer-meta">
                  <span className={`badge ${getTrustScoreBadge(crop.farmer?.trustScore || 0)}`}>
                    Trust Score: {crop.farmer?.trustScore || 0}
                  </span>
                  <span className="crop-details__farmer-deliveries">
                    {crop.farmer?.successfulDeliveries || 0} successful deliveries
                  </span>
                </div>
              </div>
            </div>
            <Link to={`/farmers/${crop.farmer?.id}`} className="btn btn--secondary btn--small">
              View Farmer Profile
            </Link>
          </div>

          {/* Price & Purchase */}
          <div className="crop-details__pricing card card--accent-success">
            <div className="crop-details__price-row">
              <div className="crop-details__price-item">
                <span className="crop-details__price-label">Price per Token</span>
                <span className="crop-details__price-value">{formatPrice(crop.pricePerToken)}</span>
              </div>
              <div className="crop-details__price-item">
                <span className="crop-details__price-label">Available</span>
                <span className="crop-details__price-value">
                  {crop.availableTokens?.toLocaleString()} tokens
                </span>
              </div>
            </div>
            <div className="crop-details__price-note">
              1 token = 0.1 kg • Min. purchase: {crop.minimumPurchase || 10} tokens
            </div>
            <button 
              className="btn btn--primary btn--large btn--full"
              onClick={() => onPurchase && onPurchase(crop)}
            >
              Purchase Tokens
            </button>
          </div>

          {/* Tabs */}
          <div className="crop-details__tabs">
            <button
              className={`crop-details__tab ${activeTab === 'details' ? 'crop-details__tab--active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button
              className={`crop-details__tab ${activeTab === 'oracle' ? 'crop-details__tab--active' : ''}`}
              onClick={() => setActiveTab('oracle')}
            >
              AI Oracle Data
            </button>
            <button
              className={`crop-details__tab ${activeTab === 'timeline' ? 'crop-details__tab--active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </button>
          </div>

          {/* Tab Content */}
          <div className="crop-details__tab-content">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="crop-details__details">
                <h3 className="crop-details__section-title">Crop Information</h3>
                
                <div className="crop-details__info-grid">
                  <div className="crop-details__info-item">
                    <span className="crop-details__info-label">Variety</span>
                    <span className="crop-details__info-value">{crop.variety || 'Standard'}</span>
                  </div>
                  
                  <div className="crop-details__info-item">
                    <span className="crop-details__info-label">Quality Grade</span>
                    <span className="crop-details__info-value">{crop.qualityGrade || 'Grade A'}</span>
                  </div>
                  
                  <div className="crop-details__info-item">
                    <span className="crop-details__info-label">Organic</span>
                    <span className="crop-details__info-value">
                      {crop.organic ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  
                  <div className="crop-details__info-item">
                    <span className="crop-details__info-label">Certified</span>
                    <span className="crop-details__info-value">
                      {crop.certified ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  
                  {crop.tokenType === 'DFFT' && crop.plantingDate && (
                    <div className="crop-details__info-item">
                      <span className="crop-details__info-label">Planting Date</span>
                      <span className="crop-details__info-value">{formatDate(crop.plantingDate)}</span>
                    </div>
                  )}
                  
                  {crop.expectedHarvestDate && (
                    <div className="crop-details__info-item">
                      <span className="crop-details__info-label">Expected Harvest</span>
                      <span className="crop-details__info-value">{formatDate(crop.expectedHarvestDate)}</span>
                    </div>
                  )}
                  
                  <div className="crop-details__info-item">
                    <span className="crop-details__info-label">Farm Size</span>
                    <span className="crop-details__info-value">{crop.farmSize ||'2 hectares'}</span>
                  </div>
                  
                  <div className="crop-details__info-item">
                    <span className="crop-details__info-label">Total Quantity</span>
                    <span className="crop-details__info-value">{crop.totalQuantity} kg</span>
                  </div>
                </div>

                {crop.description && (
                  <div className="crop-details__description">
                    <h4 className="crop-details__subsection-title">Description</h4>
                    <p>{crop.description}</p>
                  </div>
                )}

                {crop.certifications && crop.certifications.length > 0 && (
                  <div className="crop-details__certifications">
                    <h4 className="crop-details__subsection-title">Certifications</h4>
                    <div className="crop-details__badges">
                      {crop.certifications.map((cert, index) => (
                        <span key={index} className="badge badge--success-soft">
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI Oracle Data Tab */}
            {activeTab === 'oracle' && (
              <div className="crop-details__oracle">
                <h3 className="crop-details__section-title">AI Oracle Monitoring</h3>
                
                {crop.tokenType === 'DFFT' ? (
                  <>
                    <div className="crop-details__oracle-status card card--soft-success">
                      <div className="crop-details__oracle-header">
                        <span className="crop-details__oracle-icon">🛰️</span>
                        <div>
                          <h4 className="crop-details__oracle-title">Crop Health Status</h4>
                          <p className="crop-details__oracle-subtitle">Last updated: {formatDate(crop.oracleData?.lastUpdate || new Date())}</p>
                        </div>
                      </div>
                      <div className="crop-details__oracle-metric">
                        <span className="crop-details__oracle-label">Overall Health Score</span>
                        <span className="crop-details__oracle-value crop-details__oracle-value--good">
                          {crop.oracleData?.healthScore || 92}%
                        </span>
                      </div>
                    </div>

                    <div className="crop-details__oracle-metrics">
                      <div className="crop-details__oracle-card">
                        <div className="crop-details__oracle-card-icon">🌱</div>
                        <div className="crop-details__oracle-card-label">Growth Stage</div>
                        <div className="crop-details__oracle-card-value">
                          {crop.oracleData?.growthStage || 'Vegetative'}
                        </div>
                        <div className="crop-details__oracle-card-progress">
                          <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: `${crop.oracleData?.growthProgress || 65}%` }}></div>
                          </div>
                          <span>{crop.oracleData?.growthProgress || 65}% Complete</span>
                        </div>
                      </div>

                      <div className="crop-details__oracle-card">
                        <div className="crop-details__oracle-card-icon">💧</div>
                        <div className="crop-details__oracle-card-label">Soil Moisture</div>
                        <div className="crop-details__oracle-card-value">
                          {crop.oracleData?.soilMoisture || 'Optimal'}
                        </div>
                        <div className="crop-details__oracle-card-detail">
                          {crop.oracleData?.soilMoistureLevel || 78}% saturation
                        </div>
                      </div>

                      <div className="crop-details__oracle-card">
                        <div className="crop-details__oracle-card-icon">🌡️</div>
                        <div className="crop-details__oracle-card-label">Temperature</div>
                        <div className="crop-details__oracle-card-value">
                          {crop.oracleData?.temperature || '24°C'}
                        </div>
                        <div className="crop-details__oracle-card-detail">
                          Within optimal range
                        </div>
                      </div>

                      <div className="crop-details__oracle-card">
                        <div className="crop-details__oracle-card-icon">🌧️</div>
                        <div className="crop-details__oracle-card-label">Rainfall</div>
                        <div className="crop-details__oracle-card-value">
                          {crop.oracleData?.rainfall || '145mm'}
                        </div>
                        <div className="crop-details__oracle-card-detail">
                          Last 30 days
                        </div>
                      </div>
                    </div>

                    <div className="crop-details__oracle-prediction card card--soft-info">
                      <h4 className="crop-details__subsection-title">Yield Prediction</h4>
                      <div className="crop-details__oracle-prediction-value">
                        {crop.oracleData?.predictedYield || crop.totalQuantity} kg
                      </div>
                      <div className="crop-details__oracle-prediction-confidence">
                        Confidence Level: <strong>{crop.oracleData?.confidence || 90}%</strong>
                      </div>
                      <p className="crop-details__oracle-prediction-note">
                        Based on satellite imagery, weather patterns, and historical data
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="crop-details__oracle-ready card card--soft-success">
                    <div className="crop-details__oracle-icon">✓</div>
                    <h4>Harvest Complete</h4>
                    <p>This crop has been harvested and verified. Ready for immediate delivery.</p>
                    <div className="crop-details__oracle-verification">
                      <strong>Verification Status:</strong> Confirmed by AI Oracle on {formatDate(crop.harvestDate || new Date())}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="crop-details__timeline">
                <h3 className="crop-details__section-title">Harvest Timeline</h3>
                
                <div className="timeline">
                  {crop.tokenType === 'DFFT' ? (
                    <>
                      <div className="timeline-item timeline-item--completed">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">
                            {formatDate(crop.plantingDate || new Date())}
                          </div>
                          <h4 className="timeline-item__title">Planting</h4>
                          <p className="timeline-item__description">
                            Seeds planted and initial growth phase started
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item timeline-item--active">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">Current</div>
                          <h4 className="timeline-item__title">Growth & Monitoring</h4>
                          <p className="timeline-item__description">
                            AI oracle actively monitoring crop health and progress
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">
                            {formatDate(crop.expectedHarvestDate || new Date())}
                          </div>
                          <h4 className="timeline-item__title">Expected Harvest</h4>
                          <p className="timeline-item__description">
                            Anticipated harvest date based on growth progress
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">
                            {formatDate(new Date(new Date(crop.expectedHarvestDate).getTime() + 7 * 24 * 60 * 60 * 1000))}
                          </div>
                          <h4 className="timeline-item__title">Quality Verification</h4>
                          <p className="timeline-item__description">
                            Partner agents verify quality and quantity
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">
                            {formatDate(new Date(new Date(crop.expectedHarvestDate).getTime() + 14 * 24 * 60 * 60 * 1000))}
                          </div>
                          <h4 className="timeline-item__title">Delivery</h4>
                          <p className="timeline-item__description">
                            Crop delivered to buyers and payment released
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="timeline-item timeline-item--completed">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">
                            {formatDate(crop.harvestDate || new Date())}
                          </div>
                          <h4 className="timeline-item__title">Harvested</h4>
                          <p className="timeline-item__description">
                            Crop successfully harvested and stored
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item timeline-item--completed">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">
                            {formatDate(crop.verificationDate || new Date())}
                          </div>
                          <h4 className="timeline-item__title">Verified</h4>
                          <p className="timeline-item__description">
                            Quality and quantity verified by partner agents
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item timeline-item--active">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">Available Now</div>
                          <h4 className="timeline-item__title">Ready for Purchase</h4>
                          <p className="timeline-item__description">
                            Ready for immediate delivery upon purchase
                          </p>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-item__marker"></div>
                        <div className="timeline-item__content">
                          <div className="timeline-item__date">After Purchase</div>
                          <h4 className="timeline-item__title">Delivery</h4>
                          <p className="timeline-item__description">
                            Delivered within 3-7 business days
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;