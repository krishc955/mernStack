/**
 * useLocalStorage Hook
 * Manages localStorage with proper error handling and SSR support
 */

import { useState, useEffect, useCallback } from 'react';
import { useEnvironment } from './useEnvironment';

export const useLocalStorage = (key, initialValue) => {
  const { log, error } = useEnvironment();
  
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      error(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        log(`Saved to localStorage: ${key}`, valueToStore);
      }
    } catch (err) {
      error(`Error setting localStorage key "${key}":`, err);
    }
  }, [key, storedValue, log, error]);

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        log(`Removed from localStorage: ${key}`);
      }
    } catch (err) {
      error(`Error removing localStorage key "${key}":`, err);
    }
  }, [key, initialValue, log, error]);

  return [storedValue, setValue, removeValue];
};
