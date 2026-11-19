-- AlterTable
ALTER TABLE "public"."tasks" ADD COLUMN "reminderSentAt" TIMESTAMP(3),
ADD COLUMN "dueNotifiedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "tasks_reminder_idx" ON "public"."tasks"("reminder");

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "public"."tasks"("dueDate");

-- CreateTable
CREATE TABLE "public"."push_subscriptions" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "push_subscriptions_endpoint_key" ON "public"."push_subscriptions"("endpoint");

-- CreateIndex
CREATE INDEX "push_subscriptions_userId_idx" ON "public"."push_subscriptions"("userId");

-- AddForeignKey
ALTER TABLE "public"."push_subscriptions" ADD CONSTRAINT "push_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
