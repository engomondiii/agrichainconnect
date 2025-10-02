import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useForm } from '../../../hooks/useForm';
import Button from '../../../components/common/Button/Button';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [userType, setUserType] = useState('farmer');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError
  } = useForm(
    {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      location: ''
    },
    {
      fullName: {
        required: { value: true, message: 'Full name is required' },
        minLength: { value: 3, message: 'Name must be at least 3 characters' }
      },
      email: {
        required: { value: true, message: 'Email is required' },
        email: { value: true, message: 'Invalid email address' }
      },
      phone: {
        required: { value: true, message: 'Phone number is required' },
        pattern: {
          value: /^[0-9+\-\s()]+$/,
          message: 'Invalid phone number format'
        }
      },
      password: {
        required: { value: true, message: 'Password is required' },
        minLength: { value: 8, message: 'Password must be at least 8 characters' },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          message: 'Password must contain uppercase, lowercase, and number'
        }
      },
      confirmPassword: {
        required: { value: true, message: 'Please confirm your password' },
        validate: (value, allValues) => {
          return value === allValues.password || 'Passwords do not match';
        }
      },
      location: {
        required: { value: true, message: 'Location is required' }
      }
    }
  );

  const onSubmit = async (formValues) => {
    // Validate terms acceptance
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    const userData = {
      ...formValues,
      role: userType,
      acceptedTerms
    };

    const result = await register(userData);

    if (result.success) {
      // Navigate to email verification page or dashboard
      navigate('/auth/verify-email', { state: { email: formValues.email } });
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <Link to="/" className="logo-link">
            <h1>Agri-Chain Connect</h1>
          </Link>
          <p>Create your account and start connecting</p>
        </div>

        {/* User Type Selection */}
        <div className="user-type-selection">
          <button
            type="button"
            className={`user-type-btn ${userType === 'farmer' ? 'active' : ''}`}
            onClick={() => setUserType('farmer')}
          >
            <span className="type-icon">🌾</span>
            <span className="type-title">I'm a Farmer</span>
            <span className="type-desc">Sell agricultural products</span>
          </button>
          <button
            type="button"
            className={`user-type-btn ${userType === 'buyer' ? 'active' : ''}`}
            onClick={() => setUserType('buyer')}
          >
            <span className="type-icon">🛒</span>
            <span className="type-title">I'm a Buyer</span>
            <span className="type-desc">Purchase from farmers</span>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${touched.fullName && errors.fullName ? 'input-error' : ''}`}
                placeholder="Enter your full name"
              />
              {touched.fullName && errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com"
              />
              {touched.email && errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${touched.phone && errors.phone ? 'input-error' : ''}`}
                placeholder="+254 712 345 678"
              />
              {touched.phone && errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            {/* Company/Farm Name (conditional) */}
            <div className="form-group">
              <label htmlFor="companyName">
                {userType === 'farmer' ? 'Farm Name' : 'Company Name'}
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input"
                placeholder={userType === 'farmer' ? 'Your farm name' : 'Your company name'}
              />
            </div>

            {/* Location */}
            <div className="form-group full-width">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${touched.location && errors.location ? 'input-error' : ''}`}
                placeholder="City, Country"
              />
              {touched.location && errors.location && (
                <span className="error-message">{errors.location}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {touched.password && errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="terms-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" target="_blank">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" target="_blank">Privacy Policy</Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitting || !acceptedTerms}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/auth/login" className="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;