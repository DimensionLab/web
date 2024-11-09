import { searchArxiv } from "@/lib/arxiv";
import PaperCard from "./PaperCard";
import { getBatchViewCounts } from "@/app/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getFeaturedPapers() {
  const FEATURED_COUNT = 3;

  // Get all papers from our view counts table
  const allViewCounts = await getBatchViewCounts([]);

  // Sort paper IDs by view count and take top ones
  const topPaperIds = Object.entries(allViewCounts)
    .sort(([, a], [, b]) => (b.thisWeek || 0) - (a.thisWeek || 0))
    .slice(0, FEATURED_COUNT)
    .map(([id]) => id);

  // Fetch paper details for the top viewed papers
  const papers = await Promise.all(
    topPaperIds.map((id) =>
      searchArxiv(`id:${id}`, 0, 1).then((results) => results[0])
    )
  );

  // Get fresh view counts right before returning
  const freshViewCounts = await getBatchViewCounts(topPaperIds);

  return {
    papers,
    viewCounts: freshViewCounts,
  };
}

export default async function FeaturedPapers() {
  const response = await getFeaturedPapers();

  if (response.papers.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {response.papers.map((paper) => (
          <PaperCard
            key={paper.id}
            paper={paper}
            featured
            viewCounts={
              response.viewCounts[paper.id] || {
                total: 0,
                today: 0,
                thisWeek: 0,
                thisMonth: 0,
              }
            }
          />
        ))}
      </div>
    </section>
  );
}
