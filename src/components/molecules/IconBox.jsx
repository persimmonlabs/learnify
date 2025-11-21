import React from 'react';
import { cn } from '../../utils/cn';

/**
 * IconBox Component - Molecule
 * Icon container with background and styling
 */

const iconBoxSizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const iconBoxVariants = {
  blue: 'bg-prism-blue-100 text-prism-blue-600',
  orange: 'bg-prism-orange-100 text-prism-orange-600',
  green: 'bg-prism-green-100 text-prism-green-600',
  dark: 'bg-slate-900 text-white',
  light: 'bg-slate-100 text-slate-600',
  gradient: 'bg-gradient-to-br from-prism-blue-500 via-teal-400 to-prism-green-400 text-white',
};

const IconBox = ({
  children,
  variant = 'blue',
  size = 'md',
  rounded = '2xl',
  shadow = false,
  className,
  ...props
}) => {
  const roundedClass = rounded === '2xl' ? 'rounded-2xl' :
                       rounded === 'xl' ? 'rounded-xl' :
                       rounded === 'lg' ? 'rounded-lg' :
                       rounded === 'full' ? 'rounded-full' : 'rounded';

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0',
        iconBoxSizes[size],
        iconBoxVariants[variant],
        roundedClass,
        shadow && 'shadow-lg',
        variant === 'gradient' && 'shadow-glow-blue',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default IconBox;
