/**
 * Login Page
 * User authentication page
 */

import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Container from '../../components/atoms/Container';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Text from '../../components/atoms/Text';
import Alert from '../../components/atoms/Alert';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const learningGoal = location.state?.learningGoal;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // If user came from landing page with a learning goal, go to onboarding
      if (learningGoal) {
        navigate('/onboarding', { state: { learningGoal } });
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error || 'Login failed. Please try again.');
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
              Welcome Back
            </Text>
            <Text variant="body-lg" color="muted">
              Sign in to continue your learning journey
            </Text>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6">
              <Alert variant="error" title="Login Failed">
                {error}
              </Alert>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-prism-blue-600 focus:ring-prism-blue-500"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-prism-blue-600 hover:text-prism-blue-700">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="xl" fullWidth disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Login */}
          <div className="mt-6 p-4 bg-prism-blue-50 rounded-xl">
            <Text variant="caption" color="muted" className="text-center mb-2">
              Demo credentials
            </Text>
            <div className="flex gap-2 text-xs">
              <code className="flex-1 p-2 bg-white rounded">student@learnify.com</code>
              <code className="flex-1 p-2 bg-white rounded">password123</code>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <Text variant="body-sm" color="muted">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-prism-blue-600 hover:text-prism-blue-700">
                Sign up
              </Link>
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
