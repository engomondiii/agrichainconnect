import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Card from '../../common/Card/Card';
import './CropListingForm.css';

const CropListingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    cropType: '',
    variety: '',
    quantity: '',
    unit: 'kg',
    
    // Step 2: Quality & Details
    qualityGrade: '',
    organic: false,
    certifications: [],
    description: '',
    
    // Step 3: Images
    images: [],
    
    // Step 4: Pricing
    pricePerUnit: '',
    minimumOrder: '',
    
    // Step 5: Timeline
    plantingDate: '',
    expectedHarvestDate: '',
    
    // Step 6: Type Selection
    listingType: 'DFFT' // or 'DFRT'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cropTypes = ['Coffee', 'Tea', 'Maize', 'Beans', 'Cassava', 'Bananas', 'Other'];
  const qualityGrades = ['Premium', 'Grade A', 'Grade B', 'Standard'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In real implementation, upload to server and get URLs
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.cropType) newErrors.cropType = 'Please select a crop type';
        if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Please enter a valid quantity';
        break;
      case 2:
        if (!formData.qualityGrade) newErrors.qualityGrade = 'Please select a quality grade';
        break;
      case 3:
        if (formData.images.length === 0) newErrors.images = 'Please upload at least one image';
        break;
      case 4:
        if (!formData.pricePerUnit || formData.pricePerUnit <= 0) newErrors.pricePerUnit = 'Please enter a valid price';
        break;
      case 5:
        if (!formData.expectedHarvestDate) newErrors.expectedHarvestDate = 'Please select expected harvest date';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      // Call API to create listing
      // await cropService.createListing(formData);
      console.log('Submitting:', formData);
      
      // Show success message and redirect
      alert('Crop listing created successfully!');
      navigate('/dashboard/farmer');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label htmlFor="cropType">Crop Type *</label>
              <select
                id="cropType"
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                className={errors.cropType ? 'error' : ''}
              >
                <option value="">Select crop type</option>
                {cropTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.cropType && <span className="error-message">{errors.cropType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="variety">Variety (Optional)</label>
              <input
                type="text"
                id="variety"
                name="variety"
                value={formData.variety}
                onChange={handleInputChange}
                placeholder="e.g., Arabica, SL28"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  min="0"
                  step="0.1"
                  className={errors.quantity ? 'error' : ''}
                />
                {errors.quantity && <span className="error-message">{errors.quantity}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="tons">Tons</option>
                  <option value="bags">Bags</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>Quality & Details</h2>
            <div className="form-group">
              <label htmlFor="qualityGrade">Quality Grade *</label>
              <select
                id="qualityGrade"
                name="qualityGrade"
                value={formData.qualityGrade}
                onChange={handleInputChange}
                className={errors.qualityGrade ? 'error' : ''}
              >
                <option value="">Select quality grade</option>
                {qualityGrades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {errors.qualityGrade && <span className="error-message">{errors.qualityGrade}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleInputChange}
                />
                <span>Organic Certified</span>
              </label>
            </div>

<div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe your crop, farming practices, and any special characteristics..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>Upload Images</h2>
            <p className="step-description">Add up to 5 images of your crop. High-quality photos help attract buyers.</p>
            
            <div className="image-upload-section">
              {formData.images.length < 5 && (
                <div className="upload-zone">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="imageUpload" className="upload-label">
                    <div className="upload-icon">📷</div>
                    <span>Click to upload images</span>
                    <span className="upload-hint">PNG, JPG up to 5MB each</span>
                  </label>
                </div>
              )}

              {formData.images.length > 0 && (
                <div className="image-preview-grid">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={image} alt={`Crop ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeImage(index)}
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                      {index === 0 && (
                        <span className="primary-badge">Primary</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {errors.images && <span className="error-message">{errors.images}</span>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h2>Pricing</h2>
            <div className="form-group">
              <label htmlFor="pricePerUnit">Price per {formData.unit} (USD) *</label>
              <div className="input-with-prefix">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  id="pricePerUnit"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={errors.pricePerUnit ? 'error' : ''}
                />
              </div>
              {errors.pricePerUnit && <span className="error-message">{errors.pricePerUnit}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="minimumOrder">Minimum Order Quantity (Optional)</label>
              <input
                type="number"
                id="minimumOrder"
                name="minimumOrder"
                value={formData.minimumOrder}
                onChange={handleInputChange}
                placeholder="No minimum"
                min="0"
              />
              <span className="field-hint">Leave blank for no minimum order requirement</span>
            </div>

            {formData.quantity && formData.pricePerUnit && (
              <div className="pricing-summary">
                <h3>Pricing Summary</h3>
                <div className="summary-row">
                  <span>Total Quantity:</span>
                  <span>{formData.quantity} {formData.unit}</span>
                </div>
                <div className="summary-row">
                  <span>Price per Unit:</span>
                  <span>${formData.pricePerUnit}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Value:</span>
                  <span>${(formData.quantity * formData.pricePerUnit).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <h2>Timeline</h2>
            <div className="form-group">
              <label htmlFor="plantingDate">Planting Date (Optional)</label>
              <input
                type="date"
                id="plantingDate"
                name="plantingDate"
                value={formData.plantingDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expectedHarvestDate">Expected Harvest Date *</label>
              <input
                type="date"
                id="expectedHarvestDate"
                name="expectedHarvestDate"
                value={formData.expectedHarvestDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={errors.expectedHarvestDate ? 'error' : ''}
              />
              {errors.expectedHarvestDate && <span className="error-message">{errors.expectedHarvestDate}</span>}
            </div>

            {formData.expectedHarvestDate && (
              <div className="timeline-info">
                <p>
                  <strong>Days until harvest:</strong>{' '}
                  {Math.ceil((new Date(formData.expectedHarvestDate) - new Date()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="form-step">
            <h2>Listing Type</h2>
            <p className="step-description">Choose the type of listing for your crop</p>

            <div className="listing-type-options">
              <div
                className={`listing-type-card ${formData.listingType === 'DFFT' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, listingType: 'DFFT' }))}
              >
                <div className="type-header">
                  <input
                    type="radio"
                    name="listingType"
                    value="DFFT"
                    checked={formData.listingType === 'DFFT'}
                    onChange={handleInputChange}
                  />
                  <h3>DFFT - Future Harvest</h3>
                </div>
                <p className="type-description">
                  List crops that are still growing. Buyers purchase future delivery rights, 
                  giving you capital now for farm improvements.
                </p>
                <ul className="type-benefits">
                  <li>Get paid before harvest</li>
                  <li>Lock in current market prices</li>
                  <li>Buyers can trade tokens before delivery</li>
                  <li>Access to microloan facility</li>
                </ul>
              </div>

              <div
                className={`listing-type-card ${formData.listingType === 'DFRT' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, listingType: 'DFRT' }))}
              >
                <div className="type-header">
                  <input
                    type="radio"
                    name="listingType"
                    value="DFRT"
                    checked={formData.listingType === 'DFRT'}
                    onChange={handleInputChange}
                  />
                  <h3>DFRT - Ready for Delivery</h3>
                </div>
                <p className="type-description">
                  List harvested crops ready for immediate sale and delivery. 
                  Get quick payment for produce you have in storage.
                </p>
                <ul className="type-benefits">
                  <li>Immediate sale opportunity</li>
                  <li>Quick payment upon delivery</li>
                  <li>Avoid spoilage and storage costs</li>
                  <li>Direct connection to buyers</li>
                </ul>
              </div>
            </div>

            <div className="preview-section">
              <h3>Listing Preview</h3>
              <Card className="listing-preview-card">
                <div className="preview-image">
                  {formData.images[0] ? (
                    <img src={formData.images[0]} alt="Crop preview" />
                  ) : (
                    <div className="preview-placeholder">No image</div>
                  )}
                </div>
                <div className="preview-content">
                  <h4>{formData.cropType || 'Crop Name'} {formData.variety && `- ${formData.variety}`}</h4>
                  <div className="preview-details">
                    <p><strong>Quantity:</strong> {formData.quantity || '0'} {formData.unit}</p>
                    <p><strong>Quality:</strong> {formData.qualityGrade || 'Not specified'}</p>
                    <p><strong>Price:</strong> ${formData.pricePerUnit || '0.00'} per {formData.unit}</p>
                    <p><strong>Harvest Date:</strong> {formData.expectedHarvestDate || 'Not set'}</p>
                    <p><strong>Type:</strong> {formData.listingType}</p>
                  </div>
                  {formData.organic && (
                    <span className="organic-badge">🌿 Organic</span>
                  )}
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="crop-listing-form">
      <Card className="form-container">
        {/* Progress Indicator */}
        <div className="form-progress">
          <div className="progress-steps">
            {[1, 2, 3, 4, 5, 6].map(step => (
              <div
                key={step}
                className={`progress-step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
              >
                <div className="step-circle">
                  {step < currentStep ? '✓' : step}
                </div>
                <span className="step-label">
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Quality'}
                  {step === 3 && 'Images'}
                  {step === 4 && 'Pricing'}
                  {step === 5 && 'Timeline'}
                  {step === 6 && 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="form-content">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="form-navigation">
          <Button
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="nav-right">
            {currentStep < 6 ? (
              <Button variant="primary" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CropListingForm;