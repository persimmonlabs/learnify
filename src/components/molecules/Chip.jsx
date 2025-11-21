import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Chip Component - Molecule
 * Selectable chip/pill component
 */

const Chip = ({
  children,
  selected = false,
  onClick,
  variant = 'blue',
  className,
  ...props
}) => {
  const variantStyles = {
    blue: selected
      ? 'bg-prism-blue-50 border-prism-blue-200 text-prism-blue-700 shadow-sm ring-1 ring-prism-blue-200'
      : 'bg-white border-slate-200 text-slate-600 hover:border-prism-blue-200 hover:bg-slate-50',
    orange: selected
      ? 'bg-prism-orange-50 border-prism-orange-200 text-prism-orange-700 shadow-sm ring-1 ring-prism-orange-200'
      : 'bg-white border-slate-200 text-slate-600 hover:border-prism-orange-200 hover:bg-slate-50',
    green: selected
      ? 'bg-prism-green-50 border-prism-green-200 text-prism-green-700 shadow-sm ring-1 ring-prism-green-200'
      : 'bg-white border-slate-200 text-slate-600 hover:border-prism-green-200 hover:bg-slate-50',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Chip;
