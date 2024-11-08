import { searchArxiv } from '@/lib/arxiv';
import PaperCard from './PaperCard';

async function getFeaturedPapers() {
  // You can customize this query to get papers from specific categories
  const papers = await searchArxiv('all:electron', 0, 4);
  return papers;
}

export default async function FeaturedPapers() {
  const papers = await getFeaturedPapers();

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} featured />
        ))}
      </div>
    </section>
  );
}