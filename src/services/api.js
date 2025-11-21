/**
 * API Service Layer
 * Handles all HTTP requests to the backend
 * Mock implementation for development
 */

import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from '../config/constants';
import {
  mockUser,
  mockStats,
  mockCourses,
  mockModules,
  mockLesson,
  mockExercise,
  mockActivityFeed,
  mockRecommendations,
  mockCategories,
  mockFriends,
} from '../config/mockData';

// Simulate network delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

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

// Mock HTTP client
class MockApiClient {
  async get(url, options = {}) {
    await delay();
    console.log('GET', url, options);
    return this.mockResponse(url, 'GET');
  }

  async post(url, data, options = {}) {
    await delay();
    console.log('POST', url, data, options);
    return this.mockResponse(url, 'POST', data);
  }

  async patch(url, data, options = {}) {
    await delay();
    console.log('PATCH', url, data, options);
    return this.mockResponse(url, 'PATCH', data);
  }

  async delete(url, options = {}) {
    await delay();
    console.log('DELETE', url, options);
    return this.mockResponse(url, 'DELETE');
  }

  mockResponse(url, method, data = null) {
    // Auth endpoints
    if (url.includes('/auth/register')) {
      return {
        success: true,
        data: {
          user: mockUser,
          token: 'mock-jwt-token-' + Date.now(),
        },
        message: 'Registration successful',
      };
    }

    if (url.includes('/auth/login')) {
      return {
        success: true,
        data: {
          user: mockUser,
          token: 'mock-jwt-token-' + Date.now(),
        },
        message: 'Login successful',
      };
    }

    // User endpoints
    if (url.includes('/users/me') && method === 'GET') {
      return {
        success: true,
        data: mockUser,
      };
    }

    if (url.includes('/users/me') && method === 'PATCH') {
      return {
        success: true,
        data: { ...mockUser, ...data },
        message: 'Profile updated successfully',
      };
    }

    if (url.includes('/onboarding/complete')) {
      return {
        success: true,
        data: {
          user: { ...mockUser, onboardingCompleted: true },
          recommendedCourse: mockCourses[0],
        },
        message: 'Onboarding completed',
      };
    }

    // Course endpoints
    if (url.includes('/courses') && !url.match(/\/courses\/[\w-]+/)) {
      return {
        success: true,
        data: {
          courses: mockCourses,
          total: mockCourses.length,
          page: 1,
          perPage: 12,
        },
      };
    }

    if (url.match(/\/courses\/[\w-]+$/) && !url.includes('/progress')) {
      return {
        success: true,
        data: {
          ...mockCourses[0],
          modules: mockModules,
          syllabus: mockModules,
        },
      };
    }

    if (url.includes('/progress')) {
      return {
        success: true,
        data: {
          courseId: 'course-1',
          progress: 65,
          completedModules: 1,
          totalModules: 3,
          lastAccessedLesson: 'lesson-2-1',
        },
      };
    }

    // Exercise endpoints
    if (url.match(/\/exercises\/[\w-]+$/) && method === 'GET') {
      return {
        success: true,
        data: mockExercise,
      };
    }

    if (url.includes('/exercises') && url.includes('/submit')) {
      return {
        success: true,
        data: {
          submissionId: 'submission-' + Date.now(),
          status: 'passed',
          passedTests: 8,
          totalTests: 10,
          score: 80,
          feedback: 'Good work! Consider edge cases.',
          testResults: [
            {
              name: 'Test Case 1',
              passed: true,
              runtime: 12,
              message: 'Passed',
            },
            {
              name: 'Test Case 2',
              passed: false,
              runtime: 8,
              message: 'Expected 0 but got null',
            },
          ],
        },
        message: 'Exercise submitted successfully',
      };
    }

    if (url.includes('/submissions') && url.includes('/review')) {
      return {
        success: true,
        data: {
          reviewId: 'review-' + Date.now(),
          status: 'pending',
          estimatedTime: '2-3 minutes',
        },
        message: 'Review requested',
      };
    }

    // Social endpoints
    if (url.includes('/feed')) {
      return {
        success: true,
        data: {
          activities: mockActivityFeed,
          hasMore: false,
        },
      };
    }

    if (url.includes('/recommendations')) {
      return {
        success: true,
        data: {
          recommendations: mockRecommendations,
          categories: mockCategories,
        },
      };
    }

    if (url.includes('/follow') && method === 'POST') {
      return {
        success: true,
        message: 'User followed successfully',
      };
    }

    if (url.includes('/follow') && method === 'DELETE') {
      return {
        success: true,
        message: 'User unfollowed successfully',
      };
    }

    if (url.match(/\/users\/[\w-]+\/profile/)) {
      return {
        success: true,
        data: {
          ...mockUser,
          id: url.match(/\/users\/([\w-]+)\//)[1],
          courses: mockCourses.slice(0, 2),
          badges: mockUser.badges,
          friends: mockFriends,
        },
      };
    }

    if (url.includes('/achievements')) {
      return {
        success: true,
        data: {
          achievements: mockUser.badges,
          recentlyEarned: mockUser.badges.filter((b) => b.earned),
          progress: {
            total: 50,
            earned: 2,
            remaining: 48,
          },
        },
      };
    }

    // Trending
    if (url.includes('/trending')) {
      return {
        success: true,
        data: {
          trending: mockCourses.slice(0, 6),
        },
      };
    }

    // Default response
    return {
      success: false,
      error: 'Endpoint not found',
      message: 'Mock endpoint not implemented',
    };
  }
}

const apiClient = new MockApiClient();

// API Service Methods
export const api = {
  // Auth
  register: async (email, password, username) => {
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
  },

  login: async (email, password) => {
    const response = await apiClient.post(buildUrl(API_ENDPOINTS.LOGIN), {
      email,
      password,
    });
    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
    }
    return response;
  },

  logout: () => {
    removeAuthToken();
  },

  // User/Identity
  getProfile: async () => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.ME));
  },

  updateProfile: async (data) => {
    return await apiClient.patch(buildUrl(API_ENDPOINTS.UPDATE_PROFILE), data);
  },

  completeOnboarding: async (onboardingData) => {
    const response = await apiClient.post(buildUrl(API_ENDPOINTS.COMPLETE_ONBOARDING), onboardingData);
    if (response.success) {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
    }
    return response;
  },

  // Courses
  getCourses: async (filters = {}) => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.COURSES), { params: filters });
  },

  getCourseDetail: async (courseId) => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.COURSE_DETAIL, { id: courseId }));
  },

  getCourseProgress: async (courseId) => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.COURSE_PROGRESS, { id: courseId }));
  },

  // Exercises
  getExercise: async (exerciseId) => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.EXERCISE_DETAIL, { id: exerciseId }));
  },

  submitExercise: async (exerciseId, code, language) => {
    return await apiClient.post(buildUrl(API_ENDPOINTS.SUBMIT_EXERCISE, { id: exerciseId }), {
      code,
      language,
    });
  },

  requestReview: async (submissionId) => {
    return await apiClient.post(buildUrl(API_ENDPOINTS.REQUEST_REVIEW, { id: submissionId }));
  },

  // Social
  getFeed: async (page = 1, limit = 20) => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.FEED), {
      params: { page, limit },
    });
  },

  getRecommendations: async () => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.RECOMMENDATIONS));
  },

  followUser: async (userId) => {
    return await apiClient.post(buildUrl(API_ENDPOINTS.FOLLOW_USER, { id: userId }));
  },

  unfollowUser: async (userId) => {
    return await apiClient.delete(buildUrl(API_ENDPOINTS.UNFOLLOW_USER, { id: userId }));
  },

  getUserProfile: async (userId) => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.USER_PROFILE, { id: userId }));
  },

  getAchievements: async () => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.ACHIEVEMENTS));
  },

  // Public
  getTrending: async () => {
    return await apiClient.get(buildUrl(API_ENDPOINTS.TRENDING));
  },
};

export default api;
