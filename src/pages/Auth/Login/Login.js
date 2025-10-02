import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useForm } from '../../../hooks/useForm';
import Button from '../../../components/common/Button/Button';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { email: '', password: '' },
    {
      email: {
        required: { value: true, message: 'Email is required' },
        email: { value: true, message: 'Invalid email address' }
      },
      password: {
        required: { value: true, message: 'Password is required' },
        minLength: { value: 6, message: 'Password must be at least 6 characters' }
      }
    }
  );

  const onSubmit = async (formValues) => {
    const result = await login(formValues.email, formValues.password);

    if (result.success) {
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Navigate to intended destination or dashboard
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <h1 className="brand-title">Agri-Chain Connect</h1>
            <p className="brand-tagline">
              Connecting farmers and buyers through blockchain technology
            </p>
            <div className="branding-features">
              <div className="feature-item">
                <span className="feature-icon">🌾</span>
                <span>Direct farmer-to-buyer marketplace</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Secure blockchain transactions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Real-time crop monitoring</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💰</span>
                <span>Fair pricing with escrow protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              {/* Email Field */}
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
                />
                {touched.email && errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="forgot-password-link">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="login-divider">
              <span>or continue with</span>
            </div>

            {/* Social Login Options */}
            <div className="social-login">
              <button className="social-btn google-btn" type="button">
                <span className="social-icon">G</span>
                Google
              </button>
              <button className="social-btn metamask-btn" type="button">
                <span className="social-icon">🦊</span>
                MetaMask
              </button>
            </div>

            {/* Register Link */}
            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/auth/register" className="register-link">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;