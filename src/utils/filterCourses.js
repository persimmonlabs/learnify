/**
 * Course Filtering and Sorting Utilities
 * Handles client-side filtering, sorting, and searching of courses
 */

/**
 * Parse duration string to hours
 * Examples: "4h", "12h 30m", "2h"
 */
const parseDuration = (durationStr) => {
  if (!durationStr) return 0;

  const hourMatch = durationStr.match(/(\d+)h/);
  const minMatch = durationStr.match(/(\d+)m/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) / 60 : 0;

  return hours + minutes;
};

/**
 * Check if course matches duration filter
 */
const matchesDuration = (course, durationFilter) => {
  if (durationFilter === 'all') return true;

  const hours = parseDuration(course.duration);

  switch (durationFilter) {
    case 'short':
      return hours < 5;
    case 'medium':
      return hours >= 5 && hours < 10;
    case 'long':
      return hours >= 10 && hours < 20;
    case 'verylong':
      return hours >= 20;
    default:
      return true;
  }
};

/**
 * Check if course matches search query
 */
const matchesSearch = (course, query) => {
  if (!query || query.trim() === '') return true;

  const searchTerm = query.toLowerCase();
  const title = (course.title || '').toLowerCase();
  const description = (course.description || '').toLowerCase();
  const language = (course.language || '').toLowerCase();

  return (
    title.includes(searchTerm) ||
    description.includes(searchTerm) ||
    language.includes(searchTerm)
  );
};

/**
 * Filter courses based on all active filters
 */
export const filterCourses = (courses, filters, searchQuery) => {
  if (!courses || courses.length === 0) return [];

  return courses.filter((course) => {
    // Search filter
    if (!matchesSearch(course, searchQuery)) return false;

    // Cognitive pattern filter
    if (filters.pattern !== 'all') {
      const coursePattern = (course.cognitivePattern || course.pattern || '').toLowerCase();
      if (coursePattern !== filters.pattern.toLowerCase()) return false;
    }

    // Topic filter
    if (filters.topic !== 'all') {
      const courseTopic = (course.topic || course.category || '').toLowerCase();
      if (courseTopic !== filters.topic.toLowerCase()) return false;
    }

    // Difficulty filter
    if (filters.difficulty !== 'all') {
      const courseDifficulty = (course.difficulty || 'beginner').toLowerCase();
      if (courseDifficulty !== filters.difficulty.toLowerCase()) return false;
    }

    // Duration filter
    if (!matchesDuration(course, filters.duration)) return false;

    return true;
  });
};

/**
 * Sort courses based on selected sorting method
 */
export const sortCourses = (courses, sortBy, userInterests = []) => {
  if (!courses || courses.length === 0) return [];

  const sorted = [...courses];

  switch (sortBy) {
    case 'popular':
      // Sort by enrollment count (descending)
      return sorted.sort((a, b) => {
        const enrollA = a.enrollmentCount || a.enrolled || 0;
        const enrollB = b.enrollmentCount || b.enrolled || 0;
        return enrollB - enrollA;
      });

    case 'newest':
      // Sort by creation date (newest first)
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.created || 0);
        const dateB = new Date(b.createdAt || b.created || 0);
        return dateB - dateA;
      });

    case 'rating':
      // Sort by rating (highest first)
      return sorted.sort((a, b) => {
        const ratingA = a.rating || a.averageRating || 0;
        const ratingB = b.rating || b.averageRating || 0;
        return ratingB - ratingA;
      });

    case 'recommended':
      // Sort by relevance to user interests
      return sorted.sort((a, b) => {
        const scoreA = calculateRecommendationScore(a, userInterests);
        const scoreB = calculateRecommendationScore(b, userInterests);
        return scoreB - scoreA;
      });

    default:
      return sorted;
  }
};

/**
 * Calculate recommendation score based on user interests
 */
const calculateRecommendationScore = (course, userInterests) => {
  if (!userInterests || userInterests.length === 0) {
    // Fallback to popularity if no interests
    return course.enrollmentCount || course.enrolled || 0;
  }

  let score = 0;

  // Check if course topic matches user interests
  const courseTopic = (course.topic || course.category || '').toLowerCase();
  const coursePattern = (course.cognitivePattern || course.pattern || '').toLowerCase();

  userInterests.forEach((interest) => {
    const interestLower = interest.toLowerCase();
    if (courseTopic.includes(interestLower) || interestLower.includes(courseTopic)) {
      score += 10;
    }
    if (coursePattern.includes(interestLower) || interestLower.includes(coursePattern)) {
      score += 5;
    }
  });

  // Boost score with rating and popularity
  score += (course.rating || course.averageRating || 0) * 2;
  score += Math.log10((course.enrollmentCount || course.enrolled || 0) + 1);

  return score;
};

/**
 * Count active filters
 */
export const countActiveFilters = (filters) => {
  let count = 0;

  if (filters.pattern !== 'all') count++;
  if (filters.topic !== 'all') count++;
  if (filters.difficulty !== 'all') count++;
  if (filters.duration !== 'all') count++;

  return count;
};

/**
 * Get filter state from URL params
 */
export const getFiltersFromURL = (searchParams) => {
  return {
    pattern: searchParams.get('pattern') || 'all',
    topic: searchParams.get('topic') || 'all',
    difficulty: searchParams.get('difficulty') || 'all',
    duration: searchParams.get('duration') || 'all',
  };
};

/**
 * Update URL params with filter state
 */
export const updateURLWithFilters = (filters, searchQuery, sortBy, navigate, location) => {
  const params = new URLSearchParams();

  // Add filters if not 'all'
  if (filters.pattern !== 'all') params.set('pattern', filters.pattern);
  if (filters.topic !== 'all') params.set('topic', filters.topic);
  if (filters.difficulty !== 'all') params.set('difficulty', filters.difficulty);
  if (filters.duration !== 'all') params.set('duration', filters.duration);

  // Add search query
  if (searchQuery) params.set('q', searchQuery);

  // Add sort by
  if (sortBy && sortBy !== 'popular') params.set('sort', sortBy);

  // Update URL without reload
  const newSearch = params.toString();
  const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;

  navigate(newUrl, { replace: true });
};
