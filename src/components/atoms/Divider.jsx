import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Divider Component
 * Horizontal or vertical divider line
 */

const Divider = ({
  orientation = 'horizontal',
  spacing = 'md',
  className,
  ...props
}) => {
  const spacingClass = {
    sm: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    md: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    lg: orientation === 'horizontal' ? 'my-8' : 'mx-8',
    xl: orientation === 'horizontal' ? 'my-12' : 'mx-12',
  }[spacing];

  return (
    <div
      className={cn(
        'bg-slate-200',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        spacingClass,
        className
      )}
      {...props}
    />
  );
};

export default Divider;
