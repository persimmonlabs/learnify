import React from 'react';
import { cn } from '../../utils/cn';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Alert Component
 * Contextual feedback messages
 */

const alertVariants = {
  info: {
    container: 'bg-prism-blue-50 border-prism-blue-200 text-prism-blue-900',
    icon: 'text-prism-blue-600',
    Icon: Info,
  },
  success: {
    container: 'bg-prism-green-50 border-prism-green-200 text-prism-green-900',
    icon: 'text-prism-green-600',
    Icon: CheckCircle,
  },
  warning: {
    container: 'bg-prism-orange-50 border-prism-orange-200 text-prism-orange-900',
    icon: 'text-prism-orange-600',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-900',
    icon: 'text-red-600',
    Icon: AlertCircle,
  },
};

const Alert = ({
  children,
  variant = 'info',
  title,
  icon: CustomIcon,
  showIcon = true,
  className,
  ...props
}) => {
  const config = alertVariants[variant];
  const IconComponent = CustomIcon || config.Icon;

  return (
    <div
      className={cn(
        'rounded-xl p-4 border flex gap-3',
        config.container,
        className
      )}
      {...props}
    >
      {showIcon && (
        <div className={cn('shrink-0', config.icon)}>
          <IconComponent size={20} />
        </div>
      )}
      <div className="flex-1">
        {title && (
          <div className="font-semibold mb-1">{title}</div>
        )}
        <div className="text-sm leading-relaxed opacity-90">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Alert;
