# 🚀 START HERE - Preview Your App

## Option 1: Coach Web App (Easiest - 2 minutes)

**This is the fastest way to see the app!**

1. Open Terminal
2. Run these commands:

```bash
cd /Users/aaronpearsall/protocol/coach-web
npm install
npm run dev
```

3. Open your browser and go to: **http://localhost:3000**

**You should see:**
- Black background
- Green "Protocol" logo at top
- Dashboard with stats
- Navigation buttons

**Try clicking:**
- "Workouts" → "Create New Workout" 
- "Exercises" → "Add New Exercise"

---

## Option 2: Mobile App (5 minutes)

### Step 1: Install Expo Go on Your Phone
- **iPhone**: [Download from App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Download from Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2: Start the App

```bash
cd /Users/aaronpearsall/protocol/mobile
npm install
npm start
```

### Step 3: Scan QR Code
- **iPhone**: Open Camera app, point at QR code
- **Android**: Open Expo Go app, tap "Scan QR code"

**You should see:**
- Three tabs at bottom: Community, Today, My Account
- Black background with green accents
- Calendar on Today tab
- Navigation working between screens

---

## Troubleshooting

### "npm install" shows errors?
- **Ignore the log errors** - they're usually harmless
- Check if `node_modules` folder was created
- If not, try: `rm -rf node_modules && npm install`

### Port 3000 already in use?
```bash
lsof -ti:3000 | xargs kill
```

### Expo won't start?
```bash
cd mobile
npx expo start --clear
```

### Can't see changes?
- **Browser**: Hard refresh (Cmd+Shift+R on Mac)
- **Mobile**: Shake device → "Reload"

---

## What to Look For

### Coach Web App
✅ Black/green color scheme  
✅ Dashboard with navigation  
✅ Workout creation form  
✅ Exercise creation form  

### Mobile App
✅ Three bottom tabs  
✅ Calendar on Today tab  
✅ Community tab with events/forum  
✅ Account tab with profile  
✅ Workout detail screen  
✅ Logbook screen  

---

## Giving Feedback

When you see something you want changed:

1. **Note the screen name** (e.g., "Today tab", "Coach dashboard")
2. **Describe what you see** vs. **what you want**
3. **Be specific** (colors, sizes, text, layout)

**Examples:**
- "The calendar on Today tab is too small"
- "I want the logo bigger on the coach dashboard"
- "The workout card needs more spacing"
- "Change the green color to a different shade"

---

## Next Steps

Once you've previewed:
1. Share your feedback with me
2. I'll make the changes
3. Refresh to see updates
4. Repeat until perfect! ✨

---

**Need more help?** See [QUICK_START.md](./QUICK_START.md) or [PREVIEW_GUIDE.md](./PREVIEW_GUIDE.md)

