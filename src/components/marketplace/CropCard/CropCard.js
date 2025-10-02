import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CropCard.css';

const CropCard = ({ crop, onQuickView, onAddToWishlist, isInWishlist = false }) => {
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format quantity
  const formatQuantity = (quantity, unit = 'kg') => {
    if (quantity >= 1000) {
      return `${(quantity / 1000).toFixed(1)} tons`;
    }
    return `${quantity} ${unit}`;
  };

  // Get trust score badge class
  const getTrustScoreBadge = (score) => {
    if (score >= 800) return 'badge--trust-high';
    if (score >= 600) return 'badge--trust-medium';
    if (score >= 400) return 'badge--trust-low';
    return 'badge--trust-new';
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) {
      onAddToWishlist(crop.id, !isWishlisted);
    }
  };

  // Handle quick view
  const handleQuickView = (e) => {
    e.preventDefault();
    if (onQuickView) {
      onQuickView(crop);
    }
  };

  // Default image if crop image fails or doesn't exist
  const cropImage = imageError || !crop.images || crop.images.length === 0
    ? '/assets/images/placeholder-crop.jpg'
    : crop.images[0];

  return (
    <div className="crop-card card">
      <Link to={`/marketplace/${crop.id}`} className="crop-card__link">
        {/* Image Section */}
        <div className="crop-card__image-wrapper">
          <img
            src={cropImage}
            alt={crop.name}
            className="crop-card__image"
            onError={() => setImageError(true)}
          />
          
          {/* Token Type Badge */}
          <div className="crop-card__badge">
            <span className={`badge ${crop.tokenType === 'DFFT' ? 'badge--primary' : 'badge--success'}`}>
              {crop.tokenType}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            className={`crop-card__wishlist ${isWishlisted ? 'crop-card__wishlist--active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>

          {/* Featured Badge */}
          {crop.featured && (
            <div className="crop-card__featured">
              <span className="badge badge--warning">Featured</span>
            </div>
          )}

          {/* Organic Badge */}
          {crop.organic && (
            <div className="crop-card__organic">
              <span className="badge badge--success-soft">🌱 Organic</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="crop-card__content">
          {/* Crop Name */}
          <h3 className="crop-card__name">{crop.name}</h3>
          
          {/* Crop Type & Location */}
          <div className="crop-card__meta">
            <span className="crop-card__type">{crop.type}</span>
            <span className="crop-card__separator">•</span>
            <span className="crop-card__location">{crop.location}</span>
          </div>

          {/* Farmer Info */}
          <div className="crop-card__farmer">
            <div className="crop-card__farmer-avatar">
              {crop.farmer?.avatar ? (
                <img src={crop.farmer.avatar} alt={crop.farmer.name} />
              ) : (
                <span>{crop.farmer?.name?.charAt(0) || 'F'}</span>
              )}
            </div>
            <div className="crop-card__farmer-info">
              <div className="crop-card__farmer-name">{crop.farmer?.name || 'Unknown Farmer'}</div>
              <div className="crop-card__trust-score">
                <span className={`badge badge--small ${getTrustScoreBadge(crop.farmer?.trustScore || 0)}`}>
                  Trust: {crop.farmer?.trustScore || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="crop-card__pricing">
            <div className="crop-card__price">
              <span className="crop-card__price-label">Price per token</span>
              <span className="crop-card__price-value">{formatPrice(crop.pricePerToken)}</span>
            </div>
            <div className="crop-card__quantity">
              <span className="crop-card__quantity-label">Available</span>
              <span className="crop-card__quantity-value">{formatQuantity(crop.availableQuantity)}</span>
            </div>
          </div>

          {/* Progress Bar for token sales */}
          {crop.totalTokens && (
            <div className="crop-card__progress">
              <div className="crop-card__progress-bar">
                <div 
                  className="crop-card__progress-fill"
                  style={{ width: `${((crop.totalTokens - crop.availableTokens) / crop.totalTokens) * 100}%` }}
                ></div>
              </div>
              <div className="crop-card__progress-text">
                {Math.round(((crop.totalTokens - crop.availableTokens) / crop.totalTokens) * 100)}% sold
              </div>
            </div>
          )}

          {/* Harvest Date (for DFFT) */}
          {crop.tokenType === 'DFFT' && crop.expectedHarvestDate && (
            <div className="crop-card__harvest">
              <span className="crop-card__harvest-icon">📅</span>
              <span className="crop-card__harvest-text">
                Harvest: {new Date(crop.expectedHarvestDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          )}

          {/* Quality Grade */}
          {crop.qualityGrade && (
            <div className="crop-card__quality">
              <span className="crop-card__quality-label">Grade:</span>
              <span className="crop-card__quality-value">{crop.qualityGrade}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="crop-card__actions">
          <button 
            className="btn btn--secondary btn--small btn--full"
            onClick={handleQuickView}
          >
            Quick View
          </button>
          <Link 
            to={`/marketplace/${crop.id}`}
            className="btn btn--primary btn--small btn--full"
          >
            View Details
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default CropCard;