# Component Architecture

## Overview

**50 atomic components** organized by Atomic Design principles to implement The Universal Blueprint.

---

## Directory Structure

```
src/components/
├── atoms/           (19 components - Basic building blocks)
├── molecules/       (16 components - Simple combinations)
├── organisms/       (10 components - Complex sections)
└── templates/       (5 page layouts - Complete workflows)
```

---

## Component Inventory

### Atoms (19)
**Purpose:** Fundamental UI primitives

- `Button` - 8 variants, 4 sizes
- `Input` - Text input with icons, validation states
- `Select` - Dropdown with custom styling
- `Badge` - Status indicators, 7 variants
- `Card` - Container with multiple variants
- `Text` - Typography system (15 variants)
- `Alert` - Contextual feedback messages
- `Modal` - Overlay dialogs
- `Toast` - Notification messages
- `ProgressBar` - Linear progress indicator
- `Spinner` - Loading indicators
- `Tabs` - Tab navigation system
- `Toggle` - Switch component
- `Slider` - Range input
- `Icon` - Icon wrapper
- `Container` - Layout wrapper
- `Divider` - Horizontal/vertical separator

### Molecules (16)
**Purpose:** Simple component combinations

**Learning Components:**
- `CourseCard` - Course display with progress
- `LessonCard` - Sidebar lesson items
- `ExerciseCard` - Coding challenge cards
- `TestCase` - Test result display
- `HintBox` - Collapsible hints with penalties
- `LanguageSelector` - Python/Go/Java picker
- `MetricCard` - Performance metrics with trends
- `ProgressRing` - Circular progress

**Critical Thinking Components:**
- `ComparisonSlider` - Before/after architecture slider
- `AnnotationMarker` - Code annotation markers

**UI Primitives:**
- `IconBox` - Icon container with backgrounds
- `FeatureCard` - Feature display
- `TabButton` - Tab navigation button
- `Chip` - Selectable pills
- `Logo` - Brand logo
- `GradientText` - Animated gradient text

### Organisms (10)
**Purpose:** Complex, interconnected components

**Learning Interface:**
- `Navigation` - Site navigation with mobile menu
- `Footer` - Site footer
- `HeroSection` - Landing hero
- `LessonSidebar` - Course navigation sidebar
- `ContentPanel` - Reading material display

**Code & Testing:**
- `CodeEditor` - Full editor with run/reset
- `VideoPlayer` - Video lesson player
- `TestResults` - Complete test feedback

**Critical Thinking:**
- `VisualizerCanvas` - System visualization (entropy, memory, flow, decision-tree, interface)
- `ArchitectureReview` - AI Senior Review with scores
- `FlawPresenter` - Flaw identification interface

**Background:**
- `BackgroundAtmosphere` - Decorative gradients

### Templates (5)
**Purpose:** Complete page layouts

**Learning Pages:**
- `DashboardPage` - Student dashboard with stats
- `CourseCatalogPage` - Browse courses
- `LessonPage` - Main learning interface
- `ExercisePage` - Split-view coding challenges

**Critical Thinking Pages:**
- `DiagnosisPage` - Flaw → Critique → Visualizer workflow

---

## The Universal Blueprint Mapping

### Module 1: The Atom
**Components:**
- `VisualizerCanvas` (entropy, memory)
- `ComparisonSlider` (chaos → order)
- `FlawPresenter` (identify encapsulation issues)

### Module 2: The Standard
**Components:**
- `TestResults` (pass/fail feedback)
- `TestCase` (individual test display)
- `ArchitectureReview` (quality evaluation)

### Module 3: The Workflow
**Components:**
- `VisualizerCanvas` (flow diagram)
- `MetricCard` (throughput gauge)
- `ProgressBar` (optimization progress)

### Module 4: The Decision Tree
**Components:**
- `VisualizerCanvas` (decision-tree)
- `FlawPresenter` (logic flaw identification)
- `AnnotationMarker` (edge case marking)

### Module 5: The Archetype
**Components:**
- `VisualizerCanvas` (interface board)
- `ComparisonSlider` (rigid → polymorphic)
- `LanguageSelector` (interface demonstration)

### Module 6: The Flow State
**Components:**
- `VisualizerCanvas` (spinning gears)
- `MetricCard` (sync metrics)
- `Slider` (timing adjustment)

### Module 7: The Capstone
**Components:**
- `ArchitectureReview` (complete evaluation)
- `DiagnosisPage` (full workflow)
- `ProgressRing` (completion tracking)

---

## Onboarding Flow Components

**Missing (Need to Build):**
- `ArchetypeSelector` - Step 1 archetype selection cards
- `DomainInput` - Step 2 passion/obsession input
- `VariableExtractor` - Step 3 adaptive questionnaire
- `SkillLevelPicker` - Step 4 baseline assessment
- `CurriculumRecommendation` - Step 5 manifesto display
- `OnboardingPage` - Complete onboarding template

---

## Design System

### Colors (Prism Minimalist)
- **Blue** (#3b82f6) - Logic, primary actions
- **Orange** (#f97316) - Creativity, warnings, exercises
- **Green** (#10b981) - Growth, success, progress

### Typography
- **Font:** Inter (sans-serif), Fira Code (monospace)
- **Scales:** xs → 9xl, display-sm → display-2xl
- **Weights:** 400 → 900

### Spacing
- **Scale:** 0 → 96 (0px → 384px)
- **Standard gaps:** 4, 6, 8, 12, 16, 24

### Animations
- `animate-pulse-slow` - 8s slow pulse
- `animate-gradient` - 6s gradient shift
- `animate-in` - Entrance animation
- `fade-in`, `slide-in` - Standard transitions

---

## Usage Patterns

### Composing a Learning Page

```jsx
import LessonPage from './templates/LessonPage';
import VisualizerCanvas from './organisms/VisualizerCanvas';
import CodeEditor from './organisms/CodeEditor';

<LessonPage
  course={courseData}
  currentLesson={{
    type: 'exercise',
    content: <CodeEditor />
  }}
  modules={moduleData}
/>
```

### Building a Diagnosis Flow

```jsx
import DiagnosisPage from './templates/DiagnosisPage';
import FlawPresenter from './organisms/FlawPresenter';
import ArchitectureReview from './organisms/ArchitectureReview';

<DiagnosisPage
  module={{
    title: 'Module 1: The Atom',
    flawedCode: '...',
    correctCode: '...'
  }}
  onComplete={handleModuleComplete}
/>
```

---

## Next Steps

1. Build onboarding components (see missing list above)
2. Integrate with backend API for:
   - LLM domain validation
   - Variable injection
   - AI review generation
3. Add router for page navigation
4. Implement user authentication
5. Add data persistence layer

---

## File References

- Design tokens: `src/theme/tokens.js`
- Utilities: `src/utils/cn.js`
- Global styles: `src/index.css`
