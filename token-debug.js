// Token Debug Test - Run in Browser Console
console.log('=== TOKEN DEBUG ===');
console.log('vinora_auth_token:', localStorage.getItem('vinora_auth_token'));
console.log('token:', localStorage.getItem('token'));
console.log('All localStorage keys:', Object.keys(localStorage));

// Test if the token is valid by trying to decode it (if it's a JWT)
const token = localStorage.getItem('vinora_auth_token');
if (token) {
  console.log('Token exists, length:', token.length);
  console.log('Token starts with:', token.substring(0, 20) + '...');
  
  // Try to decode JWT (basic check)
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      console.log('JWT Payload:', payload);
      console.log('Token expires at:', new Date(payload.exp * 1000));
      console.log('Is token expired?', payload.exp * 1000 < Date.now());
    } else {
      console.log('Token is not a JWT format');
    }
  } catch (e) {
    console.log('Could not decode token:', e.message);
  }
} else {
  console.log('❌ No token found - user needs to log in');
}
