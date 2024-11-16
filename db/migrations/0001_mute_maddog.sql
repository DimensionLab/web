ALTER TABLE "user_profiles" ALTER COLUMN "full_name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "bio" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "avatar_url" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "website" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "social_links" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "social_links" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "social_links" TYPE json USING COALESCE(array_to_json(social_links)::json, '[]'::json);--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "social_links" SET DEFAULT '[]';--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "social_links" SET NOT NULL;--> statement-breakpoint