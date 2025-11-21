import React from 'react';
import { cn } from '../../utils/cn';

/**
 * GradientText Component - Molecule
 * Animated gradient text effect
 */

const GradientText = ({
  children,
  animate = true,
  from = 'prism-blue-600',
  via = 'prism-green-500',
  to = 'prism-orange-500',
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'text-transparent bg-clip-text bg-gradient-to-r',
        `from-${from} via-${via} to-${to}`,
        animate && 'bg-[length:300%] animate-gradient',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default GradientText;
