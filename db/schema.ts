import {
  pgTable,
  pgSchema,
  text,
  timestamp,
  serial,
  pgEnum,
  integer,
  boolean,
  uniqueIndex,
  json,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const organizationRoleEnum = pgEnum(
  "organization_role",
  ["owner", "admin", "member", "viewer"],
  { existing: true }
);
export const pricingTypeEnum = pgEnum(
  "pricing_type",
  ["one_time", "recurring"],
  { existing: true }
);
export const pricingPlanIntervalEnum = pgEnum(
  "pricing_plan_interval",
  ["day", "week", "month", "year"],
  { existing: true }
);
export const subscriptionStatusEnum = pgEnum(
  "subscription_status",
  [
    "trialing",
    "active",
    "canceled",
    "incomplete",
    "incomplete_expired",
    "past_due",
    "unpaid",
    "paused",
  ],
  { existing: true }
);

const authSchema = pgSchema("auth");

const AuthUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const Papers = pgTable("papers", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  authors: text("authors").array().notNull(),
  categories: text("categories").array().notNull(),
  published_date: timestamp("published_date").notNull(),
  pdf_url: text("pdf_url").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const UserProfiles = pgTable("user_profiles", {
  id: uuid("id")
    .references(() => AuthUsers.id)
    .primaryKey()
    .notNull(),
  user_name: text("user_name").unique(),
  email: text("email").unique().notNull(),
  full_name: text("full_name"),
  avatar_url: text("avatar_url"),

  job_title: text("job_title"),
  company: text("company"),
  bio: text("bio"),
  years_of_experience: integer("years_of_experience"),

  specializations: text("specializations").array(),
  skills: text("skills").array(),
  interests: text("interests").array(),

  social_links: json("social_links").default("[]").notNull(),
  personal_website: text("website"),

  academic_background: jsonb("academic_background"),
  project_highlights: jsonb("project_highlights").array(),
  billing_address: jsonb("billing_address"),
  payment_method: jsonb("payment_method"),

  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const Organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  website: text("website"),
  industry: text("industry"),
  size: text("size"),
  owner_id: uuid("owner_id")
    .references(() => AuthUsers.id)
    .notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Junction table for Users and Organizations
export const OrganizationMembers = pgTable(
  "organization_members",
  {
    id: serial("id").primaryKey(),
    organization_id: uuid("organization_id")
      .references(() => Organizations.id)
      .notNull(),
    user_id: uuid("user_id")
      .references(() => AuthUsers.id)
      .notNull(),
    role: organizationRoleEnum("role").default("member").notNull(),
    is_public: boolean("is_public").default(true),
    joined_at: timestamp("joined_at").defaultNow(),
  },
  (table: any) => ({
    // Add a unique constraint to prevent duplicate memberships
    uniqueMembership: uniqueIndex("unique_org_member_idx").on(
      table.organization_id,
      table.user_id
    ),
  })
);

export const usersRelations = relations(AuthUsers, ({ many }) => ({
  organizations: many(OrganizationMembers),
}));

export const organizationsRelations = relations(Organizations, ({ many }) => ({
  members: many(OrganizationMembers),
}));

export const organizationMembersRelations = relations(
  OrganizationMembers,
  ({ one }) => ({
    user: one(AuthUsers, {
      fields: [OrganizationMembers.user_id],
      references: [AuthUsers.id],
    }),
    organization: one(Organizations, {
      fields: [OrganizationMembers.organization_id],
      references: [Organizations.id],
    }),
  })
);

export const Customers = pgTable("customers", {
  id: uuid("id")
    .references(() => AuthUsers.id)
    .primaryKey()
    .notNull(),
  stripe_customer_id: text("stripe_customer_id"),
});

export const Products = pgTable("products", {
  id: text("id").primaryKey(),
  active: boolean("active"),
  name: text("name"),
  description: text("description"),
  image: text("image"),
  metadata: jsonb("metadata"),
});

export const Prices = pgTable("prices", {
  id: text("id").primaryKey(),
  product_id: text("product_id").references(() => Products.id),
  active: boolean("active"),
  description: text("description"),
  unit_amount: integer("unit_amount"),
  currency: text("currency"),
  type: pricingTypeEnum("type"),
  interval: pricingPlanIntervalEnum("interval"),
  interval_count: integer("interval_count"),
  trial_period_days: integer("trial_period_days"),
  metadata: jsonb("metadata"),
});

export const Subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  user_id: uuid("user_id")
    .references(() => AuthUsers.id)
    .notNull(),
  status: subscriptionStatusEnum("status"),
  metadata: jsonb("metadata"),
  price_id: text("price_id").references(() => Prices.id),
  quantity: integer("quantity"),
  cancel_at_period_end: boolean("cancel_at_period_end"),
  created: timestamp("created", { withTimezone: true }).defaultNow().notNull(),
  current_period_start: timestamp("current_period_start", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  current_period_end: timestamp("current_period_end", { withTimezone: true })
    .defaultNow()
    .notNull(),
  ended_at: timestamp("ended_at", { withTimezone: true }).defaultNow(),
  cancel_at: timestamp("cancel_at", { withTimezone: true }).defaultNow(),
  canceled_at: timestamp("canceled_at", { withTimezone: true }).defaultNow(),
  trial_start: timestamp("trial_start", { withTimezone: true }).defaultNow(),
  trial_end: timestamp("trial_end", { withTimezone: true }).defaultNow(),
});

export const PaperViewCounts = pgTable("paperviewcounts", {
  id: serial("id").primaryKey().notNull(),
  paper_id: text("paper_id")
    .references(() => Papers.id)
    .notNull(),
  viewed_at: timestamp("viewed_at").defaultNow().notNull(),
});

export const Collections = pgTable("collections", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  owner_id: uuid("owner_id")
    .references(() => AuthUsers.id)
    .notNull(),
  is_public: boolean("is_public").default(true),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const CollectionItems = pgTable("collection_items", {
  id: serial("id").primaryKey(),
  collection_id: uuid("collection_id")
    .references(() => Collections.id)
    .notNull(),
  paper_id: text("paper_id").references(() => Papers.id),
  added_at: timestamp("added_at").defaultNow(),
});

export const PaperUpvotes = pgTable(
  "paper_upvotes",
  {
    id: serial("id").primaryKey(),
    paper_id: text("paper_id")
      .references(() => Papers.id)
      .notNull(),
    user_id: uuid("user_id")
      .references(() => AuthUsers.id)
      .notNull(),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table: any) => ({
    unique_upvote: uniqueIndex("unique_upvote_idx").on(
      table.paper_id,
      table.user_id
    ),
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
export type NewOrganizationMember = typeof OrganizationMembers.$inferInsert;
export type Collection = typeof Collections.$inferSelect;
export type NewCollection = typeof Collections.$inferInsert;
export type CollectionItem = typeof CollectionItems.$inferSelect;
export type PaperUpvote = typeof PaperUpvotes.$inferSelect;
export type NewPaperUpvote = typeof PaperUpvotes.$inferInsert;
