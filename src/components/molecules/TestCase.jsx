import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';

/**
 * TestCase Component - Molecule
 * Displays test case result
 */

const TestCase = ({
  name,
  input,
  expected,
  actual,
  status = 'pending', // pending, passed, failed, error
  message,
  runtime,
  className,
  ...props
}) => {
  const statusConfig = {
    passed: {
      icon: Check,
      color: 'text-prism-green-600',
      bg: 'bg-prism-green-50',
      border: 'border-prism-green-200',
    },
    failed: {
      icon: X,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    error: {
      icon: AlertCircle,
      color: 'text-prism-orange-600',
      bg: 'bg-prism-orange-50',
      border: 'border-prism-orange-200',
    },
    pending: {
      icon: AlertCircle,
      color: 'text-slate-400',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card
      variant="outlined"
      padding="md"
      className={cn('border-2', config.border, config.bg, className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        <div className={cn('shrink-0 mt-0.5', config.color)}>
          <Icon size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm text-slate-900">
              {name}
            </h4>
            {runtime && (
              <span className="text-xs text-slate-500">
                {runtime}ms
              </span>
            )}
          </div>

          {/* Input */}
          {input && (
            <div className="mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Input:</span>
              <pre className="mt-1 text-sm font-mono text-slate-700 bg-white rounded-lg p-2 overflow-x-auto">
                {JSON.stringify(input, null, 2)}
              </pre>
            </div>
          )}

          {/* Expected vs Actual */}
          {status !== 'pending' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Expected:</span>
                <pre className="mt-1 text-sm font-mono text-slate-700 bg-white rounded-lg p-2 overflow-x-auto">
                  {JSON.stringify(expected, null, 2)}
                </pre>
              </div>

              <div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Actual:</span>
                <pre className="mt-1 text-sm font-mono text-slate-700 bg-white rounded-lg p-2 overflow-x-auto">
                  {JSON.stringify(actual, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Error message */}
          {message && status !== 'passed' && (
            <div className="mt-2 text-sm text-slate-600">
              {message}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TestCase;
