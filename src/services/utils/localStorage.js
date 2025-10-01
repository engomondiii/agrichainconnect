import { STORAGE_KEYS } from '@config/constants';

/**
 * Get item from localStorage
 */
export const getItem = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return null;
  }
};

/**
 * Set item in localStorage
 */
export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 */
export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 */
export const clearAll = () => {
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Check if item exists in localStorage
 */
export const hasItem = (key) => {
  return window.localStorage.getItem(key) !== null;
};

/**
 * Get authentication token
 */
export const getAuthToken = () => {
  return getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Set authentication token
 */
export const setAuthToken = (token) => {
  return setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Remove authentication token
 */
export const removeAuthToken = () => {
  return removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Get refresh token
 */
export const getRefreshToken = () => {
  return getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Set refresh token
 */
export const setRefreshToken = (token) => {
  return setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
};

/**
 * Remove refresh token
 */
export const removeRefreshToken = () => {
  return removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Get user data
 */
export const getUserData = () => {
  return getItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Set user data
 */
export const setUserData = (userData) => {
  return setItem(STORAGE_KEYS.USER_DATA, userData);
};

/**
 * Remove user data
 */
export const removeUserData = () => {
  return removeItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  removeAuthToken();
  removeRefreshToken();
  removeUserData();
};

/**
 * Get theme preference
 */
export const getTheme = () => {
  return getItem(STORAGE_KEYS.THEME) || 'light';
};

/**
 * Set theme preference
 */
export const setTheme = (theme) => {
  return setItem(STORAGE_KEYS.THEME, theme);
};

/**
 * Get language preference
 */
export const getLanguage = () => {
  return getItem(STORAGE_KEYS.LANGUAGE) || 'en';
};

/**
 * Set language preference
 */
export const setLanguage = (language) => {
  return setItem(STORAGE_KEYS.LANGUAGE, language);
};

/**
 * Get marketplace filters
 */
export const getMarketplaceFilters = () => {
  return getItem(STORAGE_KEYS.FILTERS) || {};
};

/**
 * Set marketplace filters
 */
export const setMarketplaceFilters = (filters) => {
  return setItem(STORAGE_KEYS.FILTERS, filters);
};

/**
 * Clear marketplace filters
 */
export const clearMarketplaceFilters = () => {
  return removeItem(STORAGE_KEYS.FILTERS);
};

export default {
  getItem,
  setItem,
  removeItem,
  clearAll,
  hasItem,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getUserData,
  setUserData,
  removeUserData,
  clearAuthData,
  getTheme,
  setTheme,
  getLanguage,
  setLanguage,
  getMarketplaceFilters,
  setMarketplaceFilters,
  clearMarketplaceFilters,
};