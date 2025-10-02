import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import TrustScore from '../TrustScore/TrustScore';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import './FarmerProfile.css';

const FarmerProfile = ({ farmer, isOwnProfile = false }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    farmName: farmer?.farmName || '',
    location: farmer?.location || '',
    bio: farmer?.bio || '',
    farmSize: farmer?.farmSize || '',
    farmingMethods: farmer?.farmingMethods || [],
    certifications: farmer?.certifications || []
  });

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
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message
    }
  };

  if (!farmer) {
    return <div className="farmer-profile-loading">Loading profile...</div>;
  }

  return (
    <div className="farmer-profile">
      {/* Profile Header */}
      <Card className="farmer-profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            <img 
              src={farmer.profileImage || '/assets/images/default-avatar.png'} 
              alt={farmer.farmName}
            />
            {isOwnProfile && (
              <button className="avatar-edit-btn" aria-label="Change profile photo">
                <span className="icon">📷</span>
              </button>
            )}
          </div>
          
          <div className="profile-info">
            <h1 className="farm-name">{farmer.farmName}</h1>
            <p className="location">
              <span className="icon">📍</span>
              {farmer.location}
            </p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{farmer.totalListings || 0}</span>
                <span className="stat-label">Active Listings</span>
              </div>
              <div className="stat">
                <span className="stat-value">{farmer.successfulDeliveries || 0}</span>
                <span className="stat-label">Completed Orders</span>
              </div>
              <div className="stat">
                <span className="stat-value">
                  {farmer.memberSince ? new Date(farmer.memberSince).getFullYear() : 'N/A'}
                </span>
                <span className="stat-label">Member Since</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <TrustScore score={farmer.trustScore || 0} showDetails={false} />
            {isOwnProfile && (
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Profile Details */}
      <div className="farmer-profile-content">
        <Card className="profile-details-card">
          <h2>About the Farm</h2>
          
          {isEditing ? (
            <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="bio">Farm Description</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell buyers about your farm, farming practices, and what makes your crops special..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="farmSize">Farm Size (hectares)</label>
                <input
                  type="number"
                  id="farmSize"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 2.5"
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
              <p className="farm-bio">{farmer.bio || 'No description provided yet.'}</p>
              
              <div className="farm-details">
                <div className="detail-item">
                  <span className="detail-label">Farm Size:</span>
                  <span className="detail-value">{farmer.farmSize || 'N/A'} hectares</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Primary Crops:</span>
                  <span className="detail-value">
                    {farmer.primaryCrops?.join(', ') || 'Various'}
                  </span>
                </div>
              </div>

              {/* Certifications */}
              {farmer.certifications && farmer.certifications.length > 0 && (
                <div className="certifications">
                  <h3>Certifications</h3>
                  <div className="certification-badges">
                    {farmer.certifications.map((cert, index) => (
                      <Badge key={index} variant="success">
                        ✓ {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Trust Score Details */}
        <Card className="trust-score-card">
          <TrustScore score={farmer.trustScore || 0} showDetails={true} />
        </Card>
      </div>
    </div>
  );
};

export default FarmerProfile;