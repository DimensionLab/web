'use client';

import Link from 'next/link';
import type { ArxivPaper } from '@/lib/arxiv';
import { Calendar, Users, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { renderMathInElement } from '@/lib/math';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from 'react';
import { getViewCounts } from '@/app/actions';

interface PaperCardProps {
  paper: ArxivPaper;
  featured?: boolean;
  viewCounts: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}

function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export default function PaperCard({ paper, featured = false, viewCounts: initialCounts }: PaperCardProps) {
  const [viewCounts, setViewCounts] = useState(initialCounts);

  useEffect(() => {
    // Fetch fresh view counts when component mounts
    const fetchViewCounts = async () => {
      const freshCounts = await getViewCounts(paper.id);
      setViewCounts(freshCounts);
    };

    fetchViewCounts();
  }, [paper.id]);

  return (
    <Link 
      href={`/papers/${paper.id}`}
      className={`block p-6 bg-white dark:bg-white/10 rounded-lg transition-all 
        border border-gray-200/50 dark:border-white/10 
        ${featured 
          ? 'shadow-md hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
          : 'shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
        }`}
    >
      <h3 className={`${
        featured ? 'text-xl' : 'text-lg'
      } text-gray-900 dark:text-gray-100 font-semibold mb-2 line-clamp-2`}>
        {renderMathInElement(paper.title)}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {renderMathInElement(truncateText(paper.summary))}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {format(new Date(paper.publishedDate), 'MMM d, yyyy')}
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {paper.authors.length} authors
        </div>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {featured ? (
            <span title={`${viewCounts.thisWeek} this week`}>
              {viewCounts.total} views
            </span>
          ) : (
            <span>{viewCounts?.total || 0} views</span>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {paper.categories.slice(0, 3).map((category) => (
          <span 
            key={category}
            className="px-2 py-1 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600/50 rounded-full text-xs"
          >
            {category}
          </span>
        ))}
        {paper.categories.length > 3 && (
          <span className="px-2 py-1 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600/50 rounded-full text-xs">
            +{paper.categories.length - 3} more
          </span>
        )}
      </div>
    </Link>
  );
}