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
);
export const pricingTypeEnum = pgEnum(
  "pricing_type",
  ["one_time", "recurring"],
);
export const pricingPlanIntervalEnum = pgEnum(
  "pricing_plan_interval",
  ["day", "week", "month", "year"],
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
);

// const authSchema = pgSchema("auth");

// const AuthUsers = authSchema.table("users", {
//   id: text("id").primaryKey(),
// });

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").unique().notNull(),
  userName: text("user_name").unique(),
  email: text("email").unique().notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),

  jobTitle: text("job_title"),
  company: text("company"),
  bio: text("bio"),
  yearsOfExperience: integer("years_of_experience"),

  specializations: text("specializations").array(),
  skills: text("skills").array(),
  interests: text("interests").array(),

  socialLinks: json("social_links").default("[]").notNull(),
  personalWebsite: text("website"),

  academicBackground: jsonb("academic_background"),
  projectHighlights: jsonb("project_highlights").array(),
  billingAddress: jsonb("billing_address"),
  paymentMethod: jsonb("payment_method"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  website: text("website"),
  industry: text("industry"),
  size: text("size"),
  ownerId: text("owner_id")
    .references(() => userProfiles.userId)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Junction table for Users and Organizations
export const organizationMembers = pgTable(
  "organization_members",
  {
    id: serial("id").primaryKey(),
    organizationId: uuid("organization_id")
      .references(() => organizations.id)
      .notNull(),
    userId: text("user_id")
      .references(() => userProfiles.userId)
      .notNull(),
    role: organizationRoleEnum("role").default("member").notNull(),
    isPublic: boolean("is_public").default(true),
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (table: any) => ({
    // Add a unique constraint to prevent duplicate memberships
    uniqueMembership: uniqueIndex("unique_org_member_idx").on(
      table.organizationId,
      table.userId
    ),
  })
);

export const usersRelations = relations(userProfiles, ({ many }) => ({
  organizations: many(organizationMembers),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
}));

export const organizationMembersRelations = relations(
  organizationMembers,
  ({ one }) => ({
    user: one(userProfiles, {
      fields: [organizationMembers.userId],
      references: [userProfiles.userId],
    }),
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
  })
);

export const customers = pgTable("customers", {
  id: text("id")
    .references(() => userProfiles.userId)
    .primaryKey()
    .notNull(),
  stripeCustomerId: text("stripe_customer_id"),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  active: boolean("active"),
  name: text("name"),
  description: text("description"),
  image: text("image"),
  metadata: jsonb("metadata"),
});

export const prices = pgTable("prices", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  active: boolean("active"),
  description: text("description"),
  unitAmount: integer("unit_amount"),
  currency: text("currency"),
  type: pricingTypeEnum("type"),
  interval: pricingPlanIntervalEnum("interval"),
  intervalCount: integer("interval_count"),
  trialPeriodDays: integer("trial_period_days"),
  metadata: jsonb("metadata"),
});

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  status: subscriptionStatusEnum("status"),
  metadata: jsonb("metadata"),
  priceId: text("price_id").references(() => prices.id),
  quantity: integer("quantity"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end"),
  created: timestamp("created", { withTimezone: true }).defaultNow().notNull(),
  currentPeriodStart: timestamp("current_period_start", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  currentPeriodEend: timestamp("current_period_end", { withTimezone: true })
    .defaultNow()
    .notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }).defaultNow(),
  cancelAt: timestamp("cancel_at", { withTimezone: true }).defaultNow(),
  canceledAt: timestamp("canceled_at", { withTimezone: true }).defaultNow(),
  trialStart: timestamp("trial_start", { withTimezone: true }).defaultNow(),
  trialEnd: timestamp("trial_end", { withTimezone: true }).defaultNow(),
});

export const papers = pgTable("papers", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  authors: text("authors").array().notNull(),
  categories: text("categories").array().notNull(),
  publishedDate: timestamp("published_date").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const paperViewCounts = pgTable("paperviewcounts", {
  id: serial("id").primaryKey().notNull(),
  paperId: text("paper_id")
    .references(() => papers.id)
    .notNull(),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: text("owner_id")
    .references(() => userProfiles.userId)
    .notNull(),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const collectionItems = pgTable("collection_items", {
  id: serial("id").primaryKey(),
  collectionId: uuid("collection_id")
    .references(() => collections.id)
    .notNull(),
  paperId: text("paper_id").references(() => papers.id),
  addedAt: timestamp("added_at").defaultNow(),
});

export const paperUpvotes = pgTable(
  "paper_upvotes",
  {
    id: serial("id").primaryKey(),
    paperId: text("paper_id")
      .references(() => papers.id)
      .notNull(),
    userId: text("user_id")
      .references(() => userProfiles.userId)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table: any) => ({
    unique_upvote: uniqueIndex("unique_upvote_idx").on(
      table.paperId,
      table.userId
    ),
  })
);

export type Paper = typeof papers.$inferSelect;
export type NewPaper = typeof papers.$inferInsert;
export type PaperViewCount = typeof paperViewCounts.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationMember = typeof organizationMembers.$inferSelect;
export type NewOrganizationMember = typeof organizationMembers.$inferInsert;
export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
export type CollectionItem = typeof collectionItems.$inferSelect;
export type PaperUpvote = typeof paperUpvotes.$inferSelect;
export type NewPaperUpvote = typeof paperUpvotes.$inferInsert;
