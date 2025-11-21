/**
 * Social Feed Page
 * "Strava for Brains" - Data-driven social learning
 * Includes friend request system with tabs
 */

import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Compass } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { mockFriends, mockCourses } from '../../config/mockData';
import {
  getMockFriendships,
  acceptFriendRequest,
  declineFriendRequest,
  sendFriendRequest,
  getUserFriends,
  getPendingRequests,
} from '../../config/mockFriendships';
import { filterFriendsByStatus, getFriendUserId, getMutualFriendsCount } from '../../utils/friendshipHelpers';
import SocialDashboardPage from '../../components/templates/SocialDashboardPage';
import FriendRequestCard from '../../components/molecules/FriendRequestCard';
import FriendCard from '../../components/molecules/FriendCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/atoms/Tabs';
import Badge from '../../components/atoms/Badge';
import Spinner from '../../components/atoms/Spinner';
import Card from '../../components/atoms/Card';
import Text from '../../components/atoms/Text';

const SocialFeedPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allFriends, setAllFriends] = useState([]);
  const [friendActivity, setFriendActivity] = useState([]);
  const [activeTab, setActiveTab] = useState('feed');

  // Friend request state
  const [friendships, setFriendships] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch feed data
        const feedResponse = await api.getFeed();

        // Use real API data if available, fallback to mock
        if (feedResponse.success && feedResponse.data.activities) {
          setFriendActivity(feedResponse.data.activities);
        } else {
          // Fallback to mock data if API fails
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
          ];
          setFriendActivity(dataActivity);
        }

        // Set all friends for discover tab
        setAllFriends(mockFriends);

        // Load friendships from mock
        loadFriendships();
      } catch (error) {
        console.error('Failed to fetch social data:', error);
        // Use mock data on error
        setAllFriends(mockFriends);
        setFriendActivity([]);
        loadFriendships();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load friendships data
  const loadFriendships = () => {
    const allFriendships = getMockFriendships();
    setFriendships(allFriendships);

    // Get current user's friends
    const userFriends = getUserFriends(user?.id || 'user-1');
    setMyFriends(userFriends);

    // Get pending requests for current user
    const requests = getPendingRequests(user?.id || 'user-1');
    setPendingRequests(requests);
  };

  // Handle accepting friend request
  const handleAcceptRequest = async (requestId) => {
    try {
      const result = acceptFriendRequest(requestId);

      if (result.success) {
        // Reload friendships
        loadFriendships();

        // Show success message (could use toast here)
        console.log('Friend request accepted!');
      } else {
        console.error('Failed to accept request:', result.error);
      }
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  // Handle declining friend request
  const handleDeclineRequest = async (requestId) => {
    try {
      const result = declineFriendRequest(requestId);

      if (result.success) {
        // Reload friendships
        loadFriendships();

        // Show success message
        console.log('Friend request declined');
      } else {
        console.error('Failed to decline request:', result.error);
      }
    } catch (error) {
      console.error('Failed to decline friend request:', error);
    }
  };

  // Handle sending friend request
  const handleSendRequest = async (friendId) => {
    try {
      const result = sendFriendRequest(user?.id || 'user-1', friendId);

      if (result.success) {
        // Reload friendships
        loadFriendships();

        // Show success message
        console.log('Friend request sent!');
      } else {
        console.error('Failed to send request:', result.error);
      }
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  // Handle follow/unfollow (for discover tab)
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

  // Get friend details from friendship record
  const getFriendDetails = (friendshipRecord) => {
    const friendId = getFriendUserId(friendshipRecord, user?.id || 'user-1');
    return mockFriends.find((f) => f.id === friendId);
  };

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
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Social Feed</h1>
          <p className="text-slate-600">Connect with learners and track your progress</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab}>
          {/* Tabs Navigation */}
          <TabsList className="mb-8">
            <TabsTrigger value="feed">
              <div className="flex items-center gap-2">
                <Compass size={18} />
                <span>Feed</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="friends">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Friends</span>
                {myFriends.length > 0 && (
                  <Badge variant="blue" size="sm">
                    {myFriends.length}
                  </Badge>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="requests">
              <div className="flex items-center gap-2">
                <UserPlus size={18} />
                <span>Requests</span>
                {pendingRequests.length > 0 && (
                  <Badge variant="orange" size="sm" dot>
                    {pendingRequests.length}
                  </Badge>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="discover">
              <span>Discover</span>
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed">
            <SocialDashboardPage
              inProgressCourses={inProgressCourses}
              trendingCourses={trendingCourses}
              friendCourses={friendCourses}
              recommendedCourses={recommendedCourses}
              friendActivity={friendActivity}
              suggestedFriends={allFriends.slice(0, 3)}
              allFriends={allFriends}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchClear={handleSearchClear}
              filteredFriends={filteredFriends}
              onFollow={handleFollow}
              onMessage={handleMessage}
            />
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends">
            {myFriends.length === 0 ? (
              <Card padding="xl" className="text-center">
                <Users size={48} className="mx-auto text-slate-300 mb-4" />
                <Text variant="h3" className="mb-2">
                  No friends yet
                </Text>
                <Text variant="body" className="text-slate-500 mb-6">
                  Start connecting with other learners
                </Text>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myFriends.map((friendship) => {
                  const friendDetails = getFriendDetails(friendship);
                  if (!friendDetails) return null;

                  return (
                    <FriendCard
                      key={friendship.id}
                      user={friendDetails}
                      isFollowing={friendDetails.isFollowing}
                      currentCourse={friendDetails.currentCourse}
                      stats={friendDetails.stats}
                      onFollow={() => handleFollow(friendDetails.id)}
                      onMessage={() => handleMessage(friendDetails.id)}
                    />
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            {pendingRequests.length === 0 ? (
              <Card padding="xl" className="text-center">
                <UserPlus size={48} className="mx-auto text-slate-300 mb-4" />
                <Text variant="h3" className="mb-2">
                  No pending requests
                </Text>
                <Text variant="body" className="text-slate-500">
                  You have no friend requests at the moment
                </Text>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => {
                  const requesterDetails = getFriendDetails(request);
                  if (!requesterDetails) return null;

                  const mutualFriends = getMutualFriendsCount(
                    user?.id || 'user-1',
                    requesterDetails.id,
                    friendships
                  );

                  return (
                    <FriendRequestCard
                      key={request.id}
                      user={requesterDetails}
                      friendship={request}
                      mutualFriendsCount={mutualFriends}
                      onAccept={handleAcceptRequest}
                      onDecline={handleDeclineRequest}
                    />
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-prism-blue-500"
              />
            </div>

            {filteredFriends.length === 0 ? (
              <Card padding="xl" className="text-center">
                <Text variant="body" className="text-slate-500">
                  No users found
                </Text>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFriends.map((friend) => (
                  <FriendCard
                    key={friend.id}
                    user={friend}
                    isFollowing={friend.isFollowing}
                    currentCourse={friend.currentCourse}
                    stats={friend.stats}
                    onFollow={() => handleFollow(friend.id)}
                    onMessage={() => handleMessage(friend.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialFeedPage;
