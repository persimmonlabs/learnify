/**
 * Profile Page
 * User profile display
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Badge from '../../components/atoms/Badge';
import ProgressRing from '../../components/molecules/ProgressRing';
import CourseCard from '../../components/molecules/CourseCard';
import Spinner from '../../components/atoms/Spinner';
import { ArrowLeft, Mail, Calendar, Trophy, BookOpen, Award } from 'lucide-react';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const isOwnProfile = !userId || userId === currentUser?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isOwnProfile) {
          const response = await api.getProfile();
          if (response.success) {
            setProfile(response.data);
          }
        } else {
          const response = await api.getUserProfile(userId);
          if (response.success) {
            setProfile(response.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, isOwnProfile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Text variant="body-lg" color="muted">
          Profile not found
        </Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" size="md" leftIcon={<ArrowLeft size={20} />} onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        {/* Profile Header */}
        <Card variant="elevated" className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={profile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.name}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-prism-blue-100"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Text variant="h1" className="mb-1">
                    {profile.name}
                  </Text>
                  <Text variant="body-lg" color="muted">
                    @{profile.username}
                  </Text>
                </div>
                {isOwnProfile && (
                  <Button variant="secondary" size="md" onClick={() => navigate('/profile/edit')}>
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail size={16} />
                  <Text variant="body-sm">{profile.email}</Text>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={16} />
                  <Text variant="body-sm">Joined {new Date(profile.joinedDate).toLocaleDateString()}</Text>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="primary">Level {profile.level}</Badge>
                <Badge variant="secondary">{profile.archetype}</Badge>
                <Badge variant="secondary">{profile.domain} Builder</Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card variant="elevated">
              <Text variant="h3" className="mb-4">
                Statistics
              </Text>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-prism-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen size={20} className="text-prism-blue-600" />
                    </div>
                    <div>
                      <Text variant="body-sm" color="muted">
                        Courses
                      </Text>
                      <Text variant="h4">12</Text>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-prism-green-100 rounded-lg flex items-center justify-center">
                      <Trophy size={20} className="text-prism-green-600" />
                    </div>
                    <div>
                      <Text variant="body-sm" color="muted">
                        Completed
                      </Text>
                      <Text variant="h4">8</Text>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ProgressRing value={68} size={40} variant="gradient" />
                    <div>
                      <Text variant="body-sm" color="muted">
                        Progress
                      </Text>
                      <Text variant="h4">68%</Text>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card variant="elevated">
              <Text variant="h3" className="mb-4">
                Achievements
              </Text>
              <div className="grid grid-cols-3 gap-4">
                {profile.badges?.map((badge) => (
                  <div
                    key={badge.id}
                    className={`text-center p-3 rounded-xl border-2 ${
                      badge.earned
                        ? 'border-prism-blue-200 bg-prism-blue-50'
                        : 'border-slate-200 bg-slate-50 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <Text variant="caption" className="font-medium">
                      {badge.name}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Courses */}
          <div className="lg:col-span-2">
            <Text variant="h3" className="mb-6">
              {isOwnProfile ? 'My Courses' : 'Enrolled Courses'}
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.courses?.slice(0, 4).map((course) => (
                <CourseCard key={course.id} {...course} onClick={() => navigate(`/courses/${course.id}`)} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
