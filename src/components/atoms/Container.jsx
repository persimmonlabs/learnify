import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Container Component
 * Provides consistent max-width and padding
 */

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
};

const Container = ({
  children,
  size = 'lg',
  padding = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        containerSizes[size],
        padding && 'px-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
