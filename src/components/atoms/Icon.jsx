import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Icon Wrapper Component
 * Provides consistent sizing and coloring for icons
 */

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
  '3xl': 'w-12 h-12',
};

const Icon = ({
  children,
  size = 'md',
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center shrink-0',
        iconSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Icon;
