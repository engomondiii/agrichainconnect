// Public Routes (accessible without authentication)
export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  HOW_IT_WORKS: '/how-it-works',
  MARKETPLACE: '/marketplace',
  CROP_DETAIL: '/marketplace/:cropId',
  IMPACT: '/impact',
  CONTACT: '/contact',
  
  // Auth Routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  VERIFY_EMAIL: '/verify-email/:token',
};

// Protected Routes (require authentication)
export const PROTECTED_ROUTES = {
  // Common Routes
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',

  // Farmer Routes
  FARMER_DASHBOARD: '/dashboard/farmer',
  FARMER_LISTINGS: '/farmer/listings',
  CREATE_LISTING: '/farmer/listings/create',
  EDIT_LISTING: '/farmer/listings/edit/:listingId',
  FARMER_ORDERS: '/farmer/orders',
  FARMER_EARNINGS: '/farmer/earnings',
  LOAN_APPLICATION: '/farmer/loans/apply',
  LOAN_STATUS: '/farmer/loans',

  // Buyer Routes
  BUYER_DASHBOARD: '/dashboard/buyer',
  BUYER_PORTFOLIO: '/buyer/portfolio',
  BUYER_ORDERS: '/buyer/orders',
  ORDER_TRACKING: '/buyer/orders/:orderId',
  BUYER_ANALYTICS: '/buyer/analytics',

  // Secondary Market Routes
  SECONDARY_MARKET: '/secondary-market',
  
  // Admin Routes
  ADMIN_DASHBOARD: '/dashboard/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_DISPUTES: '/admin/disputes',
  ADMIN_SETTINGS: '/admin/settings',
};

// Role-based Route Access
export const ROUTE_ACCESS = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
  FARMER: 'farmer',
  BUYER: 'buyer',
  ADMIN: 'admin',
};

// Route Configuration with Access Control
export const ROUTE_CONFIG = {
  // Public Routes
  [PUBLIC_ROUTES.HOME]: { access: ROUTE_ACCESS.PUBLIC, title: 'Home' },
  [PUBLIC_ROUTES.ABOUT]: { access: ROUTE_ACCESS.PUBLIC, title: 'About Us' },
  [PUBLIC_ROUTES.HOW_IT_WORKS]: { access: ROUTE_ACCESS.PUBLIC, title: 'How It Works' },
  [PUBLIC_ROUTES.MARKETPLACE]: { access: ROUTE_ACCESS.PUBLIC, title: 'Marketplace' },
  [PUBLIC_ROUTES.CROP_DETAIL]: { access: ROUTE_ACCESS.PUBLIC, title: 'Crop Details' },
  [PUBLIC_ROUTES.IMPACT]: { access: ROUTE_ACCESS.PUBLIC, title: 'Impact' },
  [PUBLIC_ROUTES.CONTACT]: { access: ROUTE_ACCESS.PUBLIC, title: 'Contact Us' },
  [PUBLIC_ROUTES.LOGIN]: { access: ROUTE_ACCESS.PUBLIC, title: 'Login' },
  [PUBLIC_ROUTES.REGISTER]: { access: ROUTE_ACCESS.PUBLIC, title: 'Register' },
  [PUBLIC_ROUTES.FORGOT_PASSWORD]: { access: ROUTE_ACCESS.PUBLIC, title: 'Forgot Password' },

  // Farmer Routes
  [PROTECTED_ROUTES.FARMER_DASHBOARD]: { access: ROUTE_ACCESS.FARMER, title: 'Farmer Dashboard' },
  [PROTECTED_ROUTES.FARMER_LISTINGS]: { access: ROUTE_ACCESS.FARMER, title: 'My Listings' },
  [PROTECTED_ROUTES.CREATE_LISTING]: { access: ROUTE_ACCESS.FARMER, title: 'Create Listing' },
  [PROTECTED_ROUTES.EDIT_LISTING]: { access: ROUTE_ACCESS.FARMER, title: 'Edit Listing' },
  [PROTECTED_ROUTES.FARMER_ORDERS]: { access: ROUTE_ACCESS.FARMER, title: 'My Orders' },
  [PROTECTED_ROUTES.FARMER_EARNINGS]: { access: ROUTE_ACCESS.FARMER, title: 'Earnings' },
  [PROTECTED_ROUTES.LOAN_APPLICATION]: { access: ROUTE_ACCESS.FARMER, title: 'Apply for Loan' },
  [PROTECTED_ROUTES.LOAN_STATUS]: { access: ROUTE_ACCESS.FARMER, title: 'My Loans' },

  // Buyer Routes
  [PROTECTED_ROUTES.BUYER_DASHBOARD]: { access: ROUTE_ACCESS.BUYER, title: 'Buyer Dashboard' },
  [PROTECTED_ROUTES.BUYER_PORTFOLIO]: { access: ROUTE_ACCESS.BUYER, title: 'My Portfolio' },
  [PROTECTED_ROUTES.BUYER_ORDERS]: { access: ROUTE_ACCESS.BUYER, title: 'My Orders' },
  [PROTECTED_ROUTES.ORDER_TRACKING]: { access: ROUTE_ACCESS.BUYER, title: 'Track Order' },
  [PROTECTED_ROUTES.BUYER_ANALYTICS]: { access: ROUTE_ACCESS.BUYER, title: 'Analytics' },

  // Secondary Market
  [PROTECTED_ROUTES.SECONDARY_MARKET]: { access: ROUTE_ACCESS.AUTHENTICATED, title: 'Secondary Market' },

  // Admin Routes
  [PROTECTED_ROUTES.ADMIN_DASHBOARD]: { access: ROUTE_ACCESS.ADMIN, title: 'Admin Dashboard' },
  [PROTECTED_ROUTES.ADMIN_USERS]: { access: ROUTE_ACCESS.ADMIN, title: 'User Management' },
  [PROTECTED_ROUTES.ADMIN_TRANSACTIONS]: { access: ROUTE_ACCESS.ADMIN, title: 'Transactions' },
  [PROTECTED_ROUTES.ADMIN_DISPUTES]: { access: ROUTE_ACCESS.ADMIN, title: 'Disputes' },
  [PROTECTED_ROUTES.ADMIN_SETTINGS]: { access: ROUTE_ACCESS.ADMIN, title: 'Settings' },
};

// Navigation Menu Structure
export const NAVIGATION_MENU = {
  PUBLIC: [
    { label: 'Home', path: PUBLIC_ROUTES.HOME },
    { label: 'Marketplace', path: PUBLIC_ROUTES.MARKETPLACE },
    { label: 'How It Works', path: PUBLIC_ROUTES.HOW_IT_WORKS },
    { label: 'Impact', path: PUBLIC_ROUTES.IMPACT },
    { label: 'About', path: PUBLIC_ROUTES.ABOUT },
    { label: 'Contact', path: PUBLIC_ROUTES.CONTACT },
  ],
  FARMER: [
    { label: 'Dashboard', path: PROTECTED_ROUTES.FARMER_DASHBOARD },
    { label: 'My Listings', path: PROTECTED_ROUTES.FARMER_LISTINGS },
    { label: 'Orders', path: PROTECTED_ROUTES.FARMER_ORDERS },
    { label: 'Earnings', path: PROTECTED_ROUTES.FARMER_EARNINGS },
    { label: 'Loans', path: PROTECTED_ROUTES.LOAN_STATUS },
    { label: 'Marketplace', path: PUBLIC_ROUTES.MARKETPLACE },
  ],
  BUYER: [
    { label: 'Dashboard', path: PROTECTED_ROUTES.BUYER_DASHBOARD },
    { label: 'Marketplace', path: PUBLIC_ROUTES.MARKETPLACE },
    { label: 'Portfolio', path: PROTECTED_ROUTES.BUYER_PORTFOLIO },
    { label: 'Orders', path: PROTECTED_ROUTES.BUYER_ORDERS },
    { label: 'Analytics', path: PROTECTED_ROUTES.BUYER_ANALYTICS },
    { label: 'Secondary Market', path: PROTECTED_ROUTES.SECONDARY_MARKET },
  ],
  ADMIN: [
    { label: 'Dashboard', path: PROTECTED_ROUTES.ADMIN_DASHBOARD },
    { label: 'Users', path: PROTECTED_ROUTES.ADMIN_USERS },
    { label: 'Transactions', path: PROTECTED_ROUTES.ADMIN_TRANSACTIONS },
    { label: 'Disputes', path: PROTECTED_ROUTES.ADMIN_DISPUTES },
    { label: 'Settings', path: PROTECTED_ROUTES.ADMIN_SETTINGS },
  ],
};

// Utility function to get route by role
export const getRoutesByRole = (role) => {
  return NAVIGATION_MENU[role.toUpperCase()] || NAVIGATION_MENU.PUBLIC;
};

// Utility function to check if user has access to route
export const hasRouteAccess = (route, userRole) => {
  const routeConfig = ROUTE_CONFIG[route];
  if (!routeConfig) return false;
  
  if (routeConfig.access === ROUTE_ACCESS.PUBLIC) return true;
  if (routeConfig.access === ROUTE_ACCESS.AUTHENTICATED && userRole) return true;
  if (routeConfig.access === userRole) return true;
  
  return false;
};

// Default redirect routes after login
export const DEFAULT_REDIRECT = {
  farmer: PROTECTED_ROUTES.FARMER_DASHBOARD,
  buyer: PROTECTED_ROUTES.BUYER_DASHBOARD,
  admin: PROTECTED_ROUTES.ADMIN_DASHBOARD,
  default: PUBLIC_ROUTES.HOME,
};

// Export all routes as a single object
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
};

// Export default
export default ROUTES;