import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script to create WhatsApp optimized sharing image
console.log('📱 Creating WhatsApp optimized Vinora sharing image...');

const logoPath = path.join(__dirname, 'src', 'assets', 'vinora-logo.png');
const whatsappImagePath = path.join(__dirname, 'public', 'vinora-whatsapp-share.png');

try {
  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.error('❌ Vinora logo not found at:', logoPath);
    process.exit(1);
  }

  // For now, copy the logo as WhatsApp share image
  // In production, you would create a 400x400 or 1200x1200 square image
  fs.copyFileSync(logoPath, whatsappImagePath);
  
  console.log('✅ WhatsApp sharing image created successfully!');
  console.log('📁 WhatsApp image location:', whatsappImagePath);
  console.log('📱 WhatsApp Image Recommendations:');
  console.log('   - Minimum size: 300x300px');
  console.log('   - Recommended: 400x400px or 1200x1200px');
  console.log('   - Format: JPG or PNG');
  console.log('   - File size: Under 5MB');
  console.log('   - Square (1:1) ratio works best');
  
  console.log('🔧 For optimal WhatsApp sharing, consider creating:');
  console.log('   - Square background with brand colors');
  console.log('   - Vinora logo centered');
  console.log('   - Clear, high contrast');
  console.log('   - Text readable at small sizes');
  
} catch (error) {
  console.error('❌ Error creating WhatsApp sharing image:', error.message);
  process.exit(1);
}
