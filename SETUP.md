# Protocol App Setup Guide

This guide will help you set up and run the Protocol CrossFit fitness app.

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Expo CLI (`npm install -g expo-cli`)
- Supabase account (for authentication)
- AWS S3 bucket (for video/file storage) - optional for development

## Project Structure

```
protocol/
├── mobile/          # React Native mobile app (iOS/Android)
├── coach-web/       # Next.js web app for coaches
├── api/             # Backend API server
├── shared/          # Shared TypeScript types and constants
└── docs/            # Documentation
```

## Initial Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install mobile app dependencies
cd mobile && npm install

# Install coach web app dependencies
cd ../coach-web && npm install

# Install API dependencies
cd ../api && npm install
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Update `DATABASE_URL` in your `.env` file
3. Run Prisma migrations:

```bash
cd api
npm run db:migrate
npm run db:generate
```

### 3. Environment Variables

Create `.env` files in each workspace:

**Root `.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/protocol"
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Mobile `.env` (or use Expo environment variables):**
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Coach Web `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL="postgresql://user:password@localhost:5432/protocol"
```

### 4. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Enable authentication providers:
   - Email/Password
   - Google OAuth
   - Apple OAuth
   - Facebook OAuth
3. Copy your project URL and anon key to environment variables

### 5. Run the Applications

**Mobile App:**
```bash
cd mobile
npm start
# Then press 'i' for iOS simulator or 'a' for Android emulator
```

**Coach Web App:**
```bash
cd coach-web
npm run dev
# Open http://localhost:3000
```

**API Server:**
```bash
cd api
npm run dev
# Server runs on http://localhost:3001
```

## Features Overview

### Mobile App (Consumer)

- **Today Tab**: Calendar view with daily workouts (WODs)
- **Community Tab**: Events and forum discussions
- **My Account Tab**: Profile, logbook, and settings
- **Workout Tracking**: Log scores, view history, track progress
- **Logbook**: Complete history of all lifts and movements
- **Social Sharing**: Copy workout descriptions for Strava

### Coach Web App

- **Workout Builder**: Create workouts with sections, exercises, and KPIs
- **Exercise Library**: Manage exercises with videos and descriptions
- **Video Upload**: Add workout explanation videos
- **Programming**: Set men's/women's weights and scaling options

## Next Steps

1. **Complete OAuth Setup**: Implement Google, Apple, and Facebook OAuth flows
2. **Connect API**: Wire up mobile and web apps to the API server
3. **File Upload**: Set up S3 or similar for video storage
4. **Subscriptions**: Integrate RevenueCat or similar for in-app purchases
5. **Testing**: Add unit and integration tests
6. **Deployment**: Set up production environments

## Development Tips

- Use Expo Go app for quick mobile testing
- Use Prisma Studio to view database: `cd api && npm run db:studio`
- Check TypeScript errors: `npm run type-check` in each workspace
- Use the shared types from `@protocol/shared` for consistency

## Troubleshooting

**Mobile app won't start:**
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Database connection errors:**
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check Prisma schema matches your database

**Authentication not working:**
- Verify Supabase credentials
- Check OAuth redirect URLs in Supabase dashboard
- Ensure environment variables are set correctly

## Support

For issues or questions, please refer to the main README or create an issue in the repository.

