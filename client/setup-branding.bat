@echo off
echo 🎨 Setting up Vinora favicon and social media image...

REM Create public directory if it doesn't exist
if not exist "public" mkdir public

REM Copy logo as favicon
copy "src\assets\img.png" "public\favicon.png" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Favicon created successfully!
) else (
    echo ❌ Failed to create favicon
)

REM Copy logo for social media sharing
copy "src\assets\img.png" "public\vinora-logo.png" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Social media image created successfully!
) else (
    echo ❌ Failed to create social media image
)

REM Copy logo as apple touch icon
copy "src\assets\img.png" "public\apple-touch-icon.png" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Apple touch icon created successfully!
) else (
    echo ❌ Failed to create apple touch icon
)

echo.
echo 🎉 Vinora branding setup complete!
echo 📁 Files created in public folder:
echo    - favicon.png
echo    - vinora-logo.png  
echo    - apple-touch-icon.png
echo.
echo 🔗 Your website will now show Vinora branding when shared on social media!
pause
