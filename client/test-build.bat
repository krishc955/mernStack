@echo off
echo 🧪 VERCEL BUILD TEST
echo.
echo Testing client build process...
echo.

cd /d "%~dp0"

echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed!
    pause
    exit /b 1
)

echo.
echo 🛡️ Checking for vulnerabilities...
npm audit --audit-level=high
if %errorlevel% neq 0 (
    echo ⚠️  Security vulnerabilities found! Running fix...
    npm audit fix
)

echo.
echo 🔨 Building for production...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo 📁 Build output created in: dist/
echo.
echo 🔍 Build size analysis:
dir dist /s /-c
echo.
echo 🚀 Ready for Vercel deployment!
echo.
pause
