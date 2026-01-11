#!/bin/bash

# Protocol App Preview Starter
# This script helps you quickly preview the apps

echo "🚀 Protocol App Preview"
echo ""
echo "Which app would you like to preview?"
echo "1) Coach Web App (Browser - Easiest)"
echo "2) Mobile App (Expo)"
echo "3) Both"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo ""
    echo "Starting Coach Web App..."
    echo "📱 Open http://localhost:3000 in your browser"
    echo ""
    cd coach-web
    npm install
    npm run dev
    ;;
  2)
    echo ""
    echo "Starting Mobile App..."
    echo "📱 Scan QR code with Expo Go app"
    echo ""
    cd mobile
    npm install
    npm start
    ;;
  3)
    echo ""
    echo "Starting both apps..."
    echo "📱 Coach Web: http://localhost:3000"
    echo "📱 Mobile: Scan QR code with Expo Go"
    echo ""
    echo "Opening Coach Web in background..."
    cd coach-web && npm install && npm run dev &
    sleep 3
    echo "Opening Mobile App..."
    cd ../mobile && npm install && npm start
    ;;
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac

