DROP INDEX IF EXISTS "username_idx";--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_username_unique" UNIQUE("username");--> statement-breakpoint