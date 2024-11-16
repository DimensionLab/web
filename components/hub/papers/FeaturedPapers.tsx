import { ArxivPaper } from "@/lib/arxiv";
import PaperCard from "./PaperCard";
import { getBatchViewCounts } from "@/app/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getFeaturedPapers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/papers/featured`);
  return response.json();
}

export default async function FeaturedPapers() {
  const response = await getFeaturedPapers();

  if (response.papers.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Weekly Featured Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {response.papers.map((paper: ArxivPaper) => (
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
