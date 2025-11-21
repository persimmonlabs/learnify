import React from 'react';
import { cn } from '../../utils/cn';

/**
 * ProgressBar Component - Atomic Design
 * Linear progress indicator
 */

const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4',
};

const progressVariants = {
  blue: 'bg-prism-blue-600',
  green: 'bg-prism-green-600',
  orange: 'bg-prism-orange-500',
  gradient: 'bg-gradient-to-r from-prism-blue-600 via-prism-green-500 to-prism-orange-500',
};

const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'blue',
  showLabel = false,
  animated = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-slate-100 rounded-full overflow-hidden',
        progressSizes[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            progressVariants[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showLabel && (
        <div className="mt-2 text-sm font-medium text-slate-600 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
