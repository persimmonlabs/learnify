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

  const handleExploreCourses = () => {
    navigate('/courses');
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
                  Master New Skills Through <br className="hidden md:block" />
                  <GradientText animate>Expert-Curated Courses</GradientText>
                </Text>
              </div>

              {/* Description */}
              <Text
                variant="body-lg"
                color="muted"
                className="max-w-2xl mx-auto mb-12 animate-in"
                style={{ animationDelay: '200ms' }}
              >
                Discover professionally crafted learning paths designed by industry experts.
                Build real-world skills with structured, high-quality courses tailored to
                help you succeed in your learning journey.
              </Text>

              {/* CTA Button - Prominent with glow effect */}
              <div className="w-full max-w-md mx-auto relative group animate-in" style={{ animationDelay: '300ms' }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-prism-blue-400 via-prism-green-400 to-prism-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative">
                  <Button
                    variant="primary"
                    size="xl"
                    onClick={handleExploreCourses}
                    rightIcon={<ArrowRight size={20} />}
                    className="w-full shadow-2xl shadow-prism-blue-900/20 hover:shadow-prism-blue-900/30 transition-all duration-300"
                  >
                    Explore Our Courses
                  </Button>
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
                Comprehensive Learning Paths
              </Text>
              <Text variant="body-lg" color="muted" className="max-w-2xl mx-auto">
                Expert-designed courses across multiple disciplines, structured to take you from beginner to proficient.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  emoji: '💼',
                  title: 'Business & Finance',
                  skill: 'Master investing',
                  through: 'structured curriculum',
                  color: 'from-orange-500 to-red-500',
                },
                {
                  emoji: '💻',
                  title: 'Data & Analytics',
                  skill: 'Master SQL & data',
                  through: 'hands-on projects',
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  emoji: '🎨',
                  title: 'Design & Creativity',
                  skill: 'Master design systems',
                  through: 'real-world examples',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  emoji: '⚙️',
                  title: 'Engineering & Systems',
                  skill: 'Master architecture',
                  through: 'proven frameworks',
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
                title="Expert-Curated Content"
                description="Professionally designed courses by industry leaders. High-quality curriculum built on proven learning methodologies and best practices."
              />

              <FeatureCard
                icon={<Zap size={28} />}
                iconVariant="orange"
                title="Structured Learning Paths"
                description="Progress through carefully sequenced modules. Each course is designed to build your skills systematically from fundamentals to advanced topics."
              />

              <FeatureCard
                icon={<Users size={28} />}
                iconVariant="green"
                title="Learn With Community"
                description="Join a vibrant learning community. Track your progress and connect with fellow learners on similar paths."
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
                    'Generic, one-size-fits-all content',
                    'Disorganized learning materials',
                    'No clear progression path',
                    'Limited expert guidance',
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
                    'Expert-curated, high-quality courses',
                    'Structured learning progression',
                    'Proven frameworks and methodologies',
                    'Supportive learning community',
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
                Three simple steps to start your learning journey
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: '1',
                  title: 'Browse our course catalog',
                  description: 'Explore professionally curated courses across multiple disciplines and skill levels',
                },
                {
                  step: '2',
                  title: 'Choose your learning path',
                  description: 'Select courses that match your goals and start building real-world skills',
                },
                {
                  step: '3',
                  title: 'Learn and grow',
                  description: 'Follow structured lessons, complete projects, and track your progress',
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
                Start Your Learning Journey Today
              </Text>
              <Text variant="body-xl" color="muted" className="mb-8 max-w-2xl mx-auto">
                Join thousands of learners mastering new skills with expert-curated courses
              </Text>
              <Button variant="primary" size="xl" onClick={handleExploreCourses} rightIcon={<ArrowRight size={20} />}>
                Explore Courses
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
        description="Master new skills with expert-curated courses designed for success. Built with care."
      />
    </div>
  );
};

export default LandingPage;
