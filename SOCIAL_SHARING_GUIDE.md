# Social Media Sharing Setup

## Overview
This document explains how the social media sharing is configured for Vinora website to ensure the logo image appears when sharing links.

## Files Updated

### 1. Meta Tags in `index.html`
- Updated Open Graph and Twitter Card meta tags
- Added proper image dimensions (1200x630)
- Added secure URL and image alt text
- Removed `www.` from URLs for consistency

### 2. SEOHead Component (`seo-head.jsx`)
- Updated to use new social sharing image
- Added comprehensive meta tags for better social sharing
- Fixed URL parameters and image references

### 3. Social Sharing Image
- Created `vinora-social-share.png` in public folder
- Image optimized for social media sharing
- Recommended dimensions: 1200x630px

## Testing Social Sharing

### Facebook Sharing Debugger
1. Go to https://developers.facebook.com/tools/debug/
2. Enter your website URL: `https://vinora.royalappleshimla.com`
3. Click "Debug" to see how Facebook will display your shared link
4. If needed, click "Scrape Again" to refresh the cache

### Twitter Card Validator
1. Go to https://cards-dev.twitter.com/validator
2. Enter your website URL
3. Check how the Twitter card will appear

### LinkedIn Post Inspector
1. Go to https://www.linkedin.com/post-inspector/
2. Enter your website URL
3. Verify the preview shows the correct image and text

### WhatsApp/Telegram Testing
1. Share your website link in a WhatsApp/Telegram chat
2. The preview should show the Vinora logo image

## Troubleshooting

### Image Not Showing
1. **Check image URL**: Ensure `vinora-social-share.png` is accessible at the URL
2. **Clear cache**: Social platforms cache images, use their debugging tools to refresh
3. **Image size**: Ensure image meets platform requirements (minimum 200x200, recommended 1200x630)
4. **Image format**: Use PNG or JPG format

### Common Issues
- **Cache**: Social platforms cache meta tags for 24-48 hours
- **HTTPS**: Ensure all image URLs use HTTPS
- **File size**: Keep images under 8MB for best compatibility
- **Dimensions**: 1200x630 works best across all platforms

## Image Specifications

### Recommended Dimensions
- **Facebook**: 1200x630px (1.91:1 ratio)
- **Twitter**: 1200x600px or 1200x675px
- **LinkedIn**: 1200x627px
- **WhatsApp**: 300x300px minimum, but 1200x630 works well

### Current Setup
- **Image**: `vinora-social-share.png`
- **Dimensions**: Based on original logo
- **URL**: `https://vinora.royalappleshimla.com/vinora-social-share.png`

## Future Improvements

### Custom Social Image
Consider creating a custom 1200x630px image with:
- Vinora logo centered
- Brand colors background
- Text overlay: "Vinora - Premium Online Store"
- Professional design elements

### Dynamic Images
For product pages, consider generating dynamic social images that include:
- Product image
- Product name
- Vinora branding
- Price (if applicable)
