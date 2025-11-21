import React from 'react';
import { cn } from '../../utils/cn';

/**
 * ProgressRing Component - Molecule
 * Circular progress indicator
 */

const ProgressRing = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'blue',
  showLabel = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variants = {
    blue: 'stroke-prism-blue-600',
    green: 'stroke-prism-green-600',
    orange: 'stroke-prism-orange-500',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-100"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-all duration-500 ease-out', variants[variant])}
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
