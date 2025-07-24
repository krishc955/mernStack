/**
 * useEnvironment Hook
 * Provides environment-specific functionality
 */

import { useMemo } from 'react';
import { ENVIRONMENT, FEATURES, DEBUG_CONFIG } from '../config/environment';

export const useEnvironment = () => {
  const environment = useMemo(() => ({
    ...ENVIRONMENT,
    features: FEATURES,
    debug: DEBUG_CONFIG,
    
    // Helper methods
    isDev: ENVIRONMENT.isDevelopment,
    isProd: ENVIRONMENT.isProduction,
    
    // Feature flags
    isFeatureEnabled: (feature) => FEATURES[feature] || false,
    
    // Debug helpers
    log: (...args) => {
      if (DEBUG_CONFIG.CONSOLE_LOGS) {
        console.log(...args);
      }
    },
    
    warn: (...args) => {
      if (DEBUG_CONFIG.CONSOLE_LOGS) {
        console.warn(...args);
      }
    },
    
    error: (...args) => {
      if (DEBUG_CONFIG.CONSOLE_LOGS) {
        console.error(...args);
      }
    }
  }), []);

  return environment;
};
