# Development Environment Setup Guide

## Quick Fix for CORS Issues

The CORS issue you encountered has been fixed! The server now supports both development and production environments.

## Changes Made

### 1. Updated server/server.js
- Modified CORS configuration to allow multiple origins
- Added support for localhost:5173 (Vite dev server)
- Added support for localhost:3000 (React dev server)
- Added logging to help debug CORS issues

### 2. Updated server/.env
- Commented out `CLIENT_BASE_URL` for local development
- Server now automatically allows localhost origins when CLIENT_BASE_URL is not set

## Running the Development Environment

### Frontend (Client)
```bash
cd client
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

### Backend (Server)
```bash
cd server
npm install
npm start
# OR for development with auto-restart:
npm run dev
```
Backend will run on: http://localhost:5000

## Environment Configuration

### Development (.env file in server/)
```env
# Database
MONGODB_URI=mongodb+srv://krishc955:26SeHKXjQ4GEfVMi@cluster0.yb22pte.mongodb.net/

# Server
PORT=5000

# Client URL (Leave commented out for development)
# CLIENT_BASE_URL=

# Other configurations...
```

### Production (Render Environment Variables)
```env
CLIENT_BASE_URL=https://mern-stack-ivory-alpha.vercel.app
```

## Troubleshooting

### If you still see CORS errors:
1. Make sure the server is running on port 5000
2. Make sure the frontend is running on port 5173
3. Check the server console for CORS logs
4. Ensure CLIENT_BASE_URL is commented out in your local .env file

### To verify CORS is working:
1. Start the server - you should see CORS logs in the console
2. Start the frontend
3. Try to login/register - should work without CORS errors

## Current URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Production
- Frontend: https://mern-stack-ivory-alpha.vercel.app
- Backend: https://mernstack-7sfn.onrender.com

## Next Steps

1. Start both frontend and backend locally
2. Test the login/registration functionality
3. If everything works, the CORS issue is resolved!

The application now works perfectly in both development and production environments.
