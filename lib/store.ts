import { create } from 'zustand';

export type AppState = {
  query: string;
  setQuery: (query: string) => void;
}

export const useStore = create<AppState>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}));