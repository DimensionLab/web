'use client';

import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { usePapersQuery } from "@/hooks/usePapersQuery";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PapersSectionProps {
  userId: string;
}

export default function PapersSection({ userId }: PapersSectionProps) {
  const [page, setPage] = React.useState(1);
  const pageSize = 6;
  const { data: papers, isLoading, isError } = usePapersQuery(userId, page, pageSize);

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load starred papers. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return <PapersSectionSkeleton />;
  }

  if (!papers?.items.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No starred papers yet
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Starred papers</h3>
        <span className="text-sm text-muted-foreground">
          {papers.total} papers
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {papers.items.map((paper) => (
          <Link 
            href={`/papers/${paper.id}`} 
            key={paper.id}
            className="block rounded-[10px] bg-white dark:bg-[#1C1C1E] hover:bg-gray-50/80 dark:hover:bg-[#2C2C2E] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-[#2C2C2E] p-7 transition-colors"
          >
            <h4 className="font-medium text-[15px] text-gray-900 dark:text-gray-100 line-clamp-2">
              {paper.title}
            </h4>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-2.5">
              {paper.summary}
            </p>
            <div className="mt-3.5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <span>Published: {format(new Date(paper.published_date), "MMM d, yyyy")}</span>
              <span>•</span>
              <span>{paper.authors.length} authors</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.ceil(papers.total / pageSize)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => p + 1)}
          disabled={page >= Math.ceil(papers.total / pageSize)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function PapersSectionSkeleton() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border border-border p-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
            <div className="mt-2 flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
