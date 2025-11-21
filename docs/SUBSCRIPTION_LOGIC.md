# Subscription Tier Tracking and Course Enrollment System

This document describes the subscription tier tracking system and course enrollment limits implementation in Learnify.

## Overview

The subscription system tracks three tiers (Free, Plus, Pro) with different course enrollment limits:
- **Free Tier**: 3 courses per month
- **Plus Tier**: 6 courses per month
- **Pro Tier**: 13 courses per month

## Architecture

### File Structure

```
src/
├── config/
│   ├── pricing.js           # Pricing tier constants and configurations
│   ├── mockUsers.js         # Mock users with different subscription tiers
│   ├── mockData.js          # Updated with subscription fields
│   └── constants.js         # Added ENROLL_COURSE endpoint
├── utils/
│   └── subscriptionHelpers.js  # Subscription utility functions
├── services/
│   └── api.js               # Added enrollInCourse API method
└── contexts/
    └── AuthContext.jsx      # Added subscription-related methods
```

## Data Model

### User Subscription Fields

```javascript
{
  id: 'user-1',
  email: 'student@learnify.com',
  name: 'Alex Johnson',
  // ... other user fields

  // Subscription fields
  subscriptionTier: 'plus',           // 'free' | 'plus' | 'pro'
  coursesUsedThisMonth: 2,            // Number of courses enrolled this month
  courseLimit: 6,                      // Max courses for tier
  subscriptionRenewsOn: '2025-12-21', // ISO date string
  enrolledCourses: ['course-1', 'course-2'],  // Array of course IDs
  completedCourses: ['course-3']      // Array of completed course IDs
}
```

## Core Components

### 1. Pricing Configuration (`src/config/pricing.js`)

Defines pricing tiers and their features:

```javascript
import { PRICING_TIERS, SUBSCRIPTION_TIERS } from './pricing';

// Access tier details
const tier = PRICING_TIERS.PLUS;
// { name: 'Plus', price: 5, courses: 6, features: [...], ... }
```

**Key Exports:**
- `SUBSCRIPTION_TIERS` - Enum of tier names
- `PRICING_TIERS` - Full tier configurations
- `getCourseLimit(tier)` - Get course limit for a tier
- `getTierDetails(tier)` - Get full tier configuration
- `isValidTier(tier)` - Validate tier name

### 2. Subscription Helpers (`src/utils/subscriptionHelpers.js`)

Utility functions for subscription logic:

```javascript
import {
  canEnrollInCourse,
  getRemainingCourses,
  shouldShowUpgradePrompt,
  validateEnrollment,
  getEnrollmentStatus
} from '../utils/subscriptionHelpers';
```

**Key Functions:**

#### `canEnrollInCourse(user)`
```javascript
// Check if user has available enrollment slots
const canEnroll = canEnrollInCourse(user);
// Returns: boolean
```

#### `getRemainingCourses(user)`
```javascript
// Get number of remaining course slots
const remaining = getRemainingCourses(user);
// Returns: number (0 or more)
```

#### `shouldShowUpgradePrompt(user, threshold = 0.8)`
```javascript
// Determine if upgrade CTA should be shown
const showUpgrade = shouldShowUpgradePrompt(user);
// Returns: boolean
```

#### `validateEnrollment(user, courseId)`
```javascript
// Validate enrollment attempt with detailed feedback
const validation = validateEnrollment(user, 'course-123');
// Returns: { success: boolean, error?: string, requiresUpgrade?: boolean }
```

#### `getEnrollmentStatus(user)`
```javascript
// Get detailed enrollment status with user-friendly message
const status = getEnrollmentStatus(user);
// Returns: {
//   canEnroll: boolean,
//   message: string,
//   type: 'success' | 'warning' | 'error',
//   remaining: number,
//   suggestedTier?: object
// }
```

### 3. AuthContext Updates (`src/contexts/AuthContext.jsx`)

Added subscription-related methods to the authentication context:

```javascript
import { useAuth } from '../contexts/AuthContext';

const {
  canEnrollInCourse,
  enrollInCourse,
  getSubscriptionInfo
} = useAuth();
```

**Methods:**

#### `canEnrollInCourse()`
```javascript
// Check if current user can enroll in more courses
const canEnroll = canEnrollInCourse();
// Returns: boolean
```

#### `enrollInCourse(courseId)`
```javascript
// Enroll user in a course with validation
const result = await enrollInCourse('course-123');
// Returns: {
//   success: boolean,
//   error?: string,
//   data?: { courseId: string, remainingSlots: number }
// }
```

#### `getSubscriptionInfo()`
```javascript
// Get comprehensive subscription information
const info = getSubscriptionInfo();
// Returns: {
//   tier: string,
//   courseLimit: number,
//   coursesUsed: number,
//   remaining: number,
//   renewsOn: string,
//   benefits: object,
//   canEnroll: boolean,
//   shouldShowUpgrade: boolean,
//   enrollmentStatus: object
// }
```

## Usage Examples

### Check Enrollment Eligibility

```javascript
import { useAuth } from '../contexts/AuthContext';

function CourseCard({ course }) {
  const { canEnrollInCourse, getSubscriptionInfo } = useAuth();

  const info = getSubscriptionInfo();
  const canEnroll = canEnrollInCourse();

  return (
    <div>
      <h3>{course.title}</h3>
      {canEnroll ? (
        <button>Enroll Now</button>
      ) : (
        <div>
          <p>{info.enrollmentStatus.message}</p>
          <button>Upgrade to {info.enrollmentStatus.suggestedTier?.name}</button>
        </div>
      )}
    </div>
  );
}
```

### Enroll in Course

```javascript
import { useAuth } from '../contexts/AuthContext';

function EnrollButton({ courseId }) {
  const { enrollInCourse, canEnrollInCourse } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!canEnrollInCourse()) {
      alert('Course limit reached. Please upgrade your subscription.');
      return;
    }

    setLoading(true);
    const result = await enrollInCourse(courseId);
    setLoading(false);

    if (result.success) {
      alert(`Enrolled! ${result.data.remainingSlots} slots remaining.`);
    } else {
      alert(result.error);
    }
  };

  return (
    <button onClick={handleEnroll} disabled={loading}>
      {loading ? 'Enrolling...' : 'Enroll'}
    </button>
  );
}
```

### Show Upgrade Prompt

```javascript
import { useAuth } from '../contexts/AuthContext';
import { shouldShowUpgradePrompt, getNextTier } from '../utils/subscriptionHelpers';

function UpgradePrompt() {
  const { user } = useAuth();

  if (!shouldShowUpgradePrompt(user)) {
    return null;
  }

  const nextTier = getNextTier(user.subscriptionTier);

  return (
    <div className="upgrade-banner">
      <p>You're using {user.coursesUsedThisMonth}/{user.courseLimit} course slots</p>
      <button>
        Upgrade to {nextTier.name} for {nextTier.courses} courses/month
      </button>
    </div>
  );
}
```

### Display Subscription Info

```javascript
import { useAuth } from '../contexts/AuthContext';
import { getSubscriptionUsage } from '../utils/subscriptionHelpers';

function SubscriptionDashboard() {
  const { getSubscriptionInfo, user } = useAuth();

  const info = getSubscriptionInfo();
  const usage = getSubscriptionUsage(user);

  return (
    <div>
      <h2>{info.benefits.name}</h2>
      <p>{info.benefits.price === 0 ? 'Free' : `$${info.benefits.price}/month`}</p>

      <div className="usage-meter">
        <div style={{ width: `${usage}%` }} />
      </div>
      <p>{info.coursesUsed}/{info.courseLimit} courses used</p>
      <p>{info.remaining} slots remaining</p>
      <p>Renews on: {info.renewsOn}</p>

      <h3>Features:</h3>
      <ul>
        {info.benefits.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Mock Users for Testing

The system includes 5 mock users for testing different scenarios:

### 1. Free Tier - At Limit
```javascript
import { mockFreeUserAtLimit } from '../config/mockUsers';
// 3/3 courses used - cannot enroll
```

### 2. Free Tier - Can Enroll
```javascript
import { mockFreeUserCanEnroll } from '../config/mockUsers';
// 0/3 courses used - can enroll
```

### 3. Plus Tier - Can Enroll
```javascript
import { mockPlusUserCanEnroll } from '../config/mockUsers';
// 5/6 courses used - can enroll
```

### 4. Plus Tier - At Limit
```javascript
import { mockPlusUserAtLimit } from '../config/mockUsers';
// 6/6 courses used - cannot enroll, should see upgrade to Pro
```

### 5. Pro Tier - Generous Limits
```javascript
import { mockProUser } from '../config/mockUsers';
// 8/13 courses used - can enroll, no upgrade prompts
```

## Enrollment Flow

```
1. User clicks "Enroll" button
   ↓
2. Call validateEnrollment(user, courseId)
   ↓
3. Checks:
   - User is authenticated?
   - Course ID provided?
   - Already enrolled?
   - Has available slots?
   ↓
4. If valid → Call API: POST /courses/:id/enroll
   ↓
5. On success:
   - Add courseId to enrolledCourses array
   - Increment coursesUsedThisMonth
   - Update local user state
   - Return success with remaining slots
   ↓
6. If at limit → Show upgrade prompt
```

## Edge Cases Handled

1. **Already Enrolled**: Prevents duplicate enrollments
2. **No Authentication**: Returns error if user not logged in
3. **Invalid Course ID**: Validates courseId is provided
4. **Reached Limit**: Returns requiresUpgrade flag with suggested tier
5. **Invalid Tier**: Defaults to Free tier if tier is invalid
6. **Missing Data**: Uses 0 for coursesUsedThisMonth if undefined
7. **Null User**: All helper functions safely handle null user

## API Integration

### Endpoint
```
POST /api/courses/:id/enroll
```

### Request Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Response (Success)
```json
{
  "success": true,
  "data": {
    "courseId": "course-123",
    "enrolledAt": "2025-11-21T10:00:00Z",
    "progress": 0
  },
  "message": "Successfully enrolled in course"
}
```

### Response (Error - Limit Reached)
```json
{
  "success": false,
  "error": "Course limit reached",
  "requiresUpgrade": true,
  "currentTier": "free",
  "suggestedTier": "plus"
}
```

## Testing Scenarios

### Scenario 1: Free User at Limit
```javascript
// User: mockFreeUserAtLimit
// Expected: Cannot enroll, should see upgrade to Plus
canEnrollInCourse(user) // → false
shouldShowUpgradePrompt(user) // → true
getEnrollmentStatus(user).message // → "You've reached your course limit. Upgrade to Plus Plan for more courses."
```

### Scenario 2: Plus User at 80% Capacity
```javascript
// User: mockPlusUserCanEnroll (5/6 courses)
// Expected: Can still enroll, should see upgrade prompt
canEnrollInCourse(user) // → true
shouldShowUpgradePrompt(user, 0.8) // → true (5/6 = 83%)
getRemainingCourses(user) // → 1
```

### Scenario 3: Pro User
```javascript
// User: mockProUser (8/13 courses)
// Expected: Can enroll, no upgrade prompts
canEnrollInCourse(user) // → true
shouldShowUpgradePrompt(user) // → false
getRemainingCourses(user) // → 5
```

## Data Consistency

All mock users maintain consistency:
- `coursesUsedThisMonth` ≤ `courseLimit`
- `enrolledCourses.length` = `coursesUsedThisMonth`
- `courseLimit` matches tier configuration
- `subscriptionTier` is valid tier name

## Future Enhancements

1. **Monthly Reset**: Add logic to reset `coursesUsedThisMonth` on `subscriptionRenewsOn`
2. **Unenroll**: Add ability to unenroll from courses to free up slots
3. **Tier Change**: Handle immediate tier upgrades/downgrades
4. **Grace Period**: Allow going over limit temporarily
5. **Course History**: Track enrollment history for analytics
6. **Notifications**: Alert users when approaching limit
7. **Analytics**: Track upgrade conversion rates by tier

## Files Modified/Created

### Created Files
1. `C:\Users\pradord\Documents\learn_code\learnify\src\config\pricing.js`
2. `C:\Users\pradord\Documents\learn_code\learnify\src\utils\subscriptionHelpers.js`
3. `C:\Users\pradord\Documents\learn_code\learnify\src\config\mockUsers.js`
4. `C:\Users\pradord\Documents\learn_code\learnify\docs\SUBSCRIPTION_LOGIC.md`

### Modified Files
1. `C:\Users\pradord\Documents\learn_code\learnify\src\config\mockData.js` - Added subscription fields
2. `C:\Users\pradord\Documents\learn_code\learnify\src\contexts\AuthContext.jsx` - Added subscription methods
3. `C:\Users\pradord\Documents\learn_code\learnify\src\services\api.js` - Added enrollInCourse method
4. `C:\Users\pradord\Documents\learn_code\learnify\src\config\constants.js` - Added ENROLL_COURSE endpoint

---

**Last Updated**: 2025-11-21
**Version**: 1.0.0
