import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Toast Component - Atomic Design
 * Notification toast message
 */

const toastVariants = {
  success: {
    container: 'bg-prism-green-50 border-prism-green-200',
    icon: 'text-prism-green-600',
    Icon: CheckCircle,
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    Icon: AlertCircle,
  },
  info: {
    container: 'bg-prism-blue-50 border-prism-blue-200',
    icon: 'text-prism-blue-600',
    Icon: Info,
  },
  warning: {
    container: 'bg-prism-orange-50 border-prism-orange-200',
    icon: 'text-prism-orange-600',
    Icon: AlertCircle,
  },
};

const Toast = ({
  variant = 'info',
  title,
  message,
  onClose,
  showClose = true,
  className,
}) => {
  const config = toastVariants[variant];
  const IconComponent = config.Icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-in slide-in-from-right',
        config.container,
        className
      )}
    >
      <div className={cn('shrink-0 mt-0.5', config.icon)}>
        <IconComponent size={20} />
      </div>

      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-sm mb-1">{title}</div>
        )}
        {message && (
          <div className="text-sm opacity-90">{message}</div>
        )}
      </div>

      {showClose && (
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Toast;
