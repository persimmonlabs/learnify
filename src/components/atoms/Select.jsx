import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Select Component - Atomic Design
 * Dropdown select input
 */

const selectVariants = {
  default: 'border-slate-200 focus:border-prism-blue-400 focus:ring-prism-blue-400/20',
  error: 'border-red-300 focus:border-red-400 focus:ring-red-400/20',
};

const selectSizes = {
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-3 text-base rounded-xl',
  lg: 'px-5 py-4 text-lg rounded-xl',
};

const Select = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  options = [],
  placeholder = 'Select...',
  icon,
  fullWidth = true,
  ...props
}, ref) => {
  const baseStyles = 'bg-white border-2 outline-none font-medium appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:ring-4';

  return (
    <div className={cn('relative', fullWidth && 'w-full')}>
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </span>
      )}
      <select
        ref={ref}
        className={cn(
          baseStyles,
          selectVariants[variant],
          selectSizes[size],
          icon && 'pl-11',
          'pr-10',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={20}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
