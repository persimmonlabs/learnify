import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Slider Component - Atomic Design
 * Range input slider
 */

const Slider = React.forwardRef(({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  step = 1,
  variant = 'blue',
  showValue = true,
  marks = [],
  className,
  ...props
}, ref) => {
  const variants = {
    blue: 'accent-prism-blue-600',
    green: 'accent-prism-green-600',
    orange: 'accent-prism-orange-500',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="relative">
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={onChange}
          className={cn(
            'w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer',
            variants[variant],
            'focus:outline-none focus:ring-2 focus:ring-prism-blue-400/20'
          )}
          {...props}
        />

        {/* Marks */}
        {marks.length > 0 && (
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            {marks.map((mark, i) => (
              <span key={i}>{mark}</span>
            ))}
          </div>
        )}
      </div>

      {showValue && (
        <div className="mt-2 text-sm font-semibold text-center text-slate-900">
          {value}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
