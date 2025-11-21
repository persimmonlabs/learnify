import React from 'react';
import { Sparkles, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import ProgressBar from '../atoms/ProgressBar';

/**
 * RecommendationCard Component - Molecule
 * Netflix-style course recommendation
 */

const reasonIcons = {
  similar_users: Users,
  next_step: ArrowRight,
  trending: TrendingUp,
  friend_activity: Users,
};

const RecommendationCard = ({
  title,
  description,
  thumbnail,
  reasonCode,
  displayText,
  matchScore,
  difficulty,
  duration,
  friendsCount,
  onClick,
  className,
  ...props
}) => {
  const ReasonIcon = reasonIcons[reasonCode] || Sparkles;

  return (
    <Card
      variant="elevated"
      padding="none"
      hover
      className={cn('cursor-pointer overflow-hidden', className)}
      onClick={onClick}
      {...props}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-prism-blue-500 via-prism-green-400 to-prism-orange-400">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles size={48} className="text-white opacity-50" />
          </div>
        )}

        {/* Match Score Badge */}
        {matchScore && (
          <div className="absolute top-4 right-4">
            <Badge variant="success" size="md" className="bg-white/90 backdrop-blur-sm">
              {Math.round(matchScore * 100)}% Match
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-prism-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Reason */}
        <div className="flex items-center gap-2 p-3 bg-prism-blue-50 rounded-xl mb-4">
          <ReasonIcon size={16} className="text-prism-blue-600 shrink-0" />
          <span className="text-sm text-prism-blue-700 font-medium">
            {displayText}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-4">
            {difficulty && (
              <span className="capitalize">{difficulty}</span>
            )}
            {duration && (
              <>
                <span>•</span>
                <span>{duration}</span>
              </>
            )}
          </div>

          {friendsCount > 0 && (
            <div className="flex items-center gap-1 text-prism-blue-600">
              <Users size={16} />
              <span className="font-medium">{friendsCount} friend{friendsCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;
