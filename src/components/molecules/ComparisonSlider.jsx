import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';

/**
 * ComparisonSlider Component - Molecule
 * Side-by-side code/architecture comparison with draggable divider
 */

const ComparisonSlider = ({
  leftContent,
  rightContent,
  leftLabel = 'Before',
  rightLabel = 'After',
  leftBadge = { text: 'Bad', variant: 'error' },
  rightBadge = { text: 'Good', variant: 'success' },
  className,
  ...props
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      className={cn('overflow-hidden cursor-col-resize select-none', className)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...props}
    >
      <div className="relative h-full min-h-[400px]">
        {/* Left Side */}
        <div
          className="absolute top-0 left-0 bottom-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="h-full bg-red-50/30">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-900">{leftLabel}</span>
              <Badge variant={leftBadge.variant} size="sm">
                {leftBadge.text}
              </Badge>
            </div>
            <div className="p-6">{leftContent}</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="h-full bg-prism-green-50/30">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-900">{rightLabel}</span>
            <Badge variant={rightBadge.variant} size="sm">
              {rightBadge.text}
            </Badge>
          </div>
          <div className="p-6">{rightContent}</div>
        </div>

        {/* Draggable Divider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-slate-400 hover:bg-prism-blue-600 transition-colors"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-slate-400"></div>
              <div className="w-0.5 h-4 bg-slate-400"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComparisonSlider;
