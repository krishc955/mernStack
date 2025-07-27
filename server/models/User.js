const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.isGoogleUser;
    },
  },
  role: {
    type: String,
    default: "user",
  },
  // Google OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profilePhoto: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
