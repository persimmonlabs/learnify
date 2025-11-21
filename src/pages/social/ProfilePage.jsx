/**
 * Profile Page
 * User profile display with friend context and privacy controls
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { mockFriends, mockCourses, mockUser } from '../../config/mockData';
import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Badge from '../../components/atoms/Badge';
import ProgressRing from '../../components/molecules/ProgressRing';
import CourseCard from '../../components/molecules/CourseCard';
import Spinner from '../../components/atoms/Spinner';
import { ArrowLeft, Mail, Calendar, Trophy, BookOpen, Award, UserPlus, UserCheck, Clock, Users, Lock, Check, MessageCircle } from 'lucide-react';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [friendshipStatus, setFriendshipStatus] = useState('none'); // 'none' | 'pending_sent' | 'pending_received' | 'friends'
  const [mutualFriends, setMutualFriends] = useState([]);
  const [isActioning, setIsActioning] = useState(false);

  const isOwnProfile = !userId || userId === currentUser?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isOwnProfile) {
          const response = await api.getProfile();
          if (response.success) {
            setProfile(response.data);
          } else {
            // Fallback to mock data
            setProfile({
              ...mockUser,
              courses: mockCourses.slice(0, 4),
              privacySettings: {
                courseVisibility: 'public',
                achievementVisibility: 'friends',
                activityVisibility: 'public',
              },
              friendCount: 6,
            });
          }
        } else {
          const response = await api.getUserProfile(userId);
          if (response.success) {
            setProfile(response.data);
          } else {
            // Fallback to mock data
            const mockProfile = mockFriends.find((f) => f.id === userId);
            if (mockProfile) {
              setProfile({
                ...mockProfile,
                email: `${mockProfile.username}@learnify.com`,
                joinedDate: '2024-03-01',
                courses: mockCourses.slice(0, 3),
                badges: mockUser.badges,
                privacySettings: {
                  courseVisibility: 'friends',
                  achievementVisibility: 'friends',
                  activityVisibility: 'public',
                },
                friendCount: Math.floor(Math.random() * 20) + 5,
              });
            }
          }

          // Fetch friendship status and mutual friends
          // Mock: Simulate different friendship statuses
          const mockFriendships = {
            'user-2': 'friends',
            'user-3': 'friends',
            'user-4': 'friends',
            'user-5': 'pending_sent',
            'user-7': 'pending_received',
            'user-8': 'friends',
          };

          const status = mockFriendships[userId] || 'none';
          setFriendshipStatus(status);

          // Calculate mutual friends
          if (status === 'friends' || status === 'pending_received') {
            const mutual = mockFriends
              .filter((f) => mockFriendships[f.id] === 'friends' && f.id !== userId)
              .slice(0, 5);
            setMutualFriends(mutual);
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

  // Privacy helper functions
  const canViewCourses = () => {
    if (isOwnProfile) return true;
    if (!profile?.privacySettings) return true; // Default: public

    const visibility = profile.privacySettings.courseVisibility;
    if (visibility === 'public') return true;
    if (visibility === 'friends' && friendshipStatus === 'friends') return true;
    return false;
  };

  const canViewAchievements = () => {
    if (isOwnProfile) return true;
    if (!profile?.privacySettings) return true; // Default: public

    const visibility = profile.privacySettings.achievementVisibility;
    if (visibility === 'public') return true;
    if (visibility === 'friends' && friendshipStatus === 'friends') return true;
    return false;
  };

  const handleFriendAction = async () => {
    if (isActioning) return;

    setIsActioning(true);
    try {
      if (friendshipStatus === 'none') {
        // Send friend request
        await api.followUser(userId); // Reusing follow endpoint for demo
        setFriendshipStatus('pending_sent');
      } else if (friendshipStatus === 'pending_received') {
        // Accept friend request
        await api.followUser(userId);
        setFriendshipStatus('friends');

        // Recalculate mutual friends
        const mutual = mockFriends.filter((f) => f.id !== userId).slice(0, 5);
        setMutualFriends(mutual);
      } else if (friendshipStatus === 'friends') {
        // Unfriend
        await api.unfollowUser(userId);
        setFriendshipStatus('none');
        setMutualFriends([]);
      }
    } catch (error) {
      console.error('Failed to perform friend action:', error);
    } finally {
      setIsActioning(false);
    }
  };

  const handleMessage = () => {
    console.log('Message user:', userId);
    // TODO: Implement messaging
  };

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

                {/* Action Buttons */}
                {isOwnProfile ? (
                  <Button variant="secondary" size="md" onClick={() => navigate('/profile/edit')}>
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    {friendshipStatus === 'none' && (
                      <Button
                        variant="primary"
                        size="md"
                        leftIcon={<UserPlus size={18} />}
                        onClick={handleFriendAction}
                        loading={isActioning}
                      >
                        Add Friend
                      </Button>
                    )}

                    {friendshipStatus === 'pending_sent' && (
                      <Button
                        variant="secondary"
                        size="md"
                        leftIcon={<Clock size={18} />}
                        disabled
                      >
                        Request Sent
                      </Button>
                    )}

                    {friendshipStatus === 'pending_received' && (
                      <Button
                        variant="primary"
                        size="md"
                        leftIcon={<UserCheck size={18} />}
                        onClick={handleFriendAction}
                        loading={isActioning}
                      >
                        Accept Request
                      </Button>
                    )}

                    {friendshipStatus === 'friends' && (
                      <>
                        <Button
                          variant="secondary"
                          size="md"
                          leftIcon={<Check size={18} />}
                          onClick={handleFriendAction}
                        >
                          Friends
                        </Button>
                        <Button
                          variant="ghost"
                          size="md"
                          onClick={handleMessage}
                        >
                          <MessageCircle size={18} />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                {isOwnProfile && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail size={16} />
                    <Text variant="body-sm">{profile.email}</Text>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={16} />
                  <Text variant="body-sm">Joined {new Date(profile.joinedDate).toLocaleDateString()}</Text>
                </div>
                {!isOwnProfile && profile.friendCount && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={16} />
                    <Text variant="body-sm">{profile.friendCount} friends</Text>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="primary">Level {profile.level}</Badge>
                <Badge variant="secondary">{profile.archetype}</Badge>
                {profile.domain && <Badge variant="secondary">{profile.domain} Builder</Badge>}
                {friendshipStatus === 'friends' && (
                  <Badge variant="blue" size="sm" icon={<Check size={12} />}>
                    Friends
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Mutual Friends Section */}
        {!isOwnProfile && mutualFriends.length > 0 && (
          <Card variant="elevated" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Text variant="h4">Mutual Friends</Text>
              <Badge variant="blue" size="sm">{mutualFriends.length}</Badge>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {mutualFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => navigate(`/profile/${friend.id}`)}
                >
                  <img
                    src={friend.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`}
                    alt={friend.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <Text variant="body-sm" className="font-medium">
                    {friend.name.split(' ')[0]}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        )}

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
            {canViewAchievements() ? (
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
            ) : (
              <Card variant="elevated">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Lock size={24} className="text-slate-400" />
                  </div>
                  <Text variant="h4" className="mb-2">
                    Private Achievements
                  </Text>
                  <Text variant="body-sm" color="muted">
                    {friendshipStatus === 'friends'
                      ? 'This user has hidden their achievements'
                      : 'Add this person as a friend to see their achievements'}
                  </Text>
                </div>
              </Card>
            )}
          </div>

          {/* Courses */}
          <div className="lg:col-span-2">
            <Text variant="h3" className="mb-6">
              {isOwnProfile ? 'My Courses' : 'Enrolled Courses'}
            </Text>

            {canViewCourses() ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.courses?.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} {...course} onClick={() => navigate(`/courses/${course.id}`)} />
                ))}
              </div>
            ) : (
              <Card variant="elevated">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Lock size={32} className="text-slate-400" />
                  </div>
                  <Text variant="h3" className="mb-2">
                    This Profile is Private
                  </Text>
                  <Text variant="body-lg" color="muted" className="mb-4 max-w-md">
                    {friendshipStatus === 'none'
                      ? 'Add this person as a friend to see their courses and learning progress'
                      : friendshipStatus === 'pending_sent'
                      ? 'Your friend request is pending. Once accepted, you can see their courses'
                      : 'This user has set their course visibility to private'}
                  </Text>
                  {friendshipStatus === 'none' && (
                    <Button
                      variant="primary"
                      size="md"
                      leftIcon={<UserPlus size={18} />}
                      onClick={handleFriendAction}
                      loading={isActioning}
                    >
                      Add Friend
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
