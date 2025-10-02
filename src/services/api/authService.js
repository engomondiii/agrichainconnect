import apiClient from './apiClient';

const authService = {
  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  /**
   * Register new user
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    try {
      const response = await apiClient.post('/auth/forgot-password', {
        email
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset request failed');
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(refreshToken) {
    try {
      const response = await apiClient.post('/auth/refresh', {
        refreshToken
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },

  /**
   * Verify authentication token
   */
  async verifyToken(token) {
    try {
      const response = await apiClient.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
  },

  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password change failed');
    }
  }
};

export default authService;