/**
 * Course Catalog Page Wrapper
 * Browse and search all available courses
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import CourseCatalogTemplate from '../../components/templates/CourseCatalogPage';
import Spinner from '../../components/atoms/Spinner';

const CourseCatalogPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, recommendationsResponse] = await Promise.all([
          api.getCourses(),
          api.getRecommendations(),
        ]);

        if (coursesResponse.success) {
          setCourses(coursesResponse.data.courses || []);
        }

        if (recommendationsResponse.success) {
          setCategories(recommendationsResponse.data.categories || []);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseClick = (courseId) => {
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
    <CourseCatalogTemplate
      courses={courses}
      categories={categories}
      onCourseClick={handleCourseClick}
    />
  );
};

export default CourseCatalogPage;
