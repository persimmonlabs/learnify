/**
 * Edit Profile Page
 * Comprehensive profile editing with all onboarding fields, privacy settings, and subscription info
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
import Select from '../../components/atoms/Select';
import Textarea from '../../components/atoms/Textarea';
import Toggle from '../../components/atoms/Toggle';
import Badge from '../../components/atoms/Badge';
import Spinner from '../../components/atoms/Spinner';
import Toast from '../../components/atoms/Toast';
import Divider from '../../components/atoms/Divider';
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  BookOpen,
  Heart,
  Clock,
  GraduationCap,
  Eye,
  Shield,
  CreditCard,
  BarChart3,
  Users,
  Calendar,
  CheckCircle
} from 'lucide-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user: currentUser, updateUser, getSubscriptionInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    avatar: '',
    bio: '',

    // Learning Preferences (from onboarding)
    learningGoal: '',
    interests: [],
    ageGroup: '',
    timeCommitment: '',
    learningStyle: '',

    // Privacy Settings
    profileVisibility: 'public',
    courseVisibility: 'public',
    activityVisibility: 'public',
    allowFriendRequests: true,
    showInLeaderboards: true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile();
        if (response.success) {
          const userData = response.data;
          const initialData = {
            name: userData.name || '',
            email: userData.email || '',
            avatar: userData.avatar || '',
            bio: userData.bio || '',
            learningGoal: userData.learningGoal || '',
            interests: userData.interests || [],
            ageGroup: userData.ageGroup || '',
            timeCommitment: userData.timeCommitment || '',
            learningStyle: userData.learningStyle || '',
            profileVisibility: userData.privacySettings?.profileVisibility || 'public',
            courseVisibility: userData.privacySettings?.courseVisibility || 'public',
            activityVisibility: userData.privacySettings?.activityVisibility || 'public',
            allowFriendRequests: userData.privacySettings?.allowFriendRequests !== false,
            showInLeaderboards: userData.privacySettings?.showInLeaderboards !== false,
          };
          setFormData(initialData);
          setOriginalData(initialData);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setToast({ variant: 'error', title: 'Error', message: 'Failed to load profile data' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Check if form has changes
  useEffect(() => {
    if (originalData) {
      const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
      setHasChanges(changed);
    }
  }, [formData, originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const validateForm = () => {
    // Name is required
    if (!formData.name.trim()) {
      setToast({ variant: 'error', title: 'Validation Error', message: 'Name is required' });
      return false;
    }

    // At least one interest must be selected
    if (formData.interests.length === 0) {
      setToast({ variant: 'error', title: 'Validation Error', message: 'Please select at least one interest' });
      return false;
    }

    // Bio max length check (already enforced by textarea maxLength)
    if (formData.bio.length > 500) {
      setToast({ variant: 'error', title: 'Validation Error', message: 'Bio must be 500 characters or less' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      // Prepare data for API
      const updateData = {
        name: formData.name,
        avatar: formData.avatar,
        bio: formData.bio,
        learningGoal: formData.learningGoal,
        interests: formData.interests,
        ageGroup: formData.ageGroup,
        timeCommitment: formData.timeCommitment,
        learningStyle: formData.learningStyle,
        privacySettings: {
          profileVisibility: formData.profileVisibility,
          courseVisibility: formData.courseVisibility,
          activityVisibility: formData.activityVisibility,
          allowFriendRequests: formData.allowFriendRequests,
          showInLeaderboards: formData.showInLeaderboards,
        },
      };

      const response = await api.updateProfile(updateData);

      if (response.success) {
        // Update auth context with new user data
        updateUser(response.data);
        setOriginalData(formData);
        setHasChanges(false);
        setToast({
          variant: 'success',
          title: 'Success',
          message: 'Profile updated successfully'
        });

        // Navigate back to profile after short delay
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        setToast({
          variant: 'error',
          title: 'Error',
          message: response.error || 'Failed to update profile'
        });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setToast({
        variant: 'error',
        title: 'Error',
        message: 'Failed to update profile. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmDiscard = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirmDiscard) return;
    }
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  const subscriptionInfo = getSubscriptionInfo();

  // Options for dropdowns
  const learningGoalOptions = [
    { value: 'career', label: 'Career Growth' },
    { value: 'hobby', label: 'Personal Hobby' },
    { value: 'school', label: 'School/Academic' },
    { value: 'curiosity', label: 'General Curiosity' },
  ];

  const interestOptions = [
    'Programming', 'Data Science', 'Business', 'Finance',
    'Design', 'Science', 'History', 'Health', 'Languages'
  ];

  const ageGroupOptions = [
    { value: 'elementary', label: 'Elementary School' },
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' },
    { value: 'college', label: 'College/University' },
    { value: 'professional', label: 'Professional' },
  ];

  const timeCommitmentOptions = [
    { value: '2-4', label: '2-4 hours per week' },
    { value: '5-8', label: '5-8 hours per week' },
    { value: '10+', label: '10+ hours per week' },
  ];

  const learningStyleOptions = [
    { value: 'visual', label: 'Visual Learner' },
    { value: 'hands-on', label: 'Hands-on Learner' },
    { value: 'reading', label: 'Reading/Writing' },
    { value: 'mixed', label: 'Mixed Approach' },
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'private', label: 'Private' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="lg">
        {/* Toast Notifications */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 max-w-md">
            <Toast
              variant={toast.variant}
              title={toast.title}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="md"
            leftIcon={<ArrowLeft size={20} />}
            onClick={handleCancel}
          >
            Back to Profile
          </Button>
          {hasChanges && (
            <Badge variant="warning" size="md">
              Unsaved Changes
            </Badge>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <Text variant="h1" className="mb-2">
            Edit Profile
          </Text>
          <Text variant="body-lg" color="muted" className="mb-8">
            Update your personal information, learning preferences, and privacy settings
          </Text>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Information */}
            <Card variant="elevated">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-prism-blue-100 rounded-lg">
                  <User size={24} className="text-prism-blue-600" />
                </div>
                <div>
                  <Text variant="h3">Personal Information</Text>
                  <Text variant="caption" color="muted">Your basic profile details</Text>
                </div>
              </div>

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

              <div className="space-y-4">
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
                    disabled
                    placeholder="john@example.com"
                    leftIcon={<Mail size={20} />}
                  />
                  <Text variant="caption" color="muted" className="mt-1">
                    Contact support to change your email address
                  </Text>
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">
                    Bio / Description
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    maxLength={500}
                    showCount
                  />
                  <Text variant="caption" color="muted" className="mt-1">
                    Share your interests, goals, or what you're learning
                  </Text>
                </div>
              </div>
            </Card>

            {/* Section 2: Learning Preferences */}
            <Card variant="elevated">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-prism-green-100 rounded-lg">
                  <BookOpen size={24} className="text-prism-green-600" />
                </div>
                <div>
                  <Text variant="h3">Learning Preferences</Text>
                  <Text variant="caption" color="muted">Customize your learning experience</Text>
                </div>
              </div>

              <div className="space-y-4">
                {/* Learning Goal */}
                <div>
                  <label htmlFor="learningGoal" className="block text-sm font-medium text-slate-700 mb-2">
                    Why are you here?
                  </label>
                  <Select
                    id="learningGoal"
                    name="learningGoal"
                    value={formData.learningGoal}
                    onChange={handleChange}
                    options={learningGoalOptions}
                    placeholder="Select your primary goal"
                    icon={<Heart size={20} />}
                  />
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    What interests you? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map((interest) => (
                      <label
                        key={interest}
                        className={`
                          flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all
                          ${formData.interests.includes(interest)
                            ? 'border-prism-blue-400 bg-prism-blue-50'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="w-4 h-4 text-prism-blue-600 rounded"
                        />
                        <span className="text-sm font-medium">{interest}</span>
                      </label>
                    ))}
                  </div>
                  {formData.interests.length === 0 && (
                    <Text variant="caption" color="error" className="mt-1">
                      Please select at least one interest
                    </Text>
                  )}
                </div>

                {/* Age Group */}
                <div>
                  <label htmlFor="ageGroup" className="block text-sm font-medium text-slate-700 mb-2">
                    Age Group
                  </label>
                  <Select
                    id="ageGroup"
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleChange}
                    options={ageGroupOptions}
                    placeholder="Select your age group"
                    icon={<GraduationCap size={20} />}
                  />
                </div>

                {/* Time Commitment */}
                <div>
                  <label htmlFor="timeCommitment" className="block text-sm font-medium text-slate-700 mb-2">
                    Time Commitment
                  </label>
                  <Select
                    id="timeCommitment"
                    name="timeCommitment"
                    value={formData.timeCommitment}
                    onChange={handleChange}
                    options={timeCommitmentOptions}
                    placeholder="How much time can you dedicate?"
                    icon={<Clock size={20} />}
                  />
                </div>

                {/* Learning Style */}
                <div>
                  <label htmlFor="learningStyle" className="block text-sm font-medium text-slate-700 mb-2">
                    Learning Style
                  </label>
                  <Select
                    id="learningStyle"
                    name="learningStyle"
                    value={formData.learningStyle}
                    onChange={handleChange}
                    options={learningStyleOptions}
                    placeholder="How do you learn best?"
                    icon={<BookOpen size={20} />}
                  />
                </div>
              </div>
            </Card>

            {/* Section 3: Privacy Settings */}
            <Card variant="elevated">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-prism-orange-100 rounded-lg">
                  <Shield size={24} className="text-prism-orange-600" />
                </div>
                <div>
                  <Text variant="h3">Privacy Settings</Text>
                  <Text variant="caption" color="muted">Control who can see your information</Text>
                </div>
              </div>

              <div className="space-y-4">
                {/* Profile Visibility */}
                <div>
                  <label htmlFor="profileVisibility" className="block text-sm font-medium text-slate-700 mb-2">
                    Profile Visibility
                  </label>
                  <Select
                    id="profileVisibility"
                    name="profileVisibility"
                    value={formData.profileVisibility}
                    onChange={handleChange}
                    options={visibilityOptions}
                    icon={<Eye size={20} />}
                  />
                  <Text variant="caption" color="muted" className="mt-1">
                    Who can view your profile page
                  </Text>
                </div>

                {/* Course Visibility */}
                <div>
                  <label htmlFor="courseVisibility" className="block text-sm font-medium text-slate-700 mb-2">
                    Course Visibility
                  </label>
                  <Select
                    id="courseVisibility"
                    name="courseVisibility"
                    value={formData.courseVisibility}
                    onChange={handleChange}
                    options={visibilityOptions}
                    icon={<BookOpen size={20} />}
                  />
                  <Text variant="caption" color="muted" className="mt-1">
                    Who can see your enrolled courses
                  </Text>
                </div>

                {/* Activity Visibility */}
                <div>
                  <label htmlFor="activityVisibility" className="block text-sm font-medium text-slate-700 mb-2">
                    Activity Visibility
                  </label>
                  <Select
                    id="activityVisibility"
                    name="activityVisibility"
                    value={formData.activityVisibility}
                    onChange={handleChange}
                    options={visibilityOptions}
                    icon={<BarChart3 size={20} />}
                  />
                  <Text variant="caption" color="muted" className="mt-1">
                    Who can see your learning activity
                  </Text>
                </div>

                <Divider className="my-4" />

                {/* Allow Friend Requests */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Text variant="body-md" className="font-medium">
                      Allow Friend Requests
                    </Text>
                    <Text variant="caption" color="muted">
                      Let other users send you friend requests
                    </Text>
                  </div>
                  <Toggle
                    checked={formData.allowFriendRequests}
                    onChange={(value) => handleToggle('allowFriendRequests', value)}
                    variant="blue"
                  />
                </div>

                {/* Show in Leaderboards */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Text variant="body-md" className="font-medium">
                      Show in Leaderboards
                    </Text>
                    <Text variant="caption" color="muted">
                      Display your name and ranking in course leaderboards
                    </Text>
                  </div>
                  <Toggle
                    checked={formData.showInLeaderboards}
                    onChange={(value) => handleToggle('showInLeaderboards', value)}
                    variant="blue"
                  />
                </div>
              </div>
            </Card>

            {/* Section 4: Subscription & Account (Read-only) */}
            {subscriptionInfo && (
              <Card variant="elevated">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <CreditCard size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <Text variant="h3">Subscription & Account</Text>
                    <Text variant="caption" color="muted">Your current plan and usage</Text>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Current Tier */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Text variant="body-sm" color="muted" className="mb-1">
                        Current Plan
                      </Text>
                      <Badge
                        variant={subscriptionInfo.tier === 'pro' ? 'orange' : subscriptionInfo.tier === 'plus' ? 'blue' : 'default'}
                        size="lg"
                      >
                        {subscriptionInfo.tier.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Courses Used */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Text variant="body-sm" color="muted" className="mb-1">
                      Courses This Month
                    </Text>
                    <div className="flex items-baseline gap-2">
                      <Text variant="h2" className="text-prism-blue-600">
                        {subscriptionInfo.coursesUsed}
                      </Text>
                      <Text variant="body-lg" color="muted">
                        / {subscriptionInfo.courseLimit === Infinity ? '∞' : subscriptionInfo.courseLimit}
                      </Text>
                    </div>
                  </div>

                  {/* Renewal Date */}
                  {subscriptionInfo.renewsOn && (
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Text variant="body-sm" color="muted" className="mb-1">
                        Subscription Renews
                      </Text>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-600" />
                        <Text variant="body-md">
                          {new Date(subscriptionInfo.renewsOn).toLocaleDateString()}
                        </Text>
                      </div>
                    </div>
                  )}

                  {/* Upgrade Button */}
                  {subscriptionInfo.tier !== 'pro' && (
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      fullWidth
                      onClick={() => navigate('/pricing')}
                    >
                      Upgrade Plan
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {/* Section 5: Learning Stats (Read-only) */}
            <Card variant="elevated">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-prism-green-100 rounded-lg">
                  <BarChart3 size={24} className="text-prism-green-600" />
                </div>
                <div>
                  <Text variant="h3">Learning Statistics</Text>
                  <Text variant="caption" color="muted">Your learning journey so far</Text>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Total Courses */}
                <div className="p-4 bg-prism-blue-50 rounded-lg">
                  <BookOpen size={20} className="text-prism-blue-600 mb-2" />
                  <Text variant="h3" className="text-prism-blue-600">
                    {currentUser?.enrolledCourses?.length || 0}
                  </Text>
                  <Text variant="caption" color="muted">
                    Courses Enrolled
                  </Text>
                </div>

                {/* Completed Courses */}
                <div className="p-4 bg-prism-green-50 rounded-lg">
                  <CheckCircle size={20} className="text-prism-green-600 mb-2" />
                  <Text variant="h3" className="text-prism-green-600">
                    {currentUser?.completedCourses || 0}
                  </Text>
                  <Text variant="caption" color="muted">
                    Completed
                  </Text>
                </div>

                {/* Friends */}
                <div className="p-4 bg-prism-orange-50 rounded-lg">
                  <Users size={20} className="text-prism-orange-600 mb-2" />
                  <Text variant="h3" className="text-prism-orange-600">
                    {currentUser?.friendCount || 0}
                  </Text>
                  <Text variant="caption" color="muted">
                    Friends
                  </Text>
                </div>

                {/* Join Date */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Calendar size={20} className="text-purple-600 mb-2" />
                  <Text variant="body-md" className="text-purple-600 font-bold">
                    {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                  </Text>
                  <Text variant="caption" color="muted">
                    Member Since
                  </Text>
                </div>
              </div>
            </Card>

            {/* Form Actions */}
            <Card variant="elevated">
              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  leftIcon={<Save size={20} />}
                  disabled={saving || !hasChanges}
                  fullWidth
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default EditProfilePage;
