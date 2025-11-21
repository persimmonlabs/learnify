import React from 'react';
import Container from '../atoms/Container';
import Text from '../atoms/Text';
import Badge from '../atoms/Badge';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import GradientText from '../molecules/GradientText';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * HeroSection Component - Organism
 * Main hero/landing section
 */

const HeroSection = ({
  badgeText = 'Early Access v1.0',
  headline,
  highlightedWord,
  description,
  inputPlaceholder = 'Enter your email to join the waitlist...',
  ctaText = 'Join',
  footerText = 'No credit card required',
  className,
}) => {
  return (
    <section className={cn('relative pt-32 pb-20', className)}>
      <Container size="lg">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <Badge variant="blue" size="md" dot className="mb-8 animate-in">
            {badgeText}
          </Badge>

          {/* Headline */}
          <div className="animate-in" style={{ animationDelay: '100ms' }}>
            {headline}
          </div>

          {/* Description */}
          {description && (
            <Text
              variant="body-lg"
              color="muted"
              className="max-w-2xl mx-auto mb-12 animate-in"
              style={{ animationDelay: '200ms' }}
            >
              {description}
            </Text>
          )}

          {/* Email Input */}
          <div className="w-full max-w-lg mx-auto relative group animate-in" style={{ animationDelay: '300ms' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-prism-blue-400 via-prism-green-400 to-prism-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex items-center gap-2 bg-white rounded-2xl p-2 shadow-2xl shadow-prism-blue-900/5 border border-slate-100">
              <Input
                type="email"
                placeholder={inputPlaceholder}
                className="border-0 focus:ring-0 pr-2"
                fullWidth
              />
              <Button
                variant="primary"
                size="md"
                className="shrink-0"
                rightIcon={<ArrowRight size={16} />}
              >
                {ctaText}
              </Button>
            </div>

            {footerText && (
              <Text variant="caption" className="mt-4 flex items-center justify-center gap-2">
                <Check size={12} className="text-prism-green-500" /> {footerText}
              </Text>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
