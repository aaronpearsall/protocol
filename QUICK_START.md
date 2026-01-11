# Quick Start - Preview the App

## Fastest Way to Preview (Coach Web App)

The coach web app is the easiest to see - just run these commands:

```bash
cd /Users/aaronpearsall/protocol/coach-web
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser!

You'll see:
- Black background with green Protocol logo
- Dashboard with stats
- Navigation to create workouts and exercises

## Mobile App Preview

### Using Expo Go (Recommended)

1. **Install Expo Go** on your phone:
   - iPhone: [App Store Link](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play Link](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Run these commands:**
   ```bash
   cd /Users/aaronpearsall/protocol/mobile
   npm install
   npm start
   ```

3. **Scan the QR code** with:
   - iPhone: Camera app
   - Android: Expo Go app

### Using Simulator/Emulator

**iOS Simulator (Mac only):**
```bash
cd mobile
npm install
npm start
# Then press 'i' when Expo starts
```

**Android Emulator:**
```bash
cd mobile
npm install
npm start
# Then press 'a' when Expo starts
```

## What You'll See

### Coach Web App
- Dashboard homepage
- "Create New Workout" button
- "Add New Exercise" button
- Black/green color scheme

### Mobile App
- **Today Tab**: Calendar with workout preview
- **Community Tab**: Events and forum
- **My Account Tab**: Profile and settings
- **Workout Detail**: Full workout view
- **Logbook**: Lift history

## Troubleshooting

**npm install errors?**
- The log errors are usually harmless - check if `node_modules` folder was created
- If not, try: `rm -rf node_modules package-lock.json && npm install`

**Port 3000 already in use?**
- Kill it: `lsof -ti:3000 | xargs kill`
- Or use different port: `PORT=3001 npm run dev`

**Expo won't start?**
- Make sure you're in the `mobile` directory
- Try: `npx expo start --clear`

## Need Help?

See [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md) for more detailed instructions.

