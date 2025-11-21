import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Text Component - Atomic Design
 * Typography system with consistent styling
 */

const textVariants = {
  // Display sizes
  'display-2xl': 'text-7xl md:text-8xl font-bold tracking-tight',
  'display-xl': 'text-6xl md:text-7xl font-bold tracking-tight',
  'display-lg': 'text-5xl md:text-6xl font-bold tracking-tight',
  'display-md': 'text-4xl md:text-5xl font-bold tracking-tight',
  'display-sm': 'text-3xl md:text-4xl font-bold',

  // Headings
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-bold tracking-tight',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
  h6: 'text-base font-bold',

  // Body
  'body-lg': 'text-lg leading-relaxed',
  'body-md': 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',

  // Special
  label: 'text-xs font-bold uppercase tracking-wider',
  caption: 'text-xs text-slate-500',
  code: 'font-mono text-sm bg-slate-100 px-2 py-0.5 rounded',
};

const textColors = {
  default: 'text-slate-900',
  muted: 'text-slate-500',
  light: 'text-slate-400',
  white: 'text-white',
  blue: 'text-prism-blue-600',
  orange: 'text-prism-orange-600',
  green: 'text-prism-green-600',
  gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-prism-blue-600 via-prism-green-500 to-prism-orange-500',
};

const Text = ({
  children,
  as: Component = 'p',
  variant = 'body-md',
  color = 'default',
  className,
  ...props
}) => {
  return (
    <Component
      className={cn(
        textVariants[variant],
        textColors[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
