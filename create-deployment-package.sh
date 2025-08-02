#!/bin/bash

# Create deployment package for Colorado Trip Planner
# This creates a ZIP file for easy drag-and-drop deployment

echo "📦 Creating deployment package for Colorado Trip Planner..."
echo ""

# Create a temporary directory for the deployment package
mkdir -p deployment-package

# Copy all necessary files (excluding development files)
echo "✅ Copying website files..."
cp index.html deployment-package/
cp demo.html deployment-package/
cp start.html deployment-package/
cp styles.css deployment-package/
cp script.js deployment-package/
cp netlify.toml deployment-package/
cp itinerary.md deployment-package/
cp README.md deployment-package/

echo "✅ Files copied to deployment-package/"

# Create ZIP file
echo "📦 Creating ZIP file..."
cd deployment-package
zip -r ../colorado-trip-planner.zip . > /dev/null
cd ..

# Clean up temp directory
rm -rf deployment-package

echo ""
echo "🎉 Deployment package created: colorado-trip-planner.zip"
echo ""
echo "🚀 Easy deployment options:"
echo ""
echo "1️⃣  NETLIFY (Easiest - 30 seconds):"
echo "   • Go to https://app.netlify.com/drop"
echo "   • Drag 'colorado-trip-planner.zip' onto the page"
echo "   • Your site goes live instantly!"
echo ""
echo "2️⃣  VERCEL:"
echo "   • Go to https://vercel.com"
echo "   • Sign up/login → New Project"
echo "   • Upload 'colorado-trip-planner.zip'"
echo ""
echo "3️⃣  SURGE.SH (Terminal):"
echo "   • npm install -g surge"
echo "   • unzip colorado-trip-planner.zip"
echo "   • cd into folder → surge"
echo ""
echo "💡 The ZIP file contains your complete website ready for deployment!"