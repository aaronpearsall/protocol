# Protocol - CrossFit Fitness App

A comprehensive CrossFit fitness application with consumer mobile app and coach web dashboard.

## 🚀 Want to Preview the App?

**👉 [START HERE - Preview Guide](./START_HERE.md)** 👈

This will show you how to run the app in your browser or on your phone in just a few minutes!

## Project Structure

```
protocol/
├── mobile/          # React Native mobile app (iOS/Android)
├── coach-web/       # Next.js web app for coaches
├── api/             # Backend API (shared)
├── shared/          # Shared types and utilities
└── docs/            # Documentation
```

## Features

### Consumer Mobile App
- **Today Tab**: Calendar view with WODs (Workouts of the Day)
- **Community Tab**: Events and forum discussions
- **My Account Tab**: User profile and settings
- **Workout Tracking**: Log scores, track progress, view history
- **Logbook**: Complete history of all lifts and movements
- **Social**: Share workouts to Strava

### Coach Web App
- **Workout Builder**: Create workouts with KPIs and scaling options
- **Exercise Library**: Manage exercises with videos and descriptions
- **Video Upload**: Add workout explanation videos
- **Programming**: Set men's/women's weights and KPIs

## Tech Stack

- **Mobile**: React Native (Expo)
- **Web**: Next.js 14 (App Router)
- **Database**: PostgreSQL (via Prisma)
- **Auth**: Supabase Auth (Google, Apple, Facebook, Email)
- **Styling**: Tailwind CSS / React Native StyleSheet
- **Subscriptions**: RevenueCat (for in-app purchases)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up database (create PostgreSQL database first)
cd api
npm run db:migrate
npm run db:generate

# 3. Configure environment variables
# See SETUP.md for detailed instructions

# 4. Start development servers
# Mobile app
cd mobile && npm start

# Coach web app (in another terminal)
cd coach-web && npm run dev

# API server (optional, in another terminal)
cd api && npm run dev
```

## Getting Started

See [SETUP.md](./SETUP.md) for detailed setup instructions including:
- Database configuration
- Supabase authentication setup
- Environment variables
- OAuth provider configuration

See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for a complete feature overview.

## Color Scheme

- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Green (#00FF00 / #10B981)

## License

Proprietary - All rights reserved
