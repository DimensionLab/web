"use server";

import { neon } from "@neondatabase/serverless";
import type { ArxivPaper } from '@/lib/arxiv';

interface ViewCounts {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

const sql = neon(process.env.NEON_DATABASE_URL!);

export async function recordView(paperId: string) {
    await sql`
      INSERT INTO PaperViewCounts (paper_id, viewed_at)
      VALUES (${paperId}, CURRENT_TIMESTAMP)
    `;
  }

export async function getBatchViewCounts(paperIds: string[]) {
  const query = paperIds.length === 0 
    ? sql`
      SELECT 
        paper_id,
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE viewed_at >= CURRENT_DATE) as today,
        COUNT(*) FILTER (WHERE viewed_at >= date_trunc('week', CURRENT_TIMESTAMP)) as this_week,
        COUNT(*) FILTER (WHERE viewed_at >= date_trunc('month', CURRENT_TIMESTAMP)) as this_month
      FROM PaperViewCounts
      GROUP BY paper_id
    `
    : sql`
      WITH TotalViews AS (
        SELECT 
          paper_id,
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE viewed_at >= CURRENT_DATE) as today,
          COUNT(*) FILTER (WHERE viewed_at >= date_trunc('week', CURRENT_TIMESTAMP)) as this_week,
          COUNT(*) FILTER (WHERE viewed_at >= date_trunc('month', CURRENT_TIMESTAMP)) as this_month
        FROM PaperViewCounts
        WHERE paper_id = ANY(${paperIds})
        GROUP BY paper_id
      )
      SELECT 
        paper_id,
        total,
        today,
        this_week as "thisWeek",
        this_month as "thisMonth"
      FROM TotalViews
    `;

  const results = await query;

  // Convert to a map for easy lookup
  return results.reduce((acc, row) => {
    acc[row.paper_id] = {
      total: parseInt(row.total),
      today: parseInt(row.today),
      thisWeek: parseInt(row.thisWeek || row.this_week),
      thisMonth: parseInt(row.thisMonth || row.this_month)
    };
    return acc;
  }, {} as Record<string, ViewCounts>);
}

export async function getViewCounts(paperId: string) {
  const counts = await getBatchViewCounts([paperId]);
  return counts[paperId] || { total: 0, today: 0, thisWeek: 0, thisMonth: 0 };
}

export async function getFeaturedPaperIds() {
  const result = await sql`
    SELECT 
      paper_id,
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE viewed_at >= date_trunc('week', CURRENT_TIMESTAMP)) as this_week
    FROM PaperViewCounts
    GROUP BY paper_id
    HAVING COUNT(*) FILTER (WHERE viewed_at >= date_trunc('week', CURRENT_TIMESTAMP)) > 0
    ORDER BY this_week DESC, total DESC
    LIMIT 3
  `;
  
  return result.map(row => row.paper_id);
}

export async function upsertPaper(paper: ArxivPaper) {
  // First, get existing paper data
  const existingPaper = await sql`
    SELECT categories, summary FROM Papers WHERE id = ${paper.id}
  `;

  // Keep existing categories and summary if new ones are empty
  const categories = paper.categories.length > 0 
    ? paper.categories 
    : (existingPaper[0]?.categories ?? []);
    
  const summary = paper.summary.trim() 
    ? paper.summary 
    : (existingPaper[0]?.summary ?? '');

  await sql`
    INSERT INTO Papers (
      id, title, summary, authors, categories, published_date, pdf_url
    ) VALUES (
      ${paper.id},
      ${paper.title},
      ${summary},
      ${paper.authors}::TEXT[],
      ${categories}::TEXT[],
      ${paper.publishedDate},
      ${paper.pdfUrl}
    )
    ON CONFLICT (id) DO UPDATE
    SET
      title = EXCLUDED.title,
      summary = CASE 
        WHEN EXCLUDED.summary = '' THEN Papers.summary 
        ELSE EXCLUDED.summary 
      END,
      authors = EXCLUDED.authors,
      categories = CASE 
        WHEN array_length(EXCLUDED.categories, 1) = 0 THEN Papers.categories 
        ELSE EXCLUDED.categories 
      END,
      published_date = EXCLUDED.published_date,
      pdf_url = EXCLUDED.pdf_url,
      updated_at = CURRENT_TIMESTAMP
  `;
}

export async function getViewHistory(paperId: string) {
  // Get daily views for the last 7 days
  const dailyViews = await sql`
    SELECT 
      DATE_TRUNC('day', viewed_at) as date,
      COUNT(*) as views
    FROM PaperViewCounts
    WHERE paper_id = ${paperId}
      AND viewed_at >= NOW() - INTERVAL '7 days'
    GROUP BY DATE_TRUNC('day', viewed_at)
    ORDER BY date ASC
  `;

  // Get daily views for the current month
  const monthlyViews = await sql`
    SELECT 
      EXTRACT(DAY FROM viewed_at)::text as date,
      COUNT(*) as views
    FROM PaperViewCounts
    WHERE paper_id = ${paperId}
      AND viewed_at >= DATE_TRUNC('month', NOW())
    GROUP BY EXTRACT(DAY FROM viewed_at)
    ORDER BY date ASC
  `;

  return {
    daily: dailyViews.map(row => ({
      date: new Date(row.date).toLocaleDateString('en-US', { weekday: 'short' }),
      views: Number(row.views)
    })),
    monthly: monthlyViews.map(row => ({
      date: row.date,
      views: Number(row.views)
    }))
  };
}
