# WhatsApp Link Preview Testing Guide

## Overview
This guide explains how to test and ensure Vinora logo appears when sharing links through WhatsApp.

## WhatsApp Requirements
WhatsApp uses Open Graph meta tags but has specific preferences:
- **Image Size**: Minimum 300x300px, recommended 400x400px or larger
- **Image Format**: PNG or JPG
- **File Size**: Under 5MB
- **Aspect Ratio**: Square (1:1) works best, but rectangular also works
- **Protocol**: HTTPS required
- **Cache**: WhatsApp caches previews for 7 days

## Testing Steps

### 1. Manual WhatsApp Test (Most Reliable)
1. Open WhatsApp on your phone or WhatsApp Web
2. Create a new chat or use an existing one
3. Type/paste: `https://vinora.royalappleshimla.com`
4. Wait for preview to load (may take 5-30 seconds)
5. Check if Vinora logo appears

### 2. Force Cache Refresh
If logo doesn't appear, try:
1. `https://vinora.royalappleshimla.com?v=1`
2. `https://vinora.royalappleshimla.com?test=1`
3. `https://vinora.royalappleshimla.com?refresh=1`

### 3. Facebook Debugger (WhatsApp uses similar logic)
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter: `https://vinora.royalappleshimla.com`
3. Click "Debug"
4. Check if image appears
5. Click "Scrape Again" if needed

## Meta Tags Implementation

### Base HTML Meta Tags
```html
<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://vinora.royalappleshimla.com/">
<meta property="og:title" content="Vinora - Premium Ecommerce Store">
<meta property="og:description" content="Discover amazing products at Vinora...">
<meta property="og:image" content="https://vinora.royalappleshimla.com/vinora-social-share.png">
<meta property="og:image:secure_url" content="https://vinora.royalappleshimla.com/vinora-social-share.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- WhatsApp Specific -->
<meta name="whatsapp:image" content="https://vinora.royalappleshimla.com/vinora-social-share.png">
<meta name="whatsapp:title" content="Vinora - Premium Ecommerce Store">
<meta name="whatsapp:description" content="Discover amazing products at Vinora...">

<!-- Fallback -->
<meta property="image" content="https://vinora.royalappleshimla.com/vinora-social-share.png">
<meta name="image" content="https://vinora.royalappleshimla.com/vinora-social-share.png">
```

## Files Created

### 1. Social Images
- `vinora-social-share.png` - Main social sharing image (1200x630)
- `vinora-whatsapp-share.png` - WhatsApp optimized image

### 2. Scripts
- `create-social-image.js` - Creates social sharing images
- `create-whatsapp-image.js` - Creates WhatsApp optimized images

### 3. Testing
- `social-preview.html` - Visual preview of how links will appear

## Troubleshooting

### Image Not Showing in WhatsApp
1. **Check URL**: Ensure image is accessible at the HTTPS URL
2. **Clear Cache**: Try version parameters (?v=1, ?v=2, etc.)
3. **Wait**: WhatsApp can take up to 24 hours to refresh
4. **Image Size**: Ensure image is at least 300x300px
5. **File Format**: Use PNG or JPG only
6. **HTTPS**: All URLs must use HTTPS

### Common Issues
- **Old Cache**: WhatsApp caches for 7 days
- **File Size**: Keep images under 5MB
- **Regional Differences**: Some regions may have different caching
- **WhatsApp Version**: Different versions may behave differently

### Debug Steps
1. Test URL in Facebook Debugger
2. Check if image loads directly in browser
3. Verify meta tags are present in page source
4. Try different WhatsApp clients (phone, web, desktop)
5. Test with different URLs using cache-busting parameters

## Expected Results

### When Working Correctly
✅ WhatsApp shows link preview with:
- Vinora logo image
- "Vinora - Premium Ecommerce Store" title
- Store description
- "vinora.royalappleshimla.com" URL

### Timeline
- **Immediate**: New URLs may show preview right away
- **Updated URLs**: May take 15-30 minutes
- **Cached URLs**: May take up to 7 days to refresh

## Pro Tips

### 1. Test Multiple Devices
- Test on different phones
- Test WhatsApp Web vs mobile app
- Test in different regions if possible

### 2. Use Version Parameters
- Add ?v=1, ?v=2, etc. to force refresh
- Each new parameter creates a "new" URL for WhatsApp

### 3. Monitor Changes
- Use Facebook Debugger to test before WhatsApp
- Keep the social-preview.html page for visual testing
- Test immediately after any meta tag changes

### 4. Image Optimization
- Use high-quality images
- Ensure logo is clearly visible at small sizes
- Consider square (1:1) ratio for best WhatsApp display
- Use brand colors for background if creating custom image

## Support Contacts
If WhatsApp sharing still doesn't work after following this guide:
1. Check all URLs are accessible
2. Verify meta tags in browser developer tools
3. Test with other social platforms (Facebook, Twitter)
4. Consider creating a new, properly sized social sharing image
