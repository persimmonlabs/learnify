import React, { useState } from 'react';
import { MessageSquare, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * AnnotationMarker Component - Molecule
 * Interactive code annotation marker
 */

const annotationTypes = {
  issue: {
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
  suggestion: {
    icon: Lightbulb,
    color: 'text-prism-orange-600',
    bg: 'bg-prism-orange-100',
  },
  explanation: {
    icon: MessageSquare,
    color: 'text-prism-blue-600',
    bg: 'bg-prism-blue-100',
  },
  correct: {
    icon: CheckCircle,
    color: 'text-prism-green-600',
    bg: 'bg-prism-green-100',
  },
};

const AnnotationMarker = ({
  type = 'issue',
  title,
  description,
  lineNumber,
  onResolve,
  className,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = annotationTypes[type];
  const Icon = config.icon;

  return (
    <div className={cn('relative', className)} {...props}>
      {/* Marker Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center transition-all',
          config.bg,
          config.color,
          'hover:scale-110 active:scale-95'
        )}
        title={title}
      >
        <Icon size={14} />
      </button>

      {/* Popup */}
      {isExpanded && (
        <div className="absolute left-8 top-0 z-10 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 animate-in slide-in-from-left">
          <div className="flex items-start gap-3 mb-3">
            <div className={cn('shrink-0', config.color)}>
              <Icon size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
              {lineNumber && (
                <p className="text-xs text-slate-400 mb-2">Line {lineNumber}</p>
              )}
              <p className="text-sm text-slate-600">{description}</p>
            </div>
          </div>

          {onResolve && (
            <button
              onClick={() => {
                onResolve();
                setIsExpanded(false);
              }}
              className="w-full py-2 text-sm font-medium text-prism-blue-600 hover:bg-prism-blue-50 rounded-lg transition-colors"
            >
              Mark as Resolved
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnnotationMarker;
