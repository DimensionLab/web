import { pgTable, text, timestamp, serial } from 'drizzle-orm/pg-core';

export const Papers = pgTable('papers', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  authors: text('authors').array().notNull(),
  categories: text('categories').array().notNull(),
  published_date: timestamp('published_date').notNull(),
  pdf_url: text('pdf_url').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const PaperViewCounts = pgTable('paperviewcounts', {
  id: serial('id').primaryKey().notNull(),
  paper_id: text('paper_id').references(() => Papers.id).notNull(),
  viewed_at: timestamp('viewed_at').defaultNow().notNull(),
});

export type Paper = typeof Papers.$inferSelect;
export type NewPaper = typeof Papers.$inferInsert;
export type PaperViewCount = typeof PaperViewCounts.$inferSelect;