import { create } from 'zustand';

export type AppState = {
  searchText: string;
  activeFilters: string[];
  setSearchText: (text: string) => void;
  setActiveFilters: (filters: string[]) => void;
}

const DEFAULT_FILTERS = [
  'scientific machine learning',
  'physicsml',
  'physics-informed',
  'PINN',
  'FNO',
  'PINO',
  'DeepONet',
  'physics-informed neural network',
  'fourier neural operator',
  'deep operator network',
  'physics-informed neural operator',
  'neural operator',
  'neural PDE',
];

export const useStore = create<AppState>((set) => ({
  searchText: '',
  activeFilters: DEFAULT_FILTERS,
  setSearchText: (text) => set({ searchText: text }),
  setActiveFilters: (filters) => set({ activeFilters: filters }),
}));