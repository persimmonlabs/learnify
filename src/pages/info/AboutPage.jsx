/**
 * About Page
 * Explains Learnify's philosophy and approach
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/atoms/Container';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import { ArrowLeft, Target, Brain, Zap } from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="md" leftIcon={<ArrowLeft size={20} />} onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <Text variant="display-lg" as="h1" className="mb-4">
            We Teach Judgment, Not Syntax
          </Text>
          <Text variant="body-xl" color="muted" className="max-w-3xl mx-auto">
            In 2026, AI handles execution. Humans retain judgment. Learnify trains the "Senior Eye" — the ability to
            spot architectural flaws, not write syntax.
          </Text>
        </div>

        {/* Core Philosophy */}
        <Card variant="elevated" className="mb-8">
          <Text variant="h2" className="mb-6">
            The Core Premise
          </Text>
          <Text variant="body-lg" color="muted" className="mb-6">
            Traditional education teaches "How to slice an onion." We teach "Why the onion burns."
          </Text>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-prism-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Target size={24} className="text-prism-blue-600" />
              </div>
              <div>
                <Text variant="h4" className="mb-2">
                  Verify Systems
                </Text>
                <Text variant="body-md" color="muted">
                  Don't build from scratch. Learn to verify existing systems and spot flaws.
                </Text>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-prism-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <Brain size={24} className="text-prism-orange-600" />
              </div>
              <div>
                <Text variant="h4" className="mb-2">
                  Diagnose Flaws
                </Text>
                <Text variant="body-md" color="muted">
                  Don't memorize syntax. Learn to diagnose architectural problems in real systems.
                </Text>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-prism-green-100 rounded-xl flex items-center justify-center shrink-0">
                <Zap size={24} className="text-prism-green-600" />
              </div>
              <div>
                <Text variant="h4" className="mb-2">
                  Optimize for Scale
                </Text>
                <Text variant="body-md" color="muted">
                  Don't solve toy problems. Learn to optimize systems for real-world scale.
                </Text>
              </div>
            </div>
          </div>
        </Card>

        {/* The Learning Loop */}
        <Card variant="elevated" className="mb-8">
          <Text variant="h2" className="mb-6">
            How We Teach
          </Text>
          <Text variant="body-lg" color="muted" className="mb-6">
            Every lesson follows a 4-phase cycle designed to train judgment:
          </Text>
          <div className="space-y-6">
            <div>
              <Text variant="h4" className="mb-2">
                1. The Simulation
              </Text>
              <Text variant="body-md" color="muted">
                Present a working system as a model, not a list of facts.
              </Text>
            </div>
            <div>
              <Text variant="h4" className="mb-2">
                2. The Flaw
              </Text>
              <Text variant="body-md" color="muted">
                Show code/architecture that works technically but fails structurally.
              </Text>
            </div>
            <div>
              <Text variant="h4" className="mb-2">
                3. The Critique
              </Text>
              <Text variant="body-md" color="muted">
                Student must diagnose the failure (debugging reality).
              </Text>
            </div>
            <div>
              <Text variant="h4" className="mb-2">
                4. The Visualizer
              </Text>
              <Text variant="body-md" color="muted">
                Student fixes the architecture and watches the system stabilize.
              </Text>
            </div>
          </div>
        </Card>

        {/* Why This Matters */}
        <Card variant="elevated">
          <Text variant="h2" className="mb-6">
            Why This Matters in 2026
          </Text>
          <div className="space-y-4">
            <div>
              <Text variant="h4" className="mb-2">
                Safety
              </Text>
              <Text variant="body-md" color="muted">
                If you don't understand the system, you cannot debug AI when it lies to you.
              </Text>
            </div>
            <div>
              <Text variant="h4" className="mb-2">
                Agency
              </Text>
              <Text variant="body-md" color="muted">
                Being a "User" is passive. Being an "Architect" is active. Fulfillment comes from active agency.
              </Text>
            </div>
            <div>
              <Text variant="h4" className="mb-2">
                Taste
              </Text>
              <Text variant="body-md" color="muted">
                AI has average taste (regresses to mean). Only by understanding rules can you knowingly break them to
                create art.
              </Text>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AboutPage;
