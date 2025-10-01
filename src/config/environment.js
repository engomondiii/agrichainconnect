// Environment Detection
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

// Environment-specific Configuration
const environmentConfig = {
  development: {
    apiUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
    enableLogging: true,
    enableDevTools: true,
    enableMockData: true,
    apiTimeout: 30000,
    logLevel: 'debug',
  },
  production: {
    apiUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.agrichain-connect.com/api',
    enableLogging: false,
    enableDevTools: false,
    enableMockData: false,
    apiTimeout: 15000,
    logLevel: 'error',
  },
  test: {
    apiUrl: 'http://localhost:5000/api',
    enableLogging: false,
    enableDevTools: false,
    enableMockData: true,
    apiTimeout: 10000,
    logLevel: 'warn',
  },
};

// Get current environment config
const getCurrentConfig = () => {
  if (isProduction) return environmentConfig.production;
  if (isTest) return environmentConfig.test;
  return environmentConfig.development;
};

// Export environment configuration
export const ENV = {
  // Environment flags
  isDevelopment,
  isProduction,
  isTest,

  // Current environment config
  ...getCurrentConfig(),

  // API Configuration
  api: {
    baseUrl: getCurrentConfig().apiUrl,
    timeout: getCurrentConfig().apiTimeout,
    headers: {
      'Content-Type': 'application/json',
    },
  },

  // Blockchain Configuration
  blockchain: {
    network: process.env.REACT_APP_BLOCKCHAIN_NETWORK || 'polygon-testnet',
    chainId: parseInt(process.env.REACT_APP_CHAIN_ID) || 80001,
    rpcUrl: process.env.REACT_APP_RPC_URL || 'https://rpc-mumbai.maticvigil.com',
    explorerUrl: isDevelopment 
      ? 'https://mumbai.polygonscan.com' 
      : 'https://polygonscan.com',
  },

  // Third-party Services
  services: {
    stripe: {
      publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY || '',
      enabled: !!process.env.REACT_APP_STRIPE_PUBLIC_KEY,
    },
    googleAnalytics: {
      trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',
      enabled: isProduction && !!process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
    },
  },

  // Feature Flags
  features: {
    blockchain: process.env.REACT_APP_ENABLE_BLOCKCHAIN === 'true',
    secondaryMarket: process.env.REACT_APP_ENABLE_SECONDARY_MARKET === 'true',
    socialLogin: false,
    notifications: true,
    darkMode: true,
  },

  // Application Info
  app: {
    name: process.env.REACT_APP_NAME || 'Agri-Chain Connect',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
};

// Utility function to check if a feature is enabled
export const isFeatureEnabled = (featureName) => {
  return ENV.features[featureName] || false;
};

// Utility function to get API URL
export const getApiUrl = (endpoint = '') => {
  return `${ENV.api.baseUrl}${endpoint}`;
};

// Utility function to log (only in development)
export const devLog = (...args) => {
  if (ENV.enableLogging) {
    console.log('[DEV]', ...args);
  }
};

// Utility function to log errors
export const logError = (error, context = '') => {
  if (ENV.logLevel === 'error' || ENV.logLevel === 'warn' || ENV.logLevel === 'debug') {
    console.error(`[ERROR] ${context}:`, error);
  }
};

// Utility function to log warnings
export const logWarning = (message, context = '') => {
  if (ENV.logLevel === 'warn' || ENV.logLevel === 'debug') {
    console.warn(`[WARNING] ${context}:`, message);
  }
};

// Export default
export default ENV;