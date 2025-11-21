import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Container from '../atoms/Container';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import FlawPresenter from '../organisms/FlawPresenter';
import ArchitectureReview from '../organisms/ArchitectureReview';
import VisualizerCanvas from '../organisms/VisualizerCanvas';
import ComparisonSlider from '../molecules/ComparisonSlider';

/**
 * DiagnosisPage Template
 * "The Flaw" - Student diagnoses architectural problems
 */

const DiagnosisPage = ({
  module = {},
  onBack,
  onComplete,
}) => {
  const [phase, setPhase] = useState('challenge'); // challenge, diagnosis, review
  const [studentDiagnosis, setStudentDiagnosis] = useState([]);

  const handleSubmitDiagnosis = (selectedFlaws) => {
    setStudentDiagnosis(selectedFlaws);
    setPhase('review');

    // Simulate AI evaluation
    // In real app, this would call backend
  };

  const sampleData = {
    title: 'The Spaghetti Code Problem',
    description: 'This code works... but it\'s a maintenance nightmare. Can you spot why?',
    challenge: 'Identify all architectural flaws that make this code unmaintainable at scale.',
    flawedCode: `
# Bad: Global state everywhere
player1_score = 0
player2_score = 0

def update_score(player, points):
    global player1_score, player2_score
    if player == 1:
        player1_score += points
    else:
        player2_score += points

def check_winner():
    global player1_score, player2_score
    if player1_score > 10:
        return "Player 1"
    elif player2_score > 10:
        return "Player 2"
    return None
    `,
    correctCode: `
# Good: Encapsulated state
class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0

    def add_points(self, points):
        self.score += points

    def has_won(self):
        return self.score > 10

class Game:
    def __init__(self):
        self.players = []

    def add_player(self, player):
        self.players.append(player)

    def get_winner(self):
        for player in self.players:
            if player.has_won():
                return player
        return None
    `,
    flaws: [
      {
        id: 'global-state',
        title: 'Global State',
        severity: 'error',
        description: 'Using global variables makes the code impossible to test and reuse.',
      },
      {
        id: 'no-encapsulation',
        title: 'No Encapsulation',
        severity: 'error',
        description: 'State and behavior are not grouped together. Hard to scale to 3+ players.',
      },
      {
        id: 'hardcoded-logic',
        title: 'Hardcoded Player Count',
        severity: 'warning',
        description: 'The code assumes exactly 2 players. Cannot handle N players.',
      },
      {
        id: 'magic-numbers',
        title: 'Magic Numbers',
        severity: 'warning',
        description: 'The winning score (10) should be configurable, not hardcoded.',
      },
    ],
  };

  const reviewData = {
    overallScore: 85,
    categories: {
      codeSense: 90,
      efficiency: 75,
      edgeCases: 80,
      taste: 95,
    },
    strengths: [
      'Correctly identified global state as the primary flaw',
      'Recognized the lack of encapsulation',
      'Understood scalability issues with hardcoded player count',
    ],
    weaknesses: [
      'Missed the magic number (10) as a maintainability issue',
    ],
    suggestions: [
      'Review the concept of Configuration vs. Constants',
      'Practice identifying all code smells, not just critical bugs',
    ],
    passed: true,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 py-4">
        <Container size="xl">
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
                <Text variant="h4">{module.title || 'Module 1: The Atom'}</Text>
                <Text variant="caption">Phase: The Flaw</Text>
              </div>
            </div>

            {phase === 'review' && reviewData.passed && (
              <Button
                variant="primary"
                size="md"
                rightIcon={<CheckCircle size={20} />}
                onClick={onComplete}
              >
                Continue to Visualizer
              </Button>
            )}
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container size="xl" className="py-8">
        {phase === 'challenge' && (
          <div className="space-y-8">
            {/* The Flaw */}
            <FlawPresenter
              {...sampleData}
              onSubmitDiagnosis={handleSubmitDiagnosis}
            />

            {/* Visualizer Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VisualizerCanvas
                type="entropy"
                title="System Entropy"
                state="before"
              />
              <VisualizerCanvas
                type="memory"
                title="Memory Organization"
                state="before"
              />
            </div>
          </div>
        )}

        {phase === 'review' && (
          <div className="space-y-8">
            {/* AI Review */}
            <ArchitectureReview {...reviewData} />

            {/* Before/After Comparison */}
            <ComparisonSlider
              leftContent={
                <pre className="text-sm font-mono text-slate-700 overflow-x-auto">
                  {sampleData.flawedCode}
                </pre>
              }
              rightContent={
                <pre className="text-sm font-mono text-slate-700 overflow-x-auto">
                  {sampleData.correctCode}
                </pre>
              }
              leftLabel="Before (Flawed)"
              rightLabel="After (Refactored)"
            />

            {/* Visualizer Transformation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VisualizerCanvas
                type="entropy"
                title="Entropy: Before"
                state="before"
              />
              <VisualizerCanvas
                type="entropy"
                title="Entropy: After"
                state="after"
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default DiagnosisPage;
