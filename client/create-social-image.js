import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script to create social media sharing image
console.log('🎨 Creating Vinora social media sharing image...');

const logoPath = path.join(__dirname, 'src', 'assets', 'vinora-logo.png');
const socialImagePath = path.join(__dirname, 'public', 'vinora-social-share.png');

try {
  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.error('❌ Vinora logo not found at:', logoPath);
    process.exit(1);
  }

  // For now, copy the logo as social share image
  // In a production environment, you would use an image processing library
  // to create a proper 1200x630 social sharing image with background
  fs.copyFileSync(logoPath, socialImagePath);
  
  console.log('✅ Social sharing image created successfully!');
  console.log('📁 Social image location:', socialImagePath);
  console.log('🔧 Consider creating a proper 1200x630px social sharing image with:');
  console.log('   - Vinora logo centered');
  console.log('   - Brand colors background');
  console.log('   - Text: "Vinora - Premium Online Store"');
  
} catch (error) {
  console.error('❌ Error creating social sharing image:', error.message);
  process.exit(1);
}
