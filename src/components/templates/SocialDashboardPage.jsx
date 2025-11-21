/**
 * SocialDashboardPage Template
 * "Strava for Brains" - Passive social with data-driven progress
 * Netflix-style rows + Activity feed + Friend discovery
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../atoms/Container';
import Text from '../atoms/Text';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { Users, Activity, TrendingUp, Sparkles, Clock, Award } from 'lucide-react';
import CourseRow from '../organisms/CourseRow';
import FriendsList from '../organisms/FriendsList';
import FriendSearch from '../organisms/FriendSearch';

const SocialDashboardPage = ({
  inProgressCourses = [],
  trendingCourses = [],
  friendCourses = [],
  recommendedCourses = [],
  friendActivity = [],
  suggestedFriends = [],
  allFriends = [],
  searchQuery = '',
  onSearchChange,
  onSearchClear,
  filteredFriends = [],
  onFollow,
  onMessage,
}) => {
  const navigate = useNavigate();
  const followingCount = allFriends.filter((f) => f.isFollowing).length;
  const onlineCount = allFriends.filter((f) => f.status === 'online').length;

  // Activity icon mapper
  const getActivityIcon = (type) => {
    switch (type) {
      case 'optimization':
        return <TrendingUp size={16} className="text-prism-orange-500" />;
      case 'completion':
        return <Award size={16} className="text-prism-green-500" />;
      case 'milestone':
        return <Sparkles size={16} className="text-prism-blue-500" />;
      default:
        return <Activity size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Container size="xl" className="py-8">
        {/* Header with Stats */}
        <div className="mb-6">
          <Text variant="display-md" as="h1" className="mb-2">
            Social
          </Text>
          <div className="flex items-center gap-4">
            <Badge variant="blue" size="md">
              <Users size={14} className="mr-1" />
              {followingCount} Following
            </Badge>
            <Badge variant="green" size="md" dot>
              {onlineCount} Online
            </Badge>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <FriendSearch
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onSearchClear}
            placeholder="Search architects by name, archetype, or what they're learning..."
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <Text variant="h3" className="mb-4">
              Search Results
              {filteredFriends.length > 0 && (
                <span className="ml-2 text-sm font-normal text-slate-500">({filteredFriends.length})</span>
              )}
            </Text>
            <FriendsList
              friends={filteredFriends}
              onFollow={onFollow}
              onMessage={onMessage}
              emptyMessage={`No architects found matching "${searchQuery}"`}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Netflix Rows */}
          <div className="lg:col-span-2 space-y-12">
            {/* Continue Learning Row */}
            {inProgressCourses.length > 0 && (
              <CourseRow
                title="Continue Learning"
                subtitle="Pick up where you left off"
                courses={inProgressCourses}
                onCourseClick={(id) => navigate(`/courses/${id}`)}
              />
            )}

            {/* Trending Among Architects Row */}
            {trendingCourses.length > 0 && (
              <CourseRow
                title="Trending Among Architects"
                subtitle={`Hot this week • ${trendingCourses.length} courses gaining velocity`}
                courses={trendingCourses}
                onCourseClick={(id) => navigate(`/courses/${id}`)}
              />
            )}

            {/* Your Friends Are Learning Row */}
            {friendCourses.length > 0 && (
              <CourseRow
                title="Your Friends Are Learning"
                subtitle={`${friendCourses[0]?.friendCount || 0} friends are taking these courses`}
                courses={friendCourses}
                onCourseClick={(id) => navigate(`/courses/${id}`)}
              />
            )}

            {/* Because You Mastered X Row */}
            {recommendedCourses.length > 0 && (
              <CourseRow
                title="Because You Mastered Loops"
                subtitle="Next logical step in your learning path"
                courses={recommendedCourses}
                onCourseClick={(id) => navigate(`/courses/${id}`)}
              />
            )}

            {/* Discover People Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={24} className="text-prism-orange-600" />
                <div>
                  <Text variant="h3">People to Follow</Text>
                  <Text variant="body-sm" color="muted">
                    Top architects in your network
                  </Text>
                </div>
              </div>
              <FriendsList
                friends={suggestedFriends.filter((f) => !f.isFollowing).slice(0, 3)}
                onFollow={onFollow}
                onMessage={onMessage}
                emptyMessage="No suggestions available"
              />
            </div>
          </div>

          {/* Sidebar - Activity Feed */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card variant="elevated" padding="none">
                {/* Header */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center gap-3 mb-1">
                    <Activity size={20} className="text-prism-blue-600" />
                    <Text variant="h4">The Ticker</Text>
                  </div>
                  <Text variant="body-sm" color="muted">
                    Live stream of friend progress
                  </Text>
                </div>

                {/* Activity List - Data-Driven */}
                <div className="max-h-[600px] overflow-y-auto">
                  {friendActivity.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity size={32} className="text-slate-400" />
                      </div>
                      <Text variant="h5" className="mb-2">
                        No Activity Yet
                      </Text>
                      <Text variant="body-sm" color="muted">
                        Follow architects to see their progress
                      </Text>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {friendActivity.map((activity, index) => (
                        <div key={activity.id || index} className="p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <img
                              src={
                                activity.user?.avatar ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user?.name}`
                              }
                              alt={activity.user?.name}
                              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <Text variant="body-sm" className="mb-1">
                                <strong className="font-semibold text-slate-900">{activity.user?.name}</strong>{' '}
                                {activity.action}
                              </Text>

                              {/* Data-driven achievement */}
                              {activity.details && (
                                <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 rounded-lg">
                                  {getActivityIcon(activity.type)}
                                  <Text variant="caption" className="font-mono text-slate-700">
                                    {activity.details}
                                  </Text>
                                </div>
                              )}

                              {/* Score badge if present */}
                              {activity.score && (
                                <Badge variant="green" size="sm" className="mt-2">
                                  {activity.score}% score
                                </Badge>
                              )}

                              {/* Timestamp */}
                              <div className="flex items-center gap-1 mt-2 text-slate-400">
                                <Clock size={12} />
                                <Text variant="caption" color="light">
                                  {activity.timestamp}
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SocialDashboardPage;
