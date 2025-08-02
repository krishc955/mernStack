// Test Facebook URL Pattern Validation
// This is a utility to test if your Facebook URLs are being detected correctly

const testFacebookUrl = (url) => {
  const patterns = [
    /facebook\.com\/.*\/videos\/(\d+)/,
    /fb\.watch\/([a-zA-Z0-9]+)/,
    /facebook\.com\/watch\/\?v=(\d+)/,
    /facebook\.com\/share\/v\/([a-zA-Z0-9]+)/,  // New share format
    /facebook\.com\/share\/video\/([a-zA-Z0-9]+)/,  // Alternative share format
    /facebook\.com\/.*\/posts\/(\d+)/,  // Posts with videos
    /facebook\.com\/reel\/(\d+)/  // Facebook Reels
  ];
  
  console.log('Testing URL:', url);
  
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    const match = url.match(pattern);
    if (match) {
      console.log(`✅ Pattern ${i + 1} matched:`, pattern.toString());
      console.log('Video ID:', match[1]);
      return match[1];
    }
  }
  
  console.log('❌ No pattern matched');
  return null;
};

// Test your specific URL
const testUrl = 'https://www.facebook.com/share/v/1VdtY6TReA/';
const result = testFacebookUrl(testUrl);

console.log('Result:', result ? `Video ID: ${result}` : 'Invalid URL');

// Test other common formats
const testUrls = [
  'https://www.facebook.com/share/v/1VdtY6TReA/',
  'https://www.facebook.com/yourpage/videos/123456789',
  'https://fb.watch/abc123def',
  'https://www.facebook.com/watch/?v=123456789'
];

testUrls.forEach(url => {
  console.log('\n---');
  testFacebookUrl(url);
});

export { testFacebookUrl };
