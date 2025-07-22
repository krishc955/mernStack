# MERN E-commerce Application

A full-stack e-commerce application built with MongoDB, Express.js, React, and Node.js.

## Features
- User authentication and authorization
- Product catalog with search and filters
- Shopping cart functionality
- Order management
- Admin dashboard
- Payment integration with PayPal
- Image upload with Cloudinary

## Deployment

<<<<<<< HEAD
### Vercel + Render Deployment

This application is configured for deployment using Vercel (frontend) and Render (backend).

#### Prerequisites
1. GitHub account
2. Vercel account (free)
3. Render account (free)
4. MongoDB Atlas account (free)

#### Backend Deployment on Render
1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (see server/.env.example)
6. Deploy!

#### Frontend Deployment on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" and select your repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
=======
### Railway Deployment

This application is configured for easy deployment on Railway.

#### Backend Deployment
1. Create a new Railway project
2. Connect your GitHub repository
3. Select the `server` folder
4. Add environment variables (see .env.example)
5. Deploy!

#### Frontend Deployment
1. Add a new service to your Railway project
2. Connect to the same repository
3. Select the `client` folder
4. Set VITE_API_URL to your backend Railway URL
>>>>>>> e956d4d3cdc8ff2583988fbd9f971bd88e3b278b
5. Deploy!

## Local Development

### Server
```bash
cd server
npm install
npm run dev
```

### Client
```bash
cd client
npm install
npm run dev
```

## Environment Variables

### Server (.env)
See `server/.env.example` for required variables.

### Client (.env)
See `client/.env.example` for required variables.
