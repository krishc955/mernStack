// Test script to verify video API functionality
const testVideoData = {
  title: "Test Facebook Video",
  description: "Testing Facebook video URL validation",
  videoUrl: "https://www.facebook.com/share/v/1VdtY6TReA/",
  platform: "facebook",
  thumbnail: "https://via.placeholder.com/300x200",
  category: "fashion",
  tags: "test,facebook,video",
  displayOrder: 0,
  isActive: true
};

console.log("🧪 Test Video Data:");
console.log(JSON.stringify(testVideoData, null, 2));

console.log("\n✅ Video URL format should now be supported!");
console.log("🔍 Facebook video ID should extract: 1VdtY6TReA");

// Test URL pattern extraction
const extractVideoId = (url, platform) => {
  let patterns = [];
  
  if (platform === 'facebook') {
    patterns = [
      /facebook\.com\/.*\/videos\/(\d+)/,
      /fb\.watch\/([a-zA-Z0-9]+)/,
      /facebook\.com\/watch\/\?v=(\d+)/,
      /facebook\.com\/share\/v\/([a-zA-Z0-9]+)/,  // New share format
      /facebook\.com\/share\/video\/([a-zA-Z0-9]+)/,  // Alternative share format
      /facebook\.com\/.*\/posts\/(\d+)/,  // Posts with videos
      /facebook\.com\/reel\/(\d+)/  // Facebook Reels
    ];
  }
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const extractedId = extractVideoId(testVideoData.videoUrl, testVideoData.platform);
console.log(`\n🎯 Extracted Video ID: ${extractedId}`);

if (extractedId === "1VdtY6TReA") {
  console.log("✅ URL pattern matching works correctly!");
} else {
  console.log("❌ URL pattern matching failed!");
}
