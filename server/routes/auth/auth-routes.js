const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  googleAuthSuccess,
  googleAuthFailure,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

// Traditional auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

// Google OAuth routes - only add if passport is available
try {
  const passport = require("../../config/passport");
  
  // Google OAuth routes
  router.get("/google", 
    (req, res, next) => {
      // Pass Safari detection to the authentication
      req.session.isSafari = req.query.safari === 'true';
      next();
    },
    passport.authenticate("google", { 
      scope: ["profile", "email"],
      accessType: 'offline',
      prompt: 'consent'
    })
  );

  router.get("/google/callback", 
    passport.authenticate("google", { 
      failureRedirect: "/auth/login?error=google_auth_failed" 
    }), 
    (req, res, next) => {
      // Add Safari info to query for success handler
      if (req.session.isSafari) {
        req.query.safari = 'true';
      }
      next();
    },
    googleAuthSuccess
  );

  router.get("/google/failure", googleAuthFailure);
  
  console.log('✅ Google OAuth routes loaded successfully');
} catch (error) {
  console.log('⚠️ Google OAuth not available:', error.message);
}

module.exports = router;
