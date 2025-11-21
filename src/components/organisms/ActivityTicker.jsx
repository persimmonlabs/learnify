import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import ActivityItem from '../molecules/ActivityItem';
import Spinner from '../atoms/Spinner';

/**
 * ActivityTicker Component - Organism
 * Live feed of friend activity (Strava for Brains)
 */

const ActivityTicker = ({
  activities = [],
  isLoading = false,
  onRefresh,
  className,
  ...props
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <Text variant="h4">Activity Feed</Text>
          <Text variant="caption">What your network is building</Text>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={cn(isRefreshing && 'animate-spin')} />
        </Button>
      </div>

      {/* Feed */}
      <div className="max-h-[600px] overflow-y-auto">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <Spinner size="lg" />
            <Text variant="body-sm" color="muted" className="mt-4">
              Loading activity...
            </Text>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">👥</div>
            <Text variant="h5" className="mb-2">No Activity Yet</Text>
            <Text variant="body-sm" color="muted">
              Follow friends to see their progress
            </Text>
          </div>
        ) : (
          <div className="p-6">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id || index}
                {...activity}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isLoading && activities.length > 0 && (
        <div className="p-4 border-t border-slate-100 text-center">
          <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            View All Activity →
          </button>
        </div>
      )}
    </Card>
  );
};

export default ActivityTicker;
