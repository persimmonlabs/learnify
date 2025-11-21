import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Button Component - Atomic Design
 *
 * Variants:
 * - primary: Main action button (dark solid)
 * - secondary: Secondary actions (outlined)
 * - ghost: Minimal style
 * - link: Text-only button
 *
 * Sizes:
 * - sm, md, lg, xl
 */

const buttonVariants = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200 hover:shadow-slate-300 active:shadow-slate-200',
  secondary: 'bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-50',
  link: 'bg-transparent text-prism-blue-600 hover:text-prism-blue-700 underline-offset-4 hover:underline',

  // Prism variants with color
  blue: 'bg-prism-blue-600 text-white hover:bg-prism-blue-700 shadow-glow-blue',
  orange: 'bg-prism-orange-500 text-white hover:bg-prism-orange-600 shadow-glow-orange',
  green: 'bg-prism-green-600 text-white hover:bg-prism-green-700 shadow-glow-green',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
};

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        baseStyles,
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
