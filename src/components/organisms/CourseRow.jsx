/**
 * CourseRow Component - Organism
 * Netflix-style horizontal scrolling row of course cards
 */

import React, { useRef } from 'react';
import Text from '../atoms/Text';
import CourseCard from '../molecules/CourseCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const CourseRow = ({ title, subtitle, courses = [], onCourseClick, className }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  if (courses.length === 0) return null;

  return (
    <div className={cn('relative', className)}>
      {/* Header */}
      <div className="mb-6">
        <Text variant="h3" className="mb-1">
          {title}
        </Text>
        {subtitle && (
          <Text variant="body-sm" color="muted">
            {subtitle}
          </Text>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-slate-900" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-0"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-slate-900" />
        </button>

        {/* Course Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => (
            <div key={course.id} className="flex-shrink-0 w-80">
              <CourseCard {...course} onClick={() => onCourseClick?.(course.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRow;
