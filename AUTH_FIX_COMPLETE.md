# Authentication Fix for "Unauthorised User" Error

## Problem Identified
The "unauthorised user" error occurs because the authentication middleware was only checking for tokens in cookies, but the admin frontend sends tokens in the `Authorization` header as `Bearer <token>`.

## Fix Applied
Updated the `authMiddleware` in `server/controllers/auth/auth-controller.js` to check both:
1. **Cookies** (for login flow): `req.cookies.token` or `req.cookies.safari_auth_token` 
2. **Authorization Header** (for API calls): `Authorization: Bearer <token>`

## What Changed
**Before:** Only checked cookies
```javascript
let token = req.cookies.token || req.cookies.safari_auth_token;
```

**After:** Checks both cookies and Authorization header
```javascript
let token = req.cookies.token || req.cookies.safari_auth_token;

// Check Authorization header if no cookie token found
if (!token && req.headers.authorization) {
  const authHeader = req.headers.authorization;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7); // Remove 'Bearer ' prefix
  }
}
```

## How to Apply the Fix

### Step 1: Restart Your Server
Stop your current server (Ctrl+C in the terminal) and restart it:
```bash
cd server
npm start
```

### Step 2: Test Video Adding
1. Make sure you're logged into the admin panel
2. Go to `/admin/videos`
3. Click "Add Video"
4. Fill out the form with your Facebook URL: `https://www.facebook.com/share/v/1VdtY6TReA/`
5. Click "Save"

### Step 3: Verify Success
- You should no longer see "unauthorised user" error
- The video should be successfully added
- You should see a success message

## Why This Happened
1. The video routes were missing authentication middleware (fixed in previous step)
2. When authentication was added, the middleware only looked for cookie-based tokens
3. The admin frontend sends tokens via Authorization header (Bearer token)
4. Mismatch between token location caused "unauthorised user" error

## Current Status
✅ Authentication middleware added to video routes  
✅ AuthMiddleware now supports both cookie and Bearer token authentication  
✅ Facebook URL pattern matching supports new share format  
✅ Ready for testing

The fix ensures compatibility with both login flows (cookies) and API calls (Bearer tokens).
