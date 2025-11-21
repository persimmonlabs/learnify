# Learnify - Learning Platform

A revolutionary learning platform for mastering programming through hands-on exercises, built with React and atomic design principles.

## 🎨 Design System

This project uses a comprehensive atomic design system with:

### Design Tokens (`src/theme/tokens.js`)
- Colors, spacing, typography, shadows
- Prism Minimalist theme (Blue, Orange, Green)

### Atoms (18 components)
- Button, Input, Badge, Card, Text, Icon, Container, Divider, Spinner, Alert
- Select, Tabs, Toggle, Modal, Toast, ProgressBar

### Molecules (12 components)
- IconBox, FeatureCard, TabButton, Chip, Logo, GradientText
- LanguageSelector, ProgressRing, CourseCard, LessonCard, ExerciseCard, TestCase, HintBox

### Organisms (7 components)
- Navigation, Footer, HeroSection, BackgroundAtmosphere
- CodeEditor, VideoPlayer, TestResults, LessonSidebar, ContentPanel

### Templates (4 page layouts)
- DashboardPage - User dashboard with stats and courses
- CourseCatalogPage - Browse and search courses
- LessonPage - Main learning interface with video/reading/code
- ExercisePage - Coding challenges with split view editor

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # 18 basic building blocks
│   ├── molecules/      # 12 simple combinations
│   ├── organisms/      # 7 complex sections
│   └── templates/      # 4 page layouts
├── theme/
│   └── tokens.js       # Design tokens
├── utils/
│   └── cn.js          # Utility functions
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## 🎯 Key Features

### For Students
- **Interactive Learning**: Video lessons, reading materials, and hands-on exercises
- **Code Editor**: Built-in editor supporting Python, Go, and Java
- **Real-time Testing**: Run code and see test results instantly
- **Progress Tracking**: Visual progress indicators and completion stats
- **Hints System**: Gradual hints with penalty system
- **Multi-language Support**: Learn in Python, Go, or Java

### For Courses
- **Modular Structure**: Organize content into modules and lessons
- **Mixed Content**: Videos, readings, and coding exercises
- **Test Cases**: Automated testing with detailed feedback
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Progress Persistence**: Track student progress across sessions

## 🧩 Component Usage Examples

### Course Components

```jsx
import CourseCard from './components/molecules/CourseCard';
import LessonCard from './components/molecules/LessonCard';
import ExerciseCard from './components/molecules/ExerciseCard';

<CourseCard
  title="Python Fundamentals"
  description="Learn Python basics"
  language="Python"
  duration="4 weeks"
  lessons={24}
  difficulty="beginner"
  progress={45}
/>

<LessonCard
  title="Introduction to Variables"
  type="video"
  duration="15 min"
  isCompleted={true}
/>

<ExerciseCard
  title="Two Sum Problem"
  difficulty="easy"
  points={100}
  topics={['arrays', 'hash-table']}
/>
```

### Learning Components

```jsx
import CodeEditor from './components/organisms/CodeEditor';
import VideoPlayer from './components/organisms/VideoPlayer';
import TestResults from './components/organisms/TestResults';

<CodeEditor
  defaultLanguage="python"
  defaultCode="def solution():\n    pass"
  onRun={(code, lang) => console.log(code)}
/>

<VideoPlayer
  src="/video.mp4"
  poster="/thumbnail.jpg"
  title="Lesson 1: Introduction"
/>

<TestResults
  status="success"
  passedCount={8}
  totalCount={10}
  testCases={[...]}
/>
```

### Page Templates

```jsx
import DashboardPage from './components/templates/DashboardPage';
import LessonPage from './components/templates/LessonPage';
import ExercisePage from './components/templates/ExercisePage';

<DashboardPage
  user={{ name: 'John' }}
  stats={{ coursesEnrolled: 3 }}
  inProgressCourses={[...]}
/>

<LessonPage
  course={{ title: 'Python' }}
  currentLesson={{ type: 'video' }}
  modules={[...]}
/>

<ExercisePage
  exercise={{ title: 'Two Sum' }}
  onSubmit={(code) => console.log(code)}
/>
```

## 🎨 Color Palette

**Prism Minimalist Theme:**
- **Blue** (Logic) - `#3b82f6` - Primary actions, information
- **Orange** (Creativity) - `#f97316` - Highlights, warnings, exercises
- **Green** (Growth) - `#10b981` - Success, completion, progress

## 📦 Dependencies

- React 18.3
- Vite 5.1
- Tailwind CSS 3.4
- Lucide React (icons)

## 🎓 Course Data Structure

```javascript
const course = {
  id: 'python-101',
  title: 'Python Fundamentals',
  language: 'python',
  difficulty: 'beginner',
  duration: '4 weeks',
  progress: 45,
  modules: [
    {
      title: 'Module 1: Basics',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Variables',
          type: 'video', // video, reading, exercise
          duration: '15 min',
          videoUrl: '/video.mp4',
          isCompleted: false,
          isLocked: false,
        }
      ]
    }
  ]
};

const exercise = {
  id: 'ex-1',
  title: 'Two Sum',
  difficulty: 'easy',
  points: 100,
  description: '<p>Problem description...</p>',
  starterCode: 'def solution(arr):\n    pass',
  testCases: [...],
  hints: [...]
};
```

## 🛠️ Development Guidelines

1. **Atomic Design**: Build from atoms → molecules → organisms → templates
2. **No Hardcoding**: All components accept data as props
3. **Reusability**: Design components to be reused across different contexts
4. **Flexibility**: Use variants and size options for customization
5. **Accessibility**: Include proper ARIA labels and keyboard navigation
6. **Performance**: Lazy load components and optimize renders

## 📝 License

MIT

---

**Ready to build the future of education!** 🚀
