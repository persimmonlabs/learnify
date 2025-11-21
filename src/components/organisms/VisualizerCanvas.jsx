import React from 'react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

/**
 * VisualizerCanvas Component - Organism
 * Interactive system visualization canvas
 * Displays entropy graphs, memory maps, flow diagrams, etc.
 */

const VisualizerCanvas = ({
  type = 'entropy', // entropy, memory, flow, decision-tree, interface
  title,
  data = {},
  state = 'before', // before, after, animated
  className,
  children,
  ...props
}) => {
  const renderVisualization = () => {
    switch (type) {
      case 'entropy':
        return <EntropyGraph data={data} state={state} />;
      case 'memory':
        return <MemoryMap data={data} state={state} />;
      case 'flow':
        return <FlowDiagram data={data} state={state} />;
      case 'decision-tree':
        return <DecisionTree data={data} state={state} />;
      case 'interface':
        return <InterfaceBoard data={data} state={state} />;
      default:
        return children;
    }
  };

  return (
    <Card variant="elevated" padding="none" className={cn('', className)} {...props}>
      {title && (
        <div className="p-4 border-b border-slate-100">
          <Text variant="h4">{title}</Text>
        </div>
      )}

      <div className="p-6 bg-slate-50 min-h-[400px] flex items-center justify-center">
        {renderVisualization()}
      </div>
    </Card>
  );
};

// Sub-visualizations
const EntropyGraph = ({ data, state }) => (
  <div className="w-full max-w-2xl">
    <div className="text-center mb-8">
      <Text variant="h5" color="muted">
        {state === 'before' ? 'Chaos (High Entropy)' : 'Order (Low Entropy)'}
      </Text>
    </div>

    <div className={cn(
      'grid gap-4 transition-all duration-1000',
      state === 'before' ? 'grid-cols-8 rotate-12' : 'grid-cols-4'
    )}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'aspect-square rounded-lg transition-all duration-500',
            state === 'before'
              ? 'bg-red-400 opacity-60 scale-75 rotate-45'
              : 'bg-prism-green-500 opacity-100 scale-100'
          )}
          style={{ transitionDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  </div>
);

const MemoryMap = ({ data, state }) => (
  <div className="w-full max-w-2xl space-y-6">
    <div className="text-center">
      <Text variant="h5" color="muted">
        {state === 'before' ? 'Global State (Scattered)' : 'Encapsulated (Clean)'}
      </Text>
    </div>

    {state === 'before' ? (
      <div className="relative h-64 bg-white rounded-xl border-2 border-slate-200">
        {/* Scattered variables */}
        {['var1', 'var2', 'var3', 'var4', 'var5'].map((v, i) => (
          <div
            key={v}
            className="absolute px-3 py-1 bg-red-100 border border-red-300 rounded text-xs font-mono"
            style={{
              top: `${20 + i * 45}%`,
              left: `${10 + (i * 17) % 80}%`,
            }}
          >
            {v}
          </div>
        ))}
      </div>
    ) : (
      <div className="flex gap-4">
        <div className="flex-1 p-4 bg-prism-blue-50 rounded-xl border-2 border-prism-blue-200">
          <Text variant="label" className="mb-3 text-prism-blue-700">Object A</Text>
          <div className="space-y-2">
            {['var1', 'var2'].map((v) => (
              <div key={v} className="px-2 py-1 bg-white rounded text-xs font-mono">
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 bg-prism-green-50 rounded-xl border-2 border-prism-green-200">
          <Text variant="label" className="mb-3 text-prism-green-700">Object B</Text>
          <div className="space-y-2">
            {['var3', 'var4', 'var5'].map((v) => (
              <div key={v} className="px-2 py-1 bg-white rounded text-xs font-mono">
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const FlowDiagram = ({ data, state }) => (
  <div className="w-full max-w-xl">
    <div className="text-center mb-8">
      <Text variant="h5" color="muted">
        {state === 'before' ? 'O(n²) - Slow' : 'O(n) - Fast'}
      </Text>
    </div>

    <div className="space-y-4">
      {state === 'before' ? (
        // Nested loops
        <>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="flex-1 h-12 bg-red-400 rounded animate-pulse"
                  style={{ animationDelay: `${(i * 3 + j) * 100}ms` }}
                />
              ))}
            </div>
          ))}
        </>
      ) : (
        // Single loop
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-12 bg-prism-green-500 rounded animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

const DecisionTree = ({ data, state }) => (
  <div className="w-full max-w-2xl">
    <svg className="w-full h-64" viewBox="0 0 400 200">
      {/* Root */}
      <circle cx="200" cy="30" r="20" fill="#3b82f6" />
      <text x="200" y="35" textAnchor="middle" fill="white" fontSize="12">Start</text>

      {/* Branches */}
      <line x1="200" y1="50" x2="120" y2="100" stroke="#94a3b8" strokeWidth="2" />
      <line x1="200" y1="50" x2="280" y2="100" stroke="#94a3b8" strokeWidth="2" />

      {/* Decision nodes */}
      <circle cx="120" cy="110" r="20" fill={state === 'before' ? '#ef4444' : '#10b981'} />
      <text x="120" y="115" textAnchor="middle" fill="white" fontSize="10">
        {state === 'before' ? '❌' : '✓'}
      </text>

      <circle cx="280" cy="110" r="20" fill="#10b981" />
      <text x="280" y="115" textAnchor="middle" fill="white" fontSize="10">✓</text>
    </svg>
  </div>
);

const InterfaceBoard = ({ data, state }) => (
  <div className="w-full max-w-2xl">
    <div className="text-center mb-8">
      <Text variant="h5" color="muted">
        {state === 'before' ? 'Rigid (Single Type)' : 'Flexible (Polymorphic)'}
      </Text>
    </div>

    <div className="space-y-4">
      {/* Interface Contract */}
      <div className="p-4 bg-prism-blue-100 border-2 border-prism-blue-300 rounded-xl text-center">
        <Text variant="label" className="text-prism-blue-700">Interface Contract</Text>
      </div>

      {/* Implementations */}
      <div className={cn('grid gap-4', state === 'before' ? 'grid-cols-1' : 'grid-cols-3')}>
        <div className="p-3 bg-white border-2 border-slate-200 rounded-lg text-center">
          <Text variant="body-sm">Type A</Text>
        </div>

        {state === 'after' && (
          <>
            <div className="p-3 bg-white border-2 border-slate-200 rounded-lg text-center">
              <Text variant="body-sm">Type B</Text>
            </div>
            <div className="p-3 bg-white border-2 border-slate-200 rounded-lg text-center">
              <Text variant="body-sm">Type C</Text>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

export default VisualizerCanvas;
