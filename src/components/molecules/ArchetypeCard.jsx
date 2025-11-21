import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import IconBox from './IconBox';
import Badge from '../atoms/Badge';

/**
 * ArchetypeCard Component - Molecule
 * Selectable archetype card for onboarding
 */

const ArchetypeCard = ({
  title,
  subtitle,
  description,
  icon,
  variant = 'blue',
  examples = [],
  isSelected = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <Card
      variant={isSelected ? 'gradient' : 'elevated'}
      padding="lg"
      hover={!isSelected}
      className={cn(
        'cursor-pointer transition-all duration-300',
        isSelected && 'ring-4 ring-prism-blue-200 scale-105',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start gap-4">
        <IconBox
          variant={isSelected ? 'gradient' : variant}
          size="xl"
          shadow={isSelected}
        >
          {icon}
        </IconBox>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            {isSelected && (
              <Badge variant="blue" size="sm">Selected</Badge>
            )}
          </div>

          <p className="text-sm font-medium text-prism-blue-600 mb-3">
            {subtitle}
          </p>

          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {description}
          </p>

          {/* Examples */}
          {examples.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {examples.map((example, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg"
                >
                  {example}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Arrow indicator */}
        <div className={cn(
          'shrink-0 transition-all duration-300',
          isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        )}>
          <ArrowRight size={24} className="text-prism-blue-600" />
        </div>
      </div>
    </Card>
  );
};

export default ArchetypeCard;
