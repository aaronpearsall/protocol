# Troubleshooting Guide

## App Not Working in Cursor Browser

### Step 1: Check if Dev Server is Running

Open a terminal and run:
```bash
cd /Users/aaronpearsall/protocol/coach-web
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

### Step 2: Open in Browser

1. Open your browser (not Cursor's built-in browser)
2. Navigate to: `http://localhost:3000`
3. If using Cursor's browser, try opening in your default browser instead

### Step 3: Check Browser Console

1. Open Developer Tools (F12 or Cmd+Option+I on Mac)
2. Check the Console tab for any red errors
3. Check the Network tab to see if files are loading

### Step 4: Clear Cache and Hard Refresh

- **Mac**: Cmd+Shift+R
- **Windows/Linux**: Ctrl+Shift+R

### Step 5: Check Terminal for Errors

Look for any compilation errors in the terminal where `npm run dev` is running.

### Common Issues:

1. **Port 3000 already in use**: 
   - Kill the process: `lsof -ti:3000 | xargs kill -9`
   - Or use a different port: `PORT=3001 npm run dev`

2. **Module not found errors**:
   - Run: `cd /Users/aaronpearsall/protocol && npm install`
   - Then: `cd coach-web && npm install`

3. **TypeScript errors**:
   - Check the terminal output for specific errors
   - Make sure all dependencies are installed

### Still Not Working?

1. Stop the dev server (Ctrl+C)
2. Delete `.next` folder: `rm -rf coach-web/.next`
3. Restart: `cd coach-web && npm run dev`

