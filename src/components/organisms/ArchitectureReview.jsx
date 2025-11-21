import React from 'react';
import { Brain, Target, Zap, Award, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import ProgressBar from '../atoms/ProgressBar';
import Badge from '../atoms/Badge';
import Alert from '../atoms/Alert';

/**
 * ArchitectureReview Component - Organism
 * AI Senior Review - Evaluates student's architectural decisions
 */

const ArchitectureReview = ({
  overallScore = 0,
  categories = {},
  strengths = [],
  weaknesses = [],
  suggestions = [],
  passed = false,
  className,
  ...props
}) => {
  const scoreColor = overallScore >= 80 ? 'green' : overallScore >= 60 ? 'orange' : 'error';

  const categoryData = [
    {
      name: 'Code Sense',
      score: categories.codeSense || 0,
      icon: Brain,
      description: 'Understanding of system architecture',
    },
    {
      name: 'Efficiency',
      score: categories.efficiency || 0,
      icon: Zap,
      description: 'Performance and optimization',
    },
    {
      name: 'Edge Cases',
      score: categories.edgeCases || 0,
      icon: Target,
      description: 'Handling of corner cases',
    },
    {
      name: 'Taste',
      score: categories.taste || 0,
      icon: Award,
      description: 'Code quality and elegance',
    },
  ];

  return (
    <div className={cn('space-y-6', className)} {...props}>
      {/* Overall Score */}
      <Card variant="elevated" padding="lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Text variant="h3" className="mb-2">Architecture Review</Text>
            <Text variant="body-sm" color="muted">
              AI Senior Engineer Evaluation
            </Text>
          </div>

          <div className="text-right">
            <div className={cn(
              'text-5xl font-bold mb-1',
              scoreColor === 'green' && 'text-prism-green-600',
              scoreColor === 'orange' && 'text-prism-orange-500',
              scoreColor === 'error' && 'text-red-600'
            )}>
              {overallScore}%
            </div>
            <Badge variant={scoreColor} size="md">
              {passed ? 'Passed' : 'Needs Improvement'}
            </Badge>
          </div>
        </div>

        <ProgressBar
          value={overallScore}
          variant={scoreColor}
          size="lg"
        />
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryData.map((category) => {
          const Icon = category.icon;
          const categoryColor = category.score >= 80 ? 'green' : category.score >= 60 ? 'orange' : 'error';

          return (
            <Card key={category.name} variant="outlined" padding="md">
              <div className="flex items-start gap-3 mb-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  categoryColor === 'green' && 'bg-prism-green-100 text-prism-green-600',
                  categoryColor === 'orange' && 'bg-prism-orange-100 text-prism-orange-600',
                  categoryColor === 'error' && 'bg-red-100 text-red-600'
                )}>
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Text variant="h5">{category.name}</Text>
                    <span className="text-sm font-bold text-slate-900">{category.score}%</span>
                  </div>
                  <Text variant="caption">{category.description}</Text>
                </div>
              </div>

              <ProgressBar
                value={category.score}
                variant={categoryColor}
                size="sm"
              />
            </Card>
          );
        })}
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <Card variant="outlined" padding="lg" className="border-prism-green-200 bg-prism-green-50/30">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-prism-green-600" />
            <Text variant="h4">Strengths</Text>
          </div>

          <ul className="space-y-2">
            {strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-prism-green-600 shrink-0">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <Card variant="outlined" padding="lg" className="border-red-200 bg-red-50/30">
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-red-600" />
            <Text variant="h4">Areas for Improvement</Text>
          </div>

          <ul className="space-y-2">
            {weaknesses.map((weakness, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-red-600 shrink-0">✗</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Alert variant="info" title="Next Steps">
          <ul className="space-y-1 mt-2">
            {suggestions.map((suggestion, i) => (
              <li key={i} className="text-sm">• {suggestion}</li>
            ))}
          </ul>
        </Alert>
      )}
    </div>
  );
};

export default ArchitectureReview;
