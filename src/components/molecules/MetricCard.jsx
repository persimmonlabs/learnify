import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import IconBox from './IconBox';

/**
 * MetricCard Component - Molecule
 * Display a metric with trend and change
 */

const MetricCard = ({
  label,
  value,
  change,
  trend = 'neutral', // up, down, neutral
  icon,
  variant = 'blue',
  suffix,
  className,
  ...props
}) => {
  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColors = {
    up: 'text-prism-green-600',
    down: 'text-red-600',
    neutral: 'text-slate-400',
  };

  const TrendIcon = trendIcons[trend];

  return (
    <Card variant="elevated" className={cn('', className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900">
            {value}
            {suffix && <span className="text-lg text-slate-400 ml-1">{suffix}</span>}
          </p>

          {change !== undefined && (
            <div className={cn('flex items-center gap-1 mt-2 text-sm font-medium', trendColors[trend])}>
              <TrendIcon size={16} />
              <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
          )}
        </div>

        {icon && (
          <IconBox variant={variant} size="lg">
            {icon}
          </IconBox>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;
