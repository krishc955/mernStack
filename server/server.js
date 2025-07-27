require("dotenv").config();
console.log('🚀 Starting server...');
console.log('📋 Environment check:');
console.log('   PORT:', process.env.PORT);
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? 'Set ✅' : 'Missing ❌');

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

console.log('📦 Loading passport configuration...');
const passport = require("./config/passport");
console.log('✅ Passport loaded successfully');

// Updated Razorpay keys - trigger restart
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const testRouter = require("./routes/admin/test-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for both development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      // Development origins
      "http://localhost:5173",
      "http://localhost:5175", 
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5175",
      "http://127.0.0.1:3000",
      // Production origins - Vinora subdomain
      "https://vinora.royalappleshimla.com",
      "https://www.vinora.royalappleshimla.com",
      // Any additional production URLs from environment
      process.env.CLIENT_BASE_URL,
      process.env.FRONTEND_URL,
    ].filter(Boolean); // Remove any undefined values
    
    console.log('🔗 CORS request from origin:', origin);
    console.log('✅ Allowed origins:', allowedOrigins);
    
    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS allowed for:', origin);
      callback(null, true);
    } else {
      console.error('❌ CORS blocked request from origin:', origin);
      console.error('💡 Please add this origin to allowedOrigins array');
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
    "X-Requested-With",
  ],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Session configuration for OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/test", testRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

