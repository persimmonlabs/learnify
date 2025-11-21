import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '../../utils/cn';
import Container from '../atoms/Container';
import Button from '../atoms/Button';
import ProgressBar from '../atoms/ProgressBar';
import LessonCard from '../molecules/LessonCard';
import Divider from '../atoms/Divider';

/**
 * LessonSidebar Component - Organism
 * Course navigation sidebar with lesson list
 */

const LessonSidebar = ({
  courseTitle,
  modules = [],
  currentLessonId,
  onLessonClick,
  progress = 0,
  isCollapsed = false,
  onToggle,
  className,
  ...props
}) => {
  return (
    <aside
      className={cn(
        'h-full bg-white border-r border-slate-100 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-80',
        className
      )}
      {...props}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          {!isCollapsed && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-prism-blue-600" />
                <h2 className="font-bold text-lg text-slate-900 line-clamp-1">
                  {courseTitle}
                </h2>
              </div>

              <ProgressBar
                value={progress}
                variant="gradient"
                size="md"
                showLabel
              />
            </>
          )}

          <button
            onClick={onToggle}
            className="absolute top-6 right-4 p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Lesson List */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                  {module.title}
                </h3>

                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      {...lesson}
                      isActive={lesson.id === currentLessonId}
                      onClick={() => onLessonClick?.(lesson.id)}
                    />
                  ))}
                </div>

                {moduleIndex < modules.length - 1 && (
                  <Divider spacing="md" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default LessonSidebar;
