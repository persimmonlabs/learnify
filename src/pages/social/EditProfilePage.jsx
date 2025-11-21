/**
 * Edit Profile Page
 * User profile editing with form validation
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Input from '../../components/atoms/Input';
import Spinner from '../../components/atoms/Spinner';
import { ArrowLeft, Save, User, Mail, Briefcase, Target } from 'lucide-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user: currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    archetype: '',
    domain: '',
    avatar: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile();
        if (response.success) {
          setFormData({
            name: response.data.name || '',
            username: response.data.username || '',
            email: response.data.email || '',
            archetype: response.data.archetype || '',
            domain: response.data.domain || '',
            avatar: response.data.avatar || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.updateProfile(formData);
      if (response.success) {
        // Update auth context with new user data
        updateUser(response.data);
        // Navigate back to profile
        navigate('/profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="lg">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="md" leftIcon={<ArrowLeft size={20} />} onClick={() => navigate('/profile')}>
            Back to Profile
          </Button>
        </div>

        <Card variant="elevated" className="max-w-2xl mx-auto">
          <Text variant="h2" className="mb-2">
            Edit Profile
          </Text>
          <Text variant="body-md" color="muted" className="mb-8">
            Update your personal information and preferences
          </Text>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Preview */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-prism-blue-100"
                />
              </div>
            </div>

            {/* Avatar URL */}
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-slate-700 mb-2">
                Avatar URL
              </label>
              <Input
                id="avatar"
                name="avatar"
                type="url"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                leftIcon={<User size={20} />}
              />
              <Text variant="caption" color="muted" className="mt-1">
                Leave empty to use auto-generated avatar
              </Text>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                leftIcon={<User size={20} />}
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="johndoe"
                leftIcon={<User size={20} />}
              />
              <Text variant="caption" color="muted" className="mt-1">
                Your unique identifier on the platform
              </Text>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                leftIcon={<Mail size={20} />}
              />
            </div>

            {/* Archetype */}
            <div>
              <label htmlFor="archetype" className="block text-sm font-medium text-slate-700 mb-2">
                Archetype
              </label>
              <Input
                id="archetype"
                name="archetype"
                type="text"
                value={formData.archetype}
                onChange={handleChange}
                placeholder="The Builder"
                leftIcon={<Briefcase size={20} />}
              />
              <Text variant="caption" color="muted" className="mt-1">
                Your learning archetype (e.g., The Builder, The Allocator)
              </Text>
            </div>

            {/* Domain */}
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-slate-700 mb-2">
                Domain
              </label>
              <Input
                id="domain"
                name="domain"
                type="text"
                value={formData.domain}
                onChange={handleChange}
                placeholder="Software Engineering"
                leftIcon={<Target size={20} />}
              />
              <Text variant="caption" color="muted" className="mt-1">
                Your area of focus or interest
              </Text>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                leftIcon={<Save size={20} />}
                disabled={saving}
                fullWidth
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => navigate('/profile')}
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default EditProfilePage;
