# Protocol - Project Summary

## Overview

Protocol is a comprehensive CrossFit fitness application with a consumer mobile app (iOS/Android) and a coach web dashboard. The app enables athletes to track workouts, log progress, and engage with the community, while coaches can program workouts, manage exercises, and upload instructional videos.

## Architecture

### Tech Stack

- **Mobile App**: React Native with Expo
- **Coach Web**: Next.js 14 (App Router)
- **Backend API**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth (Google, Apple, Facebook, Email)
- **Styling**: Tailwind CSS (web), StyleSheet (mobile)
- **State Management**: React Context API
- **File Storage**: AWS S3 (for videos)

### Project Structure

```
protocol/
├── mobile/              # React Native mobile app
│   ├── app/            # Expo Router pages
│   │   ├── (tabs)/     # Main navigation tabs
│   │   ├── auth/       # Authentication screens
│   │   └── workout/    # Workout detail screens
│   └── contexts/       # React contexts (Auth, etc.)
├── coach-web/          # Next.js web app
│   └── app/            # Next.js App Router pages
├── api/                # Backend API server
│   ├── prisma/         # Database schema
│   └── src/            # API routes and logic
├── shared/             # Shared code
│   ├── types/          # TypeScript types
│   └── constants/      # Shared constants (colors, etc.)
└── docs/               # Documentation
```

## Features Implemented

### Mobile App (Consumer)

✅ **Today Tab**
- Calendar view showing workouts by date
- Workout preview before starting
- Start workout functionality
- Display workout sections (warm-up, main, cooldown)

✅ **Workout Detail Screen**
- Full workout description
- Exercise details with men's/women's weights
- Scaling options display
- History button for each exercise
- Score input during active workout
- Copy workout description for Strava

✅ **Community Tab**
- Events section with registration
- Forum/discussion channel
- Tab navigation between events and forum

✅ **My Account Tab**
- User profile display
- Navigation to logbook
- Subscription management
- Settings and support

✅ **Logbook**
- Filter by exercise
- View all historical lifts
- Display weight, reps, sets, and dates
- Chronological tracking

✅ **Authentication**
- Email/password sign up and login
- Google OAuth (structure ready)
- Apple OAuth (structure ready)
- Facebook OAuth (structure ready)

### Coach Web App

✅ **Dashboard**
- Overview statistics
- Quick navigation to workouts, exercises, programming

✅ **Workout Builder**
- Create new workouts
- Set workout date and name
- Add multiple sections (warm-up, main, cooldown)
- Add exercises to sections
- Workout description field

✅ **Exercise Management**
- Add new exercises
- Set exercise category
- Add description and coach notes
- Upload exercise videos
- Manage exercise library

## Database Schema

The Prisma schema includes:

- **User**: Authentication and subscription info
- **Exercise**: Exercise library with videos and descriptions
- **Workout**: Daily workouts with date
- **WorkoutSection**: Sections within workouts
- **WorkoutExercise**: Exercises within sections with KPIs and weights
- **ScalingOption**: Scaling variations for exercises
- **LogbookEntry**: User workout and lift history
- **Event**: Community events
- **EventRegistration**: User event registrations
- **ForumPost**: Forum discussions
- **ForumReply**: Forum replies
- **Subscription**: User subscription tracking

## Design System

### Color Scheme
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Green (#10B981)

### Typography
- Headers: Bold, large sizes
- Body: Regular weight, readable sizes
- Accents: Green for highlights and CTAs

## Next Steps / TODO

### High Priority
1. **API Integration**: Connect mobile and web apps to backend API
2. **OAuth Implementation**: Complete Google, Apple, Facebook OAuth flows
3. **Video Upload**: Implement S3 file upload for workout and exercise videos
4. **Subscription System**: Integrate RevenueCat or similar for in-app purchases
5. **Workout Builder Enhancement**: Add KPI input, weight presets, exercise selection

### Medium Priority
6. **Exercise History Screen**: Build detailed history view for individual exercises
7. **Forum Functionality**: Implement posting, replying, liking
8. **Event Management**: Full event creation and registration flow
9. **Workout Video Player**: Video playback in mobile app
10. **Search Functionality**: Search workouts, exercises, logbook entries

### Low Priority
11. **Push Notifications**: Daily workout reminders
12. **Social Features**: Share workouts, follow athletes
13. **Analytics**: Track user engagement and workout completion
14. **Offline Support**: Cache workouts for offline viewing
15. **Dark/Light Mode**: Theme switching (currently dark only)

## Development Status

### Completed ✅
- Project structure and setup
- Database schema design
- Mobile app UI screens
- Coach web app UI screens
- Authentication structure
- Type definitions
- Color scheme and design system

### In Progress 🚧
- API endpoint implementation
- OAuth integration
- File upload system

### Not Started ⏳
- Subscription integration
- Video playback
- Advanced features

## Getting Started

See [SETUP.md](./SETUP.md) for detailed setup instructions.

Quick start:
```bash
# Install dependencies
npm install

# Set up database
cd api && npm run db:migrate

# Start mobile app
cd mobile && npm start

# Start coach web app
cd coach-web && npm run dev
```

## Notes

- The app uses a monorepo structure with npm workspaces
- Shared types ensure consistency between mobile and web
- Prisma provides type-safe database access
- Supabase handles authentication and can be extended for real-time features
- The design follows a black/white/green color scheme as specified

## License

Proprietary - All rights reserved

