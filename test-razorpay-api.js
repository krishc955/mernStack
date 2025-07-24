// Quick Razorpay API Test Script
// Run this in your browser console to test API directly

const testRazorpayAPI = async () => {
  try {
    console.log('🧪 Testing Razorpay API directly...');
    
    const response = await fetch('http://localhost:5001/api/shop/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'test_user_id',
        cartItems: [
          {
            productId: 'test_product',
            title: 'Test Product',
            price: 100,
            quantity: 1,
            variant: { color: 'red', size: 'M' }
          }
        ],
        addressInfo: {
          address: 'Test Address',
          city: 'Mumbai',
          pincode: '400001',
          phone: '9876543210',
          name: 'Test User'
        },
        paymentMethod: 'razorpay',
        paymentStatus: 'pending',
        totalAmount: 100,
        orderStatus: 'pending'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Razorpay API test successful!');
      console.log('Order ID:', data.orderId);
      console.log('Razorpay Order:', data.razorpayOrder);
    } else {
      console.log('❌ Razorpay API test failed:');
      console.log(data);
    }
    
    return data;
  } catch (error) {
    console.error('❌ API test error:', error);
  }
};

// Run the test
testRazorpayAPI();
