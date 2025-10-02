import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CropCard from '../../components/marketplace/CropCard/CropCard';
import PurchaseModal from '../../components/marketplace/PurchaseModal/PurchaseModal';
import { getCropById, getRelatedCrops, getCropReviews, addCropReview } from '../../services/api/cropService';
import { addToWishlist, removeFromWishlist } from '../../services/api/marketplaceService';
import './CropDetail.css';

const CropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [relatedCrops, setRelatedCrops] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [reviewFormVisible, setReviewFormVisible] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    if (id) {
      fetchCropDetails();
      fetchRelatedCrops();
      fetchReviews();
    }
  }, [id]);

  const fetchCropDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCropById(id);
      if (response.success) {
        setCrop(response.data);
      } else {
        setError(response.message || 'Failed to fetch crop details');
      }
    } catch (err) {
      setError('An error occurred while fetching crop details');
      console.error('Fetch crop error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedCrops = async () => {
    try {
      const response = await getRelatedCrops(id, 4);
      if (response.success) {
        setRelatedCrops(response.data || []);
      }
    } catch (err) {
      console.error('Fetch related crops error:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getCropReviews(id);
      if (response.success) {
        setReviews(response.data || []);
      }
    } catch (err) {
      console.error('Fetch reviews error:', err);
    }
  };

  const handlePurchaseClick = () => {
    setShowPurchaseModal(true);
  };

  const handlePurchaseConfirm = async (purchaseData) => {
    console.log('Purchase confirmed:', purchaseData);
    setShowPurchaseModal(false);
    // Navigate to order confirmation or dashboard
  };

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await removeFromWishlist(id);
        setIsInWishlist(false);
      } else {
        await addToWishlist(id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await addCropReview(id, reviewForm);
      if (response.success) {
        setReviewFormVisible(false);
        setReviewForm({ rating: 5, comment: '' });
        fetchReviews();
      }
    } catch (error) {
      console.error('Submit review error:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTrustScoreBadge = (score) => {
    if (score >= 800) return 'badge--trust-high';
    if (score >= 600) return 'badge--trust-medium';
    if (score >= 400) return 'badge--trust-low';
    return 'badge--trust-new';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`crop-detail__star ${i < rating ? 'crop-detail__star--filled' : ''}`}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="crop-detail__loading">
        <div className="loader"></div>
        <p>Loading crop details...</p>
      </div>
    );
  }

  if (error || !crop) {
    return (
      <div className="crop-detail__error">
        <h2>Crop Not Found</h2>
        <p>{error || 'The crop you are looking for does not exist.'}</p>
        <Link to="/marketplace" className="btn btn--primary">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const images = crop.images && crop.images.length > 0 
    ? crop.images 
    : ['/assets/images/placeholder-crop.jpg'];

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="crop-detail">
      {/* Breadcrumbs */}
      <div className="crop-detail__breadcrumbs">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="crop-detail__breadcrumb-separator">›</span>
          <Link to="/marketplace">Marketplace</Link>
          <span className="crop-detail__breadcrumb-separator">›</span>
          <span>{crop.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="crop-detail__main section">
        <div className="container">
          <div className="crop-detail__layout">
            {/* Left: Image Gallery */}
            <div className="crop-detail__gallery">
              <div className="crop-detail__main-image">
                <img 
                  src={images[selectedImage]} 
                  alt={`${crop.name} - ${selectedImage + 1}`}
                  className="crop-detail__image"
                />
                {crop.tokenType && (
                  <div className="crop-detail__badge">
                    <span className={`badge ${crop.tokenType === 'DFFT' ? 'badge--primary' : 'badge--success'}`}>
                      {crop.tokenType}
                    </span>
                  </div>
                )}
                {crop.featured && (
                  <div className="crop-detail__featured-badge">
                    <span className="badge badge--warning">Featured</span>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="crop-detail__thumbnails">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`crop-detail__thumbnail ${selectedImage === index ? 'crop-detail__thumbnail--active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Crop Info */}
            <div className="crop-detail__info">
              <h1 className="crop-detail__name">{crop.name}</h1>
              
              <div className="crop-detail__meta">
                <span className="crop-detail__type">{crop.type}</span>
                <span className="crop-detail__separator">•</span>
                <span className="crop-detail__location">📍 {crop.location}</span>
                {crop.organic && (
                  <>
                    <span className="crop-detail__separator">•</span>
                    <span className="badge badge--success-soft">🌱 Organic</span>
                  </>
                )}
              </div>

              {/* Rating */}
              {reviews.length > 0 && (
                <div className="crop-detail__rating">
                  <div className="crop-detail__stars">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="crop-detail__rating-value">{averageRating.toFixed(1)}</span>
                  <span className="crop-detail__rating-count">({reviews.length} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="crop-detail__pricing card card--accent-success">
                <div className="crop-detail__price-main">
                  <span className="crop-detail__price-label">Price per Token</span>
                  <span className="crop-detail__price-value">{formatPrice(crop.pricePerToken)}</span>
                </div>
                <div className="crop-detail__price-info">
                  <div>
                    <span className="crop-detail__info-label">Available</span>
                    <span className="crop-detail__info-value">{crop.availableTokens?.toLocaleString()} tokens</span>
                  </div>
                  <div>
                    <span className="crop-detail__info-label">Min. Purchase</span>
                    <span className="crop-detail__info-value">{crop.minimumPurchase || 10} tokens</span>
                  </div>
                </div>
                <div className="crop-detail__price-note">
                  1 token = 0.1 kg • Total available: {(crop.availableTokens * 0.1).toFixed(1)} kg
                </div>
              </div>

              {/* Actions */}
              <div className="crop-detail__actions">
                <button 
                  className="btn btn--primary btn--large btn--full"
                  onClick={handlePurchaseClick}
                  disabled={crop.availableTokens === 0}
                >
                  {crop.availableTokens === 0 ? 'Sold Out' : 'Purchase Tokens'}
                </button>
                <button
                  className={`crop-detail__wishlist-btn ${isInWishlist ? 'crop-detail__wishlist-btn--active' : ''}`}
                  onClick={handleWishlistToggle}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isInWishlist ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Progress Bar */}
              {crop.totalTokens && (
                <div className="crop-detail__progress">
                  <div className="crop-detail__progress-bar">
                    <div 
                      className="crop-detail__progress-fill"
                      style={{ width: `${((crop.totalTokens - crop.availableTokens) / crop.totalTokens) * 100}%` }}
                    ></div>
                  </div>
                  <div className="crop-detail__progress-text">
                    {Math.round(((crop.totalTokens - crop.availableTokens) / crop.totalTokens) * 100)}% sold
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Section */}
      <section className="crop-detail__farmer-section section">
        <div className="container">
          <div className="crop-detail__farmer card">
            <div className="crop-detail__farmer-header">
              <h2 className="crop-detail__section-title">About the Farmer</h2>
            </div>
            <div className="crop-detail__farmer-content">
              <div className="crop-detail__farmer-avatar-large">
                {crop.farmer?.avatar ? (
                  <img src={crop.farmer.avatar} alt={crop.farmer.name} />
                ) : (
                  <span>{crop.farmer?.name?.charAt(0) || 'F'}</span>
                )}
              </div>
              <div className="crop-detail__farmer-info">
                <h3 className="crop-detail__farmer-name">{crop.farmer?.name || 'Unknown Farmer'}</h3>
                <div className="crop-detail__farmer-trust">
                  <span className={`badge ${getTrustScoreBadge(crop.farmer?.trustScore || 0)}`}>
                    Trust Score: {crop.farmer?.trustScore || 0}
                  </span>
                </div>
                <p className="crop-detail__farmer-bio">
                  {crop.farmer?.bio || 'Experienced farmer committed to quality produce and sustainable farming practices.'}
                </p>
                <div className="crop-detail__farmer-stats">
                  <div className="crop-detail__farmer-stat">
                    <span className="crop-detail__farmer-stat-value">{crop.farmer?.successfulDeliveries || 0}</span>
                    <span className="crop-detail__farmer-stat-label">Successful Deliveries</span>
                  </div>
                  <div className="crop-detail__farmer-stat">
                    <span className="crop-detail__farmer-stat-value">{crop.farmer?.activeListings || 0}</span>
                    <span className="crop-detail__farmer-stat-label">Active Listings</span>
                  </div>
                  <div className="crop-detail__farmer-stat">
                    <span className="crop-detail__farmer-stat-value">
                      {crop.farmer?.memberSince ? new Date(crop.farmer.memberSince).getFullYear() : '2024'}
                    </span>
                    <span className="crop-detail__farmer-stat-label">Member Since</span>
                  </div>
                </div>
                <Link to={`/farmers/${crop.farmer?.id}`} className="btn btn--secondary">
                  View Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="crop-detail__tabs-section section">
        <div className="container">
          <div className="crop-detail__tabs">
            <button
              className={`crop-detail__tab ${activeTab === 'details' ? 'crop-detail__tab--active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button
              className={`crop-detail__tab ${activeTab === 'oracle' ? 'crop-detail__tab--active' : ''}`}
              onClick={() => setActiveTab('oracle')}
            >
              AI Oracle Data
            </button>
            <button
              className={`crop-detail__tab ${activeTab === 'timeline' ? 'crop-detail__tab--active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </button>
            <button
              className={`crop-detail__tab ${activeTab === 'reviews' ? 'crop-detail__tab--active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="crop-detail__tab-content card">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="crop-detail__details">
                <h3 className="crop-detail__subsection-title">Crop Information</h3>
                
                <div className="crop-detail__info-grid">
                  <div className="crop-detail__info-item">
                    <span className="crop-detail__info-label">Variety</span>
                    <span className="crop-detail__info-value">{crop.variety || 'Standard'}</span>
                  </div>
                  
                  <div className="crop-detail__info-item">
                    <span className="crop-detail__info-label">Quality Grade</span>
                    <span className="crop-detail__info-value">{crop.qualityGrade || 'Grade A'}</span>
                  </div>
                  
                  <div className="crop-detail__info-item">
                    <span className="crop-detail__info-label">Organic</span>
                    <span className="crop-detail__info-value">
                      {crop.organic ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  
                  <div className="crop-detail__info-item">
                    <span className="crop-detail__info-label">Certified</span>
                    <span className="crop-detail__info-value">
                      {crop.certified ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  
                  {crop.tokenType === 'DFFT' && crop.plantingDate && (
                    <div className="crop-detail__info-item">
                      <span className="crop-detail__info-label">Planting Date</span>
                      <span className="crop-detail__info-value">{formatDate(crop.plantingDate)}</span>
                    </div>
                  )}
                  
                  {crop.expectedHarvestDate && (
                    <div className="crop-detail__info-item">
                      <span className="crop-detail__info-label">Expected Harvest</span>
                      <span className="crop-detail__info-value">{formatDate(crop.expectedHarvestDate)}</span>
                    </div>
                  )}
                  
                  <div className="crop-detail__info-item">
                    <span className="crop-detail__info-label">Farm Size</span>
                    <span className="crop-detail__info-value">{crop.farmSize || '2 hectares'}</span>
                  </div>
                  
                  <div className="crop-detail__info-item">
                    <span className="crop-detail__info-label">Total Quantity</span>
                    <span className="crop-detail__info-value">{crop.totalQuantity} kg</span>
                  </div>
                </div>

                {crop.description && (
                  <div className="crop-detail__description">
                    <h4 className="crop-detail__subsection-title">Description</h4>
                    <p>{crop.description}</p>
                  </div>
                )}

                {crop.certifications && crop.certifications.length > 0 && (
                  <div className="crop-detail__certifications">
                    <h4 className="crop-detail__subsection-title">Certifications</h4>
                    <div className="crop-detail__badges">
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

            {/* AI Oracle Tab */}
            {activeTab === 'oracle' && (
              <div className="crop-detail__oracle">
                <h3 className="crop-detail__subsection-title">AI Oracle Monitoring</h3>
                
                {crop.tokenType === 'DFFT' ? (
                  <>
                    <div className="crop-detail__oracle-status">
                      <div className="crop-detail__oracle-header">
                        <span className="crop-detail__oracle-icon">🛰️</span>
                        <div>
                          <h4>Crop Health Status</h4>
                          <p>Last updated: {formatDate(crop.oracleData?.lastUpdate || new Date())}</p>
                        </div>
                      </div>
                      <div className="crop-detail__oracle-metric">
                        <span>Overall Health Score</span>
                        <span className="crop-detail__oracle-value">
                          {crop.oracleData?.healthScore || 92}%
                        </span>
                      </div>
                    </div>

                    <div className="crop-detail__oracle-metrics">
                      <div className="crop-detail__oracle-card">
                        <div className="crop-detail__oracle-card-icon">🌱</div>
                        <div className="crop-detail__oracle-card-label">Growth Stage</div>
                        <div className="crop-detail__oracle-card-value">
                          {crop.oracleData?.growthStage || 'Vegetative'}
                        </div>
                        <div className="crop-detail__oracle-card-progress">
                          <div className="progress-bar">
                            <div className="progress-bar__fill" style={{ width: `${crop.oracleData?.growthProgress || 65}%` }}></div>
                          </div>
                          <span>{crop.oracleData?.growthProgress || 65}% Complete</span>
                        </div>
                      </div>

                      <div className="crop-detail__oracle-card">
                        <div className="crop-detail__oracle-card-icon">💧</div>
                        <div className="crop-detail__oracle-card-label">Soil Moisture</div>
                        <div className="crop-detail__oracle-card-value">
                          {crop.oracleData?.soilMoisture || 'Optimal'}
                        </div>
                        <div className="crop-detail__oracle-card-detail">
                          {crop.oracleData?.soilMoistureLevel || 78}% saturation
                        </div>
                      </div>

                      <div className="crop-detail__oracle-card">
                        <div className="crop-detail__oracle-card-icon">🌡️</div>
                        <div className="crop-detail__oracle-card-label">Temperature</div>
                        <div className="crop-detail__oracle-card-value">
                          {crop.oracleData?.temperature || '24°C'}
                        </div>
                        <div className="crop-detail__oracle-card-detail">
                          Within optimal range
                        </div>
                      </div>

                      <div className="crop-detail__oracle-card">
                        <div className="crop-detail__oracle-card-icon">🌧️</div>
                        <div className="crop-detail__oracle-card-label">Rainfall</div>
                        <div className="crop-detail__oracle-card-value">
                          {crop.oracleData?.rainfall || '145mm'}
                        </div>
                        <div className="crop-detail__oracle-card-detail">
                          Last 30 days
                        </div>
                      </div>
                    </div>

                    <div className="crop-detail__oracle-prediction">
                      <h4>Yield Prediction</h4>
                      <div className="crop-detail__oracle-prediction-value">
                        {crop.oracleData?.predictedYield || crop.totalQuantity} kg
                      </div>
                      <div className="crop-detail__oracle-prediction-confidence">
                        Confidence Level: <strong>{crop.oracleData?.confidence || 90}%</strong>
                      </div>
                      <p>
                        Based on satellite imagery, weather patterns, and historical data
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="crop-detail__oracle-ready">
                    <div className="crop-detail__oracle-icon">✓</div>
                    <h4>Harvest Complete</h4>
                    <p>This crop has been harvested and verified. Ready for immediate delivery.</p>
                    <div>
                      <strong>Verification Status:</strong> Confirmed by AI Oracle on {formatDate(crop.harvestDate || new Date())}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="crop-detail__timeline">
                <h3 className="crop-detail__subsection-title">Harvest Timeline</h3>
                
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

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="crop-detail__reviews">
                <div className="crop-detail__reviews-header">
                  <h3 className="crop-detail__subsection-title">Customer Reviews</h3>
                  <button 
                    className="btn btn--secondary btn--small"
                    onClick={() => setReviewFormVisible(!reviewFormVisible)}
                  >
                    Write a Review
                  </button>
                </div>

                {/* Review Form */}
                {reviewFormVisible && (
                  <form className="crop-detail__review-form card card--soft-secondary" onSubmit={handleReviewSubmit}>
                    <h4>Write Your Review</h4>
                    
                    <div className="form-group">
                      <label className="form-label">Rating</label>
                      <div className="crop-detail__rating-input">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`crop-detail__star-btn ${star <= reviewForm.rating ? 'crop-detail__star-btn--active' : ''}`}
                            onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="reviewComment">Your Review</label>
                      <textarea
                        id="reviewComment"
                        className="form-textarea"
                        rows="4"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Share your experience with this crop..."
                        required
                      />
                    </div>

                    <div className="crop-detail__review-actions">
                      <button type="button" className="btn btn--outline" onClick={() => setReviewFormVisible(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn--primary">
                        Submit Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                {reviews.length > 0 ? (
                  <div className="crop-detail__reviews-list">
                    {reviews.map(review => (
                      <div key={review.id} className="crop-detail__review">
                        <div className="crop-detail__review-header">
                          <div className="crop-detail__review-avatar">
                            {review.user?.avatar ? (
                              <img src={review.user.avatar} alt={review.user.name} />
                            ) : (
                              <span>{review.user?.name?.charAt(0) || 'U'}</span>
                            )}
                          </div>
                          <div className="crop-detail__review-info">
                            <div className="crop-detail__review-name">{review.user?.name || 'Anonymous'}</div>
                            <div className="crop-detail__review-date">{formatDate(review.createdAt)}</div>
                          </div>
                          <div className="crop-detail__review-rating">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="crop-detail__review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="crop-detail__no-reviews">
                    <p>No reviews yet. Be the first to review this crop!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Crops */}
      {relatedCrops.length > 0 && (
        <section className="crop-detail__related section section--lg">
          <div className="container">
            <h2 className="crop-detail__section-title">Related Crops</h2>
            <div className="crop-detail__related-grid">
              {relatedCrops.map(relatedCrop => (
                <CropCard
                  key={relatedCrop.id}
                  crop={relatedCrop}
                  onQuickView={() => {}}
                  onAddToWishlist={handleWishlistToggle}
                  isInWishlist={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <PurchaseModal
          crop={crop}
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          onConfirm={handlePurchaseConfirm}
        />
      )}
    </div>
  );
};

export default CropDetail;