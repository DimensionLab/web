"use server";

import { and, count, desc, eq, gte, sql, gt, inArray } from 'drizzle-orm';
import { Papers, PaperViewCounts, PaperUpvotes, UserProfiles } from '@/db/schema';
import { db } from '@/db';
import type { ArxivPaper } from '@/lib/arxiv';
import { getSession } from '@auth0/nextjs-auth0';

interface ViewCounts {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export async function recordView(paperId: string) {
  try {
    await db.insert(PaperViewCounts).values({
      paper_id: paperId,
      viewed_at: new Date(),
    });
  } catch (error) {
    console.error('Error recording view:', error);
    throw error;
  }
}

export async function getBatchViewCounts(paperIds: string[]) {
  const currentDate = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const results = await db
    .select({
      paper_id: PaperViewCounts.paper_id,
      total: count(),
      today: count(
        and(gte(PaperViewCounts.viewed_at, sql`CURRENT_DATE`))
      ),
      thisWeek: count(
        and(gte(PaperViewCounts.viewed_at, sql`date_trunc('week', CURRENT_TIMESTAMP)`))
      ),
      thisMonth: count(
        and(gte(PaperViewCounts.viewed_at, sql`date_trunc('month', CURRENT_TIMESTAMP)`))
      ),
    })
    .from(PaperViewCounts)
    .where(
      paperIds.length > 0 
        ? inArray(PaperViewCounts.paper_id, paperIds)
        : undefined
    )
    .groupBy(PaperViewCounts.paper_id);

  return results.reduce((acc, row) => {
    acc[row.paper_id] = {
      total: Number(row.total),
      today: Number(row.today),
      thisWeek: Number(row.thisWeek),
      thisMonth: Number(row.thisMonth),
    };
    return acc;
  }, {} as Record<string, ViewCounts>);
}

export async function getFeaturedPaperIds() {
  const results = await db
    .select({
      paper_id: PaperViewCounts.paper_id,
      total: count(),
      thisWeek: count(
        and(gte(PaperViewCounts.viewed_at, sql`date_trunc('week', CURRENT_TIMESTAMP)`))
      ),
    })
    .from(PaperViewCounts)
    .groupBy(PaperViewCounts.paper_id)
    .having(
      gt(
        count(and(gte(PaperViewCounts.viewed_at, sql`date_trunc('week', CURRENT_TIMESTAMP)`))),
        0
      )
    )
    .orderBy(desc(sql`this_week`), desc(sql`total`))
    .limit(3);

  return results.map(row => row.paper_id);
}

export async function upsertPaper(paper: ArxivPaper) {
  const existingPaper = await db
    .select({
      categories: Papers.categories,
      summary: Papers.summary,
    })
    .from(Papers)
    .where(eq(Papers.id, paper.id))
    .limit(1);

  const categories = paper.categories.length > 0
    ? paper.categories
    : (existingPaper[0]?.categories ?? []);

  const summary = paper.summary.trim()
    ? paper.summary
    : (existingPaper[0]?.summary ?? '');

  await db
    .insert(Papers)
    .values({
      id: paper.id,
      title: paper.title,
      summary,
      authors: paper.authors,
      categories: categories,
      published_date: new Date(paper.publishedDate),
      pdf_url: paper.pdfUrl,
    })
    .onConflictDoUpdate({
      target: Papers.id,
      set: {
        title: paper.title,
        summary: sql`CASE WHEN ${paper.summary} = '' THEN papers.summary ELSE ${paper.summary} END`,
        authors: paper.authors,
        categories: categories,
        published_date: new Date(paper.publishedDate),
        pdf_url: paper.pdfUrl,
        updated_at: new Date(),
      },
    });
}

export async function getViewCounts(paperId: string) {
  const counts = await getBatchViewCounts([paperId]);
  return counts[paperId] || { total: 0, today: 0, thisWeek: 0, thisMonth: 0 };
}

export async function getViewHistory(paperId: string) {
  // Get daily views for the last 7 days
  const dailyViews = await db
    .select({
      date: sql<string>`DATE_TRUNC('day', ${PaperViewCounts.viewed_at})`,
      views: count(),
    })
    .from(PaperViewCounts)
    .where(
      and(
        eq(PaperViewCounts.paper_id, paperId),
        gte(PaperViewCounts.viewed_at, sql`NOW() - INTERVAL '7 days'`)
      )
    )
    .groupBy(sql`DATE_TRUNC('day', ${PaperViewCounts.viewed_at})`)
    .orderBy(sql`DATE_TRUNC('day', ${PaperViewCounts.viewed_at}) ASC`);

  // Get daily views for the current month
  const monthlyViews = await db
    .select({
      date: sql<string>`EXTRACT(DAY FROM ${PaperViewCounts.viewed_at})::text`,
      views: count(),
    })
    .from(PaperViewCounts)
    .where(
      and(
        eq(PaperViewCounts.paper_id, paperId),
        gte(PaperViewCounts.viewed_at, sql`DATE_TRUNC('month', NOW())`)
      )
    )
    .groupBy(sql`EXTRACT(DAY FROM ${PaperViewCounts.viewed_at})`)
    .orderBy(sql`EXTRACT(DAY FROM ${PaperViewCounts.viewed_at}) ASC`);

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

export async function upvotePaper(paperId: string) {
  const session = await getSession();
  if (!session?.user) throw new Error('Unauthorized');

  await db.insert(PaperUpvotes).values({
    paper_id: paperId,
    user_id: session.user.sub,
  });
}

export async function unupvotePaper(paperId: string) {
  const session = await getSession();
  if (!session?.user) throw new Error('Unauthorized');

  await db.delete(PaperUpvotes)
    .where(and(
      eq(PaperUpvotes.paper_id, paperId),
      eq(PaperUpvotes.user_id, session.user.sub)
    ));
}

export async function getPaperUpvotes(paperId: string) {
  const upvotes = await db
    .select({
      id: UserProfiles.id,
      full_name: UserProfiles.full_name,
      avatar_url: UserProfiles.avatar_url
    })
    .from(PaperUpvotes)
    .innerJoin(UserProfiles, eq(UserProfiles.id, PaperUpvotes.user_id))
    .where(eq(PaperUpvotes.paper_id, paperId));
  
  return upvotes;
}

export async function isUpvotedByUser(paperId: string) {
  const session = await getSession();
  if (!session?.user) return false;

  const upvote = await db
    .select()
    .from(PaperUpvotes)
    .where(and(
      eq(PaperUpvotes.paper_id, paperId),
      eq(PaperUpvotes.user_id, session.user.sub)
    ))
    .limit(1);

  return upvote.length > 0;
}

export async function getUpvotedPapers(userId: string, page = 1, pageSize = 6) {
  if (!userId) {
    return { items: [], total: 0 };
  }

  try {
    const offset = (page - 1) * pageSize;

    // Get total count
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(Papers)
      .innerJoin(PaperUpvotes, eq(Papers.id, PaperUpvotes.paper_id))
      .where(eq(PaperUpvotes.user_id, userId));

    // Get paginated papers
    const papers = await db
      .select({
        id: Papers.id,
        title: Papers.title,
        summary: Papers.summary,
        published_date: Papers.published_date,
        authors: Papers.authors,
      })
      .from(Papers)
      .innerJoin(PaperUpvotes, eq(Papers.id, PaperUpvotes.paper_id))
      .where(eq(PaperUpvotes.user_id, userId))
      .orderBy(desc(Papers.published_date))
      .limit(pageSize)
      .offset(offset);

    return {
      items: papers,
      total: Number(totalCount[0].count),
    };
  } catch (error) {
    console.error('Error fetching upvoted papers:', error);
    throw new Error('Failed to fetch upvoted papers');
  }
}
