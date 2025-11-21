/**
 * Mock User Data
 *
 * Diverse user profiles representing different subscription tiers,
 * enrollment states, and demographic backgrounds.
 *
 * User Distribution:
 * - 2 free tier users (3 course limit)
 * - 2 plus tier users (10 course limit)
 * - 1 pro tier user (unlimited courses)
 * - Various enrollment states (0, 1, 3, 5+ courses)
 * - Diverse interests and demographics
 */

export const MOCK_USERS = [
  {
    id: 'user-1',
    email: 'alice.johnson@techcorp.com',
    name: 'Alice Johnson',
    avatarUrl: null,
    subscriptionTier: 'plus',
    coursesUsedThisMonth: 5,
    courseLimit: 10,
    subscriptionRenewsOn: '2025-12-21',
    enrolledCourses: ['course-1', 'course-2', 'course-5', 'course-12', 'course-16'],
    completedCourses: ['course-3', 'course-6'],
    onboardingData: {
      learningGoal: 'career_growth',
      interests: ['Programming & Software Engineering', 'Data Science & AI', 'DevOps & Cloud'],
      ageGroup: 'professional',
      timeCommitment: 6,
      learningStyle: 'hands-on'
    },
    privacySettings: {
      profileVisibility: 'friends',
      courseVisibility: 'friends',
      activityVisibility: 'public'
    },
    createdAt: '2025-01-10T08:30:00Z',
    lastLogin: '2025-11-21T09:15:00Z'
  },
  {
    id: 'user-2',
    email: 'marcus.chen@startup.io',
    name: 'Marcus Chen',
    avatarUrl: null,
    subscriptionTier: 'pro',
    coursesUsedThisMonth: 8,
    courseLimit: null, // unlimited
    subscriptionRenewsOn: '2026-01-15',
    enrolledCourses: ['course-9', 'course-6', 'course-7', 'course-8', 'course-15', 'course-16', 'course-4', 'course-11'],
    completedCourses: ['course-1', 'course-2', 'course-3', 'course-12', 'course-14'],
    onboardingData: {
      learningGoal: 'start_business',
      interests: ['Business & Entrepreneurship', 'Finance & Economics', 'Leadership & Management'],
      ageGroup: 'professional',
      timeCommitment: 10,
      learningStyle: 'practical'
    },
    privacySettings: {
      profileVisibility: 'public',
      courseVisibility: 'public',
      activityVisibility: 'public'
    },
    createdAt: '2024-11-05T14:20:00Z',
    lastLogin: '2025-11-21T10:45:00Z'
  },
  {
    id: 'user-3',
    email: 'sarah.martinez@university.edu',
    name: 'Sarah Martinez',
    avatarUrl: null,
    subscriptionTier: 'free',
    coursesUsedThisMonth: 2,
    courseLimit: 3,
    subscriptionRenewsOn: null, // free tier doesn't renew
    enrolledCourses: ['course-10', 'course-13'],
    completedCourses: ['course-17'],
    onboardingData: {
      learningGoal: 'academic',
      interests: ['Science & Nature', 'Languages & Culture', 'History & Humanities'],
      ageGroup: 'student',
      timeCommitment: 4,
      learningStyle: 'visual'
    },
    privacySettings: {
      profileVisibility: 'friends',
      courseVisibility: 'private',
      activityVisibility: 'friends'
    },
    createdAt: '2025-09-20T11:00:00Z',
    lastLogin: '2025-11-20T16:30:00Z'
  },
  {
    id: 'user-4',
    email: 'david.kim@designer.com',
    name: 'David Kim',
    avatarUrl: null,
    subscriptionTier: 'plus',
    coursesUsedThisMonth: 3,
    courseLimit: 10,
    subscriptionRenewsOn: '2025-12-05',
    enrolledCourses: ['course-14', 'course-16', 'course-13'],
    completedCourses: [],
    onboardingData: {
      learningGoal: 'new_skills',
      interests: ['Design & Creativity', 'Content & Marketing', 'Languages & Culture'],
      ageGroup: 'professional',
      timeCommitment: 5,
      learningStyle: 'project-based'
    },
    privacySettings: {
      profileVisibility: 'public',
      courseVisibility: 'friends',
      activityVisibility: 'public'
    },
    createdAt: '2025-06-12T09:45:00Z',
    lastLogin: '2025-11-21T08:20:00Z'
  },
  {
    id: 'user-5',
    email: 'priya.patel@finance.com',
    name: 'Priya Patel',
    avatarUrl: null,
    subscriptionTier: 'plus',
    coursesUsedThisMonth: 1,
    courseLimit: 10,
    subscriptionRenewsOn: '2026-01-20',
    enrolledCourses: ['course-3'],
    completedCourses: ['course-6', 'course-7', 'course-8'],
    onboardingData: {
      learningGoal: 'career_growth',
      interests: ['Finance & Economics', 'Data Science & AI', 'Business & Entrepreneurship'],
      ageGroup: 'professional',
      timeCommitment: 7,
      learningStyle: 'theoretical'
    },
    privacySettings: {
      profileVisibility: 'friends',
      courseVisibility: 'friends',
      activityVisibility: 'friends'
    },
    createdAt: '2024-12-01T13:15:00Z',
    lastLogin: '2025-11-19T14:00:00Z'
  },
  {
    id: 'user-6',
    email: 'tom.anderson@explorer.org',
    name: 'Tom Anderson',
    avatarUrl: null,
    subscriptionTier: 'free',
    coursesUsedThisMonth: 0,
    courseLimit: 3,
    subscriptionRenewsOn: null,
    enrolledCourses: [],
    completedCourses: [],
    onboardingData: {
      learningGoal: 'personal_interest',
      interests: ['History & Humanities', 'Science & Nature', 'Languages & Culture'],
      ageGroup: 'retired',
      timeCommitment: 3,
      learningStyle: 'reading'
    },
    privacySettings: {
      profileVisibility: 'private',
      courseVisibility: 'private',
      activityVisibility: 'private'
    },
    createdAt: '2025-11-15T10:00:00Z',
    lastLogin: '2025-11-21T07:30:00Z'
  },
  {
    id: 'user-7',
    email: 'elena.rodriguez@medtech.com',
    name: 'Elena Rodriguez',
    avatarUrl: null,
    subscriptionTier: 'free',
    coursesUsedThisMonth: 3,
    courseLimit: 3,
    subscriptionRenewsOn: null,
    enrolledCourses: ['course-10', 'course-11', 'course-15'],
    completedCourses: [],
    onboardingData: {
      learningGoal: 'stay_informed',
      interests: ['Science & Nature', 'Health & Wellness', 'History & Humanities'],
      ageGroup: 'professional',
      timeCommitment: 4,
      learningStyle: 'mixed'
    },
    privacySettings: {
      profileVisibility: 'friends',
      courseVisibility: 'public',
      activityVisibility: 'friends'
    },
    createdAt: '2025-08-03T15:30:00Z',
    lastLogin: '2025-11-21T11:00:00Z'
  },
  {
    id: 'user-8',
    email: 'james.wilson@developer.net',
    name: 'James Wilson',
    avatarUrl: null,
    subscriptionTier: 'plus',
    coursesUsedThisMonth: 4,
    courseLimit: 10,
    subscriptionRenewsOn: '2025-12-28',
    enrolledCourses: ['course-1', 'course-4', 'course-5', 'course-12'],
    completedCourses: ['course-2'],
    onboardingData: {
      learningGoal: 'career_transition',
      interests: ['Programming & Software Engineering', 'DevOps & Cloud', 'Data Science & AI'],
      ageGroup: 'professional',
      timeCommitment: 8,
      learningStyle: 'hands-on'
    },
    privacySettings: {
      profileVisibility: 'public',
      courseVisibility: 'public',
      activityVisibility: 'public'
    },
    createdAt: '2025-03-18T12:00:00Z',
    lastLogin: '2025-11-21T13:45:00Z'
  }
];

export default MOCK_USERS;
