/**
 * Environment Configuration
 * Manages different settings for development and production environments
 */

const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// API Configuration
export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:5001' 
    : import.meta.env.VITE_API_URL || 'https://your-production-api.com',
  
  TIMEOUT: isDevelopment ? 30000 : 15000,
  
  RETRY_ATTEMPTS: isDevelopment ? 3 : 1,
};

// Feature Flags
export const FEATURES = {
  ENABLE_LOGGING: isDevelopment,
  ENABLE_DEBUG_TOOLS: isDevelopment,
  ENABLE_PERFORMANCE_MONITORING: isProduction,
  ENABLE_ANALYTICS: isProduction,
  ENABLE_LAZY_LOADING: true,
  ENABLE_SERVICE_WORKER: isProduction,
};

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  IMAGE_LAZY_LOADING: true,
  CODE_SPLITTING: true,
  PREFETCH_ROUTES: isProduction,
  CACHE_DURATION: isProduction ? 86400000 : 0, // 24 hours in prod, no cache in dev
};

// Debug Configuration
export const DEBUG_CONFIG = {
  SHOW_REDUX_LOGGER: isDevelopment,
  SHOW_PERFORMANCE_METRICS: isDevelopment,
  CONSOLE_LOGS: isDevelopment,
  ERROR_BOUNDARY_FALLBACK: isDevelopment,
};

// Export environment info
export const ENVIRONMENT = {
  isDevelopment,
  isProduction,
  mode: import.meta.env.MODE,
  nodeEnv: import.meta.env.NODE_ENV,
};

export default {
  API_CONFIG,
  FEATURES,
  PERFORMANCE_CONFIG,
  DEBUG_CONFIG,
  ENVIRONMENT,
};
