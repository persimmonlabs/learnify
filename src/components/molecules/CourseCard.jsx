import React from 'react';
import { Clock, BookOpen, Award, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import ProgressBar from '../atoms/ProgressBar';
import IconBox from './IconBox';

/**
 * CourseCard Component - Molecule
 * Displays course information in a card
 */

const CourseCard = ({
  title,
  description,
  language,
  duration,
  lessons,
  difficulty = 'beginner',
  progress = 0,
  thumbnail,
  icon,
  isNew = false,
  isEnrolled = false,
  isAuthenticated = true,
  canEnroll = true,
  onClick,
  className,
  ...props
}) => {
  const difficultyColors = {
    beginner: 'green',
    intermediate: 'orange',
    advanced: 'error',
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      hover
      className={cn('cursor-pointer overflow-hidden group', className)}
      onClick={onClick}
      {...props}
    >
      {/* Thumbnail or Icon */}
      <div className="relative h-48 bg-gradient-to-br from-prism-blue-500 via-prism-green-400 to-prism-orange-400 overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {icon ? (
              <div className="text-white">
                {icon}
              </div>
            ) : (
              <IconBox variant="gradient" size="xl" className="shadow-2xl">
                <BookOpen size={32} />
              </IconBox>
            )}
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isNew && <Badge variant="orange" size="sm">New</Badge>}
          <Badge variant={difficultyColors[difficulty]} size="sm">
            {difficulty}
          </Badge>
        </div>

        {/* Language badge */}
        {language && (
          <div className="absolute bottom-4 left-4">
            <Badge variant="default" size="md" className="bg-white/90 backdrop-blur-sm">
              {language}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-prism-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{duration}</span>
            </div>
          )}
          {lessons && (
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>{lessons} lessons</span>
            </div>
          )}
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mb-4">
            <ProgressBar value={progress} variant="gradient" size="sm" showLabel />
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-sm font-semibold text-prism-blue-600">
            {!isAuthenticated
              ? 'Sign in to Enroll'
              : isEnrolled
              ? progress > 0
                ? 'Continue Learning'
                : 'Start Course'
              : !canEnroll
              ? 'Upgrade Required'
              : 'Enroll Now'}
          </span>
          <ChevronRight size={20} className="text-prism-blue-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
