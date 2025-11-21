/**
 * Course Catalog Page Wrapper
 * Browse and search all available courses with advanced filtering
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import CourseCatalogTemplate from '../../components/templates/CourseCatalogPage';
import Spinner from '../../components/atoms/Spinner';
import {
  filterCourses,
  sortCourses,
  countActiveFilters,
  getFiltersFromURL,
  updateURLWithFilters,
} from '../../utils/filterCourses';

const CourseCatalogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, canEnrollInCourse } = useAuth();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userInterests, setUserInterests] = useState([]);

  // Initialize filters from URL or defaults
  const [filters, setFilters] = useState(() => getFiltersFromURL(searchParams));
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, recommendationsResponse, profileResponse] = await Promise.all([
          api.getCourses(),
          api.getRecommendations(),
          api.getProfile(),
        ]);

        if (coursesResponse.success) {
          setCourses(coursesResponse.data.courses || []);
        }

        if (recommendationsResponse.success) {
          setCategories(recommendationsResponse.data.categories || []);
        }

        // Get user interests for recommendation sorting
        if (profileResponse.success) {
          setUserInterests(profileResponse.data.user?.interests || []);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    if (!loading) {
      updateURLWithFilters(filters, searchQuery, sortBy, navigate, location);
    }
  }, [filters, searchQuery, sortBy, loading, navigate, location]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      pattern: 'all',
      topic: 'all',
      difficulty: 'all',
      duration: 'all',
    });
    setSearchQuery('');
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleCourseClick = (courseId) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Save intended course destination and redirect to login
      const returnUrl = `/courses/${courseId}`;
      navigate(`/login?returnTo=${encodeURIComponent(returnUrl)}`);
      return;
    }

    // Check if user is already enrolled
    const isEnrolled = user?.enrolledCourses?.includes(courseId);

    // If enrolled, navigate to course
    if (isEnrolled) {
      navigate(`/courses/${courseId}`);
      return;
    }

    // Check if user can enroll in more courses
    if (!canEnrollInCourse()) {
      // User has reached course limit - navigate to course page which will show upgrade modal
      navigate(`/courses/${courseId}`);
      return;
    }

    // User can enroll - navigate to course page
    navigate(`/courses/${courseId}`);
  };

  // Apply filters and sorting
  const filteredCourses = filterCourses(courses, filters, searchQuery);
  const sortedCourses = sortCourses(filteredCourses, sortBy, userInterests);
  const activeFilterCount = countActiveFilters(filters);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <CourseCatalogTemplate
      courses={sortedCourses}
      categories={categories}
      filters={filters}
      searchQuery={searchQuery}
      sortBy={sortBy}
      activeFilterCount={activeFilterCount}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      onSortChange={handleSortChange}
      onCourseClick={handleCourseClick}
      isAuthenticated={isAuthenticated}
      user={user}
      canEnrollInCourse={canEnrollInCourse}
    />
  );
};

export default CourseCatalogPage;
