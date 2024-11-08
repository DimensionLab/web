"use client";

import { useStore, AppState } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const selector = (state: AppState) => ({
  query: state.query,
  setQuery: state.setQuery,
});

export default function SearchBar() {
  const { query, setQuery } = useStore(useShallow(selector));
  const [localQuery, setLocalQuery] = useState(query);
  const [debouncedQuery] = useDebounce(localQuery, 300);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery, setQuery]);

  return (
    <div className="relative max-w-4xl mx-auto my-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-white/60" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 
                 bg-white/10 backdrop-blur-sm 
                 border border-white/20 
                 rounded-lg text-gray-100 
                 placeholder-gray-400
                 focus:outline-none focus:ring-2 
                 focus:ring-purple-500/50 
                 focus:border-purple-500/50 
                 transition-all text-base"
        placeholder="Search papers by title, author, or keywords..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
    </div>
  );
}
