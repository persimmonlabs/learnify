/**
 * Onboarding Page Wrapper
 * Connects the onboarding template with routing and auth
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OnboardingTemplate from '../../components/templates/OnboardingPage';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeOnboarding } = useAuth();
  const learningGoal = location.state?.learningGoal;

  const handleComplete = async (onboardingData) => {
    console.log('Onboarding data:', onboardingData);
    console.log('Learning goal from landing:', learningGoal);

    const result = await completeOnboarding({
      archetype: onboardingData.metaCategory?.id,
      domain: onboardingData.domain,
      variables: onboardingData.variables,
      skillLevel: onboardingData.skillLevel?.id,
      learningGoal: learningGoal, // Store the learning goal
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      console.error('Onboarding failed:', result.error);
      // Still navigate to dashboard even if API call fails (mock environment)
      navigate('/dashboard');
    }
  };

  return <OnboardingTemplate onComplete={handleComplete} />;
};

export default OnboardingPage;
