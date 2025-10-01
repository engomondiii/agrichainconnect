import { ERROR_MESSAGES } from '@config/constants';

/**
 * Custom Error Class
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Parse error from API response
 */
export const parseError = (error) => {
  // Network error
  if (!error.response) {
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      statusCode: 0,
      data: null,
    };
  }

  const { status, data } = error.response;

  // Get error message
  const message = 
    data?.message || 
    data?.error || 
    getErrorMessageByStatus(status);

  return {
    message,
    statusCode: status,
    data: data?.errors || null,
  };
};

/**
 * Get user-friendly error message by HTTP status code
 */
export const getErrorMessageByStatus = (statusCode) => {
  switch (statusCode) {
    case 400:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 500:
    case 502:
    case 503:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

/**
 * Handle API error and return formatted error object
 */
export const handleApiError = (error, context = '') => {
  const parsedError = parseError(error);
  
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[API Error] ${context}:`, {
      message: parsedError.message,
      status: parsedError.statusCode,
      data: parsedError.data,
      originalError: error,
    });
  }

  return parsedError;
};

/**
 * Display error notification (to be implemented with your notification system)
 */
export const displayError = (error, showNotification) => {
  const errorMessage = typeof error === 'string' 
    ? error 
    : error.message || ERROR_MESSAGES.UNKNOWN_ERROR;

  if (showNotification && typeof showNotification === 'function') {
    showNotification(errorMessage, 'error');
  }

  return errorMessage;
};

/**
 * Validation error handler
 */
export const handleValidationErrors = (errors) => {
  if (!errors || typeof errors !== 'object') {
    return {};
  }

  // Convert array of errors to object keyed by field name
  if (Array.isArray(errors)) {
    return errors.reduce((acc, error) => {
      if (error.field) {
        acc[error.field] = error.message;
      }
      return acc;
    }, {});
  }

  // Already an object
  return errors;
};

/**
 * Log error for debugging
 */
export const logError = (error, context = '', additionalData = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔴 Error: ${context}`);
    console.error('Message:', error.message || error);
    console.error('Stack:', error.stack);
    if (Object.keys(additionalData).length > 0) {
      console.error('Additional Data:', additionalData);
    }
    console.groupEnd();
  }
};

/**
 * Check if error is authentication related
 */
export const isAuthError = (error) => {
  const statusCode = error.statusCode || error.response?.status;
  return statusCode === 401 || statusCode === 403;
};

/**
 * Check if error is network related
 */
export const isNetworkError = (error) => {
  return !error.response || error.code === 'ECONNABORTED';
};

/**
 * Retry helper for failed requests
 */
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }

      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};

export default {
  AppError,
  parseError,
  handleApiError,
  displayError,
  handleValidationErrors,
  logError,
  isAuthError,
  isNetworkError,
  retryRequest,
};