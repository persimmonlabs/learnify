import React from 'react';
import { PlayCircle, FileText, Code, Lock, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import IconBox from './IconBox';

/**
 * LessonCard Component - Molecule
 * Displays lesson information in sidebar or list
 */

const lessonIcons = {
  video: PlayCircle,
  reading: FileText,
  exercise: Code,
};

const LessonCard = ({
  title,
  type = 'video',
  duration,
  isCompleted = false,
  isLocked = false,
  isActive = false,
  onClick,
  className,
  ...props
}) => {
  const Icon = lessonIcons[type] || FileText;

  const typeColors = {
    video: 'blue',
    reading: 'green',
    exercise: 'orange',
  };

  return (
    <Card
      variant="outlined"
      padding="md"
      className={cn(
        'cursor-pointer transition-all duration-200',
        isActive && 'border-prism-blue-500 bg-prism-blue-50/50 ring-2 ring-prism-blue-200',
        !isLocked && !isActive && 'hover:border-prism-blue-200 hover:bg-slate-50',
        isLocked && 'opacity-60 cursor-not-allowed',
        className
      )}
      onClick={!isLocked ? onClick : undefined}
      {...props}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <IconBox
          variant={isCompleted ? 'green' : isActive ? 'blue' : 'light'}
          size="md"
          className="shrink-0"
        >
          {isLocked ? (
            <Lock size={18} />
          ) : isCompleted ? (
            <CheckCircle size={18} />
          ) : (
            <Icon size={18} />
          )}
        </IconBox>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            'font-semibold text-sm mb-1',
            isActive ? 'text-prism-blue-600' : 'text-slate-900'
          )}>
            {title}
          </h4>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="capitalize">{type}</span>
            {duration && (
              <>
                <span>•</span>
                <span>{duration}</span>
              </>
            )}
            {isCompleted && (
              <>
                <span>•</span>
                <span className="text-prism-green-600 font-medium">Completed</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LessonCard;
