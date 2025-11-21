import React, { useState } from 'react';
import Container from '../atoms/Container';
import Text from '../atoms/Text';
import Select from '../atoms/Select';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import CourseCard from '../molecules/CourseCard';
import SearchBar from '../molecules/SearchBar';
import FilterSidebar from '../organisms/FilterSidebar';
import { Filter, SlidersHorizontal, BookOpen, TrendingUp } from 'lucide-react';

/**
 * CourseCatalogPage Template
 * Browse and search courses with advanced filtering
 */

const CourseCatalogPage = ({
  courses = [],
  categories = [],
  filters,
  searchQuery,
  sortBy,
  activeFilterCount,
  onFilterChange,
  onClearFilters,
  onSearchChange,
  onSearchClear,
  onSortChange,
  onCourseClick,
  isAuthenticated = true,
  user = null,
  canEnrollInCourse = () => true,
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'recommended', label: 'Recommended for You' },
  ];

  const toggleMobileFilters = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Empty state when no courses match filters
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-prism-blue-100 to-prism-green-100 rounded-full flex items-center justify-center mb-6">
        <BookOpen size={40} className="text-prism-blue-600" />
      </div>
      <Text variant="h2" className="mb-2 text-center">
        No courses found
      </Text>
      <Text variant="body-lg" color="muted" className="mb-6 text-center max-w-md">
        We couldn't find any courses matching your current filters. Try adjusting your search criteria.
      </Text>
      <Button variant="primary" size="lg" onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <Text variant="display-md" as="h1" className="mb-2">
            Explore Courses
          </Text>
          <Text variant="body-lg" color="muted">
            Master new skills through hands-on learning and cognitive pattern development
          </Text>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-8">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                onClear={onSearchClear}
                placeholder="Search courses by title, description, or language..."
              />
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-4">
              <Select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                options={sortOptions}
                size="lg"
                icon={<SlidersHorizontal size={18} />}
              />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={toggleMobileFilters}
              leftIcon={<Filter size={18} />}
            >
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="blue" size="sm">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters Summary */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between p-4 bg-prism-blue-50 border-2 border-prism-blue-200 rounded-xl">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-prism-blue-600" />
                <Text variant="body-sm" weight="semibold" className="text-prism-blue-700">
                  {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active
                </Text>
                <Text variant="body-sm" color="muted">
                  • {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
                </Text>
              </div>
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filter Sidebar (Desktop) */}
          <div className="lg:col-span-3">
            <FilterSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
              activeFilterCount={activeFilterCount}
              isMobileOpen={isMobileFilterOpen}
              onMobileClose={toggleMobileFilters}
            />
          </div>

          {/* Course Grid */}
          <div className="lg:col-span-9">
            {courses.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <Text variant="body-md" color="muted">
                    Showing <span className="font-semibold text-slate-700">{courses.length}</span>{' '}
                    {courses.length === 1 ? 'course' : 'courses'}
                  </Text>
                  {sortBy === 'recommended' && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-prism-green-50 rounded-lg">
                      <TrendingUp size={16} className="text-prism-green-600" />
                      <Text variant="body-sm" className="text-prism-green-700 font-medium">
                        Personalized for you
                      </Text>
                    </div>
                  )}
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course) => {
                    const isEnrolled = user?.enrolledCourses?.includes(course.id) || false;
                    const canEnroll = canEnrollInCourse();

                    return (
                      <CourseCard
                        key={course.id}
                        {...course}
                        isAuthenticated={isAuthenticated}
                        isEnrolled={isEnrolled}
                        canEnroll={canEnroll}
                        onClick={() => onCourseClick?.(course.id)}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Categories Section (if no filters active) */}
        {activeFilterCount === 0 && !searchQuery && categories.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <Text variant="h2" className="mb-2">
                Browse by Category
              </Text>
              <Text variant="body-md" color="muted">
                Explore curated collections of courses
              </Text>
            </div>

            {categories.map((category) => (
              <section key={category.id} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <Text variant="h3">{category.name}</Text>
                  <button className="text-sm font-medium text-prism-blue-600 hover:text-prism-blue-700">
                    View All →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.courses?.slice(0, 3).map((course) => {
                    const isEnrolled = user?.enrolledCourses?.includes(course.id) || false;
                    const canEnroll = canEnrollInCourse();

                    return (
                      <CourseCard
                        key={course.id}
                        {...course}
                        isAuthenticated={isAuthenticated}
                        isEnrolled={isEnrolled}
                        canEnroll={canEnroll}
                        onClick={() => onCourseClick?.(course.id)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CourseCatalogPage;
