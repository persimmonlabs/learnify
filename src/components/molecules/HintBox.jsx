import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

/**
 * HintBox Component - Molecule
 * Collapsible hint display
 */

const HintBox = ({
  title = 'Hint',
  content,
  penalty,
  defaultOpen = false,
  onReveal,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (!isOpen && onReveal) {
      onReveal();
    }
    setIsOpen(!isOpen);
  };

  return (
    <Card
      variant="outlined"
      padding="md"
      className={cn('border-prism-orange-200 bg-prism-orange-50/30', className)}
      {...props}
    >
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={20} className="text-prism-orange-600" />
          <span className="font-semibold text-slate-900">{title}</span>
          {penalty && !isOpen && (
            <span className="text-xs text-slate-500">(-{penalty} pts)</span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-slate-400" />
        ) : (
          <ChevronDown size={20} className="text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-prism-orange-200">
          <div className="text-sm text-slate-700 leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </Card>
  );
};

export default HintBox;
