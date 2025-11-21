# Authentication Guards and Redirect Flow Implementation

## Overview
Implemented comprehensive authentication guards and signup redirect flow for course enrollment in the Learnify application. Users are now required to authenticate before enrolling in courses, with intelligent redirect handling to return them to their intended destination after login/signup.

## Modified Files

### 1. **C:\Users\pradord\Documents\learn_code\learnify\src\pages\learn\CourseCatalogPage.jsx**
- Added `useAuth` hook to access authentication state
- Implemented `handleCourseClick` authentication gate:
  - **Not authenticated**: Redirects to `/login?returnTo=/courses/{courseId}`
  - **Already enrolled**: Navigates directly to course
  - **Cannot enroll** (limit reached): Navigates to course page (which will show upgrade modal)
  - **Can enroll**: Navigates to course enrollment page
- Passes authentication props to template component

### 2. **C:\Users\pradord\Documents\learn_code\learnify\src\pages\auth\LoginPage.jsx**
- Added `useSearchParams` to read `returnTo` query parameter
- Implemented `sanitizeReturnUrl` function to prevent open redirect vulnerabilities
  - Only allows internal paths (starting with `/`)
  - Prevents protocol-relative URLs (`//evil.com`)
- Enhanced `handleSubmit` with redirect priority logic:
  1. **Priority 1**: Return to intended destination (course enrollment)
  2. **Priority 2**: Onboarding flow (for users from landing page)
  3. **Priority 3**: Dashboard (default)
- Updated "Sign up" link to preserve `returnTo` parameter

### 3. **C:\Users\pradord\Documents\learn_code\learnify\src\pages\auth\RegisterPage.jsx** (NEW)
- Created dedicated registration page (previously used LoginPage)
- Mirrors LoginPage redirect logic for consistency
- Includes form validation:
  - Password confirmation matching
  - Minimum password length (8 characters)
  - Required terms acceptance
- Same redirect priority as LoginPage
- New users default to onboarding if no returnTo URL
- Updated "Sign in" link to preserve `returnTo` parameter

### 4. **C:\Users\pradord\Documents\learn_code\learnify\src\App.jsx**
- Imported `RegisterPage` component
- Updated `/register` route to use dedicated `RegisterPage` instead of `LoginPage`

### 5. **C:\Users\pradord\Documents\learn_code\learnify\src\components\molecules\CourseCard.jsx**
- Added new props: `isEnrolled`, `isAuthenticated`, `canEnroll`
- Updated CTA text based on user state:
  - **Not authenticated**: "Sign in to Enroll"
  - **Enrolled with progress**: "Continue Learning"
  - **Enrolled, no progress**: "Start Course"
  - **Cannot enroll** (limit reached): "Upgrade Required"
  - **Can enroll**: "Enroll Now"

### 6. **C:\Users\pradord\Documents\learn_code\learnify\src\components\templates\CourseCatalogPage.jsx**
- Added props: `isAuthenticated`, `user`, `canEnrollInCourse`
- Enhanced CourseCard rendering to calculate enrollment status per course
- Passes authentication and enrollment state to each CourseCard

## Authentication Flow Diagram

```
User clicks course card
       ↓
┌──────────────────────┐
│ Is authenticated?    │
└──────────────────────┘
       ↓ NO                    ↓ YES
       ↓                       ↓
┌──────────────────────┐  ┌────────────────────┐
│ Redirect to login    │  │ Is enrolled?       │
│ with returnTo param  │  └────────────────────┘
└──────────────────────┘       ↓ NO         ↓ YES
       ↓                       ↓            ↓
┌──────────────────────┐  ┌─────────┐  ┌─────────────┐
│ User logs in/signs up│  │ Can     │  │ Navigate to │
└──────────────────────┘  │ enroll? │  │ course page │
       ↓                  └─────────┘  └─────────────┘
┌──────────────────────┐  ↓ NO    ↓ YES
│ Redirect to returnTo │  ↓       ↓
│ (original course)    │  Show    Navigate
└──────────────────────┘  upgrade  to course
                          modal
```

## URL State Management

### Return URL Format
```
/login?returnTo=/courses/{courseId}
/register?returnTo=/courses/{courseId}
```

### Security Features
- **URL Sanitization**: Only internal paths allowed
- **Encoding**: Uses `encodeURIComponent` for safe URL parameter handling
- **Validation**: Prevents open redirect attacks

### Redirect Priority (Login & Register)
1. `returnTo` query parameter (course enrollment, etc.)
2. `learningGoal` from location state (landing page flow)
3. `/dashboard` (login) or `/onboarding` (register) as default

## Edge Cases Handled

### 1. User Already Enrolled
```javascript
const isEnrolled = user?.enrolledCourses?.includes(courseId);
if (isEnrolled) {
  navigate(`/courses/${courseId}`); // Skip enrollment, go directly to course
}
```

### 2. Course Limit Reached
```javascript
if (!canEnrollInCourse()) {
  navigate(`/courses/${courseId}`); // Course page will show upgrade modal
}
```

### 3. Invalid Return URLs
```javascript
const sanitizeReturnUrl = (url) => {
  const decodedUrl = decodeURIComponent(url);
  // Only allow internal paths (must start with / and not //)
  if (decodedUrl.startsWith('/') && !decodedUrl.startsWith('//')) {
    return decodedUrl;
  }
  return null; // Invalid URLs are ignored
};
```

### 4. Onboarding Flow Preservation
```javascript
// User from landing page → onboarding
if (learningGoal) {
  navigate('/onboarding', { state: { learningGoal } });
}
```

### 5. Link Preservation
Both login and register pages preserve the `returnTo` parameter in cross-links:
```jsx
<Link to={sanitizedReturnUrl ? `/register?returnTo=${encodeURIComponent(sanitizedReturnUrl)}` : '/register'}>
  Sign up
</Link>
```

## User Experience Flow

### Scenario 1: Unauthenticated User Clicks Course
1. User browses course catalog (no login required)
2. User clicks "Sign in to Enroll" on course card
3. Redirected to `/login?returnTo=/courses/course-123`
4. User logs in successfully
5. Automatically redirected to `/courses/course-123`
6. Course page shows enrollment or upgrade options

### Scenario 2: New User Signup Flow
1. User clicks course card → redirected to login
2. User clicks "Sign up" link
3. `returnTo` parameter preserved in registration URL
4. User completes registration
5. Automatically redirected to intended course
6. User can enroll or see upgrade prompt

### Scenario 3: User at Course Limit
1. Authenticated user clicks course card
2. System detects `canEnrollInCourse() === false`
3. Navigates to course page
4. Course page displays upgrade modal
5. User can upgrade to enroll in more courses

## CTA Text Variations

| User State | Enrollment State | CTA Text |
|------------|------------------|----------|
| Not authenticated | N/A | "Sign in to Enroll" |
| Authenticated | Already enrolled, has progress | "Continue Learning" |
| Authenticated | Already enrolled, no progress | "Start Course" |
| Authenticated | Not enrolled, cannot enroll | "Upgrade Required" |
| Authenticated | Not enrolled, can enroll | "Enroll Now" |

## Testing Recommendations

### Manual Testing
1. **Unauthenticated Access**:
   - Visit `/courses` without login
   - Click course card → should redirect to `/login?returnTo=...`
   - Login → should return to course

2. **Registration Flow**:
   - Click "Sign up" from login page
   - Verify `returnTo` preserved
   - Complete registration → should return to course

3. **Enrolled Course**:
   - Login as user with enrolled courses
   - Verify "Continue Learning" or "Start Course" CTA
   - Click → should navigate directly to course

4. **Course Limit**:
   - Login as free tier user at limit
   - Verify "Upgrade Required" CTA
   - Click → should show upgrade modal

5. **URL Security**:
   - Try malicious URLs: `/login?returnTo=//evil.com`
   - Should ignore and redirect to dashboard

### Automated Testing
```javascript
describe('Authentication Flow', () => {
  test('redirects unauthenticated users to login', () => {
    // Test implementation
  });

  test('preserves returnTo parameter', () => {
    // Test implementation
  });

  test('sanitizes malicious URLs', () => {
    expect(sanitizeReturnUrl('//evil.com')).toBeNull();
    expect(sanitizeReturnUrl('/courses/123')).toBe('/courses/123');
  });

  test('shows correct CTA based on auth state', () => {
    // Test implementation
  });
});
```

## Integration with Existing Systems

### AuthContext
- Uses `isAuthenticated`, `user`, `canEnrollInCourse` from context
- No changes required to AuthContext

### Subscription System
- Integrates with subscription helpers (`canEnrollInCourse`, `validateEnrollment`)
- Respects course limits per subscription tier

### Routing
- All routes use existing React Router setup
- No breaking changes to route structure

## Future Enhancements

1. **Session Storage**: Consider using sessionStorage for returnTo URL as backup
2. **Deep Linking**: Support lesson-level returnTo URLs (`/courses/123/lessons/456`)
3. **Analytics**: Track conversion rates for auth-gated enrollments
4. **Progressive Disclosure**: Show preview for unauthenticated users before requiring login
5. **Social Auth**: Extend returnTo flow to OAuth providers

## Security Considerations

✅ **Implemented**:
- URL sanitization prevents open redirects
- Only internal paths allowed
- Proper encoding/decoding of URL parameters

⚠️ **Considerations**:
- CSRF protection handled by API layer
- Session management via AuthContext
- Token expiry handled by backend

## Conclusion

The authentication guard and redirect flow is fully implemented and production-ready. Users are now required to authenticate before enrolling in courses, with a seamless redirect experience that returns them to their intended destination after login or signup.
