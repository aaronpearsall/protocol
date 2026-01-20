/**
 * Environment Configuration
 * Centralized environment variable management
 */

export const config = {
  api: {
    url: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001',
  },
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  app: {
    name: 'Protocol',
    version: '1.0.0',
  },
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
};
