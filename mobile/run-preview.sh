#!/bin/bash

# Start Expo and open in browser
cd "$(dirname "$0")"

echo "🚀 Starting Protocol mobile app..."
echo ""
echo "The app will open in your browser in a few seconds..."
echo ""

# Start Expo in web mode
npx expo start --web
