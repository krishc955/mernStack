const Razorpay = require('razorpay');
const crypto = require('crypto');

// Debug logging for environment variables
console.log('🔑 Razorpay Config Debug (Updated):');
console.log('KEY_ID:', process.env.RAZORPAY_KEY_ID ? `${process.env.RAZORPAY_KEY_ID.substring(0, 10)}...` : 'NOT FOUND');
console.log('KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? `${process.env.RAZORPAY_KEY_SECRET.substring(0, 5)}...` : 'NOT FOUND');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// Create order
const createOrder = async (orderData) => {
  try {
    console.log('🧪 Debug: Attempting to create order with current config...');
    console.log('Current KEY_ID:', process.env.RAZORPAY_KEY_ID ? `${process.env.RAZORPAY_KEY_ID.substring(0, 10)}...` : 'NOT FOUND');
    console.log('Current KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? `${process.env.RAZORPAY_KEY_SECRET.substring(0, 5)}...` : 'NOT FOUND');
    
    const options = {
      amount: orderData.amount * 100, // amount in smallest currency unit (paise for INR)
      currency: 'INR',
      receipt: orderData.receipt,
      notes: orderData.notes || {},
    };

    console.log('📋 Order options:', options);
    const order = await razorpay.orders.create(options);
    console.log('✅ Order created successfully:', order.id);
    return order;
  } catch (error) {
    console.log('❌ Detailed Razorpay error:');
    console.log('Status Code:', error.statusCode);
    console.log('Error Code:', error.error?.code);
    console.log('Description:', error.error?.description);
    console.log('Full Error:', JSON.stringify(error, null, 2));
    throw error;
  }
};

// Verify payment signature
const verifyPaymentSignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  
  return expectedSignature === razorpaySignature;
};

// Get payment details
const getPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  razorpay,
  createOrder,
  verifyPaymentSignature,
  getPaymentDetails,
};
