# iOS Deployment Setup Checklist

Use this checklist to ensure everything is ready for iOS deployment.

## ✅ Completed Setup

- [x] EAS configuration (`eas.json`)
- [x] iOS app configuration (`app.json`)
- [x] API service layer (`services/api.ts`)
- [x] Environment configuration (`config/env.ts`)
- [x] Build scripts in `package.json`
- [x] iOS permissions configured
- [x] Documentation created

## 🔲 Required Before First Build

### 1. Apple Developer Account
- [ ] Sign up at https://developer.apple.com ($99/year)
- [ ] Note your Team ID
- [ ] Create App ID in Apple Developer Portal

### 2. Expo Account & EAS
- [ ] Sign up at https://expo.dev (free)
- [ ] Install EAS CLI: `npm install -g eas-cli`
- [ ] Login: `eas login`
- [ ] Configure project: `eas build:configure`
- [ ] Update `app.json` with project ID from EAS

### 3. App Assets
- [ ] Create `assets/icon.png` (1024x1024px)
- [ ] Create `assets/splash.png` (2732x2732px)
- [ ] Create `assets/adaptive-icon.png` (1024x1024px, Android)
- [ ] Create `assets/favicon.png` (48x48px, Web)

### 4. Environment Variables
- [ ] Create `.env` file in `mobile/` directory
- [ ] Set `EXPO_PUBLIC_API_URL`
- [ ] Set `EXPO_PUBLIC_SUPABASE_URL`
- [ ] Set `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- [ ] (Optional) Set EAS secrets for production

### 5. Backend API
- [ ] Ensure API server is running and accessible
- [ ] Test API endpoints are working
- [ ] Verify CORS is configured for mobile app

### 6. App Store Connect
- [ ] Create app in App Store Connect
- [ ] Fill in app metadata (name, description, etc.)
- [ ] Note your App Store Connect App ID
- [ ] Update `eas.json` with Apple credentials

## 🚀 Ready to Build

Once all items above are checked:

1. **Test locally first**:
   ```bash
   npm run ios
   ```

2. **Create development build**:
   ```bash
   npm run build:ios
   ```

3. **Create preview build for TestFlight**:
   ```bash
   npm run build:ios:preview
   ```

4. **Submit to App Store**:
   ```bash
   npm run submit:ios
   ```

## 📱 Mobile-First Optimizations

The app is already configured for mobile-first:

- ✅ Dark mode UI (black background)
- ✅ Touch-optimized buttons and interactions
- ✅ Safe area handling for notches
- ✅ Responsive layouts
- ✅ Native navigation (Expo Router)
- ✅ Native components (StatusBar, etc.)

## 🔍 Testing Checklist

Before submitting to App Store:

- [ ] Test on physical iOS device
- [ ] Test all navigation flows
- [ ] Test authentication flows
- [ ] Test API integration
- [ ] Test on different iOS versions (13.4+)
- [ ] Test on different screen sizes (iPhone SE to iPhone Pro Max)
- [ ] Verify all permissions work correctly
- [ ] Test offline behavior (if applicable)

## 📚 Documentation

- [IOS_DEPLOYMENT.md](./IOS_DEPLOYMENT.md) - Detailed deployment guide
- [README.md](./README.md) - General mobile app documentation
- [assets/ASSETS_REQUIRED.md](./assets/ASSETS_REQUIRED.md) - Asset requirements

## 🆘 Need Help?

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Apple Developer Support](https://developer.apple.com/support/)
