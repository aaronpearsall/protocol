# 🚀 Quick Preview - See the App Now!

## The Expo server is running! Here's how to view it:

### Option 1: Open in Browser (Easiest) 🌐

**Just open this URL in your browser:**
```
http://localhost:8081
```

Or run this command in a new terminal:
```bash
cd /Users/aaronpearsall/protocol/mobile
open http://localhost:8081
```

### Option 2: Use the Preview Script

Run this in your terminal:
```bash
cd /Users/aaronpearsall/protocol/mobile
./run-preview.sh
```

### Option 3: iOS Simulator (If you have Xcode)

1. Open a new terminal window
2. Run: `cd /Users/aaronpearsall/protocol/mobile && npx expo start`
3. When you see the menu, press **`i`** for iOS Simulator

### Option 4: On Your iPhone

1. Install **Expo Go** from the App Store
2. Make sure your phone and computer are on the same WiFi
3. Open a new terminal and run:
   ```bash
   cd /Users/aaronpearsall/protocol/mobile
   npx expo start
   ```
4. Scan the QR code with your iPhone camera

---

## What You'll See

- **Three tabs**: Community 👥, Today 📅, My Account 👤
- **Black background** with green accents
- **Calendar** on the Today tab
- **Navigation** between screens

---

## Server Status

The Expo dev server should be running. If you can't access it:

1. **Check if it's running:**
   ```bash
   lsof -i :8081
   ```

2. **If not running, start it:**
   ```bash
   cd /Users/aaronpearsall/protocol/mobile
   npx expo start --web
   ```

3. **Wait 10-15 seconds** for it to start, then open http://localhost:8081

---

**Try opening http://localhost:8081 in your browser right now!**
