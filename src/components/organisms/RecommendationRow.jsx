import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Text from '../atoms/Text';
import RecommendationCard from '../molecules/RecommendationCard';

/**
 * RecommendationRow Component - Organism
 * Netflix-style horizontal scrolling row
 */

const RecommendationRow = ({
  title,
  description,
  recommendations = [],
  onCardClick,
  className,
  ...props
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (recommendations.length === 0) return null;

  return (
    <section className={cn('relative', className)} {...props}>
      {/* Header */}
      <div className="mb-6">
        <Text variant="h3" className="mb-1">{title}</Text>
        {description && (
          <Text variant="body-sm" color="muted">{description}</Text>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-slate-600" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recommendations.map((rec, index) => (
            <div key={rec.id || index} className="flex-none w-80">
              <RecommendationCard
                {...rec}
                onClick={() => onCardClick?.(rec)}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RecommendationRow;
