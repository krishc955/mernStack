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

    console.log('🔍 Safari Auth Handler - URL Params:', {
      authSuccess,
      isSafari,
      error,
      email,
      timestamp
    });

    if (authSuccess === 'success') {
      console.log('🎉 OAuth success detected', isSafari ? '(Safari)' : '');
      
      // Enhanced Safari cookie checking
      if (isSafari === 'true') {
        console.log('🍎 Safari OAuth flow detected');
        
        // Check for multiple Safari-specific cookies
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
          // Clean up the temporary cookie
          document.cookie = 'auth_success=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
        
        if (safariToken) {
          console.log('✅ Safari backup token found');
          // If main token is missing but safari token exists, copy it
          if (!mainToken) {
            console.log('🔄 Copying Safari token to main token');
            document.cookie = `token=${safariToken}; path=/; max-age=${60 * 60}; SameSite=Lax`;
          }
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
      
      // Check authentication status
      dispatch(checkAuth()).then((result) => {
        console.log('📋 Auth check result:', result?.payload);
        
        if (result?.payload?.success) {
          toast({
            title: "Successfully signed in with Google!",
            description: `Welcome back${email ? `, ${email.split('@')[0]}` : ''}!`
          });
          
          // Clean up URL parameters and redirect
          console.log('✅ Authentication successful, redirecting to home');
          navigate('/shop/home', { replace: true });
        } else {
          console.error('❌ Auth check failed after OAuth');
          
          // For Safari, try alternative cookie approach
          if (isSafari === 'true') {
            const safariToken = document.cookie
              .split('; ')
              .find(row => row.startsWith('safari_auth_token='))
              ?.split('=')[1];
              
            if (safariToken) {
              console.log('🔄 Retrying with Safari backup token');
              // Set the main token and retry
              document.cookie = `token=${safariToken}; path=/; max-age=${60 * 60}; SameSite=Lax`;
              
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
              }, 200);
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
      toast({
        title: "Authentication incomplete",
        description: "Please try signing in again",
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
      
      // Clean up URL and redirect to login
      navigate('/auth/login', { replace: true });
    }
  }, [location, navigate, dispatch, toast]);

  return null; // This component doesn't render anything
};

export default SafariAuthHandler;
