/**
 * Application Constants
 * Central configuration for the entire application
 */

// API Base URL (will be replaced with actual backend URL in production)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Archetype Categories
export const ARCHETYPES = {
  BUILDER: {
    id: 'digital',
    name: 'THE_BUILDER',
    title: 'Digital Systems',
    subtitle: 'The Builder',
    description: 'Build tools that work while you sleep. Master software, AI agents, and automation.',
    examples: ['Software', 'AI Agents', 'Security'],
    color: 'blue',
  },
  ALLOCATOR: {
    id: 'economic',
    name: 'THE_ALLOCATOR',
    title: 'Economic Systems',
    subtitle: 'The Allocator',
    description: 'Understand how value moves and capture it. Master trading, investing, and venture capital.',
    examples: ['Trading', 'DeFi', 'Venture'],
    color: 'green',
  },
  COMPOSER: {
    id: 'aesthetic',
    name: 'THE_COMPOSER',
    title: 'Aesthetic Systems',
    subtitle: 'The Composer',
    description: 'Curate experiences that move people. Master music, design, and storytelling.',
    examples: ['Music', 'Design', 'Games'],
    color: 'orange',
  },
  OPTIMIZER: {
    id: 'biological',
    name: 'THE_OPTIMIZER',
    title: 'Biological Systems',
    subtitle: 'The Optimizer',
    description: 'Optimize your physical vessel. Master nutrition, training, and biohacking.',
    examples: ['Nutrition', 'Training', 'Nature'],
    color: 'error',
  },
  STRATEGIST: {
    id: 'cognitive',
    name: 'THE_STRATEGIST',
    title: 'Cognitive Systems',
    subtitle: 'The Strategist',
    description: 'Master your mind and influence others. Learn strategy, persuasion, and focus.',
    examples: ['Strategy', 'Persuasion', 'Focus'],
    color: 'blue',
  },
};

// Programming Languages
export const LANGUAGES = {
  PYTHON: { value: 'python', label: 'Python', extension: '.py' },
  GOLANG: { value: 'golang', label: 'Go', extension: '.go' },
  JAVA: { value: 'java', label: 'Java', extension: '.java' },
  JAVASCRIPT: { value: 'javascript', label: 'JavaScript', extension: '.js' },
  TYPESCRIPT: { value: 'typescript', label: 'TypeScript', extension: '.ts' },
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: { value: 'beginner', label: 'Beginner', color: 'green' },
  INTERMEDIATE: { value: 'intermediate', label: 'Intermediate', color: 'blue' },
  ADVANCED: { value: 'advanced', label: 'Advanced', color: 'orange' },
  EXPERT: { value: 'expert', label: 'Expert', color: 'error' },
};

// Skill Levels for Onboarding
export const SKILL_LEVELS = {
  NOVICE: {
    id: 'novice',
    title: 'Intuition',
    description: 'I just guess and learn by doing',
    startModule: 1,
  },
  ANALYST: {
    id: 'analyst',
    title: 'Spreadsheets',
    description: 'I use Excel or Google Sheets',
    startModule: 3,
  },
  QUANT: {
    id: 'quant',
    title: 'Scripts',
    description: 'I write code or use APIs',
    startModule: 5,
  },
};

// Course Categories
export const COURSE_CATEGORIES = {
  DATA_STRUCTURES: { id: 'data-structures', name: 'Data Structures', icon: 'Database' },
  ALGORITHMS: { id: 'algorithms', name: 'Algorithms', icon: 'Cpu' },
  WEB_DEVELOPMENT: { id: 'web-dev', name: 'Web Development', icon: 'Globe' },
  SYSTEM_DESIGN: { id: 'system-design', name: 'System Design', icon: 'Box' },
  DATABASE: { id: 'database', name: 'Databases', icon: 'Database' },
  SECURITY: { id: 'security', name: 'Security', icon: 'Shield' },
};

// Module Types
export const MODULE_TYPES = {
  LESSON: 'lesson',
  EXERCISE: 'exercise',
  PROJECT: 'project',
  QUIZ: 'quiz',
  DIAGNOSIS: 'diagnosis',
};

// Lesson Types
export const LESSON_TYPES = {
  VIDEO: 'video',
  READING: 'reading',
  EXERCISE: 'exercise',
  INTERACTIVE: 'interactive',
};

// Exercise Statuses
export const EXERCISE_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed',
  ERROR: 'error',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:courseId',
  LESSON: '/courses/:courseId/lessons/:lessonId',
  EXERCISE: '/exercises/:exerciseId',
  DIAGNOSIS: '/diagnosis/:moduleId',
  SOCIAL: '/social',
  SOCIAL_DISCOVER: '/social/discover',
  PROFILE: '/profile/:userId',
  SETTINGS: '/settings',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'learnify_auth_token',
  USER: 'learnify_user',
  THEME: 'learnify_theme',
  ONBOARDING_COMPLETE: 'learnify_onboarding_complete',
};

// API Endpoints (matching backend routes)
export const API_ENDPOINTS = {
  // Auth (Public)
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',

  // Identity/User Management (Protected)
  ME: '/users/me',
  UPDATE_PROFILE: '/users/me',
  COMPLETE_ONBOARDING: '/onboarding/complete',

  // Learning/Courses (Protected)
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  COURSE_PROGRESS: '/courses/:id/progress',
  ENROLL_COURSE: '/courses/:id/enroll',

  // Exercises (Protected)
  EXERCISE_DETAIL: '/exercises/:id',
  SUBMIT_EXERCISE: '/exercises/:id/submit',
  REQUEST_REVIEW: '/submissions/:id/review',

  // Social/Activity Feed (Protected)
  FEED: '/feed',
  FOLLOW_USER: '/users/:id/follow',
  UNFOLLOW_USER: '/users/:id/follow',
  RECOMMENDATIONS: '/recommendations',
  USER_PROFILE: '/users/:id/profile',
  ACHIEVEMENTS: '/users/me/achievements',
  FRIEND_SUGGESTIONS: '/friends/suggestions',
  SEARCH_USERS: '/users/search',
  SEND_FRIEND_REQUEST: '/friends/request/:id',
  ACCEPT_FRIEND_REQUEST: '/friends/accept/:id',

  // Public routes
  TRENDING: '/trending',
};

// Default Values
export const DEFAULTS = {
  COURSES_PER_PAGE: 12,
  ACTIVITIES_PER_PAGE: 20,
  RECOMMENDATIONS_LIMIT: 6,
  CODE_EXECUTION_TIMEOUT: 30000, // 30 seconds
  DEBOUNCE_DELAY: 300,
};

export default {
  API_BASE_URL,
  ARCHETYPES,
  LANGUAGES,
  DIFFICULTY_LEVELS,
  SKILL_LEVELS,
  COURSE_CATEGORIES,
  MODULE_TYPES,
  LESSON_TYPES,
  EXERCISE_STATUS,
  ROUTES,
  STORAGE_KEYS,
  API_ENDPOINTS,
  DEFAULTS,
};
