const express = require("express");
const router = express.Router();

// Safari OAuth Diagnostics Endpoint
router.get("/safari-diagnostics", (req, res) => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
      FRONTEND_URL: process.env.FRONTEND_URL,
      CORS_ORIGIN: process.env.CORS_ORIGIN,
      googleOAuthConfigured: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
    },
    request: {
      headers: {
        userAgent: req.headers['user-agent'],
        referer: req.headers['referer'],
        origin: req.headers['origin'],
        host: req.headers['host'],
        cookie: req.headers['cookie'] ? 'Present' : 'Not present'
      },
      query: req.query,
      ip: req.ip,
      protocol: req.protocol,
      secure: req.secure
    },
    session: {
      id: req.sessionID || 'No session',
      isSafari: req.session?.isSafari || false,
      keys: req.session ? Object.keys(req.session) : []
    },
    cookies: {
      count: Object.keys(req.cookies || {}).length,
      names: Object.keys(req.cookies || [])
    },
    safariDetection: {
      userAgent: req.headers['user-agent'],
      isSafari: /Safari/.test(req.headers['user-agent'] || '') && !/Chrome/.test(req.headers['user-agent'] || ''),
      isIOSSafari: /iPad|iPhone|iPod/.test(req.headers['user-agent'] || '') && /Safari/.test(req.headers['user-agent'] || ''),
      isMacSafari: /Safari/.test(req.headers['user-agent'] || '') && /Macintosh/.test(req.headers['user-agent'] || '')
    }
  };

  res.json({
    success: true,
    message: "Safari OAuth Diagnostics",
    data: diagnostics
  });
});

// Test Google OAuth redirect (without passport)
router.get("/test-google-redirect", (req, res) => {
  const isSafari = req.query.safari === 'true';
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `access_type=offline&` +
    `prompt=consent&` +
    `scope=profile email&` +
    `response_type=code&` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.NODE_ENV === 'production' 
      ? "https://mernstack-7sfn.onrender.com/api/auth/google/callback"
      : "http://localhost:5000/api/auth/google/callback")}`;

  res.json({
    success: true,
    message: "Google OAuth URL Test",
    data: {
      isSafari,
      googleAuthURL,
      configuredClientId: process.env.GOOGLE_CLIENT_ID ? 'Present' : 'Missing',
      redirectUri: process.env.NODE_ENV === 'production' 
        ? "https://mernstack-7sfn.onrender.com/api/auth/google/callback"
        : "http://localhost:5000/api/auth/google/callback"
    }
  });
});

// Cookie test endpoint
router.get("/test-cookies", (req, res) => {
  // Set test cookies
  res.cookie("test_cookie", "test_value", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60000, // 1 minute
    path: '/'
  });

  res.cookie("test_safari_cookie", "safari_test_value", {
    httpOnly: false, // Accessible to JS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60000,
    path: '/'
  });

  res.json({
    success: true,
    message: "Test cookies set",
    data: {
      cookiesSet: ['test_cookie', 'test_safari_cookie'],
      existingCookies: req.cookies,
      environment: process.env.NODE_ENV
    }
  });
});

// Check authentication status with detailed info
router.get("/check-auth-detailed", (req, res) => {
  const authToken = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', '');
  
  let tokenInfo = null;
  if (authToken) {
    try {
      const jwt = require('jsonwebtoken');
      tokenInfo = jwt.verify(authToken, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    } catch (error) {
      tokenInfo = { error: error.message, token: authToken.substring(0, 20) + '...' };
    }
  }

  res.json({
    success: true,
    message: "Detailed authentication check",
    data: {
      hasToken: !!authToken,
      tokenSource: req.cookies?.token ? 'cookie' : (req.headers?.authorization ? 'header' : 'none'),
      tokenInfo,
      cookies: req.cookies,
      headers: {
        authorization: req.headers?.authorization ? 'Present' : 'Not present',
        userAgent: req.headers['user-agent'],
        origin: req.headers['origin']
      }
    }
  });
});

module.exports = router;
