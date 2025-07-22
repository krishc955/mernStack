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
