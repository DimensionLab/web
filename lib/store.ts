import { create } from 'zustand';

export type AppState = {
  query: string;
  setQuery: (query: string) => void;
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

const defaultQuery = DEFAULT_FILTERS
  .map(filter => `ti:"${filter}" OR abs:"${filter}"`)
  .join(' OR ');

export const useStore = create<AppState>((set) => ({
  query: defaultQuery,
  setQuery: (query) => set({ query }),
}));