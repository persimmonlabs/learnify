import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Toggle Component - Atomic Design
 * Switch/toggle button
 */

const toggleSizes = {
  sm: 'w-8 h-5',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
};

const thumbSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const Toggle = React.forwardRef(({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'blue',
  className,
  ...props
}, ref) => {
  const variants = {
    blue: checked ? 'bg-prism-blue-600' : 'bg-slate-200',
    green: checked ? 'bg-prism-green-600' : 'bg-slate-200',
    orange: checked ? 'bg-prism-orange-500' : 'bg-slate-200',
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors duration-200',
        'focus:outline-none focus:ring-4 focus:ring-prism-blue-400/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        toggleSizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block rounded-full bg-white shadow-sm transition-transform duration-200',
          thumbSizes[size],
          checked ? 'translate-x-6' : 'translate-x-1',
          size === 'sm' && (checked ? 'translate-x-4' : 'translate-x-1'),
          size === 'lg' && (checked ? 'translate-x-7' : 'translate-x-1')
        )}
      />
    </button>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
