import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Badge Component - Atomic Design
 *
 * Variants:
 * - default, blue, orange, green, success, warning, error
 *
 * Sizes:
 * - sm, md, lg
 */

const badgeVariants = {
  default: 'bg-slate-100 text-slate-700 border-slate-200',
  blue: 'bg-prism-blue-50 text-prism-blue-700 border-prism-blue-200',
  orange: 'bg-prism-orange-50 text-prism-orange-700 border-prism-orange-200',
  green: 'bg-prism-green-50 text-prism-green-700 border-prism-green-200',
  success: 'bg-prism-green-50 text-prism-green-700 border-prism-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full border uppercase tracking-wide',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'blue' && 'bg-prism-blue-500 animate-pulse',
          variant === 'orange' && 'bg-prism-orange-500 animate-pulse',
          variant === 'green' && 'bg-prism-green-500 animate-pulse',
          variant === 'default' && 'bg-slate-500 animate-pulse',
        )} />
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
