/**
 * Main App Component
 * Complete routing configuration for the Learnify application
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CourseCatalogPage from './pages/learn/CourseCatalogPage';
import LessonPage from './pages/learn/LessonPage';
import ExercisePage from './pages/learn/ExercisePage';
import DiagnosisPage from './pages/learn/DiagnosisPage';
import ProfilePage from './pages/social/ProfilePage';
import EditProfilePage from './pages/social/EditProfilePage';
import SocialFeedPage from './pages/social/SocialFeedPage';
import AboutPage from './pages/info/AboutPage';
import PrivacyPage from './pages/info/PrivacyPage';
import TermsPage from './pages/info/TermsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Protected Routes with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/courses/:courseId" element={<CourseCatalogPage />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
            <Route path="/diagnosis/:moduleId" element={<DiagnosisPage />} />
            <Route path="/social" element={<SocialFeedPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
          </Route>

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
