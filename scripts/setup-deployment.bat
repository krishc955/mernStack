@echo off
echo ============================================
echo MERN E-commerce Deployment Preparation
echo ============================================
echo.

echo Checking if you're in the right directory...
if not exist "client" (
    echo ERROR: client folder not found!
    echo Please run this script from the root project directory
    pause
    exit /b 1
)

if not exist "server" (
    echo ERROR: server folder not found!
    echo Please run this script from the root project directory
    pause
    exit /b 1
)

echo ✅ Project structure verified!
echo.

echo ============================================
echo NEXT STEPS FOR DEPLOYMENT:
echo ============================================
echo.

echo 1. UPDATE API ENDPOINTS:
echo    - Open API_UPDATE_GUIDE.md for detailed instructions
echo    - Update all store files to use API_BASE_URL
echo.

echo 2. SETUP REQUIRED SERVICES:
echo    ✓ GitHub account (for code hosting)
echo    ✓ MongoDB Atlas account (free database)
echo    ✓ Cloudinary account (free image storage)
echo    ✓ PayPal Developer account (for payments)
echo    ✓ Render account (free backend hosting)
echo    ✓ Vercel account (free frontend hosting)
echo.

echo 3. DEPLOYMENT ORDER:
echo    → Push code to GitHub
echo    → Deploy backend on Render
echo    → Deploy frontend on Vercel
echo    → Test the application
echo.

echo 4. CONFIGURATION FILES CREATED:
echo    ✅ server/.env.example (backend environment variables)
echo    ✅ client/.env.example (frontend environment variables)
echo    ✅ client/src/config/api.js (API configuration)
echo    ✅ DEPLOYMENT_GUIDE.md (complete deployment guide)
echo    ✅ API_UPDATE_GUIDE.md (API update instructions)
echo.

echo ============================================
echo IMPORTANT NOTES:
echo ============================================
echo.
echo • Read DEPLOYMENT_GUIDE.md for step-by-step instructions
echo • Update API endpoints before deploying (see API_UPDATE_GUIDE.md)
echo • Keep your environment variables secure
echo • Test locally before deploying
echo.

echo Ready to start deployment? Read DEPLOYMENT_GUIDE.md
echo.
pause
