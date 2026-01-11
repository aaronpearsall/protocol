# Live Preview Guide

This guide will help you preview the Protocol app in your browser/device.

## Quick Preview (Coach Web App)

The coach web app is the easiest to preview - it runs in your browser!

### Step 1: Install Dependencies

Open your terminal and run:

```bash
cd /Users/aaronpearsall/protocol/coach-web
npm install
```

If you get npm log errors, you can ignore them - the installation should still work. You can verify by checking if `node_modules` folder was created.

### Step 2: Start the Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

The app will be available at: **http://localhost:3000**

You should see the coach dashboard with:
- Black background
- Green "Protocol" logo
- Navigation tabs
- Dashboard with stats
- Workout/Exercise/Programming tabs

### Step 4: Navigate Around

- Click "Workouts" → "Create New Workout" to see the workout builder
- Click "Exercises" → "Add New Exercise" to see the exercise form
- Explore the different tabs

## Mobile App Preview

### Option 1: Expo Go (Easiest - Recommended)

1. **Install Expo Go** on your iPhone or Android phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Install dependencies:**
   ```bash
   cd /Users/aaronpearsall/protocol/mobile
   npm install
   ```

3. **Start Expo:**
   ```bash
   npm start
   ```

4. **Scan QR Code:**
   - iOS: Open Camera app and scan the QR code
   - Android: Open Expo Go app and scan the QR code

### Option 2: iOS Simulator (Mac only)

1. Install dependencies (same as above)
2. Start Expo: `npm start`
3. Press `i` to open iOS simulator
4. Wait for app to load

### Option 3: Android Emulator

1. Install dependencies (same as above)
2. Start Expo: `npm start`
3. Press `a` to open Android emulator
4. Wait for app to load

### Option 4: Web Browser (Limited)

1. Install dependencies
2. Start Expo: `npm start`
3. Press `w` to open in web browser
4. Note: Some features may not work perfectly in web

## Troubleshooting

### "Module not found" errors
- Make sure you ran `npm install` in the correct directory
- Try deleting `node_modules` and `package-lock.json`, then `npm install` again

### Port already in use
- Kill the process using port 3000: `lsof -ti:3000 | xargs kill`
- Or use a different port: `PORT=3001 npm run dev`

### Expo won't start
- Make sure you're in the `mobile` directory
- Try `npx expo start --clear` to clear cache

### Can't see changes
- Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- In Expo, shake device and select "Reload"

## What You'll See

### Coach Web App
- **Homepage**: Dashboard with stats and navigation
- **Workout Builder**: Form to create new workouts with sections
- **Exercise Manager**: Form to add exercises with videos

### Mobile App
- **Today Tab**: Calendar with workout preview
- **Community Tab**: Events and forum sections
- **My Account Tab**: Profile and settings
- **Workout Detail**: Full workout view with exercises
- **Logbook**: History of all lifts

## Giving Feedback

When you see something you want to change:
1. Note the screen/page name
2. Describe what you see vs. what you want
3. Share specific details (colors, layout, text, functionality)

Example:
- "On the Today tab, the calendar is too small"
- "The workout card needs a different color"
- "I want the logo bigger on the coach dashboard"

## Next Steps After Preview

Once you've previewed and have feedback:
1. Share your feedback with me
2. I'll make the changes
3. Refresh your browser/app to see updates
4. Repeat until it's perfect!

