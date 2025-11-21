import React from 'react';
import { cn } from '../../utils/cn';

/**
 * BackgroundAtmosphere Component - Organism
 * Decorative background with gradient orbs
 */

const BackgroundAtmosphere = ({
  variant = 'sunrise',
  className,
}) => {
  const variants = {
    sunrise: (
      <>
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-prism-blue-100/50 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-prism-orange-100/60 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1000ms' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-prism-green-50/60 rounded-full blur-[120px]" />
      </>
    ),
    twilight: (
      <>
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-prism-blue-200/40 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[55vw] h-[55vw] bg-prism-orange-200/40 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '2000ms' }} />
      </>
    ),
    minimal: (
      <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-prism-blue-100/30 rounded-full blur-[100px] animate-pulse-slow" />
    ),
  };

  return (
    <div className={cn('fixed inset-0 overflow-hidden pointer-events-none z-0', className)}>
      {variants[variant]}
    </div>
  );
};

export default BackgroundAtmosphere;
