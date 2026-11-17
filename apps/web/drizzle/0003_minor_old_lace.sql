CREATE TABLE "appointment_demo_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"status" text DEFAULT 'started' NOT NULL,
	"vapi_call_id" text,
	"transcript" text,
	"summary" text,
	"structured_data" jsonb,
	"source_ip" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
