/**
 * Mock Data for Development
 * Comprehensive mock data for all pages and components
 */

import { ARCHETYPES, LANGUAGES, DIFFICULTY_LEVELS, SKILL_LEVELS } from './constants';

// Mock User Data
export const mockUser = {
  id: 'user-1',
  email: 'student@learnify.com',
  username: 'student',
  name: 'Alex Johnson',
  archetype: ARCHETYPES.BUILDER.name,
  domain: 'Tennis',
  skillLevel: SKILL_LEVELS.ANALYST.id,
  level: 12,
  xp: 3450,
  xpToNextLevel: 500,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  joinedDate: '2024-01-15',
  badges: [
    { id: 'badge-1', name: 'First Steps', icon: '🎯', earned: true },
    { id: 'badge-2', name: 'Code Warrior', icon: '⚔️', earned: true },
    { id: 'badge-3', name: 'Problem Solver', icon: '🧩', earned: false },
  ],
  preferences: {
    theme: 'light',
    notifications: true,
    emailUpdates: false,
  },
};

// Mock Stats
export const mockStats = {
  coursesEnrolled: 3,
  coursesCompleted: 1,
  exercisesSolved: 47,
  overallProgress: 68,
  totalXP: 3450,
  streak: 7,
  hoursLearned: 23,
};

// Mock Courses
export const mockCourses = [
  {
    id: 'course-1',
    title: 'The Tennis Data Architect',
    description: 'Build a system to track, analyze, and optimize your tennis game using code.',
    language: LANGUAGES.PYTHON.value,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE.value,
    progress: 65,
    thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    instructor: 'AI Architect',
    duration: '8 weeks',
    moduleCount: 12,
    studentCount: 1234,
    rating: 4.8,
    ratingCount: 342,
    status: 'in_progress',
    nextLesson: {
      id: 'lesson-3',
      title: 'Module 3: Building Your First Query Engine',
      type: 'video',
    },
    tags: ['Data Structures', 'Python', 'System Design'],
  },
  {
    id: 'course-2',
    title: 'SQL Fundamentals',
    description: 'Master database queries through hands-on exercises.',
    language: LANGUAGES.PYTHON.value,
    difficulty: DIFFICULTY_LEVELS.BEGINNER.value,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
    instructor: 'Database Expert',
    duration: '4 weeks',
    moduleCount: 8,
    studentCount: 5678,
    rating: 4.9,
    ratingCount: 891,
    status: 'not_started',
    tags: ['SQL', 'Database', 'Backend'],
  },
  {
    id: 'course-3',
    title: 'Advanced Algorithms',
    description: 'Deep dive into complex algorithms and optimization techniques.',
    language: LANGUAGES.GOLANG.value,
    difficulty: DIFFICULTY_LEVELS.ADVANCED.value,
    progress: 100,
    thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400',
    instructor: 'Algorithm Master',
    duration: '12 weeks',
    moduleCount: 16,
    studentCount: 892,
    rating: 4.7,
    ratingCount: 234,
    status: 'completed',
    completedDate: '2024-10-15',
    tags: ['Algorithms', 'Go', 'Performance'],
  },
];

// Mock Modules for a Course
export const mockModules = [
  {
    id: 'module-1',
    title: 'Module 1: The Atom',
    description: 'Defining your core data structures',
    order: 1,
    isUnlocked: true,
    progress: 100,
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Introduction to Data Structures',
        type: 'video',
        duration: '12:30',
        isCompleted: true,
        isUnlocked: true,
      },
      {
        id: 'lesson-1-2',
        title: 'Building Your First Class',
        type: 'reading',
        duration: '15 min',
        isCompleted: true,
        isUnlocked: true,
      },
      {
        id: 'lesson-1-3',
        title: 'Exercise: Create a Player Class',
        type: 'exercise',
        duration: '30 min',
        isCompleted: true,
        isUnlocked: true,
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2: The Standard',
    description: 'Quality control and validation',
    order: 2,
    isUnlocked: true,
    progress: 60,
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Data Validation Patterns',
        type: 'video',
        duration: '18:45',
        isCompleted: true,
        isUnlocked: true,
      },
      {
        id: 'lesson-2-2',
        title: 'Building Validators',
        type: 'exercise',
        duration: '45 min',
        isCompleted: false,
        isUnlocked: true,
      },
      {
        id: 'lesson-2-3',
        title: 'The Flaw: Debug Bad Validation',
        type: 'diagnosis',
        duration: '60 min',
        isCompleted: false,
        isUnlocked: true,
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3: The Query Engine',
    description: 'Search and filter your data',
    order: 3,
    isUnlocked: false,
    progress: 0,
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Introduction to Queries',
        type: 'video',
        duration: '20:00',
        isCompleted: false,
        isUnlocked: false,
      },
    ],
  },
];

// Mock Lesson Data
export const mockLesson = {
  id: 'lesson-1-1',
  title: 'Introduction to Data Structures',
  type: 'video',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
  duration: '12:30',
  description: 'Learn the fundamental concepts of data structures and why they matter.',
  content: `
    <h2>What are Data Structures?</h2>
    <p>Data structures are ways of organizing and storing data so that they can be accessed and modified efficiently.</p>
    <p>In this lesson, you'll learn:</p>
    <ul>
      <li>Why data structures matter</li>
      <li>Common types of data structures</li>
      <li>How to choose the right structure for your problem</li>
    </ul>
  `,
  readTime: '10 min',
  author: 'AI Architect',
  previousId: null,
  nextId: 'lesson-1-2',
};

// Mock Exercise Data
export const mockExercise = {
  id: 'exercise-1',
  title: 'Create a Player Class',
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE.value,
  points: 100,
  description: `
    <h2>Challenge: Build a Player Class</h2>
    <p>Create a <code>Player</code> class that tracks a tennis player's statistics.</p>
    <h3>Requirements:</h3>
    <ul>
      <li>Store player name, rating, and match history</li>
      <li>Implement methods to add matches and calculate win rate</li>
      <li>Handle edge cases (empty history, invalid data)</li>
    </ul>
  `,
  examples: [
    {
      input: 'player = Player("Serena", 2000)\nplayer.add_match(won=True)',
      output: 'Win rate: 100%',
    },
    {
      input: 'player = Player("Roger", 1950)\nplayer.add_match(won=False)',
      output: 'Win rate: 0%',
    },
  ],
  starterCode: `class Player:
    def __init__(self, name, rating):
        # Your code here
        pass

    def add_match(self, won):
        # Your code here
        pass

    def get_win_rate(self):
        # Your code here
        pass
`,
  testCases: [
    {
      name: 'Test Case 1: Create Player',
      input: ['Serena', 2000],
      expected: 'Player object created',
      status: 'pending',
    },
    {
      name: 'Test Case 2: Add Win',
      input: ['add_match', true],
      expected: 'Win rate: 100%',
      status: 'pending',
    },
  ],
};

// Mock Activity Feed
export const mockActivityFeed = [
  {
    id: 'activity-1',
    user: {
      id: 'user-2',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    type: 'completed_course',
    course: {
      id: 'course-3',
      title: 'Advanced Algorithms',
    },
    timestamp: '2024-11-20T14:30:00Z',
    message: 'completed Advanced Algorithms',
  },
  {
    id: 'activity-2',
    user: {
      id: 'user-3',
      name: 'Mike Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    type: 'earned_badge',
    badge: {
      id: 'badge-4',
      name: '100 Day Streak',
      icon: '🔥',
    },
    timestamp: '2024-11-20T12:15:00Z',
    message: 'earned 100 Day Streak badge',
  },
  {
    id: 'activity-3',
    user: {
      id: 'user-4',
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
    type: 'solved_exercise',
    exercise: {
      id: 'exercise-5',
      title: 'Binary Search Tree',
    },
    timestamp: '2024-11-20T10:00:00Z',
    message: 'solved Binary Search Tree',
  },
];

// Mock Recommendations
export const mockRecommendations = [
  {
    id: 'rec-1',
    course: mockCourses[1],
    reason: 'Based on your interest in Python',
    matchScore: 95,
  },
  {
    id: 'rec-2',
    course: {
      id: 'course-4',
      title: 'Machine Learning Basics',
      description: 'Introduction to ML concepts and algorithms',
      language: LANGUAGES.PYTHON.value,
      difficulty: DIFFICULTY_LEVELS.INTERMEDIATE.value,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
      rating: 4.6,
      studentCount: 3421,
    },
    reason: 'Popular with The Builder archetype',
    matchScore: 88,
  },
];

// Mock Categories with Courses
export const mockCategories = [
  {
    id: 'data-structures',
    name: 'Data Structures',
    courses: [mockCourses[0], mockCourses[1]],
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    courses: [mockCourses[2]],
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    courses: [
      {
        id: 'course-5',
        title: 'Full Stack Development',
        description: 'Build complete web applications from scratch',
        language: LANGUAGES.JAVASCRIPT.value,
        difficulty: DIFFICULTY_LEVELS.INTERMEDIATE.value,
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400',
        rating: 4.7,
        studentCount: 2341,
        moduleCount: 14,
        duration: '10 weeks',
        tags: ['React', 'Node.js', 'MongoDB'],
      },
    ],
  },
];

// Mock Friends (Extended for Social Page)
export const mockFriends = [
  {
    id: 'user-2',
    name: 'Sarah Chen',
    username: 'schen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    archetype: 'The Builder',
    level: 15,
    currentCourse: { title: 'Advanced Algorithms', progress: 75 },
    stats: { coursesCompleted: 8, level: 15 },
    status: 'online',
    isFollowing: true,
  },
  {
    id: 'user-3',
    name: 'Mike Rodriguez',
    username: 'mrodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    archetype: 'The Allocator',
    level: 8,
    currentCourse: { title: 'SQL Fundamentals', progress: 45 },
    stats: { coursesCompleted: 3, level: 8 },
    status: 'offline',
    isFollowing: true,
  },
  {
    id: 'user-4',
    name: 'Emma Wilson',
    username: 'ewilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    archetype: 'The Composer',
    level: 12,
    currentCourse: { title: 'System Design Patterns', progress: 60 },
    stats: { coursesCompleted: 6, level: 12 },
    status: 'online',
    isFollowing: true,
  },
  {
    id: 'user-5',
    name: 'Jordan Lee',
    username: 'jlee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    archetype: 'The Strategist',
    level: 14,
    currentCourse: { title: 'Machine Learning Basics', progress: 80 },
    stats: { coursesCompleted: 7, level: 14 },
    status: 'online',
    isFollowing: false,
  },
  {
    id: 'user-6',
    name: 'Taylor Swift',
    username: 'tswift',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
    archetype: 'The Optimizer',
    level: 11,
    currentCourse: { title: 'Database Fundamentals', progress: 50 },
    stats: { coursesCompleted: 5, level: 11 },
    status: 'away',
    isFollowing: false,
  },
  {
    id: 'user-7',
    name: 'Morgan Blake',
    username: 'mblake',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
    archetype: 'The Builder',
    level: 9,
    currentCourse: { title: 'React Advanced Patterns', progress: 35 },
    stats: { coursesCompleted: 4, level: 9 },
    status: 'offline',
    isFollowing: false,
  },
  {
    id: 'user-8',
    name: 'Alex Kim',
    username: 'akim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    archetype: 'The Allocator',
    level: 16,
    currentCourse: { title: 'Blockchain Development', progress: 90 },
    stats: { coursesCompleted: 10, level: 16 },
    status: 'online',
    isFollowing: true,
  },
  {
    id: 'user-9',
    name: 'Casey Morgan',
    username: 'cmorgan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
    archetype: 'The Composer',
    level: 10,
    currentCourse: { title: 'UX Design Principles', progress: 40 },
    stats: { coursesCompleted: 5, level: 10 },
    status: 'online',
    isFollowing: false,
  },
  {
    id: 'user-10',
    name: 'Riley Johnson',
    username: 'rjohnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley',
    archetype: 'The Strategist',
    level: 13,
    currentCourse: { title: 'Game Theory & Algorithms', progress: 70 },
    stats: { coursesCompleted: 7, level: 13 },
    status: 'away',
    isFollowing: true,
  },
  {
    id: 'user-11',
    name: 'Sam Parker',
    username: 'sparker',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    archetype: 'The Optimizer',
    level: 7,
    currentCourse: { title: 'Performance Optimization', progress: 25 },
    stats: { coursesCompleted: 2, level: 7 },
    status: 'offline',
    isFollowing: false,
  },
  {
    id: 'user-12',
    name: 'Drew Martinez',
    username: 'dmartinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Drew',
    archetype: 'The Builder',
    level: 15,
    currentCourse: { title: 'Kubernetes & DevOps', progress: 85 },
    stats: { coursesCompleted: 9, level: 15 },
    status: 'online',
    isFollowing: true,
  },
  {
    id: 'user-13',
    name: 'Avery Thompson',
    username: 'athompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avery',
    archetype: 'The Allocator',
    level: 12,
    currentCourse: { title: 'Quantitative Finance', progress: 55 },
    stats: { coursesCompleted: 6, level: 12 },
    status: 'online',
    isFollowing: false,
  },
  {
    id: 'user-14',
    name: 'Quinn Davis',
    username: 'qdavis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn',
    archetype: 'The Composer',
    level: 8,
    currentCourse: { title: 'Creative Coding', progress: 30 },
    stats: { coursesCompleted: 3, level: 8 },
    status: 'away',
    isFollowing: false,
  },
  {
    id: 'user-15',
    name: 'Reese Anderson',
    username: 'randerson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reese',
    archetype: 'The Strategist',
    level: 11,
    currentCourse: { title: 'Business Strategy & Tech', progress: 65 },
    stats: { coursesCompleted: 5, level: 11 },
    status: 'online',
    isFollowing: false,
  },
];

export default {
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
};
