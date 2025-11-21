/**
 * Exercise Page Wrapper
 * Coding exercise/challenge page
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import ExerciseTemplate from '../../components/templates/ExercisePage';
import Spinner from '../../components/atoms/Spinner';

const ExercisePage = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await api.getExercise(exerciseId);

        if (response.success) {
          setExercise(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch exercise:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.submitExercise(exerciseId, 'sample code', 'python');

      if (response.success) {
        alert('Solution submitted! Score: ' + response.data.score + '%');
      }
    } catch (error) {
      console.error('Failed to submit exercise:', error);
    }
  };

  const handleRun = async (code, language) => {
    console.log('Running code:', { code, language });
    // This would normally execute the code and return results
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <ExerciseTemplate
      exercise={exercise}
      onBack={handleBack}
      onSubmit={handleSubmit}
      onRun={handleRun}
    />
  );
};

export default ExercisePage;
