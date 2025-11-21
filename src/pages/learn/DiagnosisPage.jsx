/**
 * Diagnosis Page Wrapper
 * "The Flaw" - Student diagnoses architectural problems
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DiagnosisTemplate from '../../components/templates/DiagnosisPage';
import Spinner from '../../components/atoms/Spinner';

const DiagnosisPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState({});

  useEffect(() => {
    // Fetch module data
    setModule({
      id: moduleId,
      title: 'Module 1: The Atom',
      description: 'Defining your core data structures',
    });
    setLoading(false);
  }, [moduleId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <DiagnosisTemplate
      module={module}
      onBack={handleBack}
      onComplete={handleComplete}
    />
  );
};

export default DiagnosisPage;
