# 🔐 SECURE ENVIRONMENT VARIABLES SETUP

## ⚠️ IMPORTANT SECURITY NOTE
This file contains placeholder values. You must replace them with your actual credentials when deploying.

## 🔑 WHERE TO GET YOUR ACTUAL VALUES

### 1. **MongoDB URI**
- Go to: https://cloud.mongodb.com/
- Navigate to: Database → Connect → Connect your application
- Copy the connection string
- Replace `<password>` with your actual database password

### 2. **Google OAuth Credentials**
- Go to: https://console.cloud.google.com/
- Navigate to: APIs & Services → Credentials
- Find your OAuth 2.0 Client ID
- Copy both Client ID and Client Secret

### 3. **Razorpay Credentials**
- Go to: https://dashboard.razorpay.com/
- Navigate to: Settings → API Keys
- Copy both Key ID and Key Secret
- Use test keys for development, live keys for production

### 4. **Cloudinary Credentials**
- Go to: https://cloudinary.com/console
- From your dashboard, copy:
  - Cloud Name
  - API Key  
  - API Secret

### 5. **JWT & Session Secrets**
- Generate strong random strings (32+ characters)
- Use different secrets for JWT and Session
- Keep them secure and never share publicly

## 🚀 DEPLOYMENT STEPS

### For Render:
1. Create your web service on Render
2. Go to Environment section
3. Add each variable with your actual values (not the placeholders)
4. Deploy your application

### For Local Development:
1. Keep your actual values in `server/.env` file
2. Never commit `.env` files to Git
3. Use the `.env.example` template for team sharing

## 🛡️ SECURITY BEST PRACTICES
- ✅ Never commit real credentials to Git
- ✅ Use environment variables for all secrets
- ✅ Rotate credentials regularly
- ✅ Use different credentials for dev/staging/production
- ✅ Enable GitHub secret scanning
- ✅ Review who has access to your credentials
