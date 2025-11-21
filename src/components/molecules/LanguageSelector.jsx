import React from 'react';
import { Code2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import Select from '../atoms/Select';

/**
 * LanguageSelector Component - Molecule
 * Programming language selector with icon
 */

const languageColors = {
  python: 'text-blue-600',
  golang: 'text-cyan-600',
  java: 'text-orange-600',
  javascript: 'text-yellow-600',
};

const LanguageSelector = ({
  value,
  onChange,
  languages = [
    { value: 'python', label: 'Python' },
    { value: 'golang', label: 'Go' },
    { value: 'java', label: 'Java' },
  ],
  className,
  ...props
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={languages}
      icon={<Code2 size={18} className={languageColors[value] || 'text-slate-400'} />}
      className={cn('font-mono', className)}
      placeholder="Select language..."
      {...props}
    />
  );
};

export default LanguageSelector;
