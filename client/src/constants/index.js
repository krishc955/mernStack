/**
 * Application Constants
 * Centralized location for all application-wide constants
 */

// UI Constants
export const UI_CONSTANTS = {
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE_DESKTOP: 1280,
  },
  
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  
  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  },
};

// Business Logic Constants
export const BUSINESS_CONSTANTS = {
  MAX_CART_ITEMS: 99,
  MIN_ORDER_AMOUNT: 1,
  MAX_PRODUCT_IMAGES: 5,
  PRODUCT_RATING_MAX: 5,
  DEFAULT_PAGE_SIZE: 12,
  MAX_SEARCH_RESULTS: 100,
};

// Form Validation Constants
export const VALIDATION_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  PRODUCT_NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 1000,
  REVIEW_MAX_LENGTH: 500,
};

// API Constants
export const API_CONSTANTS = {
  DEFAULT_TIMEOUT: 15000,
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  ENDPOINTS: {
    AUTH: '/api/auth',
    PRODUCTS: '/api/products',
    CART: '/api/cart',
    ORDERS: '/api/orders',
    USERS: '/api/users',
    ADMIN: '/api/admin',
  },
};

// Color Scheme Constants
export const COLOR_CONSTANTS = {
  PRIMARY_COLORS: {
    BEIGE_50: '#f5f0e8',
    BEIGE_100: '#e8dcc6',
    BEIGE_200: '#d4c5a9',
    BEIGE_300: '#c0ae8c',
    BROWN_600: '#8b4513',
    BROWN_700: '#654321',
  },
  
  STATUS_COLORS: {
    SUCCESS: '#10b981',
    ERROR: '#ef4444',
    WARNING: '#f59e0b',
    INFO: '#3b82f6',
  },
};

// Route Constants
export const ROUTE_CONSTANTS = {
  PUBLIC: {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    FAQ: '/faq',
    SHIPPING: '/shipping',
    RETURNS: '/returns',
    SIZE_GUIDE: '/size-guide',
  },
  
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  
  SHOP: {
    HOME: '/shop/home',
    LISTING: '/shop/listing',
    CHECKOUT: '/shop/checkout',
    ACCOUNT: '/shop/account',
    SEARCH: '/shop/search',
  },
  
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    FEATURES: '/admin/features',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'vinora_auth_token',
  USER_PREFERENCES: 'vinora_user_preferences',
  CART_DATA: 'vinora_cart_data',
  THEME: 'vinora_theme',
  LANGUAGE: 'vinora_language',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back! You have been logged in successfully.',
  REGISTER_SUCCESS: 'Account created successfully! Please log in.',
  PRODUCT_ADDED: 'Product added to cart successfully.',
  ORDER_PLACED: 'Your order has been placed successfully.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
};

export default {
  UI_CONSTANTS,
  BUSINESS_CONSTANTS,
  VALIDATION_CONSTANTS,
  API_CONSTANTS,
  COLOR_CONSTANTS,
  ROUTE_CONSTANTS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
