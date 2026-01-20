/**
 * API Service Layer
 * Centralized API client for making requests to the Protocol backend
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = 'GET', headers = {}, body } = options;

    const url = `${this.baseUrl}${endpoint}`;
    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (this.authToken) {
      requestHeaders['Authorization'] = `Bearer ${this.authToken}`;
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new Error(error.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  // Workout endpoints
  async getWorkouts(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/api/workouts${query}`);
  }

  async getWorkoutById(id: string) {
    return this.request(`/api/workouts/${id}`);
  }

  async getWorkoutByDate(date: string) {
    return this.request(`/api/workouts/date/${date}`);
  }

  // Exercise endpoints
  async getExercises() {
    return this.request('/api/exercises');
  }

  async getExerciseById(id: string) {
    return this.request(`/api/exercises/${id}`);
  }

  // Logbook endpoints
  async getLogbookEntries(filters?: {
    exerciseId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.exerciseId) params.append('exerciseId', filters.exerciseId);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/api/logbook${query}`);
  }

  async createLogbookEntry(entry: {
    workoutId?: string;
    exerciseId: string;
    date: string;
    reps?: number;
    sets?: number;
    weight?: number;
    duration?: number;
    distance?: number;
    calories?: number;
    score?: string;
    notes?: string;
  }) {
    return this.request('/api/logbook', {
      method: 'POST',
      body: entry,
    });
  }

  // Community endpoints
  async getEvents() {
    return this.request('/api/community/events');
  }

  async getEventById(id: string) {
    return this.request(`/api/community/events/${id}`);
  }

  async registerForEvent(eventId: string) {
    return this.request(`/api/community/events/${eventId}/register`, {
      method: 'POST',
    });
  }

  async getForumPosts(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request(`/api/community/forum${query}`);
  }

  async createForumPost(post: {
    title: string;
    content: string;
    category: string;
  }) {
    return this.request('/api/community/forum', {
      method: 'POST',
      body: post,
    });
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/api/user/profile');
  }

  async updateUserProfile(updates: {
    name?: string;
    avatar?: string;
  }) {
    return this.request('/api/user/profile', {
      method: 'PATCH',
      body: updates,
    });
  }

  async getSubscriptionStatus() {
    return this.request('/api/user/subscription');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
