import apiClient from './apiClient';

/**
 * Marketplace Service
 * Handles marketplace operations including search, filtering, and purchases
 */

// Search and filter crops
export const searchCrops = async (searchParams) => {
  try {
    const {
      query,
      cropType,
      location,
      minPrice,
      maxPrice,
      minTrustScore,
      tokenType, // 'DFFT' or 'DFRT'
      organic,
      certified,
      sortBy,
      sortOrder,
      page,
      limit
    } = searchParams;

    const params = {
      q: query,
      crop_type: cropType,
      location,
      min_price: minPrice,
      max_price: maxPrice,
      min_trust_score: minTrustScore,
      token_type: tokenType,
      organic,
      certified,
      sort_by: sortBy,
      sort_order: sortOrder,
      page: page || 1,
      limit: limit || 12
    };

    // Remove undefined/null values
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null || params[key] === '') {
        delete params[key];
      }
    });

    const response = await apiClient.get('/marketplace/search', { params });
    
    return {
      success: true,
      data: response.data.crops,
      pagination: response.data.pagination,
      filters: response.data.filters,
      message: 'Search completed successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      pagination: null,
      filters: null,
      message: error.response?.data?.message || 'Search failed'
    };
  }
};

// Get marketplace statistics
export const getMarketplaceStats = async () => {
  try {
    const response = await apiClient.get('/marketplace/statistics');
    return {
      success: true,
      data: response.data,
      message: 'Statistics fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch statistics'
    };
  }
};

// Get price data for a specific crop type
export const getPriceData = async (cropType, timeRange = '30d') => {
  try {
    const response = await apiClient.get('/marketplace/prices', {
      params: { crop_type: cropType, range: timeRange }
    });
    return {
      success: true,
      data: response.data,
      message: 'Price data fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch price data'
    };
  }
};

// Get price trends across all crops
export const getPriceTrends = async (params = {}) => {
  try {
    const response = await apiClient.get('/marketplace/price-trends', { params });
    return {
      success: true,
      data: response.data,
      message: 'Price trends fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch price trends'
    };
  }
};

// Purchase tokens for a crop
export const purchaseTokens = async (purchaseData) => {
  try {
    const {
      cropId,
      quantity,
      paymentMethod,
      deliveryAddress,
      notes
    } = purchaseData;

    const response = await apiClient.post('/marketplace/purchase', {
      crop_id: cropId,
      quantity,
      payment_method: paymentMethod,
      delivery_address: deliveryAddress,
      notes
    });

    return {
      success: true,
      data: response.data,
      message: 'Purchase completed successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Purchase failed'
    };
  }
};

// Calculate purchase cost (including fees)
export const calculatePurchaseCost = async (cropId, quantity) => {
  try {
    const response = await apiClient.post('/marketplace/calculate-cost', {
      crop_id: cropId,
      quantity
    });

    return {
      success: true,
      data: response.data,
      message: 'Cost calculated successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to calculate cost'
    };
  }
};

// Get available locations/regions
export const getLocations = async () => {
  try {
    const response = await apiClient.get('/marketplace/locations');
    return {
      success: true,
      data: response.data,
      message: 'Locations fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to fetch locations'
    };
  }
};

// Get filter options (crop types, price ranges, etc.)
export const getFilterOptions = async () => {
  try {
    const response = await apiClient.get('/marketplace/filter-options');
    return {
      success: true,
      data: response.data,
      message: 'Filter options fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch filter options'
    };
  }
};

// Add crop to wishlist/favorites
export const addToWishlist = async (cropId) => {
  try {
    const response = await apiClient.post(`/marketplace/wishlist/${cropId}`);
    return {
      success: true,
      data: response.data,
      message: 'Added to wishlist'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to add to wishlist'
    };
  }
};

// Remove crop from wishlist
export const removeFromWishlist = async (cropId) => {
  try {
    const response = await apiClient.delete(`/marketplace/wishlist/${cropId}`);
    return {
      success: true,
      data: response.data,
      message: 'Removed from wishlist'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to remove from wishlist'
    };
  }
};

// Get user's wishlist
export const getWishlist = async () => {
  try {
    const response = await apiClient.get('/marketplace/wishlist');
    return {
      success: true,
      data: response.data,
      message: 'Wishlist fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to fetch wishlist'
    };
  }
};

// Get recommended crops for user
export const getRecommendations = async (limit = 6) => {
  try {
    const response = await apiClient.get('/marketplace/recommendations', {
      params: { limit }
    });
    return {
      success: true,
      data: response.data,
      message: 'Recommendations fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to fetch recommendations'
    };
  }
};

// Report a crop listing
export const reportCrop = async (cropId, reason, details) => {
  try {
    const response = await apiClient.post(`/marketplace/report/${cropId}`, {
      reason,
      details
    });
    return {
      success: true,
      data: response.data,
      message: 'Report submitted successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to submit report'
    };
  }
};

// Verify purchase eligibility
export const verifyPurchaseEligibility = async (cropId, quantity) => {
  try {
    const response = await apiClient.post('/marketplace/verify-eligibility', {
      crop_id: cropId,
      quantity
    });
    return {
      success: true,
      data: response.data,
      message: 'Eligibility verified'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Verification failed'
    };
  }
};

// Get marketplace analytics
export const getMarketplaceAnalytics = async (timeRange = '30d') => {
  try {
    const response = await apiClient.get('/marketplace/analytics', {
      params: { range: timeRange }
    });
    return {
      success: true,
      data: response.data,
      message: 'Analytics fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch analytics'
    };
  }
};

export default {
  searchCrops,
  getMarketplaceStats,
  getPriceData,
  getPriceTrends,
  purchaseTokens,
  calculatePurchaseCost,
  getLocations,
  getFilterOptions,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getRecommendations,
  reportCrop,
  verifyPurchaseEligibility,
  getMarketplaceAnalytics
};