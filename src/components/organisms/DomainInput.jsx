import React, { useState } from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Spinner from '../atoms/Spinner';

/**
 * DomainInput Component - Organism
 * Captures and validates user's passion/obsession
 */

const DomainInput = ({
  onSubmit,
  onSkip,
  examples = ['Tennis', 'Sneakers', 'Chess', 'Cooking', 'Photography'],
  className,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationState, setValidationState] = useState('idle'); // idle, valid, invalid

  const handleValidate = async () => {
    if (!value.trim()) return;

    setIsValidating(true);

    // Simulate LLM validation
    // In real app, call backend API
    setTimeout(() => {
      setIsValidating(false);
      setValidationState('valid');
    }, 1500);
  };

  const handleSubmit = () => {
    if (validationState === 'valid') {
      onSubmit?.(value);
    }
  };

  const handleExampleClick = (example) => {
    setValue(example);
    setValidationState('idle');
  };

  return (
    <Card variant="elevated" padding="xl" className={cn('', className)} {...props}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-prism-blue-100 rounded-2xl mb-4">
            <Sparkles size={32} className="text-prism-blue-600" />
          </div>

          <Text variant="display-sm" as="h2" className="mb-3">
            What's Your Obsession?
          </Text>

          <Text variant="body-lg" color="muted">
            We don't teach with boring examples like "Foo" and "Bar".<br />
            Tell us what you're passionate about, and we'll use it to teach.
          </Text>
        </div>

        {/* Input Field */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="What could you talk about for 30 minutes?"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setValidationState('idle');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleValidate()}
              size="lg"
              variant={
                validationState === 'valid' ? 'success' :
                validationState === 'invalid' ? 'error' :
                'default'
              }
              rightIcon={
                isValidating ? (
                  <Spinner size="sm" />
                ) : validationState === 'valid' ? (
                  <Check size={20} className="text-prism-green-600" />
                ) : validationState === 'invalid' ? (
                  <X size={20} className="text-red-600" />
                ) : null
              }
            />

            {validationState === 'invalid' && (
              <p className="mt-2 text-sm text-red-600">
                Hmm, that doesn't seem specific enough. Try something more concrete.
              </p>
            )}

            {validationState === 'valid' && (
              <p className="mt-2 text-sm text-prism-green-600 flex items-center gap-2">
                <Check size={16} /> Perfect! We can work with that.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleValidate}
              disabled={!value.trim() || isValidating || validationState === 'valid'}
            >
              {isValidating ? 'Validating...' : validationState === 'valid' ? 'Validated!' : 'Continue'}
            </Button>

            {validationState === 'valid' && (
              <Button
                variant="secondary"
                size="lg"
                onClick={handleSubmit}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Examples */}
        <div className="pt-6 border-t border-slate-100">
          <Text variant="label" className="text-slate-400 mb-3">
            Not sure? Try these:
          </Text>

          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  value === example
                    ? 'bg-prism-blue-100 text-prism-blue-700 ring-2 ring-prism-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Skip option */}
        {onSkip && (
          <div className="mt-8 text-center">
            <button
              onClick={onSkip}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Skip for now (we'll use generic examples)
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DomainInput;
