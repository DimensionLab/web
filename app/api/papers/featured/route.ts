import { getBatchViewCounts } from "@/app/actions";
import { searchArxiv } from "@/lib/arxiv";
import { NextResponse } from "next/server";

export async function GET() {
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

  // Get fresh view counts
  const freshViewCounts = await getBatchViewCounts(topPaperIds);

  return NextResponse.json({ papers, viewCounts: freshViewCounts });
} 