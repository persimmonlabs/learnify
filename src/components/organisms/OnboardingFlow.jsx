import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import GradientText from '../molecules/GradientText';
import { cn } from '../../utils/cn';
import {
  Sparkles,
  Target,
  BookOpen,
  Calendar,
  Palette,
  ChevronRight,
  ChevronLeft,
  Check,
} from 'lucide-react';

/**
 * OnboardingFlow Component
 *
 * Multi-step onboarding wizard with 5 simple, quick questions.
 * Maps user responses to backend user_archetypes schema.
 *
 * Data Mapping:
 * - Step 1 (Why are you here?) → learning_goal
 * - Step 2 (What interests you?) → stored in user metadata JSON
 * - Step 3 (How old are you?) → age_group
 * - Step 4 (Time commitment?) → time_commitment_hours
 * - Step 5 (Learning style?) → preferred_pattern_id or metadata
 */

const TOTAL_STEPS = 5;

// Step 1: Learning Goal
const LEARNING_GOALS = [
  {
    id: 'career_growth',
    label: 'Career growth / Professional development',
    description: 'Level up your skills for career advancement',
    icon: Target,
    color: 'blue',
  },
  {
    id: 'hobby',
    label: 'Hobby / Personal interest',
    description: 'Learn something new for fun and personal growth',
    icon: Sparkles,
    color: 'orange',
  },
  {
    id: 'academic',
    label: 'School / Academic requirement',
    description: 'Complete coursework or academic goals',
    icon: BookOpen,
    color: 'green',
  },
  {
    id: 'curiosity',
    label: 'Pure curiosity / Lifelong learning',
    description: 'Explore and discover new knowledge',
    icon: Palette,
    color: 'blue',
  },
];

// Step 2: Interest Areas
const INTEREST_AREAS = [
  { id: 'programming', label: 'Programming & Software Engineering', color: 'blue' },
  { id: 'data_science', label: 'Data Science & Artificial Intelligence', color: 'green' },
  { id: 'business', label: 'Business & Entrepreneurship', color: 'orange' },
  { id: 'finance', label: 'Finance & Trading', color: 'green' },
  { id: 'design', label: 'Design & Creativity', color: 'orange' },
  { id: 'science', label: 'Science & Nature', color: 'blue' },
  { id: 'history', label: 'History & Culture', color: 'green' },
  { id: 'health', label: 'Health & Wellness', color: 'green' },
  { id: 'languages', label: 'Languages & Communication', color: 'blue' },
];

// Step 3: Age Group
const AGE_GROUPS = [
  {
    id: 'elementary',
    label: 'Elementary School (K-5)',
    description: 'Ages 5-11',
    emoji: '🎈',
  },
  {
    id: 'middle_school',
    label: 'Middle School (6-8)',
    description: 'Ages 11-14',
    emoji: '📚',
  },
  {
    id: 'high_school',
    label: 'High School (9-12)',
    description: 'Ages 14-18',
    emoji: '🎓',
  },
  {
    id: 'college',
    label: 'College / University',
    description: 'Ages 18-25',
    emoji: '🎯',
  },
  {
    id: 'professional',
    label: 'Professional / Adult learner',
    description: 'Ages 25+',
    emoji: '💼',
  },
];

// Step 4: Time Commitment
const TIME_COMMITMENTS = [
  {
    id: 'light',
    hours: 3,
    label: '2-4 hours per week',
    description: 'Perfect for busy schedules',
    icon: '⏰',
  },
  {
    id: 'moderate',
    hours: 6,
    label: '5-8 hours per week',
    description: 'Balanced learning pace',
    icon: '📅',
  },
  {
    id: 'intensive',
    hours: 10,
    label: '10+ hours per week',
    description: 'Fast-track your learning',
    icon: '🚀',
  },
];

// Step 5: Learning Style (optional)
const LEARNING_STYLES = [
  {
    id: 'visual',
    label: 'Visual',
    description: 'Videos, diagrams, infographics',
    icon: '👁️',
  },
  {
    id: 'hands_on',
    label: 'Hands-on',
    description: 'Exercises, projects, practice',
    icon: '🛠️',
  },
  {
    id: 'reading',
    label: 'Reading',
    description: 'Articles, documentation, books',
    icon: '📖',
  },
  {
    id: 'mixed',
    label: 'Mixed',
    description: 'Combination of all styles',
    icon: '🎨',
  },
];

const OnboardingFlow = ({ onComplete, redirectTo = '/dashboard' }) => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    learningGoal: null,
    interests: [],
    ageGroup: null,
    timeCommitment: null,
    learningStyle: null, // optional
  });

  // Validation state
  const [stepValid, setStepValid] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: true, // Step 5 is optional, so always valid
  });

  // Validate current step
  const validateStep = (step, data = formData) => {
    switch (step) {
      case 1:
        return !!data.learningGoal;
      case 2:
        return data.interests.length > 0;
      case 3:
        return !!data.ageGroup;
      case 4:
        return !!data.timeCommitment;
      case 5:
        return true; // Optional step
      default:
        return false;
    }
  };

  // Handle single select
  const handleSelectSingle = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    // Update validation
    setStepValid((prev) => ({
      ...prev,
      [currentStep]: validateStep(currentStep, newData),
    }));
  };

  // Handle multi-select
  const handleSelectMultiple = (value) => {
    const newInterests = formData.interests.includes(value)
      ? formData.interests.filter((item) => item !== value)
      : [...formData.interests, value];

    const newData = { ...formData, interests: newInterests };
    setFormData(newData);

    // Update validation
    setStepValid((prev) => ({
      ...prev,
      2: newInterests.length > 0,
    }));
  };

  // Navigation
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && stepValid[currentStep]) {
      setCurrentStep((prev) => prev + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
    }
  };

  // Submit onboarding
  const handleComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Map form data to backend schema
      const onboardingData = {
        learning_goal: formData.learningGoal,
        age_group: formData.ageGroup,
        time_commitment_hours: formData.timeCommitment,
        interests: formData.interests, // Stored as JSON in backend
        learning_style: formData.learningStyle,
        onboarding_completed: true,
      };

      const result = await completeOnboarding(onboardingData);

      if (result.success) {
        // Redirect to intended destination or dashboard
        const intendedPath = location.state?.from || redirectTo;
        if (onComplete) {
          onComplete(onboardingData);
        }
        navigate(intendedPath);
      } else {
        setError(result.error || 'Failed to complete onboarding. Please try again.');
      }
    } catch (err) {
      console.error('Onboarding error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            selected={formData.learningGoal}
            onSelect={(value) => handleSelectSingle('learningGoal', value)}
          />
        );
      case 2:
        return (
          <StepTwo
            selected={formData.interests}
            onSelect={handleSelectMultiple}
          />
        );
      case 3:
        return (
          <StepThree
            selected={formData.ageGroup}
            onSelect={(value) => handleSelectSingle('ageGroup', value)}
          />
        );
      case 4:
        return (
          <StepFour
            selected={formData.timeCommitment}
            onSelect={(value) => handleSelectSingle('timeCommitment', value)}
          />
        );
      case 5:
        return (
          <StepFive
            selected={formData.learningStyle}
            onSelect={(value) => handleSelectSingle('learningStyle', value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-prism-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <Badge variant="blue" size="md" className="mb-4">
            Step {currentStep} of {TOTAL_STEPS}
          </Badge>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-prism-blue-500 to-prism-green-500 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <Card variant="elevated" padding="xl" className="mb-6">
          {/* Step Content */}
          {renderStepContent()}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
            disabled={currentStep === 1 || loading}
            leftIcon={<ChevronLeft size={20} />}
          >
            Back
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button
              variant="blue"
              size="lg"
              onClick={handleNext}
              disabled={!stepValid[currentStep] || loading}
              rightIcon={<ChevronRight size={20} />}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="green"
              size="lg"
              onClick={handleComplete}
              disabled={loading}
              rightIcon={loading ? null : <Check size={20} />}
            >
              {loading ? 'Completing...' : 'Complete Onboarding'}
            </Button>
          )}
        </div>

        {/* Skip Button for Step 5 */}
        {currentStep === 5 && !formData.learningStyle && (
          <div className="text-center mt-4">
            <button
              onClick={handleComplete}
              disabled={loading}
              className="text-sm text-slate-500 hover:text-slate-700 underline"
            >
              Skip this step
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 1: Why are you here?
const StepOne = ({ selected, onSelect }) => (
  <div>
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-3">
        <GradientText>Welcome to Learnify!</GradientText>
      </h2>
      <p className="text-lg text-slate-600">
        Let's personalize your learning journey. Why are you here?
      </p>
    </div>

    <div className="space-y-3">
      {LEARNING_GOALS.map((goal) => {
        const Icon = goal.icon;
        const isSelected = selected === goal.id;

        return (
          <button
            key={goal.id}
            onClick={() => onSelect(goal.id)}
            className={cn(
              'w-full p-5 rounded-2xl border-2 transition-all duration-200',
              'flex items-start gap-4 text-left',
              'hover:shadow-lg hover:-translate-y-0.5',
              isSelected
                ? 'border-prism-blue-500 bg-prism-blue-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          >
            <div className={cn(
              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
              isSelected ? 'bg-prism-blue-500 text-white' : 'bg-slate-100 text-slate-600'
            )}>
              <Icon size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">{goal.label}</h3>
              <p className="text-sm text-slate-600">{goal.description}</p>
            </div>
            {isSelected && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-prism-blue-500 text-white flex items-center justify-center">
                <Check size={16} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

// Step 2: What interests you?
const StepTwo = ({ selected, onSelect }) => (
  <div>
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-3">
        What interests <GradientText>you?</GradientText>
      </h2>
      <p className="text-lg text-slate-600">
        Select at least one area. You can choose multiple!
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {INTEREST_AREAS.map((area) => {
        const isSelected = selected.includes(area.id);

        return (
          <button
            key={area.id}
            onClick={() => onSelect(area.id)}
            className={cn(
              'p-4 rounded-xl border-2 transition-all duration-200',
              'flex items-center gap-3 text-left',
              'hover:shadow-md hover:-translate-y-0.5',
              isSelected
                ? `border-prism-${area.color}-500 bg-prism-${area.color}-50`
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          >
            <div className="flex-1">
              <p className={cn(
                'font-semibold text-sm',
                isSelected ? `text-prism-${area.color}-700` : 'text-slate-700'
              )}>
                {area.label}
              </p>
            </div>
            <div className={cn(
              'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
              isSelected
                ? `border-prism-${area.color}-500 bg-prism-${area.color}-500`
                : 'border-slate-300'
            )}>
              {isSelected && <Check size={14} className="text-white" />}
            </div>
          </button>
        );
      })}
    </div>

    {selected.length > 0 && (
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          {selected.length} {selected.length === 1 ? 'area' : 'areas'} selected
        </p>
      </div>
    )}
  </div>
);

// Step 3: How old are you?
const StepThree = ({ selected, onSelect }) => (
  <div>
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-3">
        How old <GradientText>are you?</GradientText>
      </h2>
      <p className="text-lg text-slate-600">
        This helps us tailor content complexity to your level
      </p>
    </div>

    <div className="space-y-3">
      {AGE_GROUPS.map((group) => {
        const isSelected = selected === group.id;

        return (
          <button
            key={group.id}
            onClick={() => onSelect(group.id)}
            className={cn(
              'w-full p-5 rounded-2xl border-2 transition-all duration-200',
              'flex items-center gap-4 text-left',
              'hover:shadow-lg hover:-translate-y-0.5',
              isSelected
                ? 'border-prism-green-500 bg-prism-green-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          >
            <div className="text-3xl">{group.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">{group.label}</h3>
              <p className="text-sm text-slate-600">{group.description}</p>
            </div>
            {isSelected && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-prism-green-500 text-white flex items-center justify-center">
                <Check size={16} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

// Step 4: Time commitment
const StepFour = ({ selected, onSelect }) => (
  <div>
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-3">
        How much time can you <GradientText>commit?</GradientText>
      </h2>
      <p className="text-lg text-slate-600">
        Weekly time commitment helps us pace your learning
      </p>
    </div>

    <div className="space-y-3">
      {TIME_COMMITMENTS.map((commitment) => {
        const isSelected = selected === commitment.hours;

        return (
          <button
            key={commitment.id}
            onClick={() => onSelect(commitment.hours)}
            className={cn(
              'w-full p-5 rounded-2xl border-2 transition-all duration-200',
              'flex items-center gap-4 text-left',
              'hover:shadow-lg hover:-translate-y-0.5',
              isSelected
                ? 'border-prism-orange-500 bg-prism-orange-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          >
            <div className="text-3xl">{commitment.icon}</div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">{commitment.label}</h3>
              <p className="text-sm text-slate-600">{commitment.description}</p>
            </div>
            {isSelected && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-prism-orange-500 text-white flex items-center justify-center">
                <Check size={16} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

// Step 5: Learning style (optional)
const StepFive = ({ selected, onSelect }) => (
  <div>
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-3">
        What's your preferred <GradientText>learning style?</GradientText>
      </h2>
      <p className="text-lg text-slate-600">
        Optional - helps us recommend the best content format
      </p>
      <Badge variant="default" size="sm" className="mt-2">
        You can skip this step
      </Badge>
    </div>

    <div className="space-y-3">
      {LEARNING_STYLES.map((style) => {
        const isSelected = selected === style.id;

        return (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={cn(
              'w-full p-5 rounded-2xl border-2 transition-all duration-200',
              'flex items-center gap-4 text-left',
              'hover:shadow-lg hover:-translate-y-0.5',
              isSelected
                ? 'border-prism-blue-500 bg-prism-blue-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          >
            <div className="text-3xl">{style.icon}</div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">{style.label}</h3>
              <p className="text-sm text-slate-600">{style.description}</p>
            </div>
            {isSelected && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-prism-blue-500 text-white flex items-center justify-center">
                <Check size={16} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default OnboardingFlow;
