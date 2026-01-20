# 📱 How to View the Mobile App

The Expo dev server is running! Here are your options to see the app:

## Option 1: iOS Simulator (Recommended for Mac) ⚡

**If you have Xcode installed:**

1. Look at your terminal where `npm start` is running
2. You should see a menu with options
3. **Press `i`** (for iOS)
4. The iOS Simulator will open automatically
5. The app will load in the simulator

**If you don't have Xcode:**
- Download from Mac App Store (it's free, but large ~10GB)
- Or use Option 2 below

## Option 2: Expo Go on Your iPhone 📱

1. **Install Expo Go** on your iPhone:
   - Open App Store
   - Search for "Expo Go"
   - Install it (it's free)

2. **Make sure your phone and computer are on the same WiFi**

3. **In your terminal**, you should see a QR code
   - If you don't see it, look for text that says "Metro waiting on..."
   - The QR code should be visible in the terminal

4. **Scan the QR code:**
   - **iPhone**: Open the Camera app, point it at the QR code
   - Tap the notification that appears
   - It will open in Expo Go

## Option 3: Web Browser 🌐

1. In your terminal where Expo is running
2. **Press `w`** (for web)
3. It will open in your browser at http://localhost:8081
4. **Note**: Some mobile features may not work perfectly in web

## Option 4: Android Emulator 🤖

1. Make sure you have Android Studio installed
2. Start an Android emulator
3. In your terminal, **press `a`** (for Android)
4. The app will load in the emulator

---

## What You Should See

Once the app loads, you'll see:

- **Three tabs at the bottom:**
  - 👥 Community
  - 📅 Today (with calendar)
  - 👤 My Account

- **Black background** with green accents
- **Navigation** between screens

## Quick Commands in Terminal

While Expo is running, you can press:
- `i` - Open iOS Simulator
- `a` - Open Android Emulator  
- `w` - Open in Web Browser
- `r` - Reload the app
- `m` - Toggle menu
- `j` - Open debugger

## Troubleshooting

**Can't see the QR code?**
- Make sure the terminal window is wide enough
- Try scrolling up in the terminal
- The QR code appears after Metro bundler starts

**App won't load?**
- Check that your phone and computer are on the same WiFi
- Try restarting: Press `Ctrl+C` in terminal, then `npm start` again
- For iOS Simulator: Make sure Xcode is fully installed (not just command line tools)

**Want to see changes you make?**
- The app auto-reloads when you save files
- Or press `r` in the terminal to manually reload
- Or shake your device (if using Expo Go) → "Reload"

---

**The easiest way: Press `i` in your terminal to open iOS Simulator!**
