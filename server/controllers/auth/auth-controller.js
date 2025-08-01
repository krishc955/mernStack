const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
        profilePhoto: checkUser.profilePhoto,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        isGoogleUser: checkUser.isGoogleUser
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
        profilePhoto: checkUser.profilePhoto,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        isGoogleUser: checkUser.isGoogleUser
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  // Clear all possible token cookies for Safari compatibility
  res.clearCookie("token");
  res.clearCookie("safari_auth_token");
  res.clearCookie("auth_success");
  
  res.json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  // Try multiple token sources for Safari compatibility
  let token = req.cookies.token || req.cookies.safari_auth_token;
  
  // Enhanced debugging for Safari issues
  const userAgent = req.headers['user-agent'] || '';
  const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome');
  
  if (!token) {
    console.log('❌ No token found in cookies');
    console.log('🍪 Available cookies:', Object.keys(req.cookies));
    console.log('🍎 Is Safari:', isSafari);
    
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    console.log('✅ Token verified for user:', decoded.email);
    
    // Fetch fresh user data to include profile photo
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      console.log('❌ User not found in database:', decoded.id);
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }
    
    req.user = {
      ...decoded,
      profilePhoto: user?.profilePhoto,
      firstName: user?.firstName,
      lastName: user?.lastName,
      isGoogleUser: user?.isGoogleUser
    };
    
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    console.log('🍎 Safari user agent:', isSafari);
    
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

// Google OAuth Success Handler
const googleAuthSuccess = async (req, res) => {
  try {
    const user = req.user;
    const isSafari = req.query.safari === 'true' || req.session?.isSafari;
    
    console.log('🎉 Google OAuth Success Handler Called');
    console.log('👤 User Object:', {
      id: user?._id,
      email: user?.email,
      userName: user?.userName,
      role: user?.role
    });
    console.log('🍎 Safari Detection:', isSafari);
    console.log('🔍 Headers:', {
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'],
      origin: req.headers['origin']
    });
    console.log('🍪 Existing Cookies:', req.cookies);
    console.log('🔧 Session Info:', {
      sessionID: req.sessionID,
      isSafari: req.session?.isSafari
    });

    if (!user) {
      console.error('❌ No user found in req.user');
      const frontendURL = process.env.CLIENT_BASE_URL || 'http://localhost:5173';
      return res.redirect(`${frontendURL}/auth/login?error=no_user_data`);
    }
    
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
        profilePhoto: user.profilePhoto,
        firstName: user.firstName,
        lastName: user.lastName,
        isGoogleUser: user.isGoogleUser
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    console.log('🔑 JWT Token Generated - Length:', token.length);

    const frontendURL = process.env.CLIENT_BASE_URL || 'http://localhost:5173';
    console.log('🌐 Frontend URL:', frontendURL);

    // For Safari, use URL-based token passing as primary method
    if (isSafari) {
      console.log('🍎 Safari detected - using URL token method');
      
      // Also try to set cookies as backup
      try {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 1000,
          path: '/'
        });
        
        res.cookie("safari_auth_token", token, {
          httpOnly: false, // Accessible to JS
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 10 * 60 * 1000, // 10 minutes
          path: '/'
        });
        
        console.log('✅ Safari cookies set successfully');
      } catch (cookieError) {
        console.warn('⚠️ Cookie setting failed:', cookieError.message);
      }
      
      // Use URL parameters to pass token for Safari
      const redirectParams = new URLSearchParams({
        auth: 'success',
        safari: 'true',
        t: token.substring(0, 50), // First part of token
        t2: token.substring(50, 100), // Second part
        t3: token.substring(100), // Remaining part
        email: user.email,
        timestamp: Date.now()
      });
      
      const redirectURL = `${frontendURL}/shop/home?${redirectParams.toString()}`;
      console.log('🔄 Safari URL-based redirect to:', redirectURL.substring(0, 150) + '...');
      
      return res.redirect(redirectURL);
    } else {
      console.log('🌐 Standard browser - using cookies');
      
      // Standard cookie approach for other browsers
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000,
        path: '/'
      });
      
      console.log('✅ Standard cookies set successfully');
      
      const redirectURL = `${frontendURL}/shop/home?auth=success&timestamp=${Date.now()}`;
      console.log('🔄 Standard redirect to:', redirectURL);
      
      return res.redirect(redirectURL);
    }
  } catch (error) {
    console.error('❌ Google OAuth Success Error:', error);
    console.error('❌ Error Stack:', error.stack);
    console.error('❌ Request details:', {
      user: req.user,
      query: req.query,
      session: req.session,
      headers: req.headers
    });
    
    const frontendURL = process.env.CLIENT_BASE_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/auth/login?error=oauth_server_error&message=${encodeURIComponent(error.message)}`);
  }
};

// Google OAuth Failure Handler
const googleAuthFailure = (req, res) => {
  console.log('❌ Google OAuth failed');
  const frontendURL = process.env.CLIENT_BASE_URL || 'http://localhost:5173';
  res.redirect(`${frontendURL}/auth/login?error=google_auth_failed`);
};

module.exports = { 
  registerUser, 
  loginUser, 
  logoutUser, 
  authMiddleware,
  googleAuthSuccess,
  googleAuthFailure 
};
