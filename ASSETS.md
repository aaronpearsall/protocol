# Assets Required

## Mobile App Assets

The mobile app requires the following assets in `mobile/assets/`:

### Required Files

1. **icon.png** (1024x1024)
   - App icon for iOS and Android
   - Should be square with rounded corners (handled by platforms)
   - Black background with green "P" logo recommended

2. **splash.png** (1284x2778 for iPhone)
   - Splash screen shown on app launch
   - Black background with Protocol branding

3. **adaptive-icon.png** (1024x1024)
   - Android adaptive icon
   - Should work on various Android icon shapes

4. **favicon.png** (48x48)
   - Web favicon (for Expo web)

### Design Guidelines

- Use black (#000000) as primary background
- Use green (#10B981) for logo/accent
- Keep design minimal and clean
- Ensure icons are readable at small sizes

### Generating Assets

You can use tools like:
- [App Icon Generator](https://www.appicon.co/)
- [Figma](https://www.figma.com/) for design
- [Canva](https://www.canva.com/) for quick designs

### Placeholder Assets

For development, you can create simple placeholder images:
- Solid black square for icon.png
- Black rectangle with "Protocol" text for splash.png

## Coach Web App Assets

No specific assets required for the web app, but you may want:
- Logo file for navigation header
- Favicon for browser tab

## Video Assets

Videos will be uploaded through the coach dashboard and stored in S3 or similar:
- Workout explanation videos
- Exercise demonstration videos
- Recommended format: MP4, H.264 codec
- Recommended resolution: 1080p or 720p

