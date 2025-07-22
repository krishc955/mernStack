# 🚀 Vercel + Render Deployment Guide

## Prerequisites Setup

### 1. Create Required Accounts
- [GitHub](https://github.com) - For code hosting
- [Vercel](https://vercel.com) - For frontend deployment (free)
- [Render](https://render.com) - For backend deployment (free)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For database (free)

### 2. Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and cluster (M0 Sandbox - FREE)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for production)
5. Get connection string

### 3. Setup Cloudinary (for image uploads)
1. Go to [Cloudinary](https://cloudinary.com)
2. Create free account
3. Get Cloud Name, API Key, and API Secret from dashboard

### 4. Setup PayPal Developer (for payments)
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create app in sandbox
3. Get Client ID and Client Secret

## Deployment Steps

### Phase 1: Push Code to GitHub

1. **Initialize Git Repository**
   ```bash
   cd your-project-folder
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**
   - Go to GitHub.com
   - Create new repository
   - Don't initialize with README (since you have code)

3. **Push Code**
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

### Phase 2: Deploy Backend on Render

1. **Go to Render.com**
   - Sign in with GitHub
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Select your GitHub repository
   - Click "Connect"

3. **Configure Service**
   ```
   Name: your-app-backend
   Root Directory: server
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_complex
   CLIENT_BASE_URL=https://your-frontend.vercel.app
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_secret
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://your-app-backend.onrender.com`

### Phase 3: Deploy Frontend on Vercel

1. **Go to Vercel.com**
   - Sign in with GitHub
   - Click "New Project"

2. **Import Repository**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-app-backend.onrender.com
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your app will be live at: `https://your-app.vercel.app`

### Phase 4: Update Environment Variables

1. **Update Backend (Render)**
   - Go to your Render dashboard
   - Select your backend service
   - Go to "Environment"
   - Update `CLIENT_BASE_URL` to your Vercel URL

2. **Trigger Redeploy**
   - Click "Manual Deploy" → "Deploy latest commit"

## Testing Your Deployment

1. **Test Frontend**
   - Visit your Vercel URL
   - Check if pages load correctly

2. **Test API Connection**
   - Try user registration/login
   - Check if data loads from backend

3. **Test Database**
   - Verify data persistence
   - Check MongoDB Atlas for data

## Troubleshooting

### Common Issues:

1. **API Calls Failing**
   - Check VITE_API_URL in Vercel environment variables
   - Ensure backend is running on Render

2. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check IP whitelist (use 0.0.0.0/0)

3. **Build Failures**
   - Check build logs in dashboard
   - Ensure all dependencies are in package.json

4. **Environment Variables Not Working**
   - Redeploy after adding variables
   - Check variable names (case-sensitive)

## Free Tier Limitations

### Render (Backend)
- 750 hours/month (enough for 24/7 if single app)
- Sleeps after 15 minutes of inactivity
- 512MB RAM
- 1 CPU

### Vercel (Frontend)
- 100GB bandwidth/month
- Unlimited deployments
- 6000 build minutes/month

### MongoDB Atlas
- 512MB storage
- Shared cluster

## Upgrading (Optional)

- **Render**: $7/month for always-on service
- **Vercel**: $20/month for Pro features
- **MongoDB**: $9/month for dedicated cluster

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Contact platform support if needed
