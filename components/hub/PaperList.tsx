'use client';

import PaperCard from './PaperCard';
import type { ArxivPaper } from '@/lib/arxiv';
import { useQuery } from '@tanstack/react-query';
import { getBatchViewCounts } from '@/app/actions';

interface PaperListProps {
  papers: ArxivPaper[];
  featured?: boolean;
}

export default function PaperList({ papers, featured = false }: PaperListProps) {
  const { data: viewCounts, status } = useQuery({
    queryKey: ['viewCounts', papers.map(p => p.id)],
    queryFn: async () => {
      try {
        return await getBatchViewCounts(papers.map(p => p.id));
      } catch (error) {
        console.warn('Failed to fetch view counts:', error);
        return {};
      }
    },
    refetchInterval: 5000,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const safeViewCounts = status === 'error' || !viewCounts ? {} : viewCounts;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {papers.map((paper) => (
        <PaperCard 
          key={paper.id} 
          paper={paper} 
          featured={featured}
          viewCounts={{
            total: safeViewCounts[paper.id]?.total ?? 0,
            today: safeViewCounts[paper.id]?.today ?? 0,
            thisWeek: safeViewCounts[paper.id]?.thisWeek ?? 0,
            thisMonth: safeViewCounts[paper.id]?.thisMonth ?? 0,
          }}
        />
      ))}
    </div>
  );
} 