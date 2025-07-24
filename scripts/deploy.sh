#!/bin/bash

# Vinora Subdomain Deployment Script
# Run this script to deploy your application

echo "🚀 Starting Vinora Subdomain Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"

# Install server dependencies
echo "Installing server dependencies..."
npm install

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install
cd ..

echo -e "${YELLOW}🏗️  Building client for production...${NC}"
cd client
npm run build
cd ..

echo -e "${GREEN}✅ Build completed successfully!${NC}"

echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Set up DNS records in Namecheap:"
echo "   - CNAME: vinora → your-deployment-url"
echo "   - CNAME: www.vinora → your-deployment-url"
echo ""
echo "2. Deploy to your hosting platform:"
echo "   - Frontend: Upload client/dist/ folder"
echo "   - Backend: Deploy server/ folder"
echo ""
echo "3. Configure environment variables on your hosting platform"
echo ""
echo "4. Test your subdomain: https://www.vinora.royalappleshimla.com"

echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
