#!/bin/bash

# Run Coach Web App
# This script will install dependencies and start the dev server

echo "🚀 Starting Protocol Coach Web App..."
echo ""

cd "$(dirname "$0")/coach-web"

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed!"
    echo ""
    echo "🌐 Starting development server..."
    echo "📱 Open http://localhost:3000 in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    npm run dev
else
    echo ""
    echo "❌ Installation failed. Try running manually:"
    echo "   cd coach-web"
    echo "   npm install"
    echo "   npm run dev"
fi

