// Quick Authentication Test
// Run this in your browser console on the admin videos page

console.log('=== AUTHENTICATION DEBUG ===');

// Check if token exists
const token = localStorage.getItem('vinora_auth_token');
console.log('1. Token exists:', !!token);
console.log('2. Token length:', token ? token.length : 0);

if (token) {
  console.log('3. Token preview:', token.substring(0, 50) + '...');
  
  // Test a simple API call to check auth
  fetch(`${window.location.origin}/api/admin/videos`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('4. API Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('5. API Response:', data);
    if (data.success) {
      console.log('✅ Authentication working!');
    } else {
      console.log('❌ Authentication failed:', data.message);
    }
  })
  .catch(error => {
    console.log('❌ API Error:', error);
  });
} else {
  console.log('❌ No token found - you need to log in');
  console.log('Available localStorage keys:', Object.keys(localStorage));
}
