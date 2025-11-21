import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../atoms/Button';
import LessonSidebar from '../organisms/LessonSidebar';
import VideoPlayer from '../organisms/VideoPlayer';
import ContentPanel from '../organisms/ContentPanel';
import CodeEditor from '../organisms/CodeEditor';

/**
 * LessonPage Template
 * Main lesson viewer with sidebar navigation
 */

const LessonPage = ({
  course = {},
  currentLesson = {},
  modules = [],
  onLessonChange,
  onComplete,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderLessonContent = () => {
    switch (currentLesson.type) {
      case 'video':
        return (
          <VideoPlayer
            src={currentLesson.videoUrl}
            poster={currentLesson.thumbnail}
            title={currentLesson.title}
          />
        );

      case 'reading':
        return (
          <ContentPanel
            title={currentLesson.title}
            content={currentLesson.content}
            metadata={{
              readTime: currentLesson.readTime,
              author: currentLesson.author,
            }}
          />
        );

      case 'exercise':
        return (
          <div className="space-y-6">
            <ContentPanel
              title={currentLesson.title}
              content={currentLesson.instructions}
            />
            <CodeEditor
              defaultLanguage={course.language}
              defaultCode={currentLesson.starterCode}
              onRun={(code) => console.log('Running code:', code)}
            />
          </div>
        );

      default:
        return (
          <div className="text-center text-slate-400 py-12">
            <p>No content available</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <LessonSidebar
        courseTitle={course.title}
        modules={modules}
        currentLessonId={currentLesson.id}
        onLessonClick={onLessonChange}
        progress={course.progress}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderLessonContent()}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-slate-100 p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="secondary"
              leftIcon={<ChevronLeft size={20} />}
              disabled={!currentLesson.previousId}
              onClick={() => onLessonChange(currentLesson.previousId)}
            >
              Previous
            </Button>

            <Button
              variant="primary"
              rightIcon={<ChevronRight size={20} />}
              onClick={() => {
                if (currentLesson.nextId) {
                  onLessonChange(currentLesson.nextId);
                } else {
                  onComplete?.();
                }
              }}
            >
              {currentLesson.nextId ? 'Next Lesson' : 'Complete Course'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
