const Razorpay = require('razorpay');

// Test with the demo credentials directly
const testRazorpay = new Razorpay({
  key_id: 'rzp_test_OeP8kGGY8ZDa3v',
  key_secret: 'QjS8m8cBnkdJfMrVXGHYz7Bw',
});

async function testRazorpayConnection() {
  try {
    console.log('🧪 Testing Razorpay demo credentials...');
    
    const order = await testRazorpay.orders.create({
      amount: 100, // ₹1 in paise
      currency: 'INR',
      receipt: 'test_receipt_123',
    });
    
    console.log('✅ SUCCESS! Demo credentials work:');
    console.log('Order ID:', order.id);
    console.log('Amount:', order.amount);
    console.log('Status:', order.status);
    
  } catch (error) {
    console.log('❌ FAILED! Demo credentials error:');
    console.log('Status Code:', error.statusCode);
    console.log('Error:', error.error);
  }
}

testRazorpayConnection();
