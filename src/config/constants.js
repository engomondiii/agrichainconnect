// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
};

// Blockchain Configuration
export const BLOCKCHAIN_CONFIG = {
  NETWORK: process.env.REACT_APP_BLOCKCHAIN_NETWORK || 'polygon-testnet',
  CHAIN_ID: parseInt(process.env.REACT_APP_CHAIN_ID) || 80001,
  RPC_URL: process.env.REACT_APP_RPC_URL || 'https://rpc-mumbai.maticvigil.com',
  CONTRACT_ADDRESS: process.env.REACT_APP_CONTRACT_ADDRESS,
  DFFT_CONTRACT_ADDRESS: process.env.REACT_APP_DFFT_CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ADDRESS: process.env.REACT_APP_ESCROW_CONTRACT_ADDRESS,
  BLOCK_EXPLORER: 'https://mumbai.polygonscan.com',
};

// User Roles
export const USER_ROLES = {
  FARMER: 'farmer',
  BUYER: 'buyer',
  ADMIN: 'admin',
  AGENT: 'agent',
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
};

// Crop Types
export const CROP_TYPES = {
  COFFEE: 'coffee',
  TEA: 'tea',
  MAIZE: 'maize',
  BEANS: 'beans',
  RICE: 'rice',
  CASSAVA: 'cassava',
  BANANA: 'banana',
  COCOA: 'cocoa',
  PALM_OIL: 'palm_oil',
  QUINOA: 'quinoa',
  AVOCADO: 'avocado',
};

// Token Types
export const TOKEN_TYPES = {
  DFFT: 'dfft', // Dynamic Fractionalized Futures Token
  DFRT: 'dfrt', // Dynamic Fractionalized Ready Token
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  GROWING: 'growing',
  HARVESTED: 'harvested',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  DISPUTED: 'disputed',
};

// Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Loan Status
export const LOAN_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  ACTIVE: 'active',
  REPAID: 'repaid',
  DEFAULTED: 'defaulted',
  REJECTED: 'rejected',
};

// Trust Score Ranges
export const TRUST_SCORE_RANGES = {
  HIGH: { min: 800, max: 1000, label: 'High', color: 'success' },
  MEDIUM: { min: 600, max: 799, label: 'Medium', color: 'warning' },
  LOW: { min: 400, max: 599, label: 'Low', color: 'error' },
  NEW: { min: 0, max: 399, label: 'New', color: 'info' },
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  M_PESA: 'm_pesa',
  BANK_TRANSFER: 'bank_transfer',
  CRYPTO: 'crypto',
};

// Alert Types
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
  ITEMS_PER_PAGE_OPTIONS: [12, 24, 48, 96],
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  MAX_IMAGES_PER_LISTING: 10,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_LONG: 'MMMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  API: 'yyyy-MM-dd',
};

// Currency
export const CURRENCY = {
  DEFAULT: 'USD',
  SYMBOL: '$',
  SUPPORTED: ['USD', 'KES', 'UGX', 'TZS', 'PHP', 'VND', 'COP'],
};

// Regions/Countries
export const REGIONS = {
  EAST_AFRICA: ['Kenya', 'Uganda', 'Tanzania'],
  SOUTHEAST_ASIA: ['Philippines', 'Vietnam', 'Indonesia'],
  LATIN_AMERICA: ['Colombia', 'Guatemala', 'Peru', 'Brazil'],
};

// Sort Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_LOW: 'price_low',
  PRICE_HIGH: 'price_high',
  TRUST_SCORE: 'trust_score',
  HARVEST_DATE: 'harvest_date',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'agrichain_auth_token',
  REFRESH_TOKEN: 'agrichain_refresh_token',
  USER_DATA: 'agrichain_user_data',
  THEME: 'agrichain_theme',
  LANGUAGE: 'agrichain_language',
  FILTERS: 'agrichain_marketplace_filters',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized. Please log in.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  REGISTRATION_SUCCESS: 'Registration successful! Please verify your email.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LISTING_CREATED: 'Crop listing created successfully!',
  PURCHASE_SUCCESS: 'Purchase completed successfully!',
  LOAN_SUBMITTED: 'Loan application submitted successfully!',
};

// Feature Flags
export const FEATURES = {
  BLOCKCHAIN_ENABLED: process.env.REACT_APP_ENABLE_BLOCKCHAIN === 'true',
  SECONDARY_MARKET_ENABLED: process.env.REACT_APP_ENABLE_SECONDARY_MARKET === 'true',
  AI_ORACLE_ENABLED: true,
  SOCIAL_LOGIN_ENABLED: false,
  NOTIFICATIONS_ENABLED: true,
};

// Application Info
export const APP_INFO = {
  NAME: process.env.REACT_APP_NAME || 'Agri-Chain Connect',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  SUPPORT_EMAIL: 'support@agrichain-connect.com',
  CONTACT_PHONE: '+254-XXX-XXXXXX',
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/agrichainconnect',
  TWITTER: 'https://twitter.com/agrichainconnect',
  LINKEDIN: 'https://linkedin.com/company/agrichainconnect',
  INSTAGRAM: 'https://instagram.com/agrichainconnect',
};

// Breakpoints (for responsive design)
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1280,
};