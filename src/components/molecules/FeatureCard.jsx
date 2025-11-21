import React from 'react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import IconBox from './IconBox';
import Text from '../atoms/Text';

/**
 * FeatureCard Component - Molecule
 * Reusable card for displaying features
 */

const FeatureCard = ({
  icon,
  title,
  description,
  variant = 'default',
  iconVariant = 'blue',
  hover = true,
  children,
  className,
  ...props
}) => {
  return (
    <Card
      variant={variant}
      hover={hover}
      className={cn('relative overflow-hidden group', className)}
      {...props}
    >
      {/* Background glow effect */}
      {iconVariant === 'blue' && (
        <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-gradient-to-br from-prism-blue-50 to-prism-blue-50/0 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
      )}
      {iconVariant === 'orange' && (
        <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-gradient-to-br from-prism-orange-50 to-prism-orange-50/0 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
      )}
      {iconVariant === 'green' && (
        <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-gradient-to-br from-prism-green-50 to-prism-green-50/0 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
      )}

      <div className="relative z-10">
        {icon && (
          <IconBox variant={iconVariant} size="lg" className="mb-6">
            {icon}
          </IconBox>
        )}

        {title && (
          <Text variant="h4" className="mb-2">
            {title}
          </Text>
        )}

        {description && (
          <Text variant="body-sm" color="muted">
            {description}
          </Text>
        )}

        {children}
      </div>
    </Card>
  );
};

export default FeatureCard;
