import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Input Component - Atomic Design
 *
 * Variants:
 * - default: Standard input
 * - error: Error state
 * - success: Success state
 *
 * Sizes:
 * - sm, md, lg
 */

const inputVariants = {
  default: 'border-slate-200 focus:border-prism-blue-400 focus:ring-prism-blue-400/20',
  error: 'border-red-300 focus:border-red-400 focus:ring-red-400/20',
  success: 'border-prism-green-300 focus:border-prism-green-400 focus:ring-prism-green-400/20',
};

const inputSizes = {
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-3 text-base rounded-xl',
  lg: 'px-5 py-4 text-lg rounded-xl',
};

const Input = React.forwardRef(({
  className,
  type = 'text',
  variant = 'default',
  size = 'md',
  error,
  leftIcon,
  rightIcon,
  fullWidth = true,
  ...props
}, ref) => {
  const baseStyles = 'bg-transparent outline-none font-medium placeholder:text-slate-400 placeholder:font-normal disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200';

  const WrapperComponent = leftIcon || rightIcon ? 'div' : React.Fragment;
  const wrapperProps = leftIcon || rightIcon ? {
    className: cn(
      'flex items-center gap-3 bg-white border-2 transition-all duration-200 focus-within:ring-4',
      inputVariants[variant],
      inputSizes[size],
      fullWidth && 'w-full'
    )
  } : {};

  const inputElement = (
    <input
      type={type}
      ref={ref}
      className={cn(
        baseStyles,
        !leftIcon && !rightIcon && [
          'border-2 bg-white focus:ring-4',
          inputVariants[variant],
          inputSizes[size],
          fullWidth && 'w-full'
        ],
        leftIcon || rightIcon ? 'flex-1' : '',
        className
      )}
      {...props}
    />
  );

  if (leftIcon || rightIcon) {
    return (
      <WrapperComponent {...wrapperProps}>
        {leftIcon && <span className="text-slate-400 shrink-0">{leftIcon}</span>}
        {inputElement}
        {rightIcon && <span className="text-slate-400 shrink-0">{rightIcon}</span>}
      </WrapperComponent>
    );
  }

  return inputElement;
});

Input.displayName = 'Input';

export default Input;
