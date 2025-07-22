const express = require("express");
const { imageUploadUtil } = require("../../helpers/cloudinary");
const router = express.Router();

// Test route to check Cloudinary connection
router.get("/test-cloudinary", async (req, res) => {
  try {
    console.log("Testing Cloudinary connection via API...");
    
    // Check if environment variables are set
    const hasCredentials = process.env.CLOUDINARY_CLOUD_NAME && 
                          process.env.CLOUDINARY_API_KEY && 
                          process.env.CLOUDINARY_API_SECRET;
    
    if (!hasCredentials) {
      return res.json({
        success: false,
        message: "Cloudinary credentials not configured",
        details: {
          cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
          api_key: !!process.env.CLOUDINARY_API_KEY,
          api_secret: !!process.env.CLOUDINARY_API_SECRET
        }
      });
    }

    // Try to use cloudinary (we'll use a simple test)
    const cloudinary = require("cloudinary").v2;
    const result = await cloudinary.api.ping();
    
    res.json({
      success: true,
      message: "Cloudinary connection successful!",
      details: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        status: result.status
      }
    });

  } catch (error) {
    console.error("Cloudinary test error:", error);
    res.json({
      success: false,
      message: "Cloudinary connection failed",
      error: error.message
    });
  }
});

module.exports = router;
