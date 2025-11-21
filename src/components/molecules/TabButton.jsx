import React from 'react';
import { cn } from '../../utils/cn';

/**
 * TabButton Component - Molecule
 * Toggle or tab button with active state
 */

const TabButton = ({
  children,
  active = false,
  onClick,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 relative z-10 py-2 px-4 text-sm font-medium transition-colors duration-300 rounded-lg',
        active
          ? 'text-prism-blue-600'
          : 'text-slate-500 hover:text-slate-700',
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

// Tab Group with animated background
export const TabGroup = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-slate-200/50 p-1 rounded-xl flex relative',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default TabButton;
