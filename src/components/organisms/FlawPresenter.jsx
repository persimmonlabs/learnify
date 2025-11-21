import React, { useState } from 'react';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Badge from '../atoms/Badge';
import Alert from '../atoms/Alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../atoms/Tabs';

/**
 * FlawPresenter Component - Organism
 * Presents code/system with intentional flaws for student analysis
 */

const FlawPresenter = ({
  title,
  description,
  flawedCode,
  correctCode,
  flaws = [],
  challenge,
  onSubmitDiagnosis,
  showSolution = false,
  className,
  ...props
}) => {
  const [revealed, setRevealed] = useState(false);
  const [selectedFlaws, setSelectedFlaws] = useState([]);

  const toggleFlaw = (flawId) => {
    setSelectedFlaws((prev) =>
      prev.includes(flawId)
        ? prev.filter((id) => id !== flawId)
        : [...prev, flawId]
    );
  };

  return (
    <div className={cn('space-y-6', className)} {...props}>
      {/* Challenge Header */}
      <Card variant="elevated" padding="lg" className="border-l-4 border-prism-orange-500">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-prism-orange-100 rounded-xl text-prism-orange-600">
            <AlertTriangle size={24} />
          </div>

          <div className="flex-1">
            <Text variant="h3" className="mb-2">{title}</Text>
            <Text variant="body-md" color="muted" className="mb-4">
              {description}
            </Text>

            <Alert variant="warning" title="Your Challenge">
              {challenge}
            </Alert>
          </div>
        </div>
      </Card>

      {/* Code Display */}
      <Tabs defaultValue="flawed">
        <TabsList>
          <TabsTrigger value="flawed">
            <AlertTriangle size={16} className="mr-2" />
            Flawed Code
          </TabsTrigger>
          <TabsTrigger value="correct" disabled={!showSolution}>
            Solution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flawed">
          <Card variant="elevated" padding="none">
            <div className="bg-[#0F1117] p-6">
              <pre className="text-slate-200 font-mono text-sm overflow-x-auto">
                {flawedCode}
              </pre>
            </div>

            {/* Flaw Indicators */}
            {!revealed && (
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <Text variant="body-sm" color="muted">
                    {flaws.length} flaw{flaws.length !== 1 ? 's' : ''} hidden in this code
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={revealed ? <EyeOff size={16} /> : <Eye size={16} />}
                    onClick={() => setRevealed(!revealed)}
                  >
                    Reveal Flaws
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="correct">
          <Card variant="elevated" padding="none">
            <div className="bg-[#0F1117] p-6">
              <pre className="text-slate-200 font-mono text-sm overflow-x-auto">
                {correctCode}
              </pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Flaw Checklist */}
      {revealed && (
        <Card variant="outlined" padding="lg">
          <Text variant="h4" className="mb-4">Identify the Flaws</Text>
          <Text variant="body-sm" color="muted" className="mb-4">
            Select all the architectural problems you can spot:
          </Text>

          <div className="space-y-3">
            {flaws.map((flaw) => (
              <label
                key={flaw.id}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  selectedFlaws.includes(flaw.id)
                    ? 'border-prism-blue-500 bg-prism-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedFlaws.includes(flaw.id)}
                  onChange={() => toggleFlaw(flaw.id)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-prism-blue-600 focus:ring-2 focus:ring-prism-blue-400"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900">{flaw.title}</span>
                    <Badge variant={flaw.severity} size="sm">
                      {flaw.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{flaw.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => onSubmitDiagnosis?.(selectedFlaws)}
              disabled={selectedFlaws.length === 0}
            >
              Submit Diagnosis
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSelectedFlaws([])}
            >
              Clear
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FlawPresenter;
