/**
 * Friend Discovery Page
 * Search and discover new friends with intelligent suggestions
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { mockFriends, mockCourses, mockUser } from '../../config/mockData';
import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/atoms/Tabs';
import Spinner from '../../components/atoms/Spinner';
import SearchBar from '../../components/molecules/SearchBar';
import DiscoveryCard from '../../components/molecules/DiscoveryCard';
import { Users, TrendingUp, UserPlus } from 'lucide-react';

const FriendDiscoveryPage = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendships, setFriendships] = useState({});
  const [activeTab, setActiveTab] = useState('suggested');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In real app, fetch from API
        // Mock: Initialize friendships for all users
        const mockFriendships = {};

        // Simulate friendship statuses
        mockFriendships['user-2'] = 'friends';
        mockFriendships['user-3'] = 'friends';
        mockFriendships['user-4'] = 'friends';
        mockFriendships['user-8'] = 'friends';
        mockFriendships['user-10'] = 'friends';
        mockFriendships['user-12'] = 'friends';

        // Simulate pending requests
        mockFriendships['user-5'] = 'pending_sent';
        mockFriendships['user-7'] = 'pending_received';

        // Calculate shared data for each user
        const usersWithMetadata = mockFriends.map((friend) => {
          // Calculate mutual friends
          const mutualFriends = mockFriends.filter(
            (f) =>
              f.id !== friend.id &&
              f.id !== currentUser?.id &&
              mockFriendships[f.id] === 'friends'
          ).slice(0, 3); // Top 3 mutual friends

          // Calculate shared courses
          const userCourses = [friend.currentCourse?.title, 'Advanced Algorithms', 'SQL Fundamentals'];
          const currentUserCourses = ['The Tennis Data Architect', 'SQL Fundamentals'];
          const sharedCourses = userCourses.filter(course => currentUserCourses.includes(course));

          // Check if same archetype/interests
          const sameArchetype = friend.archetype === mockUser.archetype;

          return {
            ...friend,
            mutualFriendsCount: mutualFriends.length,
            mutualFriends: mutualFriends.map(f => ({ id: f.id, name: f.name, avatar: f.avatar })),
            sharedCoursesCount: sharedCourses.length,
            sharedCourses,
            sameArchetype,
            friendshipStatus: mockFriendships[friend.id] || 'none',
          };
        });

        // Filter out current user
        const filteredUsers = usersWithMetadata.filter(u => u.id !== currentUser?.id);

        setAllUsers(filteredUsers);
        setFriendships(mockFriendships);

        // Get pending received requests
        const pendingRequests = filteredUsers.filter(u => u.friendshipStatus === 'pending_received');
        setFriendRequests(pendingRequests);

      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Suggested friends algorithm
  const suggestedFriends = useMemo(() => {
    // Exclude: self, existing friends, pending requests
    const candidates = allUsers.filter(
      (user) =>
        user.friendshipStatus !== 'friends' &&
        user.friendshipStatus !== 'pending_sent'
    );

    // Sort by priority:
    // 1. Mutual friends (highest priority)
    // 2. Shared courses
    // 3. Same archetype
    // 4. Similar level
    const scored = candidates.map((user) => {
      let score = 0;
      score += user.mutualFriendsCount * 10; // 10 points per mutual friend
      score += user.sharedCoursesCount * 5;  // 5 points per shared course
      score += user.sameArchetype ? 3 : 0;   // 3 points for same archetype

      // Proximity in level (within 3 levels)
      const levelDiff = Math.abs(user.level - (currentUser?.level || 12));
      if (levelDiff <= 3) {
        score += 2;
      }

      return { ...user, suggestionScore: score };
    });

    // Sort by score descending
    return scored.sort((a, b) => b.suggestionScore - a.suggestionScore);
  }, [allUsers, currentUser]);

  // Search filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username?.toLowerCase().includes(query) ||
        user.archetype?.toLowerCase().includes(query) ||
        user.currentCourse?.title?.toLowerCase().includes(query)
    );
  }, [allUsers, searchQuery]);

  const handleAddFriend = async (userId) => {
    try {
      // In real app: await api.sendFriendRequest(userId);
      console.log('Send friend request to:', userId);

      // Update local state
      setAllUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, friendshipStatus: 'pending_sent' } : user
        )
      );

      setFriendships((prev) => ({
        ...prev,
        [userId]: 'pending_sent',
      }));
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      // In real app: await api.acceptFriendRequest(userId);
      console.log('Accept friend request from:', userId);

      // Update local state
      setAllUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, friendshipStatus: 'friends' } : user
        )
      );

      setFriendships((prev) => ({
        ...prev,
        [userId]: 'friends',
      }));

      setFriendRequests((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  const tabs = [
    {
      id: 'suggested',
      label: 'Suggested',
      icon: <TrendingUp size={18} />,
      count: suggestedFriends.filter(u => u.friendshipStatus === 'none').length
    },
    {
      id: 'search',
      label: 'Search',
      icon: <Users size={18} />
    },
    {
      id: 'requests',
      label: 'Requests',
      icon: <UserPlus size={18} />,
      count: friendRequests.length
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            Discover Friends
          </Text>
          <Text variant="body-lg" color="muted">
            Connect with learners who share your interests
          </Text>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Content */}
        {activeTab === 'search' && (
          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by name, username, or interests..."
              className="max-w-2xl"
            />
          </div>
        )}

        {/* Suggested Friends */}
        {activeTab === 'suggested' && (
          <div>
            {suggestedFriends.filter(u => u.friendshipStatus === 'none').length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp size={40} className="text-slate-400" />
                </div>
                <Text variant="h4" className="mb-2">
                  No Suggestions Yet
                </Text>
                <Text variant="body-sm" color="muted">
                  Complete more courses to get personalized friend suggestions
                </Text>
              </div>
            ) : (
              <>
                <Text variant="h3" className="mb-6">
                  People You May Know
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedFriends
                    .filter(u => u.friendshipStatus === 'none')
                    .map((user) => (
                      <DiscoveryCard
                        key={user.id}
                        user={user}
                        mutualFriendsCount={user.mutualFriendsCount}
                        mutualFriends={user.mutualFriends}
                        sharedCoursesCount={user.sharedCoursesCount}
                        friendshipStatus={user.friendshipStatus}
                        onAddFriend={() => handleAddFriend(user.id)}
                        onAcceptRequest={() => handleAcceptRequest(user.id)}
                        onViewProfile={() => handleViewProfile(user.id)}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Search Results */}
        {activeTab === 'search' && (
          <div>
            {!searchQuery ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Users size={40} className="text-slate-400" />
                </div>
                <Text variant="h4" className="mb-2">
                  Search for Friends
                </Text>
                <Text variant="body-sm" color="muted">
                  Enter a name, username, or interest to find people
                </Text>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Users size={40} className="text-slate-400" />
                </div>
                <Text variant="h4" className="mb-2">
                  No Results Found
                </Text>
                <Text variant="body-sm" color="muted">
                  Try a different search term
                </Text>
              </div>
            ) : (
              <>
                <Text variant="h3" className="mb-6">
                  {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'}
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((user) => (
                    <DiscoveryCard
                      key={user.id}
                      user={user}
                      mutualFriendsCount={user.mutualFriendsCount}
                      mutualFriends={user.mutualFriends}
                      sharedCoursesCount={user.sharedCoursesCount}
                      friendshipStatus={user.friendshipStatus}
                      onAddFriend={() => handleAddFriend(user.id)}
                      onAcceptRequest={() => handleAcceptRequest(user.id)}
                      onViewProfile={() => handleViewProfile(user.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Friend Requests */}
        {activeTab === 'requests' && (
          <div>
            {friendRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <UserPlus size={40} className="text-slate-400" />
                </div>
                <Text variant="h4" className="mb-2">
                  No Pending Requests
                </Text>
                <Text variant="body-sm" color="muted">
                  When someone sends you a friend request, it will appear here
                </Text>
              </div>
            ) : (
              <>
                <Text variant="h3" className="mb-6">
                  Friend Requests ({friendRequests.length})
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {friendRequests.map((user) => (
                    <DiscoveryCard
                      key={user.id}
                      user={user}
                      mutualFriendsCount={user.mutualFriendsCount}
                      mutualFriends={user.mutualFriends}
                      sharedCoursesCount={user.sharedCoursesCount}
                      friendshipStatus={user.friendshipStatus}
                      onAddFriend={() => handleAddFriend(user.id)}
                      onAcceptRequest={() => handleAcceptRequest(user.id)}
                      onViewProfile={() => handleViewProfile(user.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default FriendDiscoveryPage;
