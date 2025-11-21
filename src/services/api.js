/**
 * API Service Layer
 * Handles all HTTP requests to the backend
 * Real HTTP implementation for production
 */

import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from '../config/constants';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Build URL with params
const buildUrl = (endpoint, params = {}) => {
  let url = `${API_BASE_URL}${endpoint}`;
  Object.keys(params).forEach((key) => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
};

/**
 * API Error class for structured error handling
 */
class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * HTTP Client using native Fetch API
 * Handles authentication, error handling, and response parsing
 */
class HttpClient {
  async request(url, options = {}) {
    const token = getAuthToken();

    // Build headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Build fetch options
    const fetchOptions = {
      ...options,
      headers,
    };

    // Log request in development
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.log(`[API] ${options.method || 'GET'} ${url}`, {
        body: options.body ? JSON.parse(options.body) : null,
        headers,
      });
    }

    try {
      const response = await fetch(url, fetchOptions);

      // Log response in development
      if (import.meta.env.VITE_DEBUG === 'true') {
        console.log(`[API] Response ${response.status}`, url);
      }

      // Handle non-JSON responses (like 204 No Content)
      if (response.status === 204) {
        return { success: true };
      }

      // Parse JSON response
      const data = await response.json();

      // Handle error responses
      if (!response.ok) {
        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
          removeAuthToken();
          // Optionally redirect to login
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }

        // Throw structured error
        throw new ApiError(
          data.message || data.error || `HTTP ${response.status}`,
          response.status,
          data
        );
      }

      // Return successful response
      // Backend returns different formats, normalize to { success: true, data: ... }
      if (data.token && data.user) {
        // Auth responses
        return { success: true, data, message: 'Success' };
      }

      // Most responses - wrap in success structure
      return { success: true, data, message: data.message || 'Success' };

    } catch (error) {
      // Handle network errors (no response)
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or parsing errors
      console.error(`[API] Error: ${error.message}`, url);
      throw new ApiError(
        'Network error. Please check your connection.',
        0,
        { originalError: error.message }
      );
    }
  }

  async get(url, options = {}) {
    return this.request(url, {
      ...options,
      method: 'GET',
    });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(url, options = {}) {
    return this.request(url, {
      ...options,
      method: 'DELETE',
    });
  }
}

// Create singleton instance
const apiClient = new HttpClient();

/**
 * API Service Methods
 * High-level API functions used throughout the application
 */
export const api = {
  // Auth
  register: async (email, password, username) => {
    try {
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.REGISTER), {
        email,
        password,
        username,
      });

      if (response.success && response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: error.message,
      };
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.LOGIN), {
        email,
        password,
      });

      if (response.success && response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: error.message,
      };
    }
  },

  logout: () => {
    removeAuthToken();
  },

  // User/Identity
  getProfile: async () => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.ME));
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  updateProfile: async (data) => {
    try {
      return await apiClient.patch(buildUrl(API_ENDPOINTS.UPDATE_PROFILE), data);
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  completeOnboarding: async (onboardingData) => {
    try {
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.COMPLETE_ONBOARDING), onboardingData);

      if (response.success) {
        localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Courses
  getCourses: async (filters = {}) => {
    try {
      const url = buildUrl(API_ENDPOINTS.COURSES);
      // Add query params if provided
      const queryParams = new URLSearchParams(filters).toString();
      const fullUrl = queryParams ? `${url}?${queryParams}` : url;

      return await apiClient.get(fullUrl);
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: { courses: [], total: 0 },
      };
    }
  },

  getCourseDetail: async (courseId) => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.COURSE_DETAIL, { id: courseId }));
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  getCourseProgress: async (courseId) => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.COURSE_PROGRESS, { id: courseId }));
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: { progress: 0, completedModules: 0, totalModules: 0 },
      };
    }
  },

  // Exercises
  getExercise: async (exerciseId) => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.EXERCISE_DETAIL, { id: exerciseId }));
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  submitExercise: async (exerciseId, code, language) => {
    try {
      return await apiClient.post(buildUrl(API_ENDPOINTS.SUBMIT_EXERCISE, { id: exerciseId }), {
        code,
        language,
      });
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to submit exercise',
      };
    }
  },

  requestReview: async (submissionId) => {
    try {
      return await apiClient.post(buildUrl(API_ENDPOINTS.REQUEST_REVIEW, { id: submissionId }));
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Social
  getFeed: async (page = 1, limit = 20) => {
    try {
      const url = buildUrl(API_ENDPOINTS.FEED);
      const queryParams = new URLSearchParams({ page, limit }).toString();

      return await apiClient.get(`${url}?${queryParams}`);
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: { activities: [], hasMore: false },
      };
    }
  },

  getRecommendations: async () => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.RECOMMENDATIONS));
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: { recommendations: [], categories: [] },
      };
    }
  },

  followUser: async (userId) => {
    try {
      return await apiClient.post(buildUrl(API_ENDPOINTS.FOLLOW_USER, { id: userId }));
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  unfollowUser: async (userId) => {
    try {
      return await apiClient.delete(buildUrl(API_ENDPOINTS.UNFOLLOW_USER, { id: userId }));
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  getUserProfile: async (userId) => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.USER_PROFILE, { id: userId }));
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  getAchievements: async () => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.ACHIEVEMENTS));
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: { achievements: [], recentlyEarned: [], progress: { total: 0, earned: 0 } },
      };
    }
  },

  // Public
  getTrending: async () => {
    try {
      return await apiClient.get(buildUrl(API_ENDPOINTS.TRENDING));
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: { trending: [] },
      };
    }
  },
};

export default api;
