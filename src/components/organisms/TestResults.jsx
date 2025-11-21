import React from 'react';
import { CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import ProgressBar from '../atoms/ProgressBar';
import TestCase from '../molecules/TestCase';
import Alert from '../atoms/Alert';

/**
 * TestResults Component - Organism
 * Displays test execution results
 */

const TestResults = ({
  status = 'idle', // idle, running, success, failed, error
  passedCount = 0,
  totalCount = 0,
  executionTime,
  memory,
  testCases = [],
  errorMessage,
  className,
  ...props
}) => {
  const percentage = totalCount > 0 ? (passedCount / totalCount) * 100 : 0;

  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-prism-green-600',
      bg: 'bg-prism-green-50',
      title: 'All Tests Passed!',
      message: 'Great job! Your solution passed all test cases.',
    },
    failed: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      title: 'Some Tests Failed',
      message: 'Review the failed test cases below and try again.',
    },
    error: {
      icon: XCircle,
      color: 'text-prism-orange-600',
      bg: 'bg-prism-orange-50',
      title: 'Runtime Error',
      message: errorMessage || 'An error occurred while running your code.',
    },
  };

  const config = statusConfig[status];

  if (status === 'idle') {
    return (
      <Card variant="outlined" padding="lg" className={className}>
        <div className="text-center text-slate-400 py-8">
          <div className="text-4xl mb-3">💭</div>
          <p className="text-sm">Run your code to see test results</p>
        </div>
      </Card>
    );
  }

  if (status === 'running') {
    return (
      <Card variant="outlined" padding="lg" className={className}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-prism-blue-200 border-t-prism-blue-600 mx-auto mb-4" />
          <p className="text-sm text-slate-600">Running tests...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-4', className)} {...props}>
      {/* Status Alert */}
      {config && (
        <Alert
          variant={status === 'success' ? 'success' : status === 'failed' ? 'warning' : 'error'}
          title={config.title}
          icon={config.icon}
        >
          {config.message}
        </Alert>
      )}

      {/* Summary Card */}
      <Card variant="elevated" padding="lg">
        <div className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-900">
                Test Cases Passed
              </span>
              <span className="text-2xl font-bold text-slate-900">
                {passedCount}/{totalCount}
              </span>
            </div>
            <ProgressBar
              value={passedCount}
              max={totalCount}
              variant={percentage === 100 ? 'green' : 'orange'}
              size="lg"
            />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {executionTime && (
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-slate-400" />
                <div>
                  <div className="text-xs text-slate-500">Execution Time</div>
                  <div className="text-sm font-semibold text-slate-900">{executionTime}ms</div>
                </div>
              </div>
            )}

            {memory && (
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-slate-400" />
                <div>
                  <div className="text-xs text-slate-500">Memory Used</div>
                  <div className="text-sm font-semibold text-slate-900">{memory}MB</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Test Cases */}
      {testCases.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Test Cases
          </h4>
          {testCases.map((testCase, index) => (
            <TestCase key={index} {...testCase} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestResults;
