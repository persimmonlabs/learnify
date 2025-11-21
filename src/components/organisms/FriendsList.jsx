/**
 * FriendsList Component - Organism
 * Grid display of friend cards
 */

import React from 'react';
import FriendCard from '../molecules/FriendCard';
import Text from '../atoms/Text';
import { Users } from 'lucide-react';
import { cn } from '../../utils/cn';

const FriendsList = ({ friends = [], onFollow, onMessage, emptyMessage = 'No friends found', className }) => {
  if (friends.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-20', className)}>
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Users size={40} className="text-slate-400" />
        </div>
        <Text variant="h4" className="mb-2">
          {emptyMessage}
        </Text>
        <Text variant="body-sm" color="muted">
          Try searching for people or explore the discover tab
        </Text>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          user={friend}
          isFollowing={friend.isFollowing}
          currentCourse={friend.currentCourse}
          stats={friend.stats}
          onFollow={() => onFollow?.(friend.id)}
          onMessage={() => onMessage?.(friend.id)}
        />
      ))}
    </div>
  );
};

export default FriendsList;
