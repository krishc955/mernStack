/**
 * useApi Hook
 * Centralized API handling with environment-aware configuration
 */

import { useState, useEffect, useCallback } from 'react';
import { API_CONFIG } from '../config/environment';
import { useEnvironment } from './useEnvironment';

export const useApi = () => {
  const { log, error } = useEnvironment();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // Create API client with environment-specific configuration
  const apiClient = useCallback(async (endpoint, options = {}) => {
    const {
      method = 'GET',
      body,
      headers = {},
      timeout = API_CONFIG.TIMEOUT,
      ...restOptions
    } = options;

    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      setLoading(true);
      setErrors(null);
      
      log(`API Request: ${method} ${url}`, { body, headers });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        ...restOptions,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      log(`API Response: ${method} ${url}`, data);
      
      return { data, status: response.status, ok: true };
    } catch (err) {
      clearTimeout(timeoutId);
      
      const errorMessage = err.name === 'AbortError' 
        ? 'Request timeout' 
        : err.message;
      
      error(`API Error: ${method} ${url}`, err);
      setErrors(errorMessage);
      
      return { data: null, error: errorMessage, ok: false };
    } finally {
      setLoading(false);
    }
  }, [log, error]);

  // Common API methods
  const get = useCallback((endpoint, options = {}) => {
    return apiClient(endpoint, { ...options, method: 'GET' });
  }, [apiClient]);

  const post = useCallback((endpoint, body, options = {}) => {
    return apiClient(endpoint, { ...options, method: 'POST', body });
  }, [apiClient]);

  const put = useCallback((endpoint, body, options = {}) => {
    return apiClient(endpoint, { ...options, method: 'PUT', body });
  }, [apiClient]);

  const del = useCallback((endpoint, options = {}) => {
    return apiClient(endpoint, { ...options, method: 'DELETE' });
  }, [apiClient]);

  const patch = useCallback((endpoint, body, options = {}) => {
    return apiClient(endpoint, { ...options, method: 'PATCH', body });
  }, [apiClient]);

  return {
    loading,
    errors,
    apiClient,
    get,
    post,
    put,
    delete: del,
    patch,
    clearErrors: () => setErrors(null),
  };
};
