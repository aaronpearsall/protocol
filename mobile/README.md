# Protocol Mobile App

React Native mobile app built with Expo for iOS and Android.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Project Structure

```
mobile/
├── app/              # Expo Router pages (file-based routing)
│   ├── (tabs)/      # Main navigation tabs
│   ├── auth/        # Authentication screens
│   └── workout/     # Workout detail screens
├── components/       # Reusable React components
├── contexts/        # React Context providers
├── services/        # API and external service integrations
├── config/          # Configuration files
├── constants/       # Constants (colors, etc.)
└── assets/          # Images, fonts, etc.
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Building for iOS

See [IOS_DEPLOYMENT.md](./IOS_DEPLOYMENT.md) for detailed instructions.

Quick commands:
```bash
# Development build
npm run build:ios

# Preview build (TestFlight)
npm run build:ios:preview

# Production build (App Store)
npm run build:ios:production

# Submit to App Store
npm run submit:ios
```

## API Integration

The app uses a centralized API client (`services/api.ts`) to communicate with the backend. 

Example usage:
```typescript
import apiClient from '@/services/api';

// Get workouts
const workouts = await apiClient.getWorkouts();

// Get workout by date
const workout = await apiClient.getWorkoutByDate('2024-01-15');

// Create logbook entry
await apiClient.createLogbookEntry({
  exerciseId: '123',
  date: '2024-01-15',
  weight: 135,
  reps: 10,
  sets: 3,
});
```

## Authentication

Authentication is handled through Supabase Auth. The `AuthContext` provides:

- `signIn(email, password)`
- `signUp(email, password, name)`
- `signOut()`
- `signInWithGoogle()`
- `signInWithApple()`
- `signInWithFacebook()`

## Development

### Running on Physical Device

1. Install Expo Go from App Store
2. Run `npm start`
3. Scan QR code with your camera

### Debugging

- React Native Debugger
- Flipper
- Expo DevTools (built-in)

## Dependencies

- **Expo** - React Native framework
- **Expo Router** - File-based routing
- **Supabase** - Authentication
- **React Native Calendars** - Calendar component
- **React Native Video** - Video playback

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
