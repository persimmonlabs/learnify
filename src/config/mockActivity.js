/**
 * Mock Activity Data
 *
 * Recent user activity for the social feed, showing course enrollments,
 * completions, and achievements. Activities are ordered by timestamp (newest first).
 *
 * Activity Types:
 * - 'course_enrolled': User started a new course
 * - 'course_completed': User finished all modules in a course
 * - 'achievement_earned': User earned a badge or milestone
 * - 'module_completed': User finished a specific module (optional)
 *
 * Visibility Levels:
 * - 'public': Visible to all users
 * - 'friends': Visible only to friends
 * - 'private': Not shown in social feed
 */

export const MOCK_ACTIVITY = [
  // Recent activity (last 7 days)
  {
    id: 'activity-1',
    userId: 'user-8',
    type: 'course_enrolled',
    courseId: 'course-12',
    timestamp: '2025-11-21T08:15:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Data Engineering Fundamentals'
    }
  },
  {
    id: 'activity-2',
    userId: 'user-1',
    type: 'achievement_earned',
    courseId: null,
    timestamp: '2025-11-21T07:30:00Z',
    visibility: 'public',
    metadata: {
      achievementName: 'Early Bird',
      achievementDescription: 'Completed 5 courses',
      achievementIcon: 'trophy'
    }
  },
  {
    id: 'activity-3',
    userId: 'user-2',
    type: 'course_completed',
    courseId: 'course-14',
    timestamp: '2025-11-20T19:45:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Content Creation Workflow',
      completionTime: '9 hours'
    }
  },
  {
    id: 'activity-4',
    userId: 'user-7',
    type: 'course_enrolled',
    courseId: 'course-11',
    timestamp: '2025-11-20T14:20:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'Climate Change: Science to Solutions'
    }
  },
  {
    id: 'activity-5',
    userId: 'user-4',
    type: 'course_enrolled',
    courseId: 'course-13',
    timestamp: '2025-11-20T10:30:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Learn Portuguese in 30 Days'
    }
  },
  {
    id: 'activity-6',
    userId: 'user-5',
    type: 'course_completed',
    courseId: 'course-8',
    timestamp: '2025-11-19T16:50:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'Competitive Market Analysis',
      completionTime: '9 hours'
    }
  },
  {
    id: 'activity-7',
    userId: 'user-3',
    type: 'course_enrolled',
    courseId: 'course-13',
    timestamp: '2025-11-19T11:00:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'Learn Portuguese in 30 Days'
    }
  },
  {
    id: 'activity-8',
    userId: 'user-8',
    type: 'course_completed',
    courseId: 'course-2',
    timestamp: '2025-11-18T21:15:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Web Application Architecture Masterclass',
      completionTime: '15 hours'
    }
  },
  {
    id: 'activity-9',
    userId: 'user-2',
    type: 'course_enrolled',
    courseId: 'course-11',
    timestamp: '2025-11-18T13:40:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Climate Change: Science to Solutions'
    }
  },
  {
    id: 'activity-10',
    userId: 'user-1',
    type: 'course_enrolled',
    courseId: 'course-16',
    timestamp: '2025-11-17T15:25:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Storytelling for Business Impact'
    }
  },

  // Older activity (1-2 weeks ago)
  {
    id: 'activity-11',
    userId: 'user-2',
    type: 'course_completed',
    courseId: 'course-12',
    timestamp: '2025-11-15T18:30:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Data Engineering Fundamentals',
      completionTime: '14 hours'
    }
  },
  {
    id: 'activity-12',
    userId: 'user-7',
    type: 'course_enrolled',
    courseId: 'course-15',
    timestamp: '2025-11-14T09:15:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'History of World War II: Complete Chronicle'
    }
  },
  {
    id: 'activity-13',
    userId: 'user-5',
    type: 'course_enrolled',
    courseId: 'course-3',
    timestamp: '2025-11-13T12:00:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'Trading Bot Design & Implementation'
    }
  },
  {
    id: 'activity-14',
    userId: 'user-4',
    type: 'course_enrolled',
    courseId: 'course-14',
    timestamp: '2025-11-12T10:45:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Content Creation Workflow'
    }
  },
  {
    id: 'activity-15',
    userId: 'user-2',
    type: 'achievement_earned',
    courseId: null,
    timestamp: '2025-11-11T14:20:00Z',
    visibility: 'public',
    metadata: {
      achievementName: 'Learning Streak',
      achievementDescription: 'Completed courses 7 days in a row',
      achievementIcon: 'fire'
    }
  },
  {
    id: 'activity-16',
    userId: 'user-8',
    type: 'course_enrolled',
    courseId: 'course-5',
    timestamp: '2025-11-10T16:30:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Cloud Infrastructure Engineering'
    }
  },
  {
    id: 'activity-17',
    userId: 'user-1',
    type: 'course_completed',
    courseId: 'course-6',
    timestamp: '2025-11-09T20:00:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Game Theory for Startup Success',
      completionTime: '10 hours'
    }
  },
  {
    id: 'activity-18',
    userId: 'user-3',
    type: 'course_completed',
    courseId: 'course-17',
    timestamp: '2025-11-08T17:45:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'The Portuguese Explorers: Age of Discovery',
      completionTime: '10 hours'
    }
  },
  {
    id: 'activity-19',
    userId: 'user-2',
    type: 'course_enrolled',
    courseId: 'course-16',
    timestamp: '2025-11-07T11:30:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Storytelling for Business Impact'
    }
  },
  {
    id: 'activity-20',
    userId: 'user-5',
    type: 'course_completed',
    courseId: 'course-7',
    timestamp: '2025-11-06T15:00:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'Negotiation Strategies Masterclass',
      completionTime: '8 hours'
    }
  },

  // Older activity (2-4 weeks ago)
  {
    id: 'activity-21',
    userId: 'user-2',
    type: 'course_completed',
    courseId: 'course-3',
    timestamp: '2025-11-03T19:20:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Trading Bot Design & Implementation',
      completionTime: '18 hours'
    }
  },
  {
    id: 'activity-22',
    userId: 'user-1',
    type: 'course_enrolled',
    courseId: 'course-12',
    timestamp: '2025-11-01T13:45:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Data Engineering Fundamentals'
    }
  },
  {
    id: 'activity-23',
    userId: 'user-8',
    type: 'course_enrolled',
    courseId: 'course-4',
    timestamp: '2025-10-28T10:15:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Database Systems from First Principles'
    }
  },
  {
    id: 'activity-24',
    userId: 'user-7',
    type: 'course_enrolled',
    courseId: 'course-10',
    timestamp: '2025-10-25T14:30:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'Biology of Evolution: From Cells to Complexity'
    }
  },
  {
    id: 'activity-25',
    userId: 'user-2',
    type: 'course_completed',
    courseId: 'course-2',
    timestamp: '2025-10-22T18:45:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Web Application Architecture Masterclass',
      completionTime: '15 hours'
    }
  },
  {
    id: 'activity-26',
    userId: 'user-5',
    type: 'course_completed',
    courseId: 'course-6',
    timestamp: '2025-10-18T16:00:00Z',
    visibility: 'friends',
    metadata: {
      courseName: 'Game Theory for Startup Success',
      completionTime: '10 hours'
    }
  },
  {
    id: 'activity-27',
    userId: 'user-1',
    type: 'course_completed',
    courseId: 'course-3',
    timestamp: '2025-10-15T20:30:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Trading Bot Design & Implementation',
      completionTime: '18 hours'
    }
  },
  {
    id: 'activity-28',
    userId: 'user-4',
    type: 'course_enrolled',
    courseId: 'course-16',
    timestamp: '2025-10-12T09:00:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Storytelling for Business Impact'
    }
  },
  {
    id: 'activity-29',
    userId: 'user-2',
    type: 'course_enrolled',
    courseId: 'course-15',
    timestamp: '2025-10-08T12:20:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'History of World War II: Complete Chronicle'
    }
  },
  {
    id: 'activity-30',
    userId: 'user-2',
    type: 'course_completed',
    courseId: 'course-1',
    timestamp: '2025-10-05T17:15:00Z',
    visibility: 'public',
    metadata: {
      courseName: 'Build an AI Agent from Scratch',
      completionTime: '12 hours'
    }
  }
];

export default MOCK_ACTIVITY;
