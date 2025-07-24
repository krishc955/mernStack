@echo off
echo 🔧 Setting up Razorpay for your MERN E-commerce
echo.

echo 📝 Step 1: Create server/.env file with Razorpay credentials
echo Add these lines to your server/.env file:
echo.
echo RAZORPAY_KEY_ID=rzp_test_your_key_id_here
echo RAZORPAY_KEY_SECRET=your_secret_key_here
echo.

echo 📝 Step 2: Get your Razorpay credentials:
echo 1. Go to https://razorpay.com
echo 2. Create account and login
echo 3. Dashboard → Settings → API Keys
echo 4. Generate Test Keys
echo 5. Copy Key ID and Secret to .env file
echo.

echo 📝 Step 3: Start your servers:
echo Backend: cd server && npm run dev
echo Frontend: cd client && npm run dev
echo.

echo 🧪 Step 4: Test payment with:
echo Card: 4111 1111 1111 1111
echo CVV: 123
echo Expiry: 12/25
echo UPI: success@razorpay
echo.

echo ✅ Your Razorpay integration is ready!
echo 📖 Check RAZORPAY_SETUP_GUIDE.md for detailed instructions

pause
