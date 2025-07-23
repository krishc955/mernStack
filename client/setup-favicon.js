import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script to copy Vinora logo as favicon
console.log('🎨 Setting up Vinora favicon...');

const logoPath = path.join(__dirname, 'src', 'assets', 'img.png');
const faviconPath = path.join(__dirname, 'public', 'favicon.png');

try {
  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.error('❌ Vinora logo not found at:', logoPath);
    process.exit(1);
  }

  // Copy logo to public folder as favicon
  fs.copyFileSync(logoPath, faviconPath);
  console.log('✅ Favicon created successfully!');
  console.log('📁 Favicon location:', faviconPath);
  
  // Also create a 16x16 and 32x32 version reference in HTML
  console.log('🔧 Make sure your index.html has the correct favicon link');
  console.log('📋 Current favicon link: <link rel="icon" type="image/png" href="/favicon.png" />');
  
} catch (error) {
  console.error('❌ Error setting up favicon:', error.message);
  process.exit(1);
}
