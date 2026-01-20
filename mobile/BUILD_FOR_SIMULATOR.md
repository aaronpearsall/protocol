# Building for iOS Simulator

Since Expo Go isn't connecting, let's build a development build for the simulator.

## Quick Build (Recommended)

Run this command to build for iOS Simulator:

```bash
cd /Users/aaronpearsall/protocol/mobile
npx expo run:ios
```

This will:
1. Build the app natively for iOS Simulator
2. Install it automatically
3. Launch it in the simulator

**Note:** This requires:
- Xcode to be fully installed (✅ you have this)
- First build takes 5-10 minutes
- Subsequent builds are faster

## Alternative: EAS Build (Cloud)

If local build doesn't work:

```bash
cd /Users/aaronpearsall/protocol/mobile
eas build --profile development --platform ios
```

Then install the build on your simulator.

## Troubleshooting

If `npx expo run:ios` fails:
- Make sure Xcode is fully installed
- Accept Xcode license: `sudo xcodebuild -license accept`
- Check that command line tools are set: `xcode-select -p` should show `/Applications/Xcode.app/Contents/Developer`
