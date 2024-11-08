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
  const { data: viewCounts = {} } = useQuery({
    queryKey: ['viewCounts', papers.map(p => p.id)],
    queryFn: () => getBatchViewCounts(papers.map(p => p.id)),
    refetchInterval: 5000,
    staleTime: 0,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {papers.map((paper) => (
        <PaperCard 
          key={paper.id} 
          paper={paper} 
          featured={featured}
          viewCounts={viewCounts[paper.id] || { total: 0, today: 0, thisWeek: 0, thisMonth: 0 }}
        />
      ))}
    </div>
  );
} 