/**
 * Register Page
 * User registration page with authentication redirect flow
 */

import React, { useState } from 'react';
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Container from '../../components/atoms/Container';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Text from '../../components/atoms/Text';
import Alert from '../../components/atoms/Alert';
import { Mail, Lock, User } from 'lucide-react';

/**
 * Sanitize return URL to prevent open redirect vulnerabilities
 * Only allow internal paths (starting with /)
 */
const sanitizeReturnUrl = (url) => {
  if (!url) return null;

  // Decode the URL
  const decodedUrl = decodeURIComponent(url);

  // Only allow internal paths (must start with / and not //)
  if (decodedUrl.startsWith('/') && !decodedUrl.startsWith('//')) {
    return decodedUrl;
  }

  return null;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { register } = useAuth();

  // Get return URL from query params or location state
  const returnToParam = searchParams.get('returnTo');
  const learningGoal = location.state?.learningGoal;
  const sanitizedReturnUrl = sanitizeReturnUrl(returnToParam);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    const result = await register(formData.email, formData.password, formData.username);

    if (result.success) {
      // Priority 1: Return to intended destination (course enrollment, etc.)
      if (sanitizedReturnUrl) {
        navigate(sanitizedReturnUrl);
        return;
      }

      // Priority 2: If user came from landing page with a learning goal, go to onboarding
      if (learningGoal) {
        navigate('/onboarding', { state: { learningGoal } });
        return;
      }

      // Priority 3: New users should go to onboarding
      navigate('/onboarding');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-prism-blue-50 via-white to-prism-orange-50 flex items-center justify-center py-12 px-4">
      <Container size="sm">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <Text variant="display-md" as="h1" className="mb-2">
              Create Account
            </Text>
            <Text variant="body-lg" color="muted">
              Start your learning journey today
            </Text>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6">
              <Alert variant="error" title="Registration Failed">
                {error}
              </Alert>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                leftIcon={<User size={20} />}
                size="lg"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                leftIcon={<Mail size={20} />}
                size="lg"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                leftIcon={<Lock size={20} />}
                size="lg"
                required
                minLength={8}
              />
              <Text variant="caption" color="muted" className="mt-1">
                Must be at least 8 characters long
              </Text>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                leftIcon={<Lock size={20} />}
                size="lg"
                required
                minLength={8}
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 rounded border-slate-300 text-prism-blue-600 focus:ring-prism-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
                I agree to the{' '}
                <Link to="/terms" className="text-prism-blue-600 hover:text-prism-blue-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-prism-blue-600 hover:text-prism-blue-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" variant="primary" size="xl" fullWidth disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <Text variant="body-sm" color="muted">
              Already have an account?{' '}
              <Link
                to={sanitizedReturnUrl ? `/login?returnTo=${encodeURIComponent(sanitizedReturnUrl)}` : '/login'}
                className="font-medium text-prism-blue-600 hover:text-prism-blue-700"
              >
                Sign in
              </Link>
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
