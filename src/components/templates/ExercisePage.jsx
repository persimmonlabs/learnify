import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../atoms/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../atoms/Tabs';
import CodeEditor from '../organisms/CodeEditor';
import TestResults from '../organisms/TestResults';
import ContentPanel from '../organisms/ContentPanel';
import HintBox from '../molecules/HintBox';

/**
 * ExercisePage Template
 * Coding exercise/challenge page with split view
 */

const ExercisePage = ({
  exercise = {},
  onBack,
  onSubmit,
  onRun,
}) => {
  const [activeTab, setActiveTab] = useState('description');
  const [testResults, setTestResults] = useState({ status: 'idle' });

  const handleRun = (code, language) => {
    setTestResults({ status: 'running' });
    // Simulate API call
    setTimeout(() => {
      setTestResults({
        status: 'success',
        passedCount: 8,
        totalCount: 10,
        executionTime: 45,
        memory: 12.5,
        testCases: [
          {
            name: 'Test Case 1: Basic Input',
            input: [1, 2, 3],
            expected: 6,
            actual: 6,
            status: 'passed',
            runtime: 12,
          },
          {
            name: 'Test Case 2: Empty Array',
            input: [],
            expected: 0,
            actual: null,
            status: 'failed',
            runtime: 8,
            message: 'Expected 0 but got null',
          },
        ],
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 py-4">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="md"
                leftIcon={<ArrowLeft size={20} />}
                onClick={onBack}
              >
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {exercise.title || 'Exercise'}
                </h1>
                <p className="text-sm text-slate-500">
                  {exercise.difficulty || 'Medium'} • {exercise.points || 100} points
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary" size="md">
                Reset Code
              </Button>
              <Button variant="primary" size="md" onClick={onSubmit}>
                Submit Solution
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Split View */}
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
          {/* Left Panel - Problem Description */}
          <div className="bg-white border-r border-slate-100 overflow-y-auto">
            <div className="p-6">
              <Tabs defaultValue="description" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="hints">Hints</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                  <ContentPanel
                    title={exercise.title}
                    content={exercise.description || '<p>Exercise description goes here...</p>'}
                  />

                  {/* Examples */}
                  {exercise.examples && (
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-bold text-slate-900">Examples</h3>
                      {exercise.examples.map((example, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-4 font-mono text-sm">
                          <div className="mb-2">
                            <span className="text-slate-500">Input:</span>
                            <pre className="mt-1 text-slate-900">{example.input}</pre>
                          </div>
                          <div>
                            <span className="text-slate-500">Output:</span>
                            <pre className="mt-1 text-slate-900">{example.output}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="hints">
                  <div className="space-y-4">
                    <HintBox
                      title="Hint 1"
                      content="Think about using a loop to iterate through the array."
                      penalty={10}
                    />
                    <HintBox
                      title="Hint 2"
                      content="Consider edge cases like empty arrays or single elements."
                      penalty={20}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="solution">
                  <ContentPanel
                    title="Solution Explanation"
                    content="<p>The solution walkthrough will appear here after you submit your code...</p>"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Panel - Code Editor + Results */}
          <div className="bg-slate-50 flex flex-col">
            <div className="flex-1 p-6">
              <CodeEditor
                defaultLanguage="python"
                defaultCode="def solution(arr):\n    # Write your code here\n    pass"
                onRun={handleRun}
                minHeight="500px"
              />
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <TestResults {...testResults} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
