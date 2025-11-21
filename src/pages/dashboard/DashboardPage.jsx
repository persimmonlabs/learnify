/**
 * Dashboard Page Wrapper
 * Connects the dashboard template with routing and data
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import DashboardTemplate from '../../components/templates/DashboardPage';
import Spinner from '../../components/atoms/Spinner';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, recommendationsResponse] = await Promise.all([
          api.getCourses({ status: 'in_progress' }),
          api.getRecommendations(),
        ]);

        if (coursesResponse.success) {
          const allCourses = coursesResponse.data.courses || [];
          const inProgress = allCourses.filter((c) => c.status === 'in_progress');

          setInProgressCourses(inProgress);

          // Calculate stats
          setStats({
            coursesEnrolled: allCourses.length,
            coursesCompleted: allCourses.filter((c) => c.status === 'completed').length,
            exercisesSolved: 47, // Mock data
            overallProgress: Math.round((allCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / allCourses.length) || 0),
          });
        }

        if (recommendationsResponse.success) {
          setRecommendedCourses(recommendationsResponse.data.recommendations || []);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <DashboardTemplate
      user={user}
      stats={stats}
      inProgressCourses={inProgressCourses}
      recommendedCourses={recommendedCourses.map((r) => r.course)}
    />
  );
};

export default DashboardPage;
