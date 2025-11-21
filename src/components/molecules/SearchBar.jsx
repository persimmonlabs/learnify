import React from 'react';
import { Search, X } from 'lucide-react';
import Input from '../atoms/Input';
import { cn } from '../../utils/cn';

/**
 * SearchBar Component - Molecule
 * Search input with real-time filtering and clear functionality
 */

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search courses...',
  className,
  ...props
}) => {
  const handleClear = () => {
    onClear?.();
  };

  return (
    <div className={cn('relative', className)}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<Search size={20} />}
        size="lg"
        className="pr-12"
        {...props}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Clear search"
        >
          <X size={18} className="text-slate-400 hover:text-slate-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
