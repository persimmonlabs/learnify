# Learnify - Navigation Guide

## Quick Start

### Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Demo Credentials
- **Email**: `student@learnify.com`
- **Password**: `password123`

## Application Routes

### Public Routes

#### Login Page (`/login`)
- User authentication
- Demo credentials provided on page
- Links to registration (currently points to same login page)

### Protected Routes (Requires Authentication)

#### Dashboard (`/dashboard`)
- Overview of learning progress
- Stats: Courses enrolled, completed, exercises solved
- Continue learning section with in-progress courses
- Recommended courses section

#### Course Catalog (`/courses`)
- Browse all available courses
- Search and filter functionality
- Categories: Data Structures, Algorithms, Web Development
- Click any course card to view details

#### Lesson Page (`/courses/:courseId/lessons/:lessonId`)
- Video lessons
- Reading content
- Exercise integration
- Sidebar with course modules
- Navigation between lessons

#### Exercise Page (`/exercises/:exerciseId`)
- Split view: Problem description + code editor
- Test cases and hints
- Submit solution
- Real-time code execution (mocked)

#### Diagnosis Page (`/diagnosis/:moduleId`)
- "The Flaw" - Architectural problem diagnosis
- Before/after code comparison
- AI review feedback
- Visualizer canvas

#### Profile Page (`/profile/:userId` or `/profile`)
- User statistics and progress
- Achievement badges
- Enrolled courses
- Edit profile (for own profile)

## Navigation Flow

### First-Time User Journey
1. **Login** (`/login`) → Enter demo credentials
2. **Onboarding** (`/onboarding`) → Select archetype, domain, skill level
3. **Dashboard** (`/dashboard`) → View personalized dashboard
4. **Courses** (`/courses`) → Browse available courses
5. **Lesson** → Start learning

### Returning User Journey
1. **Login** → Automatic redirect to dashboard
2. **Dashboard** → Continue from last lesson or explore new courses

## Page Components Structure

### Atomic Design Implementation

#### Pages (`src/pages/`)
```
pages/
├── auth/
│   └── LoginPage.jsx
├── onboarding/
│   └── OnboardingPage.jsx
├── dashboard/
│   └── DashboardPage.jsx
├── learn/
│   ├── CourseCatalogPage.jsx
│   ├── LessonPage.jsx
│   ├── ExercisePage.jsx
│   └── DiagnosisPage.jsx
└── social/
    └── ProfilePage.jsx
```

#### Templates (`src/components/templates/`)
- OnboardingPage.jsx
- DashboardPage.jsx
- CourseCatalogPage.jsx
- LessonPage.jsx
- ExercisePage.jsx
- DiagnosisPage.jsx

#### Organisms (`src/components/organisms/`)
- Navigation
- LessonSidebar
- CodeEditor
- VideoPlayer
- ActivityTicker
- etc.

#### Molecules (`src/components/molecules/`)
- CourseCard
- ArchetypeCard
- HintBox
- ProgressRing
- etc.

#### Atoms (`src/components/atoms/`)
- Button
- Input
- Text
- Card
- Badge
- Spinner
- etc.

## Mock API Endpoints

All API calls are currently mocked in `src/services/api.js`:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Identity
- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update profile
- `POST /onboarding/complete` - Complete onboarding

### Courses
- `GET /courses` - List all courses
- `GET /courses/:id` - Course details
- `GET /courses/:id/progress` - Course progress

### Exercises
- `GET /exercises/:id` - Exercise details
- `POST /exercises/:id/submit` - Submit solution

### Social
- `GET /feed` - Activity feed
- `GET /recommendations` - Course recommendations
- `GET /users/:id/profile` - User profile
- `POST /users/:id/follow` - Follow user

## Mock Data

All mock data is defined in `src/config/mockData.js`:
- User profiles
- Course catalog
- Module/lesson structures
- Exercise data
- Activity feed
- Recommendations

## Features to Test

### ✅ Authentication
- [x] Login with demo credentials
- [x] Logout functionality
- [x] Protected route redirection

### ✅ Onboarding
- [x] 5-step onboarding flow
- [x] Archetype selection
- [x] Domain input
- [x] Variable extraction
- [x] Skill level selection
- [x] Curriculum preview

### ✅ Dashboard
- [x] Statistics display
- [x] In-progress courses
- [x] Recommended courses
- [x] Navigation to courses

### ✅ Course Catalog
- [x] Course grid display
- [x] Search functionality (UI)
- [x] Filter by category
- [x] Course card details

### ✅ Lesson Page
- [x] Video player integration
- [x] Reading content display
- [x] Sidebar navigation
- [x] Previous/Next navigation

### ✅ Exercise Page
- [x] Split view layout
- [x] Code editor (Monaco-based)
- [x] Test results display
- [x] Hints system
- [x] Submit functionality

### ✅ Diagnosis Page
- [x] Flaw presenter
- [x] Code comparison slider
- [x] Architecture review
- [x] Visualizer canvas

### ✅ Profile Page
- [x] User statistics
- [x] Achievement badges
- [x] Course history
- [x] Profile editing

## Known Limitations (Mock Environment)

1. **No Real Authentication** - All logins succeed with demo data
2. **No Data Persistence** - Page refresh loses state (except localStorage)
3. **Mock API Responses** - All API calls return predefined mock data
4. **No Real Code Execution** - Exercise submissions return mock results
5. **Static Recommendations** - Not personalized, always return same data

## Next Steps for Production

1. Connect to real Go backend API
2. Implement real authentication with JWT
3. Add data persistence and state management (Redux/Zustand)
4. Integrate real code execution service
5. Add error handling and loading states
6. Implement real-time features (WebSocket)
7. Add analytics and tracking
8. Optimize performance and bundle size
9. Add comprehensive testing
10. Deploy to production environment

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### React Router Issues
- Ensure all routes are wrapped in `<BrowserRouter>`
- Check that imports are correct
- Verify ProtectedRoute is functioning

### Styling Issues
- Ensure Tailwind CSS is configured properly
- Check that `index.css` imports Tailwind directives
- Verify custom theme tokens are loaded

## Developer Notes

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Create mock data in `src/config/mockData.js`
4. Add API endpoint mock in `src/services/api.js`

### Modifying Mock Data
Edit `src/config/mockData.js` to change:
- User profiles
- Course content
- Exercise data
- Activity feeds

### Updating API Endpoints
Modify `src/services/api.js` to:
- Change mock responses
- Add new endpoints
- Simulate different scenarios (errors, delays)

## Support

For issues or questions:
1. Check this navigation guide
2. Review the README.md
3. Check browser console for errors
4. Review mock data in `src/config/mockData.js`
