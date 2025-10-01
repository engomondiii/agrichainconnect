import { format, formatDistance, formatDistanceToNow, parseISO } from 'date-fns';
import { CURRENCY, DATE_FORMATS } from '@config/constants';

/**
 * Format currency value
 */
export const formatCurrency = (
  amount,
  currency = CURRENCY.DEFAULT,
  options = {}
) => {
  const defaultOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    ...defaultOptions,
    ...options,
  }).format(amount);
};

/**
 * Format number with separators
 */
export const formatNumber = (number, options = {}) => {
  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-US', {
    ...defaultOptions,
    ...options,
  }).format(number);
};

/**
 * Format large numbers (1K, 1M, 1B)
 */
export const formatCompactNumber = (number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 2) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format date
 */
export const formatDate = (date, formatStr = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format date with time
 */
export const formatDateTime = (date) => {
  return formatDate(date, DATE_FORMATS.DISPLAY_WITH_TIME);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

/**
 * Format distance between two dates
 */
export const formatDateDistance = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return formatDistance(start, end);
  } catch (error) {
    console.error('Error formatting date distance:', error);
    return '';
  }
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for 10-digit numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Return original if not 10 digits
  return phone;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Format crop quantity
 */
export const formatQuantity = (quantity, unit = 'kg') => {
  return `${formatNumber(quantity)} ${unit}`;
};

/**
 * Format trust score
 */
export const formatTrustScore = (score) => {
  return `${Math.round(score)}/1000`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert snake_case to Title Case
 */
export const snakeToTitle = (str) => {
  if (!str) return '';
  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Format address
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [
    address.street,
    address.city,
    address.state,
    address.country,
    address.zipCode,
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Format token amount (for DFFTs/DFRTs)
 */
export const formatTokenAmount = (amount, decimals = 2) => {
  return formatNumber(amount, { maximumFractionDigits: decimals });
};

/**
 * Format order status for display
 */
export const formatOrderStatus = (status) => {
  return snakeToTitle(status);
};

/**
 * Format array to comma-separated string
 */
export const formatList = (items, conjunction = 'and') => {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1).join(', ');
  return `${otherItems}, ${conjunction} ${lastItem}`;
};

export default {
  formatCurrency,
  formatNumber,
  formatCompactNumber,
  formatPercentage,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatDateDistance,
  formatFileSize,
  formatPhoneNumber,
  truncateText,
  formatQuantity,
  formatTrustScore,
  capitalize,
  snakeToTitle,
  formatAddress,
  formatTokenAmount,
  formatOrderStatus,
  formatList,
};