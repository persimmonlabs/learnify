import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Logo Component - Molecule
 * Brand logo with icon and text
 */

const Logo = ({
  variant = 'gradient',
  size = 'md',
  showText = true,
  className,
  ...props
}) => {
  const sizes = {
    sm: { icon: 'w-6 h-6', iconSize: 14, text: 'text-base' },
    md: { icon: 'w-8 h-8', iconSize: 18, text: 'text-lg' },
    lg: { icon: 'w-10 h-10', iconSize: 22, text: 'text-xl' },
  };

  const variants = {
    gradient: 'bg-gradient-to-br from-prism-blue-500 via-teal-400 to-prism-green-400 shadow-lg shadow-prism-blue-500/20',
    blue: 'bg-prism-blue-600 shadow-lg shadow-prism-blue-500/20',
    dark: 'bg-slate-900 shadow-lg',
  };

  const sizeConfig = sizes[size];

  return (
    <div className={cn('flex items-center gap-2 group cursor-pointer', className)} {...props}>
      <div className={cn(
        'rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300',
        sizeConfig.icon,
        variants[variant]
      )}>
        <BrainCircuit size={sizeConfig.iconSize} strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={cn('font-bold tracking-tight text-slate-900', sizeConfig.text)}>
          Learnify
        </span>
      )}
    </div>
  );
};

export default Logo;
