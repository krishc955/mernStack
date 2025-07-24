# Vinora Subdomain Deployment Guide

## Setting up https://www.vinora.royalappleshimla.com

This guide will help you deploy your Vinora ecommerce website as a subdomain on your Namecheap domain.

## Prerequisites
- Namecheap domain: royalappleshimla.com
- Hosting service (recommended options below)
- SSL certificate for HTTPS

## Step 1: Choose Deployment Platform

### Option A: Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel --prod

# Custom domain setup in Vercel dashboard
```

### Option B: Railway (Full-Stack)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option C: Traditional VPS/Shared Hosting
- Use cPanel or similar hosting control panel
- Upload build files to subdomain folder

## Step 2: Namecheap DNS Configuration

### A. Create Subdomain in Namecheap
1. Login to Namecheap account
2. Go to Domain List → Manage royalappleshimla.com
3. Navigate to "Advanced DNS"
4. Add DNS records:

```
Type: CNAME
Host: vinora
Value: your-deployment-url.vercel.app (or your hosting provider)
TTL: Automatic

Type: CNAME  
Host: www.vinora
Value: your-deployment-url.vercel.app
TTL: Automatic
```

### B. Alternative A Record Setup
```
Type: A
Host: vinora
Value: YOUR_SERVER_IP
TTL: Automatic

Type: A
Host: www.vinora  
Value: YOUR_SERVER_IP
TTL: Automatic
```

## Step 3: Frontend Configuration

### Update Client Build Configuration
```javascript
// client/vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/', // For subdomain deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 5173,
    host: true
  }
})
```

### Update API Base URL
```javascript
// client/src/config/api.js
const API_BASE_URL = 
  process.env.NODE_ENV === 'production' 
    ? 'https://api.vinora.royalappleshimla.com' // Your backend URL
    : 'http://localhost:5000';

export default API_BASE_URL;
```

## Step 4: Backend Deployment

### Railway Backend Setup
```javascript
// server/server.js - Update CORS for subdomain
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173", 
    "http://localhost:5175",
    "https://vinora.royalappleshimla.com",
    "https://www.vinora.royalappleshimla.com"
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
};
```

### Environment Variables
```env
# Add to your hosting platform
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://www.vinora.royalappleshimla.com
CLIENT_BASE_URL=https://www.vinora.royalappleshimla.com
```

## Step 5: SSL Certificate Setup

### Automatic SSL (Recommended)
- Vercel: Automatic SSL
- Railway: Automatic SSL  
- Netlify: Automatic SSL

### Manual SSL (for VPS)
```bash
# Using Let's Encrypt with Certbot
sudo certbot --nginx -d vinora.royalappleshimla.com -d www.vinora.royalappleshimla.com
```

## Step 6: Build and Deploy

### Frontend Build
```bash
cd client
npm run build
# Upload dist/ folder to your hosting
```

### Backend Deploy
```bash
cd server
# Deploy to Railway/Heroku/VPS
npm start
```

## Step 7: Verification Steps

1. **DNS Propagation Check**
   - Use tools like whatsmydns.net
   - Wait 24-48 hours for full propagation

2. **Test URLs**
   - https://vinora.royalappleshimla.com
   - https://www.vinora.royalappleshimla.com

3. **Functionality Test**
   - User registration/login
   - Product browsing
   - Cart operations
   - Order placement

## Recommended Hosting Setup

### Frontend: Vercel
- Connect GitHub repository
- Auto-deployment on push
- Custom domain: www.vinora.royalappleshimla.com

### Backend: Railway
- MongoDB Atlas for database
- Environment variables setup
- Custom domain: api.vinora.royalappleshimla.com

## DNS Records Summary
```
CNAME   vinora          your-vercel-app.vercel.app
CNAME   www.vinora      your-vercel-app.vercel.app  
CNAME   api.vinora      your-railway-app.railway.app
```

## Troubleshooting

### Common Issues:
1. **DNS not resolving**: Wait for propagation (24-48 hours)
2. **SSL errors**: Ensure certificate covers both www and non-www
3. **CORS errors**: Update backend CORS configuration
4. **API calls failing**: Check API base URL configuration

### Support Resources:
- Namecheap DNS documentation
- Vercel custom domain guide
- Railway deployment docs

## Security Considerations
- Enable HTTPS everywhere
- Use secure environment variables
- Implement proper CORS settings
- Regular security updates

---

**Next Steps:**
1. Choose your hosting platform
2. Configure DNS records in Namecheap
3. Deploy frontend and backend
4. Test subdomain functionality

Need help with any specific step? The setup process typically takes 2-4 hours plus DNS propagation time.
