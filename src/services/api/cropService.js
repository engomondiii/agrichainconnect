import apiClient from './apiClient';

/**
 * Crop Service
 * Handles all crop-related API operations
 */

// Get all crops with optional filters
export const getAllCrops = async (params = {}) => {
  try {
    const response = await apiClient.get('/crops', { params });
    return {
      success: true,
      data: response.data,
      message: 'Crops fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch crops'
    };
  }
};

// Get a single crop by ID
export const getCropById = async (cropId) => {
  try {
    const response = await apiClient.get(`/crops/${cropId}`);
    return {
      success: true,
      data: response.data,
      message: 'Crop details fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch crop details'
    };
  }
};

// Create a new crop listing
export const createCropListing = async (cropData) => {
  try {
    const response = await apiClient.post('/crops', cropData);
    return {
      success: true,
      data: response.data,
      message: 'Crop listing created successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to create crop listing'
    };
  }
};

// Update an existing crop listing
export const updateCropListing = async (cropId, cropData) => {
  try {
    const response = await apiClient.put(`/crops/${cropId}`, cropData);
    return {
      success: true,
      data: response.data,
      message: 'Crop listing updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to update crop listing'
    };
  }
};

// Delete a crop listing
export const deleteCropListing = async (cropId) => {
  try {
    const response = await apiClient.delete(`/crops/${cropId}`);
    return {
      success: true,
      data: response.data,
      message: 'Crop listing deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to delete crop listing'
    };
  }
};

// Get crops by farmer ID
export const getCropsByFarmer = async (farmerId, params = {}) => {
  try {
    const response = await apiClient.get(`/crops/farmer/${farmerId}`, { params });
    return {
      success: true,
      data: response.data,
      message: 'Farmer crops fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch farmer crops'
    };
  }
};

// Upload crop images
export const uploadCropImages = async (cropId, images) => {
  try {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    const response = await apiClient.post(`/crops/${cropId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data,
      message: 'Images uploaded successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to upload images'
    };
  }
};

// Delete crop image
export const deleteCropImage = async (cropId, imageId) => {
  try {
    const response = await apiClient.delete(`/crops/${cropId}/images/${imageId}`);
    return {
      success: true,
      data: response.data,
      message: 'Image deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to delete image'
    };
  }
};

// Get crop statistics
export const getCropStatistics = async (cropId) => {
  try {
    const response = await apiClient.get(`/crops/${cropId}/statistics`);
    return {
      success: true,
      data: response.data,
      message: 'Crop statistics fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch crop statistics'
    };
  }
};

// Get AI oracle data for a crop
export const getCropOracleData = async (cropId) => {
  try {
    const response = await apiClient.get(`/crops/${cropId}/oracle`);
    return {
      success: true,
      data: response.data,
      message: 'Oracle data fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch oracle data'
    };
  }
};

// Get featured/promoted crops
export const getFeaturedCrops = async (limit = 6) => {
  try {
    const response = await apiClient.get('/crops/featured', {
      params: { limit }
    });
    return {
      success: true,
      data: response.data,
      message: 'Featured crops fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch featured crops'
    };
  }
};

// Get related crops (based on type, location, etc.)
export const getRelatedCrops = async (cropId, limit = 4) => {
  try {
    const response = await apiClient.get(`/crops/${cropId}/related`, {
      params: { limit }
    });
    return {
      success: true,
      data: response.data,
      message: 'Related crops fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch related crops'
    };
  }
};

// Update crop status (active, sold, expired, etc.)
export const updateCropStatus = async (cropId, status) => {
  try {
    const response = await apiClient.patch(`/crops/${cropId}/status`, { status });
    return {
      success: true,
      data: response.data,
      message: 'Crop status updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to update crop status'
    };
  }
};

// Get crop reviews/ratings
export const getCropReviews = async (cropId, params = {}) => {
  try {
    const response = await apiClient.get(`/crops/${cropId}/reviews`, { params });
    return {
      success: true,
      data: response.data,
      message: 'Reviews fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch reviews'
    };
  }
};

// Add crop review/rating
export const addCropReview = async (cropId, reviewData) => {
  try {
    const response = await apiClient.post(`/crops/${cropId}/reviews`, reviewData);
    return {
      success: true,
      data: response.data,
      message: 'Review added successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to add review'
    };
  }
};

// Get crop types/categories
export const getCropTypes = async () => {
  try {
    const response = await apiClient.get('/crops/types');
    return {
      success: true,
      data: response.data,
      message: 'Crop types fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch crop types'
    };
  }
};

export default {
  getAllCrops,
  getCropById,
  createCropListing,
  updateCropListing,
  deleteCropListing,
  getCropsByFarmer,
  uploadCropImages,
  deleteCropImage,
  getCropStatistics,
  getCropOracleData,
  getFeaturedCrops,
  getRelatedCrops,
  updateCropStatus,
  getCropReviews,
  addCropReview,
  getCropTypes
};