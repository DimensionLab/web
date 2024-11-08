import { searchArxiv } from '@/lib/arxiv';
import PaperCard from './PaperCard';
import { getFeaturedPaperIds, getBatchViewCounts } from '@/app/actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getFeaturedPapers() {
  const featuredIds = await getFeaturedPaperIds();
  const FEATURED_COUNT = 3;
  
  console.log('Featured IDs:', featuredIds);
  
  if (featuredIds.length < FEATURED_COUNT) {
    // Get all papers from our view counts table
    const allViewCounts = await getBatchViewCounts([]);
    console.log('All view counts:', allViewCounts);
    
    // Sort paper IDs by view count and take top ones
    const topPaperIds = Object.entries(allViewCounts)
      .sort(([, a], [, b]) => (b.thisWeek || 0) - (a.thisWeek || 0))
      .slice(0, FEATURED_COUNT)
      .map(([id]) => id);
    
    console.log('Top paper IDs:', topPaperIds);

    // Fetch paper details for the top viewed papers
    const papers = await Promise.all(
      topPaperIds.map(id => searchArxiv(`id:${id}`, 0, 1).then(results => results[0]))
    );
    
    console.log('Fetched papers:', papers);
    
    // Get fresh view counts right before returning
    const freshViewCounts = await getBatchViewCounts(topPaperIds);
    
    return { 
      papers, 
      viewCounts: freshViewCounts
    };
  }

  const papers = await Promise.all(
    featuredIds.map(id => searchArxiv(`id:${id}`, 0, 1).then(results => results[0]))
  );
  
  // Get fresh view counts right before returning
  const freshViewCounts = await getBatchViewCounts(papers.map(p => p.id));
  
  return { papers, viewCounts: freshViewCounts };
}

export default async function FeaturedPapers() {
  const response = await getFeaturedPapers();
  
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {response.papers.map((paper) => (
          <PaperCard 
            key={paper.id} 
            paper={paper} 
            featured 
            viewCounts={response.viewCounts[paper.id] || { total: 0, today: 0, thisWeek: 0, thisMonth: 0 }}
          />
        ))}
      </div>
    </section>
  );
}
