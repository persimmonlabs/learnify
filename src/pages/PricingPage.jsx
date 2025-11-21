/**
 * Pricing Page
 * Subscription tiers with feature comparison and FAQ section
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Sparkles, Zap, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import Container from '../components/atoms/Container';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Badge from '../components/atoms/Badge';
import GradientText from '../components/molecules/GradientText';
import { cn } from '../utils/cn';

/**
 * Pricing Tiers Configuration
 */
const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    badge: 'Free Explorer',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with personalized learning',
    icon: Sparkles,
    iconColor: 'text-prism-blue-600',
    bgColor: 'bg-prism-blue-50',
    popular: false,
    features: [
      { name: '3 courses forever', included: true, highlight: true },
      { name: 'Full access to enrolled courses', included: true },
      { name: 'Community features', included: true },
      { name: 'Progress tracking', included: true },
      { name: 'Badge: "Free Explorer"', included: true },
      { name: 'Priority support', included: false },
      { name: 'Advanced exercises', included: false },
      { name: 'Exclusive courses', included: false },
      { name: 'Certificate of completion', included: false },
      { name: '1-on-1 mentorship sessions', included: false },
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
  },
  {
    id: 'plus',
    name: 'Plus',
    badge: 'Plus Learner',
    price: 5,
    period: 'month',
    description: 'For dedicated learners ready to expand their skills',
    icon: Zap,
    iconColor: 'text-prism-orange-600',
    bgColor: 'bg-prism-orange-50',
    popular: true,
    features: [
      { name: 'Everything in Free', included: true, highlight: true },
      { name: '+3 additional courses per month', included: true, highlight: true },
      { name: '6 total courses with free tier', included: true, info: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced exercises', included: true },
      { name: 'Badge: "Plus Learner"', included: true },
      { name: 'Exclusive courses', included: false },
      { name: 'Certificate of completion', included: false },
      { name: '1-on-1 mentorship sessions', included: false },
    ],
    cta: 'Coming Soon',
    ctaDisabled: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Pro Learner',
    price: 15,
    period: 'month',
    description: 'For professionals seeking mastery and personalized guidance',
    icon: Crown,
    iconColor: 'text-prism-green-600',
    bgColor: 'bg-prism-green-50',
    popular: false,
    features: [
      { name: 'Everything in Plus', included: true, highlight: true },
      { name: '+10 additional courses per month', included: true, highlight: true },
      { name: '13 total courses with free tier', included: true, info: true },
      { name: 'Exclusive courses', included: true },
      { name: 'Certificate of completion', included: true },
      { name: '1-on-1 mentorship sessions', included: true },
      { name: 'Badge: "Pro Learner"', included: true },
    ],
    cta: 'Coming Soon',
    ctaDisabled: true,
  },
];

/**
 * Feature Comparison Data
 */
const comparisonFeatures = [
  {
    category: 'Courses & Content',
    features: [
      { name: 'Base courses included', free: '3', plus: '3', pro: '3' },
      { name: 'Additional courses per month', free: '0', plus: '3', pro: '10' },
      { name: 'Total courses available', free: '3', plus: '6', pro: '13' },
      { name: 'Access to enrolled courses', free: true, plus: true, pro: true },
      { name: 'Exclusive courses', free: false, plus: false, pro: true },
      { name: 'Advanced exercises', free: false, plus: true, pro: true },
    ],
  },
  {
    category: 'Features & Support',
    features: [
      { name: 'Community features', free: true, plus: true, pro: true },
      { name: 'Progress tracking', free: true, plus: true, pro: true },
      { name: 'Priority support', free: false, plus: true, pro: true },
      { name: 'Certificate of completion', free: false, plus: false, pro: true },
      { name: '1-on-1 mentorship sessions', free: false, plus: false, pro: true },
    ],
  },
];

/**
 * FAQ Data
 */
const faqs = [
  {
    question: 'What happens to my enrolled courses if I downgrade?',
    answer: 'All enrolled courses remain accessible forever, even if you downgrade. You keep full access to any course you\'ve enrolled in, regardless of your current subscription tier.',
  },
  {
    question: 'Can I change my subscription tier anytime?',
    answer: 'Yes! You can upgrade or downgrade your subscription at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing period.',
  },
  {
    question: 'What does "additional courses per month" mean?',
    answer: 'This is the number of new courses you can enroll in each month. For example, Plus members can enroll in 3 new courses per month, in addition to the 3 free courses everyone gets. Once enrolled, you keep access to those courses forever.',
  },
  {
    question: 'Is there a free trial for paid tiers?',
    answer: 'Currently, paid tiers are "Coming Soon" as we refine the platform. Start with the Free tier (3 courses forever) and we\'ll notify you when paid tiers become available.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'When payment integration launches, we\'ll accept all major credit cards, debit cards, and digital payment methods. No payment is required for the Free tier.',
  },
  {
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'Once payment is enabled, we\'ll offer a 14-day money-back guarantee on all paid subscriptions. If you\'re not satisfied, contact us for a full refund within 14 days of purchase.',
  },
];

/**
 * Pricing Card Component
 */
const PricingCard = ({ tier, index }) => {
  const navigate = useNavigate();
  const Icon = tier.icon;

  const handleClick = () => {
    if (tier.ctaLink) {
      navigate(tier.ctaLink);
    }
  };

  return (
    <div
      className={cn(
        'relative flex flex-col',
        tier.popular && 'md:scale-105 md:z-10'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
          <Badge variant="orange" size="lg" className="shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Card */}
      <Card
        variant={tier.popular ? 'elevated' : 'default'}
        padding="lg"
        hover={!tier.popular}
        className={cn(
          'flex-1 flex flex-col',
          tier.popular && 'border-2 border-prism-orange-200 shadow-2xl'
        )}
      >
        {/* Header */}
        <div className="text-center mb-6">
          {/* Icon */}
          <div className={cn('inline-flex p-4 rounded-2xl mb-4', tier.bgColor)}>
            <Icon className={cn('w-8 h-8', tier.iconColor)} />
          </div>

          {/* Name */}
          <Text variant="h3" className="mb-2">
            {tier.name}
          </Text>

          {/* Description */}
          <Text variant="body-sm" color="muted" className="mb-6">
            {tier.description}
          </Text>

          {/* Price */}
          <div className="mb-2">
            <GradientText className="text-5xl font-bold">
              ${tier.price}
            </GradientText>
            <Text variant="body-md" color="muted" className="inline ml-2">
              /{tier.period}
            </Text>
          </div>

          {/* Badge */}
          <Badge variant="blue" size="sm">
            {tier.badge}
          </Badge>
        </div>

        {/* Features */}
        <div className="flex-1 mb-6">
          <ul className="space-y-3">
            {tier.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                    feature.included
                      ? 'bg-prism-green-100 text-prism-green-600'
                      : 'bg-slate-100 text-slate-400'
                  )}
                >
                  {feature.included ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <X size={14} strokeWidth={2} />
                  )}
                </span>
                <Text
                  variant="body-sm"
                  className={cn(
                    feature.included ? 'text-slate-900' : 'text-slate-400',
                    (feature.highlight || feature.info) && 'font-semibold'
                  )}
                >
                  {feature.name}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Button
          variant={tier.popular ? 'primary' : 'secondary'}
          size="lg"
          fullWidth
          onClick={handleClick}
          disabled={tier.ctaDisabled}
        >
          {tier.cta}
        </Button>
      </Card>
    </div>
  );
};

/**
 * Comparison Table Component
 */
const ComparisonTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-4 px-4">
              <Text variant="body-md" className="font-bold">
                Features
              </Text>
            </th>
            <th className="text-center py-4 px-4">
              <Text variant="body-md" className="font-bold">
                Free
              </Text>
            </th>
            <th className="text-center py-4 px-4 bg-prism-orange-50 rounded-t-lg">
              <Text variant="body-md" className="font-bold">
                Plus
              </Text>
              <Badge variant="orange" size="sm" className="mt-1">
                Popular
              </Badge>
            </th>
            <th className="text-center py-4 px-4">
              <Text variant="body-md" className="font-bold">
                Pro
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((category, catIdx) => (
            <React.Fragment key={catIdx}>
              {/* Category Header */}
              <tr className="bg-slate-50">
                <td colSpan={4} className="py-3 px-4">
                  <Text variant="body-sm" className="font-bold uppercase tracking-wide text-slate-600">
                    {category.category}
                  </Text>
                </td>
              </tr>
              {/* Features */}
              {category.features.map((feature, featIdx) => (
                <tr
                  key={featIdx}
                  className={cn(
                    'border-b border-slate-100',
                    featIdx % 2 === 0 && 'bg-white'
                  )}
                >
                  <td className="py-3 px-4">
                    <Text variant="body-sm">{feature.name}</Text>
                  </td>
                  <td className="text-center py-3 px-4">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? (
                        <Check className="inline text-prism-green-600" size={20} strokeWidth={2.5} />
                      ) : (
                        <X className="inline text-slate-300" size={20} />
                      )
                    ) : (
                      <Text variant="body-sm" className="font-semibold">
                        {feature.free}
                      </Text>
                    )}
                  </td>
                  <td className="text-center py-3 px-4 bg-prism-orange-50/30">
                    {typeof feature.plus === 'boolean' ? (
                      feature.plus ? (
                        <Check className="inline text-prism-green-600" size={20} strokeWidth={2.5} />
                      ) : (
                        <X className="inline text-slate-300" size={20} />
                      )
                    ) : (
                      <Text variant="body-sm" className="font-semibold">
                        {feature.plus}
                      </Text>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="inline text-prism-green-600" size={20} strokeWidth={2.5} />
                      ) : (
                        <X className="inline text-slate-300" size={20} />
                      )
                    ) : (
                      <Text variant="body-sm" className="font-semibold">
                        {feature.pro}
                      </Text>
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * FAQ Item Component
 */
const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b border-slate-200 last:border-b-0 animate-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left hover:opacity-70 transition-opacity"
      >
        <Text variant="body-md" className="font-semibold pr-8">
          {faq.question}
        </Text>
        {isOpen ? (
          <ChevronUp className="flex-shrink-0 text-slate-400" size={20} />
        ) : (
          <ChevronDown className="flex-shrink-0 text-slate-400" size={20} />
        )}
      </button>
      {isOpen && (
        <div className="pb-6 animate-in">
          <Text variant="body-md" color="muted">
            {faq.answer}
          </Text>
        </div>
      )}
    </div>
  );
};

/**
 * Pricing Page Component
 */
const PricingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-prism-blue-50 via-white to-prism-orange-50">
        <Container size="lg">
          <div className="text-center mb-16">
            {/* Badge */}
            <Badge variant="blue" size="md" dot className="mb-6 animate-in">
              Simple, Transparent Pricing
            </Badge>

            {/* Headline */}
            <Text variant="display-md" as="h1" className="mb-6 animate-in" style={{ animationDelay: '100ms' }}>
              Start learning for{' '}
              <GradientText animate>free</GradientText>
            </Text>

            {/* Description */}
            <Text
              variant="body-lg"
              color="muted"
              className="max-w-2xl mx-auto animate-in"
              style={{ animationDelay: '200ms' }}
            >
              Get started with 3 courses forever. Upgrade anytime to unlock more courses and premium features.
            </Text>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={tier.id} tier={tier} index={index} />
            ))}
          </div>

          {/* Important Note */}
          <div className="text-center animate-in" style={{ animationDelay: '300ms' }}>
            <Card variant="elevated" padding="md" className="inline-block max-w-2xl">
              <div className="flex items-start gap-3">
                <Sparkles className="flex-shrink-0 text-prism-blue-600 mt-1" size={20} />
                <Text variant="body-sm" className="text-left">
                  <strong>Forever Access:</strong> All enrolled courses remain accessible forever, even if you
                  downgrade. Your learning journey never stops.
                </Text>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 bg-slate-50">
        <Container size="xl">
          <div className="text-center mb-12">
            <Text variant="display-sm" as="h2" className="mb-4">
              Compare Plans
            </Text>
            <Text variant="body-lg" color="muted">
              See what's included in each tier
            </Text>
          </div>

          {/* Comparison Table */}
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <ComparisonTable />
          </Card>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container size="lg">
          <div className="text-center mb-12">
            <Text variant="display-sm" as="h2" className="mb-4">
              Frequently Asked Questions
            </Text>
            <Text variant="body-lg" color="muted">
              Everything you need to know about our pricing
            </Text>
          </div>

          {/* FAQ List */}
          <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
            <div className="divide-y divide-slate-200">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </Card>

          {/* Still Have Questions */}
          <div className="text-center mt-12">
            <Text variant="body-md" color="muted" className="mb-4">
              Still have questions?
            </Text>
            <Button variant="secondary" size="md">
              Contact Support
            </Button>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-prism-blue-600 to-prism-green-600">
        <Container size="lg">
          <div className="text-center">
            <Text variant="display-md" as="h2" className="mb-6 text-white">
              Ready to start learning?
            </Text>
            <Text variant="body-xl" className="mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of learners who are mastering new skills through their passions
            </Text>
            <Button variant="primary" size="xl" className="bg-white text-prism-blue-600 hover:bg-slate-50">
              Get Started Free
            </Button>
            <Text variant="caption" className="mt-4 text-white/70">
              No credit card required • 3 courses forever
            </Text>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PricingPage;
