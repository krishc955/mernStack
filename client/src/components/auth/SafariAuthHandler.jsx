import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from '@/store/auth-slice';
import { useToast } from '@/components/ui/use-toast';

const SafariAuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authSuccess = urlParams.get('auth');
    const isSafari = urlParams.get('safari');
    const error = urlParams.get('error');
    const email = urlParams.get('email');
    const timestamp = urlParams.get('timestamp');
    
    // Safari URL-based token parts
    const tokenPart1 = urlParams.get('t');
    const tokenPart2 = urlParams.get('t2');
    const tokenPart3 = urlParams.get('t3');

    console.log('🔍 Safari Auth Handler - URL Params:', {
      authSuccess,
      isSafari,
      error,
      email,
      timestamp,
      hasTokenParts: !!(tokenPart1 && tokenPart2)
    });

    if (authSuccess === 'success') {
      console.log('🎉 OAuth success detected', isSafari ? '(Safari)' : '');
      
      // Enhanced Safari handling with URL-based tokens
      if (isSafari === 'true') {
        console.log('🍎 Safari OAuth flow detected');
        
        // Handle URL-based token for Safari
        if (tokenPart1 && tokenPart2) {
          console.log('🔑 Safari URL tokens found - reconstructing full token');
          
          const fullToken = tokenPart1 + tokenPart2 + (tokenPart3 || '');
          console.log('📏 Reconstructed token length:', fullToken.length);
          
          // Set the token as a cookie manually for Safari
          const tokenExpiry = new Date();
          tokenExpiry.setHours(tokenExpiry.getHours() + 1); // 1 hour
          
          document.cookie = `token=${fullToken}; path=/; expires=${tokenExpiry.toUTCString()}; SameSite=Lax`;
          console.log('✅ Safari token set via JavaScript');
          
          // Also set backup token
          document.cookie = `safari_auth_token=${fullToken}; path=/; expires=${tokenExpiry.toUTCString()}; SameSite=Lax`;
          
          // Clean up URL immediately to prevent token exposure
          const cleanURL = window.location.origin + '/shop/home?auth=success&safari=true&processing=true';
          window.history.replaceState({}, '', cleanURL);
          
          // Give Safari time to process the cookie
          setTimeout(() => {
            proceedWithAuthCheck();
          }, 1000);
          
          return;
        }
        
        // Fallback: Check for existing Safari cookies
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
          const [key, value] = cookie.split('=');
          acc[key] = value;
          return acc;
        }, {});
        
        console.log('🍪 Available cookies:', Object.keys(cookies));
        
        const authSuccessCookie = cookies['auth_success'];
        const safariToken = cookies['safari_auth_token'];
        const mainToken = cookies['token'];
        
        if (authSuccessCookie) {
          console.log('✅ Safari auth success cookie found');
          document.cookie = 'auth_success=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
        
        if (safariToken && !mainToken) {
          console.log('🔄 Copying Safari token to main token');
          const tokenExpiry = new Date();
          tokenExpiry.setHours(tokenExpiry.getHours() + 1);
          document.cookie = `token=${safariToken}; path=/; expires=${tokenExpiry.toUTCString()}; SameSite=Lax`;
        }
        
        // Give Safari a moment to process cookies
        setTimeout(() => {
          proceedWithAuthCheck();
        }, 500);
      } else {
        // Standard browser flow
        proceedWithAuthCheck();
      }
    } else if (error) {
      handleAuthError(error);
    }

    function proceedWithAuthCheck() {
      console.log('🔐 Proceeding with auth check...');
      
      // Clean URL before auth check
      if (location.search.includes('t=') || location.search.includes('t2=')) {
        const cleanURL = window.location.origin + '/shop/home?auth=success' + (isSafari ? '&safari=true' : '');
        window.history.replaceState({}, '', cleanURL);
      }
      
      // Check authentication status
      dispatch(checkAuth()).then((result) => {
        console.log('📋 Auth check result:', result?.payload);
        
        if (result?.payload?.success) {
          toast({
            title: "Successfully signed in with Google!",
            description: `Welcome back${email ? `, ${email.split('@')[0]}` : ''}!`
          });
          
          console.log('✅ Authentication successful, redirecting to home');
          navigate('/shop/home', { replace: true });
        } else {
          console.error('❌ Auth check failed after OAuth');
          
          // For Safari, try alternative approaches
          if (isSafari === 'true') {
            console.log('🔄 Safari auth failed - trying backup methods');
            
            // Check if we have any tokens in cookies
            const allCookies = document.cookie;
            console.log('🍪 All cookies for debugging:', allCookies);
            
            // Try to extract any available token
            const tokenMatch = allCookies.match(/(?:^|;\s*)(safari_auth_token|token)=([^;]+)/);
            if (tokenMatch) {
              const foundToken = tokenMatch[2];
              console.log('� Found token in cookies, length:', foundToken.length);
              
              // Ensure main token is set
              const tokenExpiry = new Date();
              tokenExpiry.setHours(tokenExpiry.getHours() + 1);
              document.cookie = `token=${foundToken}; path=/; expires=${tokenExpiry.toUTCString()}; SameSite=Lax`;
              
              setTimeout(() => {
                dispatch(checkAuth()).then((retryResult) => {
                  if (retryResult?.payload?.success) {
                    toast({
                      title: "Successfully signed in with Google!",
                      description: "Welcome back to Vinora Fashion"
                    });
                    navigate('/shop/home', { replace: true });
                  } else {
                    handleAuthFailure();
                  }
                });
              }, 300);
              return;
            }
          }
          
          handleAuthFailure();
        }
      }).catch((error) => {
        console.error('❌ Auth check error:', error);
        handleAuthFailure();
      });
    }

    function handleAuthFailure() {
      console.error('❌ Final auth failure - redirecting to login');
      toast({
        title: "Authentication incomplete",
        description: "Please try signing in again. If the issue persists, try clearing your browser cache.",
        variant: "destructive"
      });
      navigate('/auth/login', { replace: true });
    }

    function handleAuthError(error) {
      console.error('❌ OAuth error detected:', error);
      let errorMessage = "Authentication failed";
      
      switch (error) {
        case 'google_auth_failed':
          errorMessage = "Google authentication was cancelled or failed";
          break;
        case 'oauth_error':
          errorMessage = "OAuth service error occurred";
          break;
        case 'oauth_server_error':
          errorMessage = "Server authentication error";
          break;
        case 'no_user_data':
          errorMessage = "User data not received from Google";
          break;
        default:
          errorMessage = "Authentication error occurred";
      }
      
      toast({
        title: errorMessage,
        description: "Please try signing in again",
        variant: "destructive"
      });
      
      navigate('/auth/login', { replace: true });
    }
  }, [location, navigate, dispatch, toast]);

  return null;
};

export default SafariAuthHandler;
