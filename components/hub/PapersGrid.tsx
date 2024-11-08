'use client';

import { useStore } from '@/lib/store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchArxiv, ArxivPaper } from '@/lib/arxiv';
import PaperCard from './PaperCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const PAPERS_PER_PAGE = 20;

export default function PapersGrid() {
  const { query } = useStore();
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['papers', query],
    queryFn: async ({ pageParam = 0 }) => {
      const searchQuery = query || '';
      return searchArxiv(searchQuery, pageParam, PAPERS_PER_PAGE);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAPERS_PER_PAGE ? allPages.length * PAPERS_PER_PAGE : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error loading papers</div>;
  }

  const papers = data.pages.flat();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paper: ArxivPaper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
      
      <div ref={ref} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>
    </div>
  );
}