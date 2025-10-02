import apiClient from './apiClient';

const userService = {
  /**
   * Get current user profile
   */
  async getProfile() {
    try {
      const response = await apiClient.get('/users/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(updates) {
    try {
      const response = await apiClient.put('/users/profile', updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  /**
   * Upload profile image
   */
  async uploadProfileImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('profileImage', imageFile);

      const response = await apiClient.post('/users/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.imageUrl;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
  },

  /**
   * Verify user account
   */
  async verifyAccount(verificationCode) {
    try {
      const response = await apiClient.post('/users/verify', {
        verificationCode
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Account verification failed');
    }
  },

  /**
   * Request verification email
   */
  async requestVerificationEmail() {
    try {
      const response = await apiClient.post('/users/request-verification');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send verification email');
    }
  },

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  }
};

export default userService;