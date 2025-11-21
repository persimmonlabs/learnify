/**
 * Social Feed Page
 * "Strava for Brains" - Data-driven social learning
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { mockFriends, mockCourses } from '../../config/mockData';
import SocialDashboardPage from '../../components/templates/SocialDashboardPage';
import Spinner from '../../components/atoms/Spinner';

const SocialFeedPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allFriends, setAllFriends] = useState([]);
  const [friendActivity, setFriendActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedResponse = await api.getFeed();

        // Use extended mock friends data
        setAllFriends(mockFriends);

        // Data-driven activity feed (Strava for Brains style)
        const dataActivity = [
          {
            id: 'act-1',
            user: { name: 'Sarah Chen', avatar: null },
            type: 'optimization',
            action: 'optimized algorithm complexity',
            details: 'O(n²) → O(n) in Module 3',
            score: 95,
            timestamp: '2h ago',
          },
          {
            id: 'act-2',
            user: { name: 'Marcus Rivera', avatar: null },
            type: 'completion',
            action: 'passed Senior Review',
            details: 'Architecture Score: 92%',
            score: 92,
            timestamp: '4h ago',
          },
          {
            id: 'act-3',
            user: { name: 'Priya Patel', avatar: null },
            type: 'milestone',
            action: 'completed The Allocator',
            details: '6 days • 7 modules',
            score: 88,
            timestamp: '6h ago',
          },
          {
            id: 'act-4',
            user: { name: 'Jordan Kim', avatar: null },
            type: 'optimization',
            action: 'reduced memory usage',
            details: '2GB → 512MB in Module 5',
            score: 96,
            timestamp: '8h ago',
          },
          {
            id: 'act-5',
            user: { name: 'Elena Volkov', avatar: null },
            type: 'completion',
            action: 'finished Market Mechanics',
            details: 'All exercises passed',
            score: 94,
            timestamp: '12h ago',
          },
          {
            id: 'act-6',
            user: { name: 'Alex Thompson', avatar: null },
            type: 'optimization',
            action: 'refactored database queries',
            details: '120ms → 15ms average',
            score: 97,
            timestamp: '1d ago',
          },
        ];

        setFriendActivity(dataActivity);
      } catch (error) {
        console.error('Failed to fetch social data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const friend = allFriends.find((f) => f.id === userId);
      if (!friend) return;

      if (friend.isFollowing) {
        await api.unfollowUser(userId);
      } else {
        await api.followUser(userId);
      }

      // Update local state
      setAllFriends((prev) =>
        prev.map((f) => (f.id === userId ? { ...f, isFollowing: !f.isFollowing } : f))
      );
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error);
    }
  };

  const handleMessage = (userId) => {
    console.log('Message user:', userId);
    // TODO: Implement messaging
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  // Filter friends based on search query
  const filteredFriends = allFriends.filter((friend) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      friend.name.toLowerCase().includes(query) ||
      friend.username?.toLowerCase().includes(query) ||
      friend.archetype?.toLowerCase().includes(query) ||
      friend.currentCourse?.title?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  // Netflix-style course rows
  const inProgressCourses = mockCourses.slice(0, 3).map((c) => ({ ...c, progress: 65 }));
  const trendingCourses = mockCourses.slice(3, 7);
  const friendCourses = mockCourses.slice(1, 4).map((c) => ({ ...c, friendCount: 3 }));
  const recommendedCourses = mockCourses.slice(4, 8);

  return (
    <SocialDashboardPage
      inProgressCourses={inProgressCourses}
      trendingCourses={trendingCourses}
      friendCourses={friendCourses}
      recommendedCourses={recommendedCourses}
      friendActivity={friendActivity}
      suggestedFriends={allFriends}
      allFriends={allFriends}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      filteredFriends={filteredFriends}
      onFollow={handleFollow}
      onMessage={handleMessage}
    />
  );
};

export default SocialFeedPage;
