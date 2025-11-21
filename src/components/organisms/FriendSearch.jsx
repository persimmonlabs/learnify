/**
 * FriendSearch Component - Organism
 * Search bar for finding friends
 */

import React from 'react';
import Input from '../atoms/Input';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const FriendSearch = ({ value, onChange, onClear, placeholder = 'Search friends...', className }) => {
  return (
    <div className={cn('relative', className)}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<Search size={20} />}
        rightIcon={
          value && (
            <button
              onClick={onClear}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )
        }
        size="lg"
        className="w-full"
      />
    </div>
  );
};

export default FriendSearch;
