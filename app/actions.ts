"use server";

import { and, count, desc, eq, gte, sql, gt, inArray } from 'drizzle-orm';
import { papers, paperViewCounts, paperUpvotes, userProfiles } from '@/db/schema';
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
    await db.insert(paperViewCounts).values({
      paperId,
      viewedAt: new Date(),
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
      paperId: paperViewCounts.paperId,
      total: count(),
      today: count(
        and(gte(paperViewCounts.viewedAt, sql`CURRENT_DATE`))
      ),
      thisWeek: count(
        and(gte(paperViewCounts.viewedAt, sql`date_trunc('week', CURRENT_TIMESTAMP)`))
      ),
      thisMonth: count(
        and(gte(paperViewCounts.viewedAt, sql`date_trunc('month', CURRENT_TIMESTAMP)`))
      ),
    })
    .from(paperViewCounts)
    .where(
      paperIds.length > 0 
        ? inArray(paperViewCounts.paperId, paperIds)
        : undefined
    )
    .groupBy(paperViewCounts.paperId);

  return results.reduce((acc, row) => {
    acc[row.paperId] = {
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
      paperId: paperViewCounts.paperId,
      total: count(),
      thisWeek: count(
        and(gte(paperViewCounts.viewedAt, sql`date_trunc('week', CURRENT_TIMESTAMP)`))
      ),
    })
    .from(paperViewCounts)
    .groupBy(paperViewCounts.paperId)
    .having(
      gt(
        count(and(gte(paperViewCounts.viewedAt, sql`date_trunc('week', CURRENT_TIMESTAMP)`))),
        0
      )
    )
    .orderBy(desc(sql`this_week`), desc(sql`total`))
    .limit(3);

  return results.map(row => row.paperId);
}

export async function upsertPaper(paper: ArxivPaper) {
  const existingPaper = await db
    .select({
      categories: papers.categories,
      summary: papers.summary,
    })
    .from(papers)
    .where(eq(papers.id, paper.id))
    .limit(1);

  const categories = paper.categories.length > 0
    ? paper.categories
    : (existingPaper[0]?.categories ?? []);

  const summary = paper.summary.trim()
    ? paper.summary
    : (existingPaper[0]?.summary ?? '');

  await db
    .insert(papers)
    .values({
      id: paper.id,
      title: paper.title,
      summary,
      authors: paper.authors,
      categories: categories,
      publishedDate: new Date(paper.publishedDate),
      pdfUrl: paper.pdfUrl,
    })
    .onConflictDoUpdate({
      target: papers.id,
      set: {
        title: paper.title,
        summary: sql`CASE WHEN ${paper.summary} = '' THEN papers.summary ELSE ${paper.summary} END`,
        authors: paper.authors,
        categories: categories,
        publishedDate: new Date(paper.publishedDate),
        pdfUrl: paper.pdfUrl,
        updatedAt: new Date(),
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
      date: sql<string>`DATE_TRUNC('day', ${paperViewCounts.viewedAt})`,
      views: count(),
    })
    .from(paperViewCounts)
    .where(
      and(
        eq(paperViewCounts.paperId, paperId),
        gte(paperViewCounts.viewedAt, sql`NOW() - INTERVAL '7 days'`)
      )
    )
    .groupBy(sql`DATE_TRUNC('day', ${paperViewCounts.viewedAt})`)
    .orderBy(sql`DATE_TRUNC('day', ${paperViewCounts.viewedAt}) ASC`);

  // Get daily views for the current month
  const monthlyViews = await db
    .select({
      date: sql<string>`EXTRACT(DAY FROM ${paperViewCounts.viewedAt})::text`,
      views: count(),
    })
    .from(paperViewCounts)
    .where(
      and(
        eq(paperViewCounts.paperId, paperId),
        gte(paperViewCounts.viewedAt, sql`DATE_TRUNC('month', NOW())`)
      )
    )
    .groupBy(sql`EXTRACT(DAY FROM ${paperViewCounts.viewedAt})`)
    .orderBy(sql`EXTRACT(DAY FROM ${paperViewCounts.viewedAt}) ASC`);

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

  await db.insert(paperUpvotes).values({
    paperId,
    userId: session.user.sub,
  });
}

export async function unupvotePaper(paperId: string) {
  const session = await getSession();
  if (!session?.user) throw new Error('Unauthorized');

  await db.delete(paperUpvotes)
    .where(and(
      eq(paperUpvotes.paperId, paperId),
      eq(paperUpvotes.userId, session.user.sub)
    ));
}

export async function getPaperUpvotes(paperId: string) {
  const upvotes = await db
    .select({
      userId: userProfiles.userId,
      fullName: userProfiles.fullName,
      avatarUrl: userProfiles.avatarUrl
    })
    .from(paperUpvotes)
    .innerJoin(userProfiles, eq(userProfiles.userId, paperUpvotes.userId))
    .where(eq(paperUpvotes.paperId, paperId));
  
  return upvotes;
}

export async function isUpvotedByUser(paperId: string) {
  const session = await getSession();
  if (!session?.user) return false;

  const upvote = await db
    .select()
    .from(paperUpvotes)
    .where(and(
      eq(paperUpvotes.paperId, paperId),
      eq(paperUpvotes.userId, session.user.sub)
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
      .from(papers)
      .innerJoin(paperUpvotes, eq(papers.id, paperUpvotes.paperId))
      .where(eq(paperUpvotes.userId, userId));

    // Get paginated papers
    const loadedPapers = await db
      .select({
        id: papers.id,
        title: papers.title,
        summary: papers.summary,
        publishedDate: papers.publishedDate,
        authors: papers.authors,
      })
      .from(papers)
      .innerJoin(paperUpvotes, eq(papers.id, paperUpvotes.paperId))
      .where(eq(paperUpvotes.userId, userId))
      .orderBy(desc(papers.publishedDate))
      .limit(pageSize)
      .offset(offset);

    return {
      items: loadedPapers,
      total: Number(totalCount[0].count),
    };
  } catch (error) {
    console.error('Error fetching upvoted papers:', error);
    throw new Error('Failed to fetch upvoted papers');
  }
}
