import React, { useState } from 'react';
import { Code, TrendingUp, Palette, Heart, Brain, ArrowRight } from 'lucide-react';
import Container from '../atoms/Container';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import ProgressBar from '../atoms/ProgressBar';
import ArchetypeCard from '../molecules/ArchetypeCard';
import DomainInput from '../organisms/DomainInput';
import { cn } from '../../utils/cn';

/**
 * OnboardingPage Template
 * Complete onboarding flow implementing The Onboarding Protocol v3
 */

const OnboardingPage = ({
  onComplete,
}) => {
  const [step, setStep] = useState(1); // 1-5
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [domain, setDomain] = useState('');
  const [variables, setVariables] = useState({});
  const [skillLevel, setSkillLevel] = useState(null);

  const metaCategories = [
    {
      id: 'digital',
      title: 'Digital Systems',
      subtitle: 'The Builder',
      description: 'Build tools that work while you sleep. Master software, AI agents, and automation.',
      icon: <Code size={32} />,
      variant: 'blue',
      examples: ['Software', 'AI Agents', 'Security'],
    },
    {
      id: 'economic',
      title: 'Economic Systems',
      subtitle: 'The Allocator',
      description: 'Understand how value moves and capture it. Master trading, investing, and venture capital.',
      icon: <TrendingUp size={32} />,
      variant: 'green',
      examples: ['Trading', 'DeFi', 'Venture'],
    },
    {
      id: 'aesthetic',
      title: 'Aesthetic Systems',
      subtitle: 'The Composer',
      description: 'Curate experiences that move people. Master music, design, and storytelling.',
      icon: <Palette size={32} />,
      variant: 'orange',
      examples: ['Music', 'Design', 'Games'],
    },
    {
      id: 'biological',
      title: 'Biological Systems',
      subtitle: 'The Optimizer',
      description: 'Optimize your physical vessel. Master nutrition, training, and biohacking.',
      icon: <Heart size={32} />,
      variant: 'error',
      examples: ['Nutrition', 'Training', 'Nature'],
    },
    {
      id: 'cognitive',
      title: 'Cognitive Systems',
      subtitle: 'The Strategist',
      description: 'Master your mind and influence others. Learn strategy, persuasion, and focus.',
      icon: <Brain size={32} />,
      variant: 'blue',
      examples: ['Strategy', 'Persuasion', 'Focus'],
    },
  ];

  const handleMetaSelect = (meta) => {
    setSelectedMeta(meta);
  };

  const handleDomainSubmit = (domainValue) => {
    setDomain(domainValue);
    setStep(3);
  };

  const handleComplete = () => {
    onComplete?.({
      metaCategory: selectedMeta,
      domain,
      variables,
      skillLevel,
    });
  };

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container size="xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <ProgressBar
            value={progress}
            variant="gradient"
            size="md"
            showLabel={false}
          />
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Step {step} of 5</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Step 1: Select Meta-Category */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in">
            <div className="text-center mb-12">
              <Text variant="display-lg" as="h1" className="mb-4">
                What System Do You Want to Architect?
              </Text>
              <Text variant="body-lg" color="muted">
                Choose your domain of control
              </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {metaCategories.map((meta) => (
                <ArchetypeCard
                  key={meta.id}
                  {...meta}
                  isSelected={selectedMeta?.id === meta.id}
                  onClick={() => handleMetaSelect(meta)}
                />
              ))}
            </div>

            {selectedMeta && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight size={20} />}
                  onClick={() => setStep(2)}
                >
                  Continue as {selectedMeta.subtitle}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Domain Input */}
        {step === 2 && (
          <div className="animate-in fade-in">
            <DomainInput
              onSubmit={handleDomainSubmit}
              onSkip={() => setStep(3)}
            />
          </div>
        )}

        {/* Step 3: Variable Extraction */}
        {step === 3 && (
          <div className="animate-in fade-in">
            <div className="max-w-2xl mx-auto">
              <Text variant="display-md" as="h2" className="mb-8 text-center">
                Let's Configure Your Course
              </Text>

              <div className="space-y-6">
                {/* Adaptive questions would go here */}
                <div className="p-8 bg-white rounded-2xl border border-slate-200">
                  <Text variant="h4" className="mb-4">
                    In your domain ({domain}), what is the single unit of value you track?
                  </Text>

                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-prism-blue-400 focus:ring-4 focus:ring-prism-blue-400/20 outline-none"
                    placeholder="e.g., The Shoe, The Stock, The Note..."
                    onChange={(e) => setVariables({ ...variables, entity: e.target.value })}
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setStep(4)}
                  disabled={!variables.entity}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Skill Level */}
        {step === 4 && (
          <div className="animate-in fade-in">
            <div className="max-w-3xl mx-auto">
              <Text variant="display-md" as="h2" className="mb-4 text-center">
                What's Your Current Setup?
              </Text>
              <Text variant="body-lg" color="muted" className="mb-12 text-center">
                This helps us start you at the right level
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'novice', title: 'Intuition', description: 'I just guess and learn by doing', module: 1 },
                  { id: 'analyst', title: 'Spreadsheets', description: 'I use Excel or Google Sheets', module: 3 },
                  { id: 'quant', title: 'Scripts', description: 'I write code or use APIs', module: 5 },
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSkillLevel(level)}
                    className={cn(
                      'p-6 rounded-2xl border-2 text-left transition-all',
                      skillLevel?.id === level.id
                        ? 'border-prism-blue-500 bg-prism-blue-50 ring-4 ring-prism-blue-200'
                        : 'border-slate-200 hover:border-prism-blue-200 bg-white'
                    )}
                  >
                    <Text variant="h4" className="mb-2">{level.title}</Text>
                    <Text variant="body-sm" color="muted">{level.description}</Text>
                    <div className="mt-4 text-xs text-slate-400">
                      Start at Module {level.module}
                    </div>
                  </button>
                ))}
              </div>

              {skillLevel && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="primary"
                    size="xl"
                    onClick={() => setStep(5)}
                  >
                    Show Me My Curriculum
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Recommendation */}
        {step === 5 && (
          <div className="animate-in fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-prism-blue-100 text-prism-blue-700 rounded-full text-sm font-semibold mb-6">
                  Your Personalized Path
                </div>

                <Text variant="display-lg" as="h1" className="mb-4">
                  THE {domain.toUpperCase()} {selectedMeta?.subtitle.toUpperCase()}
                </Text>

                <Text variant="body-xl" color="muted" className="mb-8">
                  Stop collecting. Start architecting.
                </Text>

                <div className="p-8 bg-gradient-to-br from-prism-blue-50 to-prism-green-50 rounded-3xl mb-8">
                  <Text variant="body-lg" className="leading-relaxed">
                    You selected <strong>{selectedMeta?.title}</strong>, but standard courses are boring.<br />
                    You live and breathe <strong>{domain}</strong>.<br />
                    So we aren't going to "learn {selectedMeta?.title}".<br />
                    <strong>We are going to build a {domain} system that scales.</strong>
                  </Text>
                </div>
              </div>

              {/* Curriculum Preview */}
              <div className="space-y-4 mb-12">
                <div className="p-6 bg-white rounded-2xl border-2 border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-prism-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <Text variant="h4" className="mb-2">The Atom: Defining Your Assets</Text>
                      <Text variant="body-sm" color="muted">
                        Stop viewing {domain} as random objects. See them as structured data with state.
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border-2 border-slate-200 opacity-60">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-300 text-white rounded-xl flex items-center justify-center text-xl font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <Text variant="h4" className="mb-2">The Standard: Quality Control</Text>
                      <Text variant="body-sm" color="muted">
                        Unlocks after Module 1
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="xl"
                fullWidth
                onClick={handleComplete}
              >
                Start Learning →
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step > 1 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              ← Back
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OnboardingPage;
