import React from 'react';
import Badge from '../atoms/Badge';

/**
 * SubscriptionBadge Component - Molecule
 * Displays user subscription tier with appropriate styling
 *
 * @param {Object} props
 * @param {string} props.tier - Subscription tier ('free', 'plus', or 'pro')
 * @param {string} props.size - Badge size ('sm', 'md', 'lg')
 * @param {string} props.className - Additional CSS classes
 */

const tierConfig = {
  free: {
    label: 'Free',
    variant: 'green',
  },
  plus: {
    label: 'Plus',
    variant: 'blue',
  },
  pro: {
    label: 'Pro',
    variant: 'orange',
  },
};

const SubscriptionBadge = ({ tier = 'free', size = 'sm', className }) => {
  const config = tierConfig[tier?.toLowerCase()] || tierConfig.free;

  return (
    <Badge
      variant={config.variant}
      size={size}
      className={className}
    >
      {config.label}
    </Badge>
  );
};

export default SubscriptionBadge;
