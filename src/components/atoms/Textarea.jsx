import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Textarea Component - Atomic Design
 * Multi-line text input area
 */

const textareaVariants = {
  default: 'border-slate-200 focus:border-prism-blue-400 focus:ring-prism-blue-400/20',
  error: 'border-red-300 focus:border-red-400 focus:ring-red-400/20',
};

const textareaSizes = {
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-3 text-base rounded-xl',
  lg: 'px-5 py-4 text-lg rounded-xl',
};

const Textarea = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  fullWidth = true,
  rows = 4,
  maxLength,
  showCount = false,
  value,
  ...props
}, ref) => {
  const baseStyles = 'bg-white border-2 outline-none font-medium resize-y disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:ring-4';

  return (
    <div className={cn('relative', fullWidth && 'w-full')}>
      <textarea
        ref={ref}
        rows={rows}
        maxLength={maxLength}
        value={value}
        className={cn(
          baseStyles,
          textareaVariants[variant],
          textareaSizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
      {showCount && maxLength && (
        <div className="absolute bottom-2 right-2 text-xs text-slate-400 bg-white px-2 py-1 rounded">
          {(value?.length || 0)}/{maxLength}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
