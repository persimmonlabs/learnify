import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../atoms/Container';
import Text from '../atoms/Text';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import { BookOpen, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * HeroSection Component - Organism
 * Main hero/landing section - Updated for course catalog browsing
 */

const HeroSection = ({
  badgeText = 'Start Learning Today',
  headline,
  description,
  ctaText = 'Explore Course Catalog',
  footerText = 'First 3 courses completely free',
  className,
}) => {
  const navigate = useNavigate();

  const handleExploreCourses = () => {
    navigate('/courses');
  };

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

          {/* CTA Button */}
          <div className="w-full max-w-lg mx-auto relative group animate-in" style={{ animationDelay: '300ms' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-prism-blue-400 via-prism-green-400 to-prism-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-2xl shadow-prism-blue-900/5"
                leftIcon={<BookOpen size={20} />}
                onClick={handleExploreCourses}
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

          {/* Pricing Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-in" style={{ animationDelay: '400ms' }}>
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <Text variant="body-sm" weight="semibold" className="text-prism-blue-600 mb-1">
                Free
              </Text>
              <Text variant="h4" className="mb-1">
                3 Courses
              </Text>
              <Text variant="caption" color="muted">
                No credit card required
              </Text>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <Text variant="body-sm" weight="semibold" className="text-prism-green-600 mb-1">
                $5/month
              </Text>
              <Text variant="h4" className="mb-1">
                3 More Courses
              </Text>
              <Text variant="caption" color="muted">
                6 courses total per month
              </Text>
            </div>

            <div className="bg-gradient-to-br from-prism-blue-500 to-prism-purple-500 rounded-xl p-4 text-white shadow-lg">
              <Text variant="body-sm" weight="semibold" className="opacity-90 mb-1">
                $15/month
              </Text>
              <Text variant="h4" className="mb-1">
                10 More Courses
              </Text>
              <Text variant="caption" className="opacity-80">
                13 courses total per month
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
