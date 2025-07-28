const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth Profile:', {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      photo: profile.photos?.[0]?.value
    });

    // Check if user already exists with this email
    const existingUser = await User.findOne({
      email: profile.emails[0].value
    });

    if (existingUser) {
      // Update Google ID if not set
      if (!existingUser.googleId) {
        existingUser.googleId = profile.id;
        existingUser.isGoogleUser = true;
        existingUser.profilePhoto = profile.photos[0]?.value || '';
        existingUser.firstName = profile.name?.givenName || '';
        existingUser.lastName = profile.name?.familyName || '';
        await existingUser.save();
      }
      return done(null, existingUser);
    }

    // Create new user
    const newUser = new User({
      googleId: profile.id,
      userName: profile.displayName,
      email: profile.emails[0].value,
      profilePhoto: profile.photos[0]?.value || '',
      firstName: profile.name?.givenName || '',
      lastName: profile.name?.familyName || '',
      role: 'user',
      isGoogleUser: true
    });

    await newUser.save();
    console.log('✅ New Google user created:', newUser.email);
    return done(null, newUser);
  } catch (error) {
    console.error('❌ Google OAuth error:', error);
    return done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;