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
      className={`block p-8 rounded-2xl transition-all
        bg-white dark:bg-[#1C1C1E] 
        border border-gray-100 dark:border-white/[0.08]
        ${featured 
          ? 'shadow-lg hover:shadow-xl dark:shadow-none dark:hover:bg-white/[0.02]' 
          : 'shadow-md hover:shadow-lg dark:shadow-none dark:hover:bg-white/[0.02]'
        }`}
    >
      <h3 className={`${
        featured ? 'text-2xl' : 'text-xl'
      } text-gray-900 dark:text-white font-medium mb-3 line-clamp-2`}>
        {renderMathInElement(paper.title)}
      </h3>
      
      <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
        {renderMathInElement(truncateText(paper.summary, 180))}
      </p>
      
      <div className="flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-[15px] w-[15px]" />
          {format(new Date(paper.publishedDate), 'MMM d, yyyy')}
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-[15px] w-[15px]" />
          {paper.authors.length} authors
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-[15px] w-[15px]" />
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
            className="px-3 py-1.5 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/[0.06] rounded-full text-xs font-medium"
          >
            {category}
          </span>
        ))}
        {paper.categories.length > 3 && (
          <span className="px-3 py-1.5 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/[0.06] rounded-full text-xs font-medium">
            +{paper.categories.length - 3} more
          </span>
        )}
      </div>
    </Link>
  );
}