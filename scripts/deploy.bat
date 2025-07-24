@echo off
echo 🚀 Starting Vinora Subdomain Deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo 📦 Installing dependencies...

REM Install server dependencies
echo Installing server dependencies...
call npm install

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
cd ..

echo 🏗️ Building client for production...
cd client
call npm run build
cd ..

echo ✅ Build completed successfully!

echo.
echo 📋 Next steps:
echo 1. Set up DNS records in Namecheap:
echo    - CNAME: vinora → your-deployment-url
echo    - CNAME: www.vinora → your-deployment-url
echo.
echo 2. Deploy to your hosting platform:
echo    - Frontend: Upload client/dist/ folder
echo    - Backend: Deploy server/ folder
echo.
echo 3. Configure environment variables on your hosting platform
echo.
echo 4. Test your subdomain: https://www.vinora.royalappleshimla.com

echo.
echo 🎉 Deployment preparation complete!
pause
