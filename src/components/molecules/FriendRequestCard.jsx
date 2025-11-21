import React, { useState } from 'react';
import { Check, X, Users } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import { getTimeSince } from '../../utils/friendshipHelpers';

/**
 * FriendRequestCard Component - Molecule
 * Display a single friend request with accept/decline actions
 */

const FriendRequestCard = ({
  user,
  friendship,
  mutualFriendsCount = 0,
  onAccept,
  onDecline,
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null); // 'accept' or 'decline'

  const handleAccept = async () => {
    if (loading) return;

    setLoading(true);
    setActionType('accept');

    try {
      await onAccept?.(friendship.id);
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const handleDecline = async () => {
    if (loading) return;

    setLoading(true);
    setActionType('decline');

    try {
      await onDecline?.(friendship.id);
    } catch (error) {
      console.error('Failed to decline friend request:', error);
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const timeAgo = getTimeSince(friendship?.createdAt);

  return (
    <Card
      variant="elevated"
      padding="lg"
      className={cn('transition-all duration-300', className)}
      {...props}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-prism-blue-400 to-prism-green-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {user?.name?.[0] || 'U'}
          </div>

          {/* Online status indicator (optional) */}
          {user?.status === 'online' && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-prism-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name and archetype */}
          <div className="mb-2">
            <h3 className="font-bold text-slate-900 text-lg mb-1">
              {user?.name || 'Unknown User'}
            </h3>
            <p className="text-sm text-slate-500">
              {user?.archetype || 'Learner'}
            </p>
          </div>

          {/* Time and mutual friends */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs text-slate-400">
              {timeAgo}
            </span>

            {mutualFriendsCount > 0 && (
              <>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={14} className="text-prism-blue-500" />
                  <span>{mutualFriendsCount} mutual friend{mutualFriendsCount !== 1 ? 's' : ''}</span>
                </div>
              </>
            )}
          </div>

          {/* Current course (optional) */}
          {user?.currentCourse && (
            <div className="p-3 bg-slate-50 rounded-lg mb-4">
              <p className="text-xs text-slate-400 mb-1">Currently learning</p>
              <p className="text-sm font-medium text-slate-900 line-clamp-1">
                {user.currentCourse.title}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="green"
              size="sm"
              leftIcon={<Check size={16} />}
              onClick={handleAccept}
              disabled={loading}
              className="flex-1"
            >
              {loading && actionType === 'accept' ? 'Accepting...' : 'Accept'}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              leftIcon={<X size={16} />}
              onClick={handleDecline}
              disabled={loading}
              className="flex-1"
            >
              {loading && actionType === 'decline' ? 'Declining...' : 'Decline'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendRequestCard;
