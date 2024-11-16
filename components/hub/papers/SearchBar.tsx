"use client";

import { useStore, AppState } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const selector = (state: AppState) => ({
  searchText: state.searchText,
  activeFilters: state.activeFilters,
  setSearchText: state.setSearchText,
});

export default function SearchBar() {
  const { searchText, activeFilters, setSearchText } = useStore(useShallow(selector));
  const [localQuery, setLocalQuery] = useState(searchText);
  const [debouncedQuery] = useDebounce(localQuery, 300);

  useEffect(() => {
    setSearchText(debouncedQuery);
  }, [debouncedQuery, setSearchText]);

  return (
    <div className="relative max-w-4xl mx-auto my-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-gray-400 dark:text-white/60" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 
                 bg-white dark:bg-white/10 backdrop-blur-sm 
                 border border-gray-200 dark:border-white/20 
                 rounded-lg text-gray-900 dark:text-gray-100 
                 placeholder-gray-500 dark:placeholder-gray-400
                 focus:outline-none focus:ring-2 
                 focus:ring-purple-500/50 
                 focus:border-purple-500/50 
                 transition-all text-base"
        placeholder="Search for a specific text within paper title or abstract..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
    </div>
  );
}
