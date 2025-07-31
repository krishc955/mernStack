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

    if (authSuccess === 'success') {
      console.log('🎉 OAuth success detected', isSafari ? '(Safari)' : '');
      
      // For Safari, also check for the auth_success cookie
      if (isSafari === 'true') {
        const authCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth_success='));
        
        if (authCookie) {
          console.log('✅ Safari auth cookie found');
          // Clean up the temporary cookie
          document.cookie = 'auth_success=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
      }
      
      // Check authentication status
      dispatch(checkAuth()).then((result) => {
        if (result?.payload?.success) {
          toast({
            title: "Successfully signed in with Google!",
            description: "Welcome back to Vinora Fashion"
          });
          
          // Clean up URL parameters
          navigate('/shop/home', { replace: true });
        } else {
          console.error('❌ Auth check failed after OAuth');
          toast({
            title: "Authentication failed",
            description: "Please try signing in again",
            variant: "destructive"
          });
          navigate('/auth/login', { replace: true });
        }
      }).catch((error) => {
        console.error('❌ Auth check error:', error);
        toast({
          title: "Authentication error",
          description: "Please try signing in again",
          variant: "destructive"
        });
        navigate('/auth/login', { replace: true });
      });
    } else if (error) {
      console.error('❌ OAuth error detected:', error);
      let errorMessage = "Authentication failed";
      
      switch (error) {
        case 'google_auth_failed':
          errorMessage = "Google authentication was cancelled or failed";
          break;
        case 'oauth_error':
          errorMessage = "OAuth service error occurred";
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
