import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import './BuyerProfile.css';

const BuyerProfile = ({ buyer, isOwnProfile = false }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: buyer?.companyName || '',
    industry: buyer?.industry || '',
    companySize: buyer?.companySize || '',
    country: buyer?.country || '',
    description: buyer?.description || '',
    website: buyer?.website || '',
    preferredCrops: buyer?.preferredCrops || []
  });

  const industries = [
    'Food Processing',
    'Restaurant Chain',
    'Retail',
    'Export/Import',
    'Coffee Roaster',
    'Tea Distributor',
    'Wholesale',
    'Other'
  ];

  const companySizes = ['1-10', '11-50', '51-200', '201-500', '500+'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Call API to update profile
      // await userService.updateProfile(formData);
      console.log('Updating buyer profile:', formData);
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!buyer) {
    return <div className="buyer-profile-loading">Loading profile...</div>;
  }

  return (
    <div className="buyer-profile">
      {/* Profile Header */}
      <Card className="buyer-profile-header">
        <div className="profile-header-content">
          <div className="company-logo">
            <img 
              src={buyer.logo || '/assets/images/default-company.png'} 
              alt={buyer.companyName}
            />
            {isOwnProfile && (
              <button className="logo-edit-btn" aria-label="Change company logo">
                <span className="icon">📷</span>
              </button>
            )}
          </div>
          
          <div className="company-info">
            <div className="company-name-row">
              <h1 className="company-name">{buyer.companyName}</h1>
              {buyer.verified && (
                <Badge variant="success">
                  <span className="verified-icon">✓</span> Verified Buyer
                </Badge>
              )}
            </div>
            
            <p className="company-meta">
              <span>{buyer.industry}</span>
              <span className="separator">•</span>
              <span>{buyer.country}</span>
              {buyer.companySize && (
                <>
                  <span className="separator">•</span>
                  <span>{buyer.companySize} employees</span>
                </>
              )}
            </p>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{buyer.totalPurchases || 0}</span>
                <span className="stat-label">Total Purchases</span>
              </div>
              <div className="stat">
                <span className="stat-value">{buyer.activeFarmers || 0}</span>
                <span className="stat-label">Active Suppliers</span>
              </div>
              <div className="stat">
                <span className="stat-value">
                  {buyer.memberSince ? new Date(buyer.memberSince).getFullYear() : 'N/A'}
                </span>
                <span className="stat-label">Member Since</span>
              </div>
            </div>
          </div>

          {isOwnProfile && (
            <div className="profile-actions">
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Profile Details */}
      <div className="buyer-profile-content">
        <Card className="profile-details-card">
          <h2>Company Information</h2>
          
          {isEditing ? (
            <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="description">Company Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell farmers about your company and what you're looking for..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                  >
                    <option value="">Select industry</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="companySize">Company Size</label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                  >
                    <option value="">Select size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size} employees</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                />
              </div>

              <div className="form-actions">
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="profile-details-view">
              <p className="company-description">
                {buyer.description || 'No company description provided yet.'}
              </p>
              
              <div className="company-details">
                <div className="detail-item">
                  <span className="detail-label">Industry:</span>
                  <span className="detail-value">{buyer.industry || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Company Size:</span>
                  <span className="detail-value">{buyer.companySize || 'N/A'} employees</span>
                </div>
                {buyer.website && (
                  <div className="detail-item">
                    <span className="detail-label">Website:</span>
                    <a 
                      href={buyer.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-value website-link"
                    >
                      {buyer.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Preferred Crops */}
              {buyer.preferredCrops && buyer.preferredCrops.length > 0 && (
                <div className="preferred-crops">
                  <h3>Preferred Crops</h3>
                  <div className="crop-badges">
                    {buyer.preferredCrops.map((crop, index) => (
                      <Badge key={index} variant="info">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Purchase History Summary */}
        <Card className="purchase-history-card">
          <h2>Purchase History</h2>
          <div className="history-stats">
            <div className="history-stat">
              <span className="history-value">${buyer.totalSpent?.toLocaleString() || 0}</span>
              <span className="history-label">Total Spent</span>
            </div>
            <div className="history-stat">
              <span className="history-value">{buyer.totalOrders || 0}</span>
              <span className="history-label">Total Orders</span>
            </div>
            <div className="history-stat">
              <span className="history-value">{buyer.averageOrderSize || 0} kg</span>
              <span className="history-label">Avg. Order Size</span>
            </div>
          </div>

          <div className="top-suppliers">
            <h3>Top Suppliers</h3>
            <div className="supplier-list">
              {buyer.topSuppliers?.map((supplier, index) => (
                <div key={index} className="supplier-item">
                  <span className="supplier-rank">{index + 1}</span>
                  <span className="supplier-name">{supplier.name}</span>
                  <span className="supplier-orders">{supplier.orders} orders</span>
                </div>
              )) || <p className="no-data">No suppliers yet</p>}
            </div>
          </div>
        </Card>
      </div>

      {/* Verification Status */}
      {buyer.verificationDetails && (
        <Card className="verification-card">
          <h2>Verification Details</h2>
          <div className="verification-items">
            <div className="verification-item">
              <span className={`verification-icon ${buyer.verificationDetails.emailVerified ? 'verified' : ''}`}>
                {buyer.verificationDetails.emailVerified ? '✓' : '○'}
              </span>
              <span>Email Verified</span>
            </div>
            <div className="verification-item">
              <span className={`verification-icon ${buyer.verificationDetails.businessDocuments ? 'verified' : ''}`}>
                {buyer.verificationDetails.businessDocuments ? '✓' : '○'}
              </span>
              <span>Business Documents</span>
            </div>
            <div className="verification-item">
              <span className={`verification-icon ${buyer.verificationDetails.paymentMethod ? 'verified' : ''}`}>
                {buyer.verificationDetails.paymentMethod ? '✓' : '○'}
              </span>
              <span>Payment Method</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BuyerProfile;