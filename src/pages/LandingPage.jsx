/**
 * Landing Page
 * Beautiful landing page using atomic design components
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundAtmosphere from '../components/organisms/BackgroundAtmosphere';
import Navigation from '../components/organisms/Navigation';
import Footer from '../components/organisms/Footer';
import Container from '../components/atoms/Container';
import Badge from '../components/atoms/Badge';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import GradientText from '../components/molecules/GradientText';
import FeatureCard from '../components/molecules/FeatureCard';
import { ArrowRight, Check, Target, Zap, Users, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [learningGoal, setLearningGoal] = useState('');

  const handleStart = () => {
    if (learningGoal.trim()) {
      navigate('/login', { state: { learningGoal: learningGoal.trim() } });
    } else {
      navigate('/login');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleStart();
    }
  };

  // Navigation links
  const navLinks = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '/about' },
  ];

  // Footer link groups
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'How it Works', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-prism-blue-100 selection:text-prism-blue-900 overflow-x-hidden">
      {/* Background */}
      <BackgroundAtmosphere variant="sunrise" />

      {/* Navigation */}
      <Navigation links={navLinks} ctaText="Get Started" onCtaClick={() => navigate('/login')} />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section - Learning Goal Capture */}
        <section className="relative pt-32 pb-20">
          <Container size="lg">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <Badge variant="blue" size="md" dot className="mb-8 animate-in">
                <Sparkles size={14} className="inline mr-2" />
                Early Access v1.0
              </Badge>

              {/* Headline */}
              <div className="animate-in" style={{ animationDelay: '100ms' }}>
                <Text as="h1" variant="display-xl" className="mb-8 max-w-4xl mx-auto leading-[1.1]">
                  What do you want to <br className="hidden md:block" />
                  <GradientText animate>learn?</GradientText>
                </Text>
              </div>

              {/* Description */}
              <Text
                variant="body-lg"
                color="muted"
                className="max-w-2xl mx-auto mb-12 animate-in"
                style={{ animationDelay: '200ms' }}
              >
                AI builds your personal curriculum using <strong className="text-slate-900">your obsession</strong>.
                Learn coding through sneakers. Finance through tennis. Music theory through trading. Any skill, taught
                through what you actually care about.
              </Text>

              {/* Learning Goal Input - Beautiful with glow effect */}
              <div className="w-full max-w-2xl mx-auto relative group animate-in" style={{ animationDelay: '300ms' }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-prism-blue-400 via-prism-green-400 to-prism-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-white rounded-2xl p-3 shadow-2xl shadow-prism-blue-900/5 border border-slate-100">
                  <textarea
                    value={learningGoal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type anything... Examples: SQL for tennis analytics • Build a trading bot • Design systems for games"
                    className="w-full px-4 py-4 text-base border-0 focus:ring-0 outline-none resize-none rounded-xl"
                    rows={3}
                  />
                  <div className="flex items-center justify-between px-2 pt-2">
                    <Text variant="caption" color="light" className="text-xs">
                      {learningGoal.length > 0 ? (
                        <>
                          {learningGoal.length} characters · Press{' '}
                          <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">⌘Enter</kbd> to continue
                        </>
                      ) : (
                        'No limit—write as much as you want'
                      )}
                    </Text>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleStart}
                      rightIcon={<ArrowRight size={16} />}
                      className="shrink-0"
                    >
                      {learningGoal.trim() ? 'Start Journey' : 'Skip'}
                    </Button>
                  </div>
                </div>

                <Text variant="caption" className="mt-4 flex items-center justify-center gap-2">
                  <Check size={12} className="text-prism-green-500" /> No credit card required
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* Example Personas Section */}
        <section className="py-24 bg-white">
          <Container size="xl">
            <div className="text-center mb-16">
              <Text variant="display-md" as="h2" className="mb-4">
                Any skill. Your passion.
              </Text>
              <Text variant="body-lg" color="muted" className="max-w-2xl mx-auto">
                We don't teach with boring examples. We rewrite every lesson using what you're obsessed with.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  emoji: '👟',
                  title: 'The Sneaker Allocator',
                  skill: 'Learn investing',
                  through: 'your sneaker collection',
                  color: 'from-orange-500 to-red-500',
                },
                {
                  emoji: '🎾',
                  title: 'The Tennis Analyst',
                  skill: 'Learn SQL & data',
                  through: 'your tennis stats',
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  emoji: '🎵',
                  title: 'The Beat Architect',
                  skill: 'Learn algorithms',
                  through: 'music production',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  emoji: '🍳',
                  title: 'The Recipe Engineer',
                  skill: 'Learn systems design',
                  through: 'cooking processes',
                  color: 'from-blue-500 to-cyan-500',
                },
              ].map((persona) => (
                <Card
                  key={persona.title}
                  variant="elevated"
                  className="text-center hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="text-6xl mb-4">{persona.emoji}</div>
                  <Text variant="h4" className="mb-3">
                    {persona.title}
                  </Text>
                  <div className="space-y-2">
                    <Text variant="body-sm" color="muted">
                      {persona.skill}
                    </Text>
                    <div className={`h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${persona.color}`} />
                    <Text variant="body-sm" className="font-medium text-slate-700">
                      {persona.through}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50">
          <Container size="xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Target size={28} />}
                iconVariant="blue"
                title="100% Personalized"
                description="Every lesson rewrites itself for YOUR domain. No generic tutorials. No abstract examples. Just learning through what you love."
              />

              <FeatureCard
                icon={<Zap size={28} />}
                iconVariant="orange"
                title="Build Real Systems"
                description="No toy problems. You'll architect actual systems from day one. Each module gives you working tools you can use immediately."
              />

              <FeatureCard
                icon={<Users size={28} />}
                iconVariant="green"
                title="Learn With Others"
                description="See what your network is mastering. Data-driven progress that inspires without the social media noise."
              />
            </div>
          </Container>
        </section>

        {/* Before/After Comparison */}
        <section className="py-24 bg-white">
          <Container size="xl">
            <div className="text-center mb-16">
              <Text variant="display-md" as="h2" className="mb-4">
                Traditional vs. Learnify
              </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Traditional Way */}
              <Card variant="outline" className="p-8 border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    😴
                  </div>
                  <Text variant="h3" className="text-slate-400">
                    Traditional Learning
                  </Text>
                </div>
                <div className="space-y-4">
                  {[
                    'Generic examples (Foo, Bar, widgets)',
                    'Memorize syntax first',
                    'Toy problems that feel pointless',
                    'Learn alone in silence',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-slate-400">✗</span>
                      </div>
                      <Text variant="body-sm" color="muted">
                        {item}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Learnify Way */}
              <Card variant="elevated" className="p-8 border-2 border-prism-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-prism-blue-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                  NEW
                </div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-prism-blue-500 to-prism-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    ⚡
                  </div>
                  <Text variant="h3">Learnify</Text>
                </div>
                <div className="space-y-4">
                  {[
                    'YOUR examples (sneakers, tennis, music)',
                    'Diagnose real systems immediately',
                    'Build tools you will actually use',
                    'Learn with a network that inspires',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-prism-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-white font-bold">✓</span>
                      </div>
                      <Text variant="body-sm" className="font-medium text-slate-900">
                        {item}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-slate-50">
          <Container size="xl">
            <div className="text-center mb-16">
              <Text variant="display-md" as="h2" className="mb-4">
                How It Works
              </Text>
              <Text variant="body-lg" color="muted">
                Three steps to your personalized learning path
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: '1',
                  title: 'Tell us what you want to master',
                  description: 'Type anything - "SQL", "investing", "music theory", "design systems"',
                },
                {
                  step: '2',
                  title: "Share what you're obsessed with",
                  description: 'Your sneaker collection, tennis stats, cooking recipes, trading strategies',
                },
                {
                  step: '3',
                  title: 'AI builds your custom curriculum',
                  description: 'Every lesson rewrites itself using YOUR domain and passion',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-prism-blue-600 to-prism-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <Text variant="h4" className="mb-3">
                    {item.title}
                  </Text>
                  <Text variant="body-md" color="muted">
                    {item.description}
                  </Text>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-prism-blue-50 to-prism-orange-50">
          <Container size="lg">
            <div className="text-center">
              <Text variant="display-lg" as="h2" className="mb-6">
                Learn anything through anything
              </Text>
              <Text variant="body-xl" color="muted" className="mb-8 max-w-2xl mx-auto">
                The first learning platform that adapts to you, not the other way around
              </Text>
              <Button variant="primary" size="xl" onClick={handleStart} rightIcon={<ArrowRight size={20} />}>
                Get Started Now
              </Button>
              <Text variant="caption" color="muted" className="mt-4">
                Free to start · No credit card required
              </Text>
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer
        linkGroups={footerLinks}
        description="The first learning platform that adapts to you, not the other way around. Built with ❤️."
      />
    </div>
  );
};

export default LandingPage;
