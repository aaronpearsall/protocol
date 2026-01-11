// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscriptionStatus: 'active' | 'expired' | 'trial' | 'none';
  subscriptionExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Exercise Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  category: 'strength' | 'cardio' | 'gymnastics' | 'olympic' | 'other';
  coachNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Workout Types
export interface WorkoutSection {
  id: string;
  name: string;
  type: 'warmup' | 'main' | 'accessory' | 'cooldown';
  exercises: WorkoutExercise[];
  order: number;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  reps?: number;
  sets?: number;
  weightMen?: number;
  weightWomen?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  calories?: number;
  kpi?: string; // Key Performance Indicator
  scalingOptions?: ScalingOption[];
  order: number;
}

export interface ScalingOption {
  id: string;
  name: string;
  description: string;
  reps?: number;
  sets?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

export interface Workout {
  id: string;
  date: Date;
  name: string;
  description: string;
  videoUrl?: string;
  sections: WorkoutSection[];
  coachNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Logbook Types
export interface LogbookEntry {
  id: string;
  userId: string;
  workoutId?: string;
  exerciseId: string;
  exercise: Exercise;
  date: Date;
  reps?: number;
  sets?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  calories?: number;
  score?: string; // Custom score for the workout
  notes?: string;
  createdAt: Date;
}

// Community Types
export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  location?: string;
  imageUrl?: string;
  maxParticipants?: number;
  registeredUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumPost {
  id: string;
  userId: string;
  user: User;
  title: string;
  content: string;
  category: 'general' | 'workouts' | 'nutrition' | 'events' | 'other';
  replies: ForumReply[];
  likes: string[]; // User IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  plan: 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  platform: 'ios' | 'android' | 'web';
  transactionId?: string;
}

