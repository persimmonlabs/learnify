import React from 'react';
import Container from '../atoms/Container';
import Text from '../atoms/Text';
import Card from '../atoms/Card';
import ProgressRing from '../molecules/ProgressRing';
import CourseCard from '../molecules/CourseCard';
import { Trophy, TrendingUp, BookOpen, Code } from 'lucide-react';
import IconBox from '../molecules/IconBox';

/**
 * DashboardPage Template
 * User dashboard showing progress and courses
 */

const DashboardPage = ({
  user = {},
  stats = {},
  inProgressCourses = [],
  recommendedCourses = [],
  recentActivity = [],
}) => {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <Text variant="display-md" as="h1" className="mb-2">
            Welcome back, {user.name || 'Student'}! 👋
          </Text>
          <Text variant="body-lg" color="muted">
            Continue your learning journey
          </Text>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card variant="elevated">
            <div className="flex items-center gap-4">
              <IconBox variant="blue" size="lg">
                <BookOpen size={24} />
              </IconBox>
              <div>
                <Text variant="body-sm" color="muted">Courses Enrolled</Text>
                <Text variant="h2">{stats.coursesEnrolled || 0}</Text>
              </div>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="flex items-center gap-4">
              <IconBox variant="green" size="lg">
                <Trophy size={24} />
              </IconBox>
              <div>
                <Text variant="body-sm" color="muted">Completed</Text>
                <Text variant="h2">{stats.coursesCompleted || 0}</Text>
              </div>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="flex items-center gap-4">
              <IconBox variant="orange" size="lg">
                <Code size={24} />
              </IconBox>
              <div>
                <Text variant="body-sm" color="muted">Exercises Solved</Text>
                <Text variant="h2">{stats.exercisesSolved || 0}</Text>
              </div>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="flex items-center gap-4">
              <ProgressRing
                value={stats.overallProgress || 0}
                size={80}
                variant="gradient"
              />
              <div>
                <Text variant="body-sm" color="muted">Overall Progress</Text>
                <Text variant="h3">{stats.overallProgress || 0}%</Text>
              </div>
            </div>
          </Card>
        </div>

        {/* In Progress Courses */}
        {inProgressCourses.length > 0 && (
          <section className="mb-12">
            <Text variant="h3" className="mb-6">Continue Learning</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <section>
            <Text variant="h3" className="mb-6">Recommended for You</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
};

export default DashboardPage;
