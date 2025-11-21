import React from 'react';
import { Code, Trophy, Clock, Target } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import IconBox from './IconBox';

/**
 * ExerciseCard Component - Molecule
 * Displays coding exercise/challenge
 */

const ExerciseCard = ({
  title,
  description,
  difficulty = 'easy',
  points = 0,
  timeLimit,
  topics = [],
  isCompleted = false,
  accuracy,
  onClick,
  className,
  ...props
}) => {
  const difficultyConfig = {
    easy: { variant: 'green', label: 'Easy' },
    medium: { variant: 'orange', label: 'Medium' },
    hard: { variant: 'error', label: 'Hard' },
  };

  const config = difficultyConfig[difficulty];

  return (
    <Card
      variant="default"
      hover
      className={cn('cursor-pointer', className)}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <IconBox
          variant={isCompleted ? 'green' : 'blue'}
          size="lg"
          className="shrink-0"
        >
          {isCompleted ? <Trophy size={24} /> : <Code size={24} />}
        </IconBox>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-bold text-lg text-slate-900">
              {title}
            </h3>
            <Badge variant={config.variant} size="sm">
              {config.label}
            </Badge>
          </div>

          <p className="text-sm text-slate-500 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {points > 0 && (
              <div className="flex items-center gap-1 text-prism-orange-600">
                <Target size={16} />
                <span className="font-medium">{points} pts</span>
              </div>
            )}

            {timeLimit && (
              <div className="flex items-center gap-1 text-slate-400">
                <Clock size={16} />
                <span>{timeLimit}</span>
              </div>
            )}

            {isCompleted && accuracy && (
              <Badge variant="success" size="sm">
                {accuracy}% accuracy
              </Badge>
            )}
          </div>

          {/* Topics */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;
