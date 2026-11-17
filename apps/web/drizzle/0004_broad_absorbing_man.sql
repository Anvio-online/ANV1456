CREATE TABLE "email_delivery_events" (
	"id" text PRIMARY KEY NOT NULL,
	"provider_id" text NOT NULL,
	"status" text NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_reviews" (
	"source" text NOT NULL,
	"lead_id" uuid NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"follow_up_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text NOT NULL,
	CONSTRAINT "lead_reviews_source_lead_id_pk" PRIMARY KEY("source","lead_id")
);
--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "email_provider_id" text;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "email_delivery_status" text DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD COLUMN "email_delivery_updated_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "agent_leads" ADD CONSTRAINT "agent_leads_email_provider_id_unique" UNIQUE("email_provider_id");