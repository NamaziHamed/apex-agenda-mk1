-- Apex Agenda: push-notification setup for Supabase.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Replace the two placeholders first:
--   <APP_URL>      e.g. https://apex-agenda-v1.vercel.app
--   <CRON_SECRET>  the same value as the CRON_SECRET env var on Vercel

-- 1) Database changes (same as prisma/migrations/20261119120000_push_notifications).
--    Safe to re-run.
ALTER TABLE "public"."tasks" ADD COLUMN IF NOT EXISTS "reminderSentAt" TIMESTAMP(3);
ALTER TABLE "public"."tasks" ADD COLUMN IF NOT EXISTS "dueNotifiedAt" TIMESTAMP(3);
CREATE INDEX IF NOT EXISTS "tasks_reminder_idx" ON "public"."tasks"("reminder");
CREATE INDEX IF NOT EXISTS "tasks_dueDate_idx" ON "public"."tasks"("dueDate");

CREATE TABLE IF NOT EXISTS "public"."push_subscriptions" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "push_subscriptions_userId_fkey" FOREIGN KEY ("userId")
      REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "push_subscriptions_endpoint_key" ON "public"."push_subscriptions"("endpoint");
CREATE INDEX IF NOT EXISTS "push_subscriptions_userId_idx" ON "public"."push_subscriptions"("userId");

-- 2) Scheduler: call the app's reminder endpoint every minute.
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Keep the secret in Supabase Vault rather than in the job text.
SELECT vault.create_secret('<CRON_SECRET>', 'apex_cron_secret')
WHERE NOT EXISTS (SELECT 1 FROM vault.secrets WHERE name = 'apex_cron_secret');

-- Re-running replaces the job instead of adding a second one.
SELECT cron.unschedule('apex-agenda-reminders')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'apex-agenda-reminders');

SELECT cron.schedule(
  'apex-agenda-reminders',
  '* * * * *',
  $$
  SELECT net.http_get(
    url := '<APP_URL>/api/cron/reminders',
    headers := jsonb_build_object(
      'Authorization',
      'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'apex_cron_secret')
    ),
    timeout_milliseconds := 30000
  );
  $$
);

-- Check it's running (after a minute or two):
--   SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 5;
--   SELECT status_code, content FROM net._http_response ORDER BY created DESC LIMIT 5;
