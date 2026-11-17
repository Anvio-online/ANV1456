ALTER TABLE "agent_leads" ADD COLUMN "email_sent" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "landing_page" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "referrer" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "utm_source" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "utm_medium" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "utm_campaign" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "utm_term" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "utm_content" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "posthog_distinct_id" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "landing_page" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "referrer" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "utm_source" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "utm_medium" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "utm_campaign" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "utm_term" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "utm_content" text;--> statement-breakpoint
ALTER TABLE "audit_requests" ADD COLUMN "posthog_distinct_id" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "landing_page" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "referrer" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "utm_source" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "utm_medium" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "utm_campaign" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "utm_term" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "utm_content" text;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD COLUMN "posthog_distinct_id" text;