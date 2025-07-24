# Razorpay Integration Setup Guide

## 🔧 Backend Setup

### 1. Environment Variables
Add these environment variables to your `.env` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

### 2. Get Razorpay Credentials

1. **Sign up for Razorpay**: 
   - Go to [https://razorpay.com](https://razorpay.com)
   - Create an account or log in

2. **Get Test Keys** (for development):
   - Go to Dashboard → Settings → API Keys
   - Generate Test Keys
   - Copy the **Key ID** and **Key Secret**

3. **For Production**:
   - Complete KYC verification
   - Get Live Keys from the same section

### 3. Test Credentials (For Development)
You can use these test credentials for initial testing:

```env
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=test_secret_key_here
```

## 💳 Payment Methods Supported

Razorpay supports all major payment methods in India:

### UPI Payments
- Google Pay
- PhonePe
- Paytm
- BHIM UPI
- All UPI apps

### Cards
- Credit Cards (Visa, MasterCard, RuPay, Amex)
- Debit Cards (All major banks)

### Net Banking
- All major banks
- 50+ banks supported

### Wallets
- Paytm
- Mobikwik
- FreeCharge
- And more

## 🧪 Testing

### Test Card Numbers
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI
- **Success**: success@razorpay
- **Failure**: failure@razorpay

## 🔐 Security Features

1. **Payment Signature Verification**: All payments are verified using HMAC-SHA256
2. **HTTPS Only**: All API calls are encrypted
3. **PCI DSS Compliance**: Razorpay is PCI DSS Level 1 compliant
4. **3D Secure**: Automatic 3D Secure authentication for cards

## 📱 User Experience

### Payment Flow
1. User clicks "Pay with Razorpay"
2. Razorpay checkout modal opens
3. User selects payment method (UPI/Cards/Wallet)
4. Completes payment
5. Payment verification happens automatically
6. Order is confirmed and cart is cleared

### Mobile Responsive
- Optimized for mobile devices
- Native UPI app integration
- Seamless payment experience

## 🌍 Localization

- Multi-language support (Hindi, English, regional languages)
- Indian Rupee (INR) currency
- Local payment methods
- Compliance with Indian regulations

## 📊 Benefits Over PayPal

1. **Better for Indian Market**: Designed specifically for India
2. **More Payment Options**: UPI, Net Banking, Wallets
3. **Lower Fees**: Competitive pricing for Indian transactions
4. **Local Support**: India-based customer support
5. **Faster Settlements**: Quick money transfers to bank account
6. **Better Success Rates**: Higher payment success rates in India

## 🚀 Production Deployment

1. **Get Live Keys**: Complete KYC and get production keys
2. **Update Environment**: Switch to live keys in production
3. **Test Thoroughly**: Test all payment methods before going live
4. **Monitor**: Use Razorpay Dashboard to monitor transactions

## 🔧 Webhook Setup (Optional)

For enhanced security, you can set up webhooks:

1. Go to Razorpay Dashboard → Webhooks
2. Add your webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Implement webhook handling in your backend

## 📞 Support

- **Documentation**: [https://razorpay.com/docs](https://razorpay.com/docs)
- **Support**: [https://razorpay.com/support](https://razorpay.com/support)
- **Community**: Stack Overflow, GitHub discussions

---

Your e-commerce platform now supports modern payment methods preferred by Indian customers! 🎉
