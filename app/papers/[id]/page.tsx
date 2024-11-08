import { getArxivPaper } from "@/lib/arxiv";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { renderMathInElement } from "@/lib/math";
import Link from "next/link";
import { Eye, BarChart3 } from 'lucide-react';
import { getViewCounts, getViewHistory, upsertPaper, recordView } from "@/app/actions";
import { WeeklyChart, MonthlyChart } from './components/Charts';

// Add these to ensure fresh data on each page load
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Add this mock data (replace with real data from your backend later)
const dailyData = [
  { date: 'Mon', views: 4 },
  { date: 'Tue', views: 3 },
  { date: 'Wed', views: 7 },
  { date: 'Thu', views: 5 },
  { date: 'Fri', views: 8 },
  { date: 'Sat', views: 12 },
  { date: 'Sun', views: 9 },
];

const monthlyData = [
  { date: '1', views: 14 },
  { date: '5', views: 23 },
  { date: '10', views: 35 },
  { date: '15', views: 48 },
  { date: '20', views: 56 },
  { date: '25', views: 70 },
  { date: '30', views: 85 },
];

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

    // Fetch both view counts and history
    const [viewCounts, viewHistory] = await Promise.all([
      getViewCounts(paper.id),
      getViewHistory(paper.id)
    ]);

    return (
      <div className="flex gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="text-white flex-1">
          <h1 className="text-3xl font-bold mb-4">
            {renderMathInElement(processText(paper.title))}
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Authors</h2>
            <p>{paper.authors.join(", ")}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Abstract</h2>
            <p className="text-white">
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
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Link href={paper.arxivUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-btnPurple px-4 py-2 rounded font-bold text-white hover:text-gray-300 hover:brightness-125 duration-300">
                View on arXiv
              </button>
            </Link>
            <Link href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-btnPurple px-4 py-2 rounded font-bold text-white hover:text-gray-300 hover:brightness-125 duration-300">
                View PDF
              </button>
            </Link>
          </div>
        </article>

        <aside className="w-96 shrink-0">
          <div className="sticky top-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
              <BarChart3 className="h-4 w-4" />
              Paper Analytics
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">Weekly Views</div>
                <div className="h-32">
                  <WeeklyChart data={viewHistory.daily} />
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">Monthly Views</div>
                <div className="h-32">
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
