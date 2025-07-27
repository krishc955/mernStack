# 🚀 Vinora E-commerce - Production Deployment Guide

## 📋 **Deployment Overview**

This MERN stack application includes:
- ✅ **Google OAuth** with profile photos
- ✅ **Razorpay** payment integration
- ✅ **Cloudinary** image storage
- ✅ **MongoDB Atlas** database
- ✅ **Custom domain** support

## 🔧 **Deployment Platforms**

### **Backend: Render**
- Repository: `krishc955/mernStack`
- Build Command: `npm install && cd server && npm install`
- Start Command: `cd server && npm start`
- Environment Variables: Set in Render dashboard

### **Frontend: Vercel**
- Repository: `krishc955/mernStack`
- Root Directory: `client`
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

## 🌐 **Custom Domain Setup**

### **Target URLs:**
- **Frontend**: `https://vinora.royalappleshimla.com`
- **Backend**: `https://vinora-backend.onrender.com`

### **DNS Configuration:**
```
Type: CNAME
Name: vinora
Value: cname.vercel-dns.com
```

## 🔑 **Environment Variables Setup**

### **Required Variables for Production:**

**Backend (Render):**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_BASE_URL=https://vinora.royalappleshimla.com
FRONTEND_URL=https://vinora.royalappleshimla.com
CORS_ORIGIN=https://vinora.royalappleshimla.com
SESSION_SECRET=your_production_session_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Frontend (Vercel):**
```
VITE_API_URL=https://vinora-backend.onrender.com
VITE_APP_NAME=Vinora
VITE_APP_URL=https://vinora.royalappleshimla.com
VITE_ENVIRONMENT=production
```

## 🔒 **Security Notes**

- Never commit actual credentials to git
- Use environment variables in deployment platforms
- Keep `.env` files in `.gitignore`
- Use different credentials for production

## 🚀 **Deployment Steps**

1. **Deploy Backend to Render**
2. **Deploy Frontend to Vercel**
3. **Configure Custom Domain**
4. **Update Google OAuth URLs**
5. **Test Complete Flow**

## ✅ **Ready for Production!**

Your application includes all necessary features for a production e-commerce platform with secure authentication and payment processing.
