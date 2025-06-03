ALTER TABLE "snippets" ALTER COLUMN "category_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "favorite" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;