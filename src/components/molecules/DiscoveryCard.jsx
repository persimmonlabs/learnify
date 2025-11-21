/**
 * DiscoveryCard Component - Molecule
 * Enhanced friend card for discovery with mutual friends and shared interests
 */

import React, { useState } from 'react';
import { UserPlus, UserCheck, Clock, Check, Users as UsersIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Text from '../atoms/Text';

const DiscoveryCard = ({
  user,
  mutualFriendsCount = 0,
  mutualFriends = [],
  sharedCoursesCount = 0,
  friendshipStatus = 'none', // 'none' | 'pending_sent' | 'pending_received' | 'friends'
  onAddFriend,
  onAcceptRequest,
  onViewProfile,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  const getActionButton = () => {
    switch (friendshipStatus) {
      case 'friends':
        return (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Check size={16} />}
            disabled
            fullWidth
          >
            Friends
          </Button>
        );

      case 'pending_sent':
        return (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Clock size={16} />}
            disabled
            fullWidth
          >
            Request Sent
          </Button>
        );

      case 'pending_received':
        return (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<UserCheck size={16} />}
            onClick={() => handleAction(onAcceptRequest)}
            loading={isLoading}
            fullWidth
          >
            Accept Request
          </Button>
        );

      default:
        return (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<UserPlus size={16} />}
            onClick={() => handleAction(onAddFriend)}
            loading={isLoading}
            fullWidth
          >
            Add Friend
          </Button>
        );
    }
  };

  return (
    <Card
      variant="elevated"
      padding="lg"
      className={cn(
        'cursor-pointer hover:shadow-lg transition-all duration-200',
        className
      )}
      onClick={onViewProfile}
      {...props}
    >
      <div className="flex flex-col gap-4">
        {/* Avatar and Basic Info */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Online status indicator */}
            {user.status === 'online' && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-prism-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Text variant="h4" className="mb-1 truncate">
              {user.name}
            </Text>
            <Text variant="body-sm" color="muted" className="mb-2">
              @{user.username}
            </Text>
            <div className="flex items-center gap-2">
              <Badge variant="blue" size="sm">
                Level {user.level}
              </Badge>
              <Badge variant="secondary" size="sm">
                {user.archetype}
              </Badge>
            </div>
          </div>
        </div>

        {/* Current Course */}
        {user.currentCourse && (
          <div className="p-3 bg-slate-50 rounded-lg">
            <Text variant="caption" color="muted" className="mb-1">
              Currently learning
            </Text>
            <Text variant="body-sm" className="font-medium line-clamp-1">
              {user.currentCourse.title}
            </Text>
          </div>
        )}

        {/* Connection Info */}
        {(mutualFriendsCount > 0 || sharedCoursesCount > 0) && (
          <div className="space-y-2">
            {mutualFriendsCount > 0 && (
              <div className="flex items-center gap-2 text-slate-600">
                <UsersIcon size={16} className="text-prism-blue-500 shrink-0" />
                <Text variant="body-sm">
                  {mutualFriendsCount} mutual {mutualFriendsCount === 1 ? 'friend' : 'friends'}
                </Text>
              </div>
            )}

            {sharedCoursesCount > 0 && (
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-4 h-4 bg-prism-green-100 rounded flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-prism-green-500 rounded" />
                </div>
                <Text variant="body-sm">
                  {sharedCoursesCount} shared {sharedCoursesCount === 1 ? 'course' : 'courses'}
                </Text>
              </div>
            )}
          </div>
        )}

        {/* Mutual Friends Avatars (if any) */}
        {mutualFriends.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {mutualFriends.slice(0, 3).map((friend, index) => (
                <div
                  key={friend.id}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  style={{ zIndex: mutualFriends.length - index }}
                >
                  <img
                    src={friend.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Text variant="caption" color="muted">
              {mutualFriends.slice(0, 2).map(f => f.name.split(' ')[0]).join(', ')}
              {mutualFriends.length > 2 && ` +${mutualFriends.length - 2} more`}
            </Text>
          </div>
        )}

        {/* Action Button */}
        <div onClick={(e) => e.stopPropagation()}>
          {getActionButton()}
        </div>
      </div>
    </Card>
  );
};

export default DiscoveryCard;
