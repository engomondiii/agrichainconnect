import React, { useState, useEffect } from 'react';
import './CropFilter.css';

const CropFilter = ({ 
  onFilterChange, 
  onReset, 
  initialFilters = {},
  cropTypes = [],
  locations = []
}) => {
  const [filters, setFilters] = useState({
    cropType: initialFilters.cropType || '',
    location: initialFilters.location || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    minTrustScore: initialFilters.minTrustScore || 0,
    tokenType: initialFilters.tokenType || '',
    organic: initialFilters.organic || false,
    certified: initialFilters.certified || false,
    sortBy: initialFilters.sortBy || 'newest',
    sortOrder: initialFilters.sortOrder || 'desc'
  });

  const [isExpanded, setIsExpanded] = useState({
    type: true,
    location: true,
    price: true,
    trust: true,
    options: true
  });

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'trust_score', label: 'Trust Score: High to Low' },
    { value: 'quantity', label: 'Quantity Available' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  // Default crop types if not provided
  const defaultCropTypes = [
    'Coffee',
    'Tea',
    'Maize',
    'Rice',
    'Wheat',
    'Beans',
    'Sorghum',
    'Millet',
    'Cassava',
    'Sweet Potato'
  ];

  // Default locations if not provided
  const defaultLocations = [
    'Kenya',
    'Uganda',
    'Tanzania',
    'Rwanda',
    'Ethiopia',
    'Burundi'
  ];

  const activeCropTypes = cropTypes.length > 0 ? cropTypes : defaultCropTypes;
  const activeLocations = locations.length > 0 ? locations : defaultLocations;

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Toggle filter section
  const toggleSection = (section) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Reset all filters
  const handleReset = () => {
    const resetFilters = {
      cropType: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      minTrustScore: 0,
      tokenType: '',
      organic: false,
      certified: false,
      sortBy: 'newest',
      sortOrder: 'desc'
    };
    setFilters(resetFilters);
    
    if (onReset) {
      onReset();
    }
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (filters.cropType) count++;
    if (filters.location) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.minTrustScore > 0) count++;
    if (filters.tokenType) count++;
    if (filters.organic) count++;
    if (filters.certified) count++;
    return count;
  };

  const activeFilterCount = countActiveFilters();

  return (
    <div className="crop-filter">
      {/* Filter Header */}
      <div className="crop-filter__header">
        <h3 className="crop-filter__title">Filters</h3>
        {activeFilterCount > 0 && (
          <div className="crop-filter__active-count">
            <span className="badge badge--primary">{activeFilterCount}</span>
          </div>
        )}
      </div>

      {/* Reset Button */}
      {activeFilterCount > 0 && (
        <button 
          className="crop-filter__reset btn btn--secondary btn--small btn--full"
          onClick={handleReset}
        >
          Clear All Filters
        </button>
      )}

      {/* Sort By */}
      <div className="crop-filter__section">
        <div className="crop-filter__section-header">
          <h4 className="crop-filter__section-title">Sort By</h4>
        </div>
        <div className="crop-filter__section-content">
          <select
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Crop Type Filter */}
      <div className="crop-filter__section">
        <button
          className="crop-filter__section-header"
          onClick={() => toggleSection('type')}
          aria-expanded={isExpanded.type}
        >
          <h4 className="crop-filter__section-title">Crop Type</h4>
          <span className="crop-filter__section-icon">
            {isExpanded.type ? '−' : '+'}
          </span>
        </button>
        {isExpanded.type && (
          <div className="crop-filter__section-content">
            <select
              className="form-select"
              value={filters.cropType}
              onChange={(e) => handleFilterChange('cropType', e.target.value)}
            >
              <option value="">All Crops</option>
              {activeCropTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="crop-filter__section">
        <button
          className="crop-filter__section-header"
          onClick={() => toggleSection('location')}
          aria-expanded={isExpanded.location}
        >
          <h4 className="crop-filter__section-title">Location</h4>
          <span className="crop-filter__section-icon">
            {isExpanded.location ? '−' : '+'}
          </span>
        </button>
        {isExpanded.location && (
          <div className="crop-filter__section-content">
            <select
              className="form-select"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              {activeLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="crop-filter__section">
        <button
          className="crop-filter__section-header"
          onClick={() => toggleSection('price')}
          aria-expanded={isExpanded.price}
        >
          <h4 className="crop-filter__section-title">Price Range (KES)</h4>
          <span className="crop-filter__section-icon">
            {isExpanded.price ? '−' : '+'}
          </span>
        </button>
        {isExpanded.price && (
          <div className="crop-filter__section-content">
            <div className="crop-filter__price-inputs">
              <input
                type="number"
                className="form-input"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                min="0"
              />
              <span className="crop-filter__price-separator">to</span>
              <input
                type="number"
                className="form-input"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                min="0"
              />
            </div>
          </div>
        )}
      </div>

      {/* Trust Score Filter */}
      <div className="crop-filter__section">
        <button
          className="crop-filter__section-header"
          onClick={() => toggleSection('trust')}
          aria-expanded={isExpanded.trust}
        >
          <h4 className="crop-filter__section-title">
            Minimum Trust Score: {filters.minTrustScore}
          </h4>
          <span className="crop-filter__section-icon">
            {isExpanded.trust ? '−' : '+'}
          </span>
        </button>
        {isExpanded.trust && (
          <div className="crop-filter__section-content">
            <input
              type="range"
              className="crop-filter__range"
              min="0"
              max="1000"
              step="50"
              value={filters.minTrustScore}
              onChange={(e) => handleFilterChange('minTrustScore', parseInt(e.target.value))}
            />
            <div className="crop-filter__range-labels">
              <span>0</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </div>
        )}
      </div>

      {/* Additional Options */}
      <div className="crop-filter__section">
        <button
          className="crop-filter__section-header"
          onClick={() => toggleSection('options')}
          aria-expanded={isExpanded.options}
        >
          <h4 className="crop-filter__section-title">Options</h4>
          <span className="crop-filter__section-icon">
            {isExpanded.options ? '−' : '+'}
          </span>
        </button>
        {isExpanded.options && (
          <div className="crop-filter__section-content">
            {/* Token Type */}
            <div className="crop-filter__radio-group">
              <label className="crop-filter__radio">
                <input
                  type="radio"
                  name="tokenType"
                  value=""
                  checked={filters.tokenType === ''}
                  onChange={(e) => handleFilterChange('tokenType', e.target.value)}
                />
                <span>All Types</span>
              </label>
              <label className="crop-filter__radio">
                <input
                  type="radio"
                  name="tokenType"
                  value="DFFT"
                  checked={filters.tokenType === 'DFFT'}
                  onChange={(e) => handleFilterChange('tokenType', e.target.value)}
                />
                <span>Futures (DFFT)</span>
              </label>
              <label className="crop-filter__radio">
                <input
                  type="radio"
                  name="tokenType"
                  value="DFRT"
                  checked={filters.tokenType === 'DFRT'}
                  onChange={(e) => handleFilterChange('tokenType', e.target.value)}
                />
                <span>Ready (DFRT)</span>
              </label>
            </div>

            {/* Checkboxes */}
            <div className="crop-filter__checkbox-group">
              <label className="crop-filter__checkbox">
                <input
                  type="checkbox"
                  checked={filters.organic}
                  onChange={(e) => handleFilterChange('organic', e.target.checked)}
                />
                <span>Organic Only</span>
              </label>
              <label className="crop-filter__checkbox">
                <input
                  type="checkbox"
                  checked={filters.certified}
                  onChange={(e) => handleFilterChange('certified', e.target.checked)}
                />
                <span>Certified Only</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropFilter;