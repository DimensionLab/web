import { pgTable, text, timestamp, serial, pgEnum, integer, boolean, uniqueIndex, json } from 'drizzle-orm/pg-core';

export const organizationRoleEnum = pgEnum('organization_role', ['owner', 'admin', 'member', 'viewer']);

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

export const UserProfiles = pgTable('user_profiles', {
  id: text('id').primaryKey().notNull(),
  username: text('username').unique(),
  email: text('email').notNull(),
  full_name: text('full_name').default(''),
  bio: text('bio').default(''),
  avatar_url: text('avatar_url').default(''),
  website: text('website').default(''),
  social_links: json('social_links').default('[]').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const Organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  owner_id: text('owner_id').references(() => UserProfiles.id).notNull(),
  logo_url: text('logo_url'),
  website: text('website'),
  is_public: boolean('is_public').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const OrganizationMembers = pgTable('organization_members', {
  id: serial('id').primaryKey(),
  organization_id: integer('organization_id').references(() => Organizations.id).notNull(),
  user_id: text('user_id').references(() => UserProfiles.id).notNull(),
  role: organizationRoleEnum('role').default('member').notNull(),
  is_public: boolean('is_public').default(true),
  joined_at: timestamp('joined_at').defaultNow(),
});

export const Collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  owner_id: text('owner_id').references(() => UserProfiles.id).notNull(),
  is_public: boolean('is_public').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const CollectionItems = pgTable('collection_items', {
  id: serial('id').primaryKey(),
  collection_id: integer('collection_id').references(() => Collections.id).notNull(),
  paper_id: text('paper_id').references(() => Papers.id),
  added_at: timestamp('added_at').defaultNow(),
});

export const PaperUpvotes = pgTable(
  'paper_upvotes',
  {
    id: serial('id').primaryKey(),
    paper_id: text('paper_id').references(() => Papers.id).notNull(),
    user_id: text('user_id').references(() => UserProfiles.id).notNull(),
    created_at: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    unique_upvote: uniqueIndex('unique_upvote_idx').on(table.paper_id, table.user_id),
  })
);

export type Paper = typeof Papers.$inferSelect;
export type NewPaper = typeof Papers.$inferInsert;
export type PaperViewCount = typeof PaperViewCounts.$inferSelect;
export type UserProfile = typeof UserProfiles.$inferSelect;
export type NewUserProfile = typeof UserProfiles.$inferInsert;
export type Organization = typeof Organizations.$inferSelect;
export type NewOrganization = typeof Organizations.$inferInsert;
export type OrganizationMember = typeof OrganizationMembers.$inferSelect;
export type Collection = typeof Collections.$inferSelect;
export type NewCollection = typeof Collections.$inferInsert;
export type CollectionItem = typeof CollectionItems.$inferSelect;
export type PaperUpvote = typeof PaperUpvotes.$inferSelect;
export type NewPaperUpvote = typeof PaperUpvotes.$inferInsert;