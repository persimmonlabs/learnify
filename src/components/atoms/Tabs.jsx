import React, { useState } from 'react';
import { cn } from '../../utils/cn';

/**
 * Tabs Component - Atomic Design
 * Tab navigation system
 */

const TabsContext = React.createContext();

export const Tabs = ({ defaultValue, value, onValueChange, children, className }) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn('', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-100 p-1 rounded-xl',
    underline: 'border-b border-slate-200',
    pills: 'flex gap-2',
  };

  return (
    <div className={cn('flex', variants[variant], className)}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children, className }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
        isActive
          ? 'bg-white text-slate-900 shadow-sm'
          : 'text-slate-500 hover:text-slate-700 hover:bg-white/50',
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className }) => {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div className={cn('mt-4', className)}>
      {children}
    </div>
  );
};
