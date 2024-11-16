import { getArxivPaper } from "@/lib/arxiv";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { renderMathInElement } from "@/lib/math";
import Link from "next/link";
import { Eye, BarChart3 } from 'lucide-react';
import { getViewCounts, getViewHistory, upsertPaper, recordView } from "@/app/actions";
import { WeeklyChart, MonthlyChart } from './components/Charts';
import { StarButton } from './components/StarButton';
import { UserAvatars } from './components/UserAvatars';
import { upvotePaper, unupvotePaper, getPaperUpvotes, isUpvotedByUser } from '@/app/actions';

// Add these to ensure fresh data on each page load
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function processText(text: string): string {
  return text.replace(/(\d+\.?\d*)\\%/g, "$1%").replace(/--/g, "—");
}

export default async function PaperPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const paper = await getArxivPaper(params.id);
    
    if (!paper || !paper.id) {
      console.log('Invalid paper data received');
      return notFound();
    }
    
    try {
      await upsertPaper(paper);
      await recordView(paper.id);
    } catch (error) {
      console.error('Error upserting paper:', error);
    }

    // Fetch all data in parallel
    const [viewCounts, viewHistory, upvotes, isUpvoted] = await Promise.all([
      getViewCounts(paper.id),
      getViewHistory(paper.id),
      getPaperUpvotes(paper.id),
      isUpvotedByUser(paper.id)
    ]);

    return (
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="text-gray-900 dark:text-white w-full lg:flex-1">
          <h1 className="text-3xl font-bold mb-4">
            {renderMathInElement(processText(paper.title))}
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Authors</h2>
            <p className="text-gray-700 dark:text-gray-300">{paper.authors.join(", ")}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Abstract</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {renderMathInElement(processText(paper.summary))}
            </p>
          </div>

          {paper.categories && paper.categories.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Categories</h2>
              <div className="flex gap-2 flex-wrap">
                {paper.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-600/50 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <StarButton
              paperId={paper.id}
              initialIsStarred={isUpvoted}
              onStar={upvotePaper}
              onUnstar={unupvotePaper}
            />
            <Link href={paper.arxivUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500/80 dark:hover:bg-purple-500 px-4 py-2 rounded font-bold text-white transition-all duration-200">
                View on arXiv
              </button>
            </Link>
            <Link href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500/80 dark:hover:bg-purple-500 px-4 py-2 rounded font-bold text-white transition-all duration-200">
                View PDF
              </button>
            </Link>
          </div>

          {upvotes.length > 0 && (
            <div className="mt-4">
              <UserAvatars users={upvotes} />
            </div>
          )}
        </article>

        <aside className="w-full lg:w-96 lg:shrink-0">
          <div className="sticky top-8 bg-white dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-white/10 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-200">
              <BarChart3 className="h-4 w-4" />
              Paper Analytics
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Weekly Views</div>
                <div className="h-32 w-full">
                  <WeeklyChart data={viewHistory.daily} />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Monthly Views</div>
                <div className="h-32 w-full">
                  <MonthlyChart data={viewHistory.monthly} />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
  } catch (error) {
    console.error('Error in PaperPage:', error);
    if (error instanceof Error && error.message === 'Paper not found') {
      return notFound();
    }
    throw error;
  }
}
