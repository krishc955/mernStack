# 🧪 RAZORPAY DUMMY PAYMENT TESTING GUIDE

## ✅ TEST CREDENTIALS (NO REAL MONEY)

### 🔑 Test API Keys
Get your test keys from: https://dashboard.razorpay.com/app/keys
- Key ID: starts with `rzp_test_`
- Key Secret: your test secret

### 💳 Test Card Numbers

#### ✅ SUCCESSFUL PAYMENTS
- **Card Number**: 4111 1111 1111 1111 (Visa)
- **Card Number**: 5555 5555 5555 4444 (Mastercard)
- **Card Number**: 3782 8224 6310 005 (American Express)
- **CVV**: Any 3 digits (e.g., 123)
- **Expiry**: Any future date (e.g., 12/25)
- **Name**: Any name

#### ❌ FAILED PAYMENTS
- **Card Number**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### 📱 Test UPI IDs
- **Success**: success@razorpay
- **Failure**: failure@razorpay

### 🏦 Test Net Banking
- **Success**: Choose any bank and use "success"
- **Failure**: Choose any bank and use "failure"

## 🧪 HOW TO TEST

### Step 1: Setup Test Environment
1. Add test API keys to server/.env
2. Restart your server
3. Open your ecommerce site

### Step 2: Create Test Order
1. Add products to cart
2. Go to checkout
3. Fill shipping details
4. Select "Razorpay" payment method

### Step 3: Test Payment Flow
1. Use test card: 4111 1111 1111 1111
2. CVV: 123
3. Expiry: 12/25
4. Click Pay
5. Payment should succeed ✅

### Step 4: Test Failed Payment
1. Use fail card: 4000 0000 0000 0002
2. CVV: 123
3. Expiry: 12/25
4. Payment should fail ❌

## 🔍 TESTING CHECKLIST

- [ ] Test successful card payment
- [ ] Test failed card payment
- [ ] Test UPI payment (success@razorpay)
- [ ] Test UPI failure (failure@razorpay)
- [ ] Test net banking
- [ ] Check order status updates
- [ ] Verify cart clears after success
- [ ] Test payment cancellation

## 💰 IMPORTANT NOTES

⚠️ **NO REAL MONEY**: Test mode = completely free
⚠️ **TEST KEYS ONLY**: Use keys starting with `rzp_test_`
✅ **UNLIMITED TESTING**: Test as many times as you want
✅ **ALL FEATURES**: Test all payment methods
✅ **REAL SIMULATION**: Behaves exactly like live payments

## 🚀 READY FOR PRODUCTION?

When ready for real payments:
1. Complete Razorpay KYC verification
2. Get LIVE API keys (start with `rzp_live_`)
3. Replace test keys with live keys
4. Test with small real amount first

Happy Testing! 🎉
