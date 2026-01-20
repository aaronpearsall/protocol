#!/bin/bash

# Start Expo on port 3000 instead of 8081
cd "$(dirname "$0")"
echo "Starting Expo web server on port 3000..."
echo "Open http://localhost:3000 in your browser"
npx expo start --web --port 3000
