# iOS Deployment Guide

This guide will help you deploy the Protocol mobile app to iOS.

## Prerequisites

1. **Apple Developer Account** ($99/year)
   - Sign up at https://developer.apple.com
   - You'll need this for App Store distribution

2. **Expo Account** (free)
   - Sign up at https://expo.dev
   - Install EAS CLI: `npm install -g eas-cli`

3. **Xcode** (for local development/testing)
   - Download from Mac App Store
   - Required for iOS Simulator

## Initial Setup

### 1. Install EAS CLI

```bash
npm install -g eas-cli
```

### 2. Login to Expo

```bash
eas login
```

### 3. Configure EAS Project

```bash
cd mobile
eas build:configure
```

This will:
- Create an EAS project (if not already created)
- Update `app.json` with your project ID
- Set up build profiles

### 4. Configure Environment Variables

Create a `.env` file in the `mobile/` directory:

```bash
# API Configuration
EXPO_PUBLIC_API_URL=https://your-api-url.com

# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

For production builds, you can also set environment variables in EAS:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://your-api-url.com
```

## Building for iOS

### Development Build (for testing)

```bash
npm run build:ios
# or
eas build --platform ios --profile development
```

### Preview Build (for TestFlight/internal testing)

```bash
npm run build:ios:preview
# or
eas build --platform ios --profile preview
```

### Production Build (for App Store)

```bash
npm run build:ios:production
# or
eas build --platform ios --profile production
```

## App Store Submission

### 1. Configure App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Create a new app
3. Fill in app information (name, description, screenshots, etc.)
4. Note your App ID and Team ID

### 2. Update eas.json

Update the `submit` section in `eas.json` with your Apple credentials:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "your-apple-team-id"
      }
    }
  }
}
```

### 3. Submit to App Store

```bash
npm run submit:ios
# or
eas submit --platform ios
```

## Required Assets

Before building, you'll need:

1. **App Icon** (`assets/icon.png`)
   - 1024x1024px PNG
   - No transparency
   - Square format

2. **Splash Screen** (`assets/splash.png`)
   - Recommended: 2732x2732px for all devices
   - Background color: #000000 (black)

3. **App Store Assets** (for submission)
   - Screenshots for different device sizes
   - App preview videos (optional)
   - App description and metadata

## Testing Locally

### iOS Simulator

```bash
npm run ios
```

This will:
- Start the Expo dev server
- Open iOS Simulator
- Load your app

### Physical Device

1. Install Expo Go app from App Store
2. Run `npm start`
3. Scan QR code with your iPhone camera

## Troubleshooting

### Build Fails

- Check that your Apple Developer account is active
- Verify bundle identifier is unique: `com.protocol.app`
- Ensure all required assets are present
- Check EAS build logs: `eas build:list`

### App Won't Install on Device

- Check device UDID is registered in Apple Developer portal
- Verify provisioning profile is correct
- For TestFlight, ensure app is in "Ready to Submit" state

### Environment Variables Not Working

- Ensure variables start with `EXPO_PUBLIC_` for client-side access
- Rebuild after changing environment variables
- Check EAS secrets are set correctly

## Next Steps

1. Set up continuous deployment with GitHub Actions
2. Configure TestFlight beta testing
3. Set up analytics and crash reporting
4. Configure push notifications

## Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [Apple Developer Portal](https://developer.apple.com)
- [App Store Connect](https://appstoreconnect.apple.com)
