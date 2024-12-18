DROP INDEX IF EXISTS "user_notes_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_comments_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "username_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_likes_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_notes_idx" ON "notes" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_comments_idx" ON "comments" USING btree ("user_id","note_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_likes_idx" ON "likes" USING btree ("user_id","note_id");