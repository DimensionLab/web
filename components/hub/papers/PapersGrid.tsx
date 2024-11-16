"use client";

import { useStore } from "@/lib/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchArxiv } from "@/lib/arxiv";
import PaperList from "./PaperList";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { buildPapersSearchQuery } from "@/lib/utils";

const PAPERS_PER_PAGE = 20;

export default function PapersGrid() {
  const { searchText, activeFilters } = useStore();
  const query = buildPapersSearchQuery(searchText, activeFilters);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["papers", query],
      queryFn: async ({ pageParam = 0 }) => {
        const searchQuery = query || "";
        const response = await fetch(
          `/api/papers/search?query=${encodeURIComponent(searchQuery)}&start=${pageParam}&limit=${PAPERS_PER_PAGE}`
        );
        return response.json();
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === PAPERS_PER_PAGE
          ? allPages.length * PAPERS_PER_PAGE
          : undefined;
      },
      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading papers</div>;
  }

  const papers = data.pages.flat();

  return (
    <div className="space-y-8">
      <PaperList papers={papers} />

      <div ref={ref} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>
    </div>
  );
}
