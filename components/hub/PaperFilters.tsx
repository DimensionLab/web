'use client';

import { useStore } from "@/lib/store";
import { Check, Plus } from 'lucide-react';

const FILTER_OPTIONS = [
  { id: 'sml', label: 'Scientific Machine Learning', query: 'scientific machine learning' },
  { id: 'physicsml', label: 'PhysicsML', query: 'physicsml' },
  { id: 'physics-informed', label: 'Physics-Informed', query: 'physics-informed' },
  { id: 'pinn', label: 'PINN', query: 'PINN' },
  { id: 'fno', label: 'FNO', query: 'FNO' },
  { id: 'pino', label: 'PINO', query: 'PINO' },
  { id: 'deeponet', label: 'DeepONet', query: 'DeepONet' },
  { id: 'pinn-full', label: 'Physics-Informed Neural Network', query: 'physics-informed neural network' },
  { id: 'fno-full', label: 'Fourier Neural Operator', query: 'fourier neural operator' },
  { id: 'don', label: 'Deep Operator Network', query: 'deep operator network' },
  { id: 'pino-full', label: 'Physics-Informed Neural Operator', query: 'physics-informed neural operator' },
  { id: 'neural-operator', label: 'Neural Operator', query: 'neural operator' },
  { id: 'neural-pde', label: 'Neural PDE', query: 'neural PDE' },
];

export default function PaperFilters() {
  const { query, setQuery } = useStore();
  const activeFilters = query ? query.split(' OR ').map(q => q.split(':')[1].replace(/['"]/g, '')) : [];

  const toggleFilter = (filterQuery: string) => {
    const currentFilters = new Set(activeFilters);
    
    if (currentFilters.has(filterQuery)) {
      currentFilters.delete(filterQuery);
    } else {
      currentFilters.add(filterQuery);
    }

    if (currentFilters.size === 0) {
      setQuery('');
    } else {
      const newQuery = Array.from(currentFilters)
        .map(q => `ti:"${q}" OR abs:"${q}"`)
        .join(' OR ');
      setQuery(newQuery);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Filter Papers</h2>
      <div className="flex flex-wrap gap-1.5">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.query)}
            className={`px-2.5 py-1 rounded-lg text-sm font-medium transition-all duration-200
              flex items-center gap-1.5
              ${activeFilters.includes(filter.query)
                ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30 backdrop-blur-sm hover:bg-purple-500/30 hover:border-purple-500/40'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/15 hover:border-white/30 hover:text-gray-200 opacity-75 hover:opacity-100'
              }`}
          >
            {activeFilters.includes(filter.query) ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
} 