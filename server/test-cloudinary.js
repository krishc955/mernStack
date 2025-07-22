const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Testing Cloudinary Connection...");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Set" : "Not Set");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Set" : "Not Set");
console.log("---");

async function testCloudinaryConnection() {
  try {
    // Test 1: Check if credentials are loaded
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary credentials not found in environment variables");
    }

    // Test 2: Try to get account details (this validates the connection)
    console.log("Attempting to connect to Cloudinary...");
    const result = await cloudinary.api.ping();
    
    console.log("✅ SUCCESS: Cloudinary connection test passed!");
    console.log("Response:", result);
    
    // Test 3: Try to get usage info (optional)
    try {
      const usage = await cloudinary.api.usage();
      console.log("✅ Account Usage Info:");
      console.log("- Plan:", usage.plan);
      console.log("- Credits used:", usage.credits?.used || "N/A");
      console.log("- Credits limit:", usage.credits?.limit || "N/A");
      console.log("- Storage used:", Math.round((usage.storage?.used_bytes || 0) / 1024 / 1024), "MB");
    } catch (usageError) {
      console.log("⚠️  Could not fetch usage info (this is normal for some accounts)");
    }

  } catch (error) {
    console.log("❌ FAILED: Cloudinary connection test failed!");
    console.error("Error:", error.message);
    
    if (error.message.includes("Invalid API Key")) {
      console.log("🔧 Fix: Check your CLOUDINARY_API_KEY in .env file");
    } else if (error.message.includes("Invalid API Secret")) {
      console.log("🔧 Fix: Check your CLOUDINARY_API_SECRET in .env file");
    } else if (error.message.includes("Invalid cloud name")) {
      console.log("🔧 Fix: Check your CLOUDINARY_CLOUD_NAME in .env file");
    } else {
      console.log("🔧 Fix: Verify all Cloudinary credentials in your .env file");
    }
  }
}

// Run the test
testCloudinaryConnection();
