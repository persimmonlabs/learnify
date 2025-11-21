import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Card Component - Atomic Design
 *
 * Variants:
 * - default: White card with border
 * - elevated: Card with shadow
 * - outlined: Just border, no background
 * - dark: Dark background
 * - gradient: Gradient border effect
 */

const cardVariants = {
  default: 'bg-white border border-slate-200',
  elevated: 'bg-white shadow-soft-lg',
  outlined: 'bg-transparent border-2 border-slate-200',
  dark: 'bg-slate-900 text-white border border-slate-800',
  gradient: 'bg-white border border-transparent relative',
};

const cardPadding = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
};

const Card = ({
  children,
  variant = 'default',
  padding = 'lg',
  rounded = '3xl',
  hover = false,
  className,
  ...props
}) => {
  const roundedClass = rounded === '3xl' ? 'rounded-3xl' :
                       rounded === '2xl' ? 'rounded-2xl' :
                       rounded === 'xl' ? 'rounded-xl' :
                       rounded === 'lg' ? 'rounded-lg' :
                       rounded === 'md' ? 'rounded-md' : 'rounded';

  return (
    <div
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        cardVariants[variant],
        cardPadding[padding],
        roundedClass,
        hover && 'hover:shadow-xl hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {variant === 'gradient' && (
        <div className="absolute -inset-[1px] bg-gradient-to-r from-prism-blue-400 via-prism-green-400 to-prism-orange-400 rounded-3xl -z-10" />
      )}
      {children}
    </div>
  );
};

// Card subcomponents for better composition
Card.Header = ({ children, className, ...props }) => (
  <div className={cn('mb-6', className)} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className, ...props }) => (
  <div className={cn('mt-6 pt-6 border-t border-slate-100', className)} {...props}>
    {children}
  </div>
);

export default Card;
