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
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    // Fetch fresh user data to include profile photo
    const user = await User.findById(decoded.id).select('-password');
    req.user = {
      ...decoded,
      profilePhoto: user?.profilePhoto,
      firstName: user?.firstName,
      lastName: user?.lastName,
      isGoogleUser: user?.isGoogleUser
    };
    next();
  } catch (error) {
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
    console.log('🎉 Google OAuth Success for user:', user.email);
    
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

    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    
    // Redirect to frontend with success
    const frontendURL = process.env.CLIENT_BASE_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/shop/home?auth=success`);
  } catch (error) {
    console.error('❌ Google OAuth Success Error:', error);
    const frontendURL = process.env.CLIENT_BASE_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/auth/login?error=oauth_error`);
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
