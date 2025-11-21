import React, { useState } from 'react';
import Container from '../atoms/Container';
import Text from '../atoms/Text';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../atoms/Tabs';
import CourseCard from '../molecules/CourseCard';
import { Search, Filter } from 'lucide-react';

/**
 * CourseCatalogPage Template
 * Browse and search courses
 */

const CourseCatalogPage = ({
  courses = [],
  categories = [],
  onCourseClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'python', label: 'Python' },
    { value: 'golang', label: 'Go' },
    { value: 'java', label: 'Java' },
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <Text variant="display-md" as="h1" className="mb-2">
            Explore Courses
          </Text>
          <Text variant="body-lg" color="muted">
            Master programming through hands-on exercises
          </Text>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                type="search"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={20} />}
                size="lg"
              />
            </div>
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              options={languageOptions}
              size="lg"
            />
          </div>

          <div className="flex items-center gap-4">
            <Filter size={20} className="text-slate-400" />
            <Tabs defaultValue="all" className="flex-1">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              options={difficultyOptions}
              size="md"
              fullWidth={false}
              className="w-48"
            />
          </div>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <section key={category.id} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <Text variant="h2">{category.name}</Text>
              <button className="text-sm font-medium text-prism-blue-600 hover:text-prism-blue-700">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.courses?.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  onClick={() => onCourseClick?.(course.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
};

export default CourseCatalogPage;
