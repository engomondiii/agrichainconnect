import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import authService from '../../../services/api/authService';
import Button from '../../../components/common/Button/Button';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { email: '' },
    {
      email: {
        required: { value: true, message: 'Email is required' },
        email: { value: true, message: 'Invalid email address' }
      }
    }
  );

  const onSubmit = async (formValues) => {
    try {
      await authService.requestPasswordReset(formValues.email);
      setSubmittedEmail(formValues.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset request failed:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h2>Check Your Email</h2>
            <p className="success-message">
              We've sent password reset instructions to <strong>{submittedEmail}</strong>
            </p>
            <div className="success-details">
              <p>Please check your email and click the reset link to create a new password.</p>
              <p className="note">
                <strong>Note:</strong> The link will expire in 1 hour for security reasons.
              </p>
            </div>

            <div className="success-actions">
              <Link to="/auth/login">
                <Button variant="primary" fullWidth>
                  Back to Login
                </Button>
              </Link>
              <button
                type="button"
                className="resend-link"
                onClick={() => setIsSubmitted(false)}
              >
                Didn't receive the email? Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-content">
          {/* Header */}
          <div className="forgot-password-header">
            <div className="header-icon">🔒</div>
            <h2>Forgot Password?</h2>
            <p>
              No worries! Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email"
                autoComplete="email"
                autoFocus
              />
              {touched.email && errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="forgot-password-footer">
            <Link to="/auth/login" className="back-link">
              ← Back to Login
            </Link>
          </div>

          {/* Help Section */}
          <div className="help-section">
            <h4>Need Help?</h4>
            <ul>
              <li>Make sure you're using the email address associated with your account</li>
              <li>Check your spam or junk folder if you don't see the email</li>
              <li>
                Still having trouble?{' '}
                <Link to="/contact" className="help-link">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;