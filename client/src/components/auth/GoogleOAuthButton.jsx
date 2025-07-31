import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const GoogleOAuthButton = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Detect Safari browser
    const userAgent = window.navigator.userAgent;
    const isIOSSafari = /iPad|iPhone|iPod/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isMacSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor) && !/Chrome/.test(userAgent);
    setIsSafari(isIOSSafari || isMacSafari);
  }, []);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Get the current API base URL from environment or default
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const googleAuthURL = `${API_BASE_URL}/api/auth/google`;
    
    if (isSafari) {
      // Safari-specific handling
      console.log('🍎 Safari detected - using direct navigation');
      
      // For Safari, avoid popup and use direct navigation
      // Add a parameter to help with tracking
      const safariAuthURL = `${googleAuthURL}?safari=true&t=${Date.now()}`;
      
      // Use location.assign for better Safari compatibility
      window.location.assign(safariAuthURL);
    } else {
      // Standard Chrome/Firefox handling
      console.log('🌐 Standard browser - using direct redirect');
      window.location.href = googleAuthURL;
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className} ${isSafari ? 'safari-oauth-btn' : ''}`}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      {isLoading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleOAuthButton;