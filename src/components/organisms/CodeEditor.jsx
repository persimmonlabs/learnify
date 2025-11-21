import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import LanguageSelector from '../molecules/LanguageSelector';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../atoms/Tabs';

/**
 * CodeEditor Component - Organism
 * Code editor with language selection and execution
 */

const CodeEditor = ({
  defaultLanguage = 'python',
  defaultCode = '',
  onRun,
  onReset,
  languages,
  readOnly = false,
  showLineNumbers = true,
  minHeight = '400px',
  className,
  ...props
}) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(defaultCode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(defaultCode);
    onReset?.();
  };

  const handleRun = () => {
    onRun?.(code, language);
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3">
          <LanguageSelector
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            languages={languages}
            size="sm"
            fullWidth={false}
            className="w-40"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>

          {!readOnly && (
            <>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<RotateCcw size={16} />}
                onClick={handleReset}
              >
                Reset
              </Button>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<Play size={16} />}
                onClick={handleRun}
              >
                Run Code
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="relative bg-[#0F1117]">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          className={cn(
            'w-full p-6 bg-transparent text-slate-200 font-mono text-sm',
            'outline-none resize-none',
            'placeholder:text-slate-500',
            readOnly && 'cursor-default'
          )}
          style={{ minHeight }}
          placeholder="// Write your code here..."
        />

        {/* Line numbers (decorative) */}
        {showLineNumbers && (
          <div className="absolute left-0 top-0 p-6 pointer-events-none select-none">
            <div className="text-slate-600 font-mono text-sm leading-[1.5]">
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CodeEditor;
