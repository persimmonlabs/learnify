import React from 'react';
import {
  PlayCircle,
  CheckCircle,
  Trophy,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';
import { cn } from '../../utils/cn';
import Badge from '../atoms/Badge';

/**
 * ActivityItem Component - Molecule
 * Single activity item for the social ticker
 */

const activityIcons = {
  started_course: PlayCircle,
  completed_module: CheckCircle,
  passed_review: Trophy,
  earned_achievement: Award,
  optimized_code: TrendingUp,
};

const activityColors = {
  started_course: 'text-prism-blue-600',
  completed_module: 'text-prism-green-600',
  passed_review: 'text-prism-orange-600',
  earned_achievement: 'text-purple-600',
  optimized_code: 'text-prism-blue-600',
};

const ActivityItem = ({
  user,
  activityType,
  referenceTitle,
  metadata = {},
  timestamp,
  className,
  ...props
}) => {
  const Icon = activityIcons[activityType] || PlayCircle;
  const iconColor = activityColors[activityType] || 'text-slate-400';

  const getActivityText = () => {
    switch (activityType) {
      case 'started_course':
        return `started ${referenceTitle}`;
      case 'completed_module':
        return `completed ${referenceTitle}`;
      case 'passed_review':
        return `passed the Senior Review for ${referenceTitle}`;
      case 'earned_achievement':
        return `earned "${referenceTitle}"`;
      case 'optimized_code':
        return `optimized ${metadata.optimization || 'code'} in ${referenceTitle}`;
      default:
        return referenceTitle;
    }
  };

  const formatTimestamp = (ts) => {
    const now = new Date();
    const then = new Date(ts);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className={cn('flex items-start gap-3 py-3 border-b border-slate-100 last:border-0', className)} {...props}>
      {/* User Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-prism-blue-400 to-prism-green-400 flex items-center justify-center text-white font-semibold shrink-0">
        {user?.name?.[0] || 'U'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-900">
          <span className="font-semibold">{user?.name || 'Someone'}</span>
          {' '}
          <span className="text-slate-600">{getActivityText()}</span>
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock size={12} />
            {formatTimestamp(timestamp)}
          </span>

          {metadata.score && (
            <Badge variant="success" size="sm">
              {metadata.score}% score
            </Badge>
          )}

          {metadata.optimization && (
            <span className="text-xs text-prism-blue-600 font-medium">
              {metadata.optimization}
            </span>
          )}
        </div>
      </div>

      {/* Activity Icon */}
      <div className={cn('shrink-0', iconColor)}>
        <Icon size={20} />
      </div>
    </div>
  );
};

export default ActivityItem;
