import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, AlertCircle, RefreshCw, TestTube } from 'lucide-react';

const SafariAuthTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [browserInfo, setBrowserInfo] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    // Detect browser and environment
    const userAgent = navigator.userAgent;
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isIOSSafari = /iPad|iPhone|iPod/.test(userAgent) && /Safari/.test(userAgent);
    const isMacSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);
    const isChrome = /Chrome/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);

    setBrowserInfo({
      userAgent: userAgent,
      isSafari: isSafari,
      isIOSSafari: isIOSSafari,
      isMacSafari: isMacSafari,
      isChrome: isChrome,
      isFirefox: isFirefox,
      cookiesEnabled: navigator.cookieEnabled,
      localStorageEnabled: typeof(Storage) !== "undefined",
      sessionStorageEnabled: typeof(Storage) !== "undefined"
    });
  }, []);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const results = {};
    
    try {
      // Test 1: Environment Variables
      console.log('🧪 Testing Environment Variables...');
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      results.envVars = {
        status: API_BASE_URL ? 'success' : 'error',
        message: API_BASE_URL ? `API URL: ${API_BASE_URL}` : 'VITE_API_URL not found',
        details: {
          VITE_API_URL: API_BASE_URL || 'Not set',
          NODE_ENV: import.meta.env.NODE_ENV || 'Not set',
          MODE: import.meta.env.MODE || 'Not set'
        }
      };

      // Test 2: API Connectivity
      console.log('🧪 Testing API Connectivity...');
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/check-auth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        results.apiConnectivity = {
          status: response.ok ? 'success' : 'warning',
          message: `API Response: ${response.status} ${response.statusText}`,
          details: {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          }
        };
      } catch (error) {
        results.apiConnectivity = {
          status: 'error',
          message: `API Connection Failed: ${error.message}`,
          details: { error: error.toString() }
        };
      }

      // Test 3: Cookie Support
      console.log('🧪 Testing Cookie Support...');
      try {
        // Test setting a cookie
        document.cookie = "test_cookie=test_value; path=/; SameSite=Lax";
        const cookieExists = document.cookie.includes('test_cookie=test_value');
        
        // Clean up test cookie
        document.cookie = "test_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        
        results.cookieSupport = {
          status: cookieExists ? 'success' : 'error',
          message: cookieExists ? 'Cookies working correctly' : 'Cookie setting failed',
          details: {
            cookiesEnabled: navigator.cookieEnabled,
            testCookieSet: cookieExists,
            currentCookies: document.cookie
          }
        };
      } catch (error) {
        results.cookieSupport = {
          status: 'error',
          message: `Cookie test failed: ${error.message}`,
          details: { error: error.toString() }
        };
      }

      // Test 4: Google OAuth URL Generation
      console.log('🧪 Testing Google OAuth URL...');
      try {
        const googleAuthURL = `${API_BASE_URL}/api/auth/google`;
        const isSafari = browserInfo.isSafari;
        const safariParams = isSafari ? '?safari=true&t=' + Date.now() : '';
        const fullURL = googleAuthURL + safariParams;
        
        results.oauthURL = {
          status: 'success',
          message: 'OAuth URL generated successfully',
          details: {
            baseURL: googleAuthURL,
            fullURL: fullURL,
            isSafariDetected: isSafari,
            safariParams: safariParams
          }
        };
      } catch (error) {
        results.oauthURL = {
          status: 'error',
          message: `OAuth URL generation failed: ${error.message}`,
          details: { error: error.toString() }
        };
      }

      // Test 5: Local Storage/Session Storage
      console.log('🧪 Testing Storage APIs...');
      try {
        localStorage.setItem('test_key', 'test_value');
        const localStorageWorks = localStorage.getItem('test_key') === 'test_value';
        localStorage.removeItem('test_key');
        
        sessionStorage.setItem('test_key', 'test_value');
        const sessionStorageWorks = sessionStorage.getItem('test_key') === 'test_value';
        sessionStorage.removeItem('test_key');
        
        results.storageAPIs = {
          status: (localStorageWorks && sessionStorageWorks) ? 'success' : 'warning',
          message: `Local: ${localStorageWorks ? 'OK' : 'Failed'}, Session: ${sessionStorageWorks ? 'OK' : 'Failed'}`,
          details: {
            localStorage: localStorageWorks,
            sessionStorage: sessionStorageWorks
          }
        };
      } catch (error) {
        results.storageAPIs = {
          status: 'error',
          message: `Storage test failed: ${error.message}`,
          details: { error: error.toString() }
        };
      }

      // Test 6: Check Current Authentication State
      console.log('🧪 Testing Current Auth State...');
      try {
        const authResponse = await fetch(`${API_BASE_URL}/api/auth/check-auth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const authData = await authResponse.json();
        
        results.currentAuth = {
          status: authData.success ? 'success' : 'warning',
          message: authData.success ? `Logged in as: ${authData.user?.email}` : 'Not authenticated',
          details: authData
        };
      } catch (error) {
        results.currentAuth = {
          status: 'error',
          message: `Auth check failed: ${error.message}`,
          details: { error: error.toString() }
        };
      }

      // Test 7: Safari-specific Checks
      if (browserInfo.isSafari) {
        console.log('🧪 Running Safari-specific tests...');
        
        results.safariSpecific = {
          status: 'info',
          message: 'Safari-specific configurations applied',
          details: {
            safariDetection: true,
            userAgent: navigator.userAgent,
            vendor: navigator.vendor,
            cookieSettings: 'SameSite=Lax configured',
            redirectMethod: 'window.location.assign',
            tokenMethod: 'URL-based with cookie fallback'
          }
        };
      }

    } catch (error) {
      console.error('🚨 Test suite error:', error);
      results.testSuiteError = {
        status: 'error',
        message: `Test suite failed: ${error.message}`,
        details: { error: error.toString() }
      };
    }
    
    setTestResults(results);
    setIsRunning(false);
    
    // Show summary toast
    const errorCount = Object.values(results).filter(r => r.status === 'error').length;
    const warningCount = Object.values(results).filter(r => r.status === 'warning').length;
    
    if (errorCount > 0) {
      toast({
        title: "Diagnostics Complete",
        description: `Found ${errorCount} errors and ${warningCount} warnings`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Diagnostics Complete",
        description: warningCount > 0 ? `${warningCount} warnings found` : "All tests passed!",
        variant: warningCount > 0 ? "default" : "default"
      });
    }
  };

  const testGoogleAuth = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const googleAuthURL = `${API_BASE_URL}/api/auth/google`;
    
    if (browserInfo.isSafari) {
      console.log('🍎 Safari detected - using direct navigation');
      const safariAuthURL = `${googleAuthURL}?safari=true&t=${Date.now()}`;
      window.location.assign(safariAuthURL);
    } else {
      console.log('🌐 Standard browser - using direct redirect');
      window.location.href = googleAuthURL;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Safari Google OAuth Diagnostics
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive testing tool for Safari authentication issues
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Browser Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Browser Detection</h3>
              <div className="space-y-1 text-sm">
                <Badge variant={browserInfo.isSafari ? "default" : "secondary"}>
                  Safari: {browserInfo.isSafari ? 'Yes' : 'No'}
                </Badge>
                <Badge variant={browserInfo.isChrome ? "default" : "secondary"}>
                  Chrome: {browserInfo.isChrome ? 'Yes' : 'No'}
                </Badge>
                <Badge variant={browserInfo.cookiesEnabled ? "default" : "destructive"}>
                  Cookies: {browserInfo.cookiesEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Storage Support</h3>
              <div className="space-y-1 text-sm">
                <Badge variant={browserInfo.localStorageEnabled ? "default" : "destructive"}>
                  Local Storage: {browserInfo.localStorageEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <Badge variant={browserInfo.sessionStorageEnabled ? "default" : "destructive"}>
                  Session Storage: {browserInfo.sessionStorageEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={runDiagnostics} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4" />
                  Run Diagnostics
                </>
              )}
            </Button>
            <Button 
              onClick={testGoogleAuth}
              variant="outline"
              className="flex items-center gap-2"
            >
              🍎 Test Google Auth
            </Button>
          </div>

          {/* Test Results */}
          {Object.keys(testResults).length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Test Results</h3>
              <div className="grid gap-4">
                {Object.entries(testResults).map(([testName, result]) => (
                  <Card key={testName}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(result.status)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium capitalize">
                              {testName.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <Badge className={getStatusColor(result.status)}>
                              {result.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {result.message}
                          </p>
                          {result.details && (
                            <details className="text-xs">
                              <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                                View Details
                              </summary>
                              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                                {JSON.stringify(result.details, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safari-specific Instructions */}
      {browserInfo.isSafari && (
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">🍎 Safari-Specific Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>If authentication fails:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Clear Safari cookies and website data</li>
              <li>Disable "Prevent Cross-Site Tracking" temporarily</li>
              <li>Allow cookies from "vinora.royalappleshimla.com"</li>
              <li>Try in Safari Private Browsing mode</li>
              <li>Check if third-party cookies are blocked</li>
            </ol>
            <p className="text-orange-600">
              <strong>Current Implementation:</strong> Using URL-based token passing with cookie fallback for Safari compatibility.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SafariAuthTest;
