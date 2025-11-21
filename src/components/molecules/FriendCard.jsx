import React from 'react';
import { UserPlus, UserCheck, MessageCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import ProgressRing from './ProgressRing';

/**
 * FriendCard Component - Molecule
 * User profile card with follow/message actions
 */

const FriendCard = ({
  user,
  isFollowing = false,
  currentCourse,
  stats = {},
  onFollow,
  onMessage,
  className,
  ...props
}) => {
  return (
    <Card
      variant="elevated"
      padding="lg"
      className={cn('', className)}
      {...props}
    >
      <div className="flex items-start gap-4">
        {/* Avatar + Progress Ring */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-prism-blue-400 to-prism-green-400 flex items-center justify-center text-white font-bold text-xl">
            {user?.name?.[0] || 'U'}
          </div>

          {currentCourse && (
            <div className="absolute -bottom-2 -right-2">
              <ProgressRing
                value={currentCourse.progress || 0}
                size={40}
                strokeWidth={4}
                variant="green"
                showLabel={false}
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 mb-1">{user?.name}</h3>
          <p className="text-sm text-slate-500 mb-3">
            {user?.archetype || 'Architect'} • {stats.coursesCompleted || 0} courses
          </p>

          {currentCourse && (
            <div className="p-2 bg-slate-50 rounded-lg mb-3">
              <p className="text-xs text-slate-400 mb-1">Currently learning</p>
              <p className="text-sm font-medium text-slate-900 line-clamp-1">
                {currentCourse.title}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant={isFollowing ? 'secondary' : 'primary'}
              size="sm"
              leftIcon={isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
              onClick={onFollow}
              fullWidth
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onMessage}
            >
              <MessageCircle size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendCard;
