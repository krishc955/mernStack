/**
 * API Service
 * Centralized API service with environment-aware configuration
 */

import { API_CONFIG, FEATURES } from '../config/environment';
import { API_CONSTANTS, ERROR_MESSAGES } from '../constants';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  // Create request with proper error handling and retries
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      body,
      headers = {},
      retries = this.retryAttempts,
      ...restOptions
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    
    // Add authorization header if token exists
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...restOptions,
    };

    // Log in development
    if (FEATURES.ENABLE_LOGGING) {
      console.log(`API Request: ${method} ${url}`, requestOptions);
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          ...requestOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (FEATURES.ENABLE_LOGGING) {
          console.log(`API Response: ${method} ${url}`, data);
        }

        return { data, status: response.status, ok: true };

      } catch (error) {
        if (FEATURES.ENABLE_LOGGING) {
          console.error(`API Error (attempt ${attempt + 1}): ${method} ${url}`, error);
        }

        // Don't retry on the last attempt or for client errors
        if (attempt === retries || this.isClientError(error)) {
          return this.handleError(error);
        }

        // Wait before retry
        await this.delay(API_CONSTANTS.RETRY_DELAY * (attempt + 1));
      }
    }
  }

  // HTTP Methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  async put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  // Authentication helpers
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vinora_auth_token');
    }
    return null;
  }

  setAuthToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vinora_auth_token', token);
    }
  }

  removeAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vinora_auth_token');
    }
  }

  // Error handling
  handleError(error) {
    let message = ERROR_MESSAGES.NETWORK_ERROR;

    if (error.name === 'AbortError') {
      message = 'Request timeout. Please try again.';
    } else if (error.message.includes('401')) {
      message = ERROR_MESSAGES.UNAUTHORIZED;
      this.removeAuthToken(); // Clear invalid token
    } else if (error.message.includes('404')) {
      message = ERROR_MESSAGES.NOT_FOUND;
    } else if (error.message.includes('500')) {
      message = ERROR_MESSAGES.SERVER_ERROR;
    }

    return {
      data: null,
      error: message,
      originalError: error,
      ok: false,
    };
  }

  // Check if error is a client error (4xx)
  isClientError(error) {
    const status = this.extractStatusFromError(error);
    return status >= 400 && status < 500;
  }

  // Extract status code from error message
  extractStatusFromError(error) {
    const match = error.message.match(/HTTP (\d+):/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // Delay helper for retries
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
