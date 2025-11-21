/**
 * Lesson Page Wrapper
 * Individual lesson viewer with navigation
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import LessonTemplate from '../../components/templates/LessonPage';
import Spinner from '../../components/atoms/Spinner';

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [currentLesson, setCurrentLesson] = useState({});
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await api.getCourseDetail(courseId);

        if (courseResponse.success) {
          const courseData = courseResponse.data;
          setCourse(courseData);
          setModules(courseData.modules || []);

          // Find the current lesson
          let foundLesson = null;
          for (const module of courseData.modules || []) {
            const lesson = module.lessons?.find((l) => l.id === lessonId);
            if (lesson) {
              foundLesson = lesson;
              break;
            }
          }

          if (foundLesson) {
            setCurrentLesson({
              ...foundLesson,
              content: `<h2>${foundLesson.title}</h2><p>This is the lesson content for ${foundLesson.title}.</p>`,
              previousId: null, // Would be calculated from module structure
              nextId: null, // Would be calculated from module structure
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, lessonId]);

  const handleLessonChange = (newLessonId) => {
    navigate(`/courses/${courseId}/lessons/${newLessonId}`);
  };

  const handleComplete = () => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <LessonTemplate
      course={course}
      currentLesson={currentLesson}
      modules={modules}
      onLessonChange={handleLessonChange}
      onComplete={handleComplete}
    />
  );
};

export default LessonPage;
