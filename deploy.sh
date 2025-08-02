#!/bin/bash

# Colorado Trip Planner - GitHub Pages Deployment Script
# This script will deploy your website to GitHub Pages for free

echo "🏔️  Colorado Trip Planner - GitHub Deployment"
echo "=============================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "✅ Git is installed"

# Get user input
echo ""
echo "📝 Please provide your GitHub information:"
read -p "GitHub username: " github_username
read -p "Repository name (press Enter for 'colorado-trip-planner'): " repo_name

# Set default repo name if empty
if [ -z "$repo_name" ]; then
    repo_name="colorado-trip-planner"
fi

echo ""
echo "🚀 Setting up deployment..."

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "   Initializing git repository..."
    git init
else
    echo "   Git repository already exists"
fi

# Add all files
echo "   Adding files..."
git add .

# Create initial commit
echo "   Creating commit..."
git commit -m "Deploy Colorado Trip Planner

Features:
- Interactive 6-day Colorado itinerary
- Google Maps integration with route planning
- Editable stops and timing
- Mobile responsive design
- Print-friendly format

Trip route: Plano, TX → Palo Duro Canyon → Telluride → San Juan Mountains → 
Estes Park → Rocky Mountain National Park → Colorado Springs → Capulin Volcano → Home"

# Set main branch
echo "   Setting main branch..."
git branch -M main

# Add remote origin
echo "   Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$github_username/$repo_name.git"

echo ""
echo "📋 Next Steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: $repo_name"
echo "3. Make it PUBLIC (required for free GitHub Pages)"
echo "4. Click 'Create repository'"
echo "5. Come back here and press Enter when done..."

read -p "Press Enter when you've created the GitHub repository..."

echo ""
echo "🚀 Pushing to GitHub..."

# Push to GitHub
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Now enable GitHub Pages:"
    echo "1. Go to: https://github.com/$github_username/$repo_name/settings/pages"
    echo "2. Source: 'Deploy from a branch'"
    echo "3. Branch: 'main'"
    echo "4. Folder: '/ (root)'"
    echo "5. Click 'Save'"
    echo ""
    echo "🎉 Your website will be live at:"
    echo "   https://$github_username.github.io/$repo_name/"
    echo ""
    echo "📝 To update your website in the future:"
    echo "   1. Make changes to your files"
    echo "   2. Run: git add . && git commit -m 'Update trip' && git push"
    echo ""
    echo "🎯 Don't forget to enable GitHub Pages in your repository settings!"
else
    echo ""
    echo "❌ Push failed. This usually means:"
    echo "1. Repository doesn't exist yet - create it at https://github.com/new"
    echo "2. Repository name doesn't match: $repo_name"
    echo "3. You need to authenticate with GitHub"
    echo ""
    echo "💡 Try running: git push -u origin main"
fi