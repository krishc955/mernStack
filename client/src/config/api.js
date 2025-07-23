// API Configuration for Vinora ecommerce
const getApiBaseUrl = () => {
  // Check for explicit environment variable first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Auto-detect based on current domain
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    
    // If we're on the production subdomain, use Render backend
    if (currentHost.includes('vinora.royalappleshimla.com')) {
      return 'https://mernstack-7sfn.onrender.com';
    }
  }
  
  // Default based on environment mode
  if (import.meta.env.MODE === 'production') {
    return 'https://mernstack-7sfn.onrender.com'; // Your Render backend URL
  } else {
    return 'http://localhost:5000'; // Development backend
  }
};

const API_BASE_URL = getApiBaseUrl();

// Debug logging in development
if (import.meta.env.MODE === 'development') {
  console.log('🔧 API Base URL:', API_BASE_URL);
  console.log('🔧 Environment Mode:', import.meta.env.MODE);
}

export { API_BASE_URL };
