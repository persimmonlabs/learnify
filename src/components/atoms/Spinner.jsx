import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Spinner Component
 * Loading indicator
 */

const spinnerSizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

const spinnerColors = {
  blue: 'border-prism-blue-200 border-t-prism-blue-600',
  orange: 'border-prism-orange-200 border-t-prism-orange-600',
  green: 'border-prism-green-200 border-t-prism-green-600',
  white: 'border-white/20 border-t-white',
  dark: 'border-slate-200 border-t-slate-900',
};

const Spinner = ({
  size = 'md',
  color = 'blue',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'inline-block rounded-full animate-spin',
        spinnerSizes[size],
        spinnerColors[color],
        className
      )}
      {...props}
    />
  );
};

export default Spinner;
