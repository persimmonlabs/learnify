import React from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { Tabs, TabsList, TabsTrigger } from '../atoms/Tabs';

/**
 * FilterSidebar Component - Organism
 * Advanced filtering controls for course catalog
 * Supports cognitive patterns, topics, difficulty, and duration filters
 */

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount = 0,
  isMobileOpen = false,
  onMobileClose,
  className,
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    pattern: true,
    topic: true,
    difficulty: true,
    duration: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const cognitivePatterns = [
    { value: 'all', label: 'All Patterns' },
    { value: 'systems', label: 'Systems Thinking' },
    { value: 'conflict', label: 'Conflict Resolution' },
    { value: 'lifecycle', label: 'Lifecycle Analysis' },
    { value: 'pipeline', label: 'Pipeline Thinking' },
    { value: 'narrative', label: 'Narrative Design' },
  ];

  const topics = [
    { value: 'all', label: 'All Topics' },
    { value: 'programming', label: 'Programming' },
    { value: 'finance', label: 'Finance' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'language', label: 'Language' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner', color: 'green' },
    { value: 'intermediate', label: 'Intermediate', color: 'orange' },
    { value: 'advanced', label: 'Advanced', color: 'error' },
  ];

  const durations = [
    { value: 'all', label: 'All Durations' },
    { value: 'short', label: 'Under 5 hours' },
    { value: 'medium', label: '5-10 hours' },
    { value: 'long', label: '10-20 hours' },
    { value: 'verylong', label: '20+ hours' },
  ];

  const FilterSection = ({ title, options, value, onChange, field, isExpanded, onToggle }) => (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <Text variant="body-sm" weight="semibold" className="text-slate-700">
          {title}
        </Text>
        {isExpanded ? (
          <ChevronUp size={16} className="text-slate-400 group-hover:text-slate-600" />
        ) : (
          <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(field, option.value)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                value === option.value
                  ? 'bg-prism-blue-50 text-prism-blue-700 border-2 border-prism-blue-200'
                  : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {option.color && value === option.value && (
                  <Badge variant={option.color} size="sm">
                    Active
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-slate-600" />
          <Text variant="h3" className="text-slate-900">
            Filters
          </Text>
          {activeFilterCount > 0 && (
            <Badge variant="blue" size="sm">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {isMobileOpen && (
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <FilterSection
        title="Cognitive Pattern"
        options={cognitivePatterns}
        value={filters.pattern}
        onChange={onFilterChange}
        field="pattern"
        isExpanded={expandedSections.pattern}
        onToggle={() => toggleSection('pattern')}
      />

      <FilterSection
        title="Topic / Domain"
        options={topics}
        value={filters.topic}
        onChange={onFilterChange}
        field="topic"
        isExpanded={expandedSections.topic}
        onToggle={() => toggleSection('topic')}
      />

      <FilterSection
        title="Difficulty Level"
        options={difficulties}
        value={filters.difficulty}
        onChange={onFilterChange}
        field="difficulty"
        isExpanded={expandedSections.difficulty}
        onToggle={() => toggleSection('difficulty')}
      />

      <FilterSection
        title="Course Duration"
        options={durations}
        value={filters.duration}
        onChange={onFilterChange}
        field="duration"
        isExpanded={expandedSections.duration}
        onToggle={() => toggleSection('duration')}
      />

      {/* Clear Filters Button */}
      {activeFilterCount > 0 && (
        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={onClearFilters}
          className="mt-6"
        >
          Clear All Filters
        </Button>
      )}
    </>
  );

  // Mobile drawer overlay
  if (isMobileOpen) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />

        {/* Drawer */}
        <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto lg:hidden">
          <div className="p-6">{sidebarContent}</div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <Card
      variant="elevated"
      padding="lg"
      className={cn('sticky top-24 h-fit hidden lg:block', className)}
    >
      {sidebarContent}
    </Card>
  );
};

export default FilterSidebar;
