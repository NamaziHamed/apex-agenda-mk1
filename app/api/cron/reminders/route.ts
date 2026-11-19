import { prisma } from "@/lib/prisma";
import { isPushConfigured, sendPushToUser } from "@/lib/push";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Called every minute by Supabase pg_cron (see supabase/reminders-cron.sql).
 * Sends a push for every task whose reminder or due time has arrived, once.
 *
 * Auth: `Authorization: Bearer <CRON_SECRET>`.
 */

// Don't fire alerts that are older than this (e.g. after downtime), they'd just be noise.
const MAX_LATENESS_MS = 6 * 60 * 60 * 1000;
const BATCH = 200;

async function handle(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isPushConfigured()) {
    return NextResponse.json({ error: "Push not configured" }, { status: 503 });
  }

  const now = new Date();
  const oldest = new Date(now.getTime() - MAX_LATENESS_MS);

  // Only users with at least one device are worth querying for.
  const withDevices = { pushSubscriptions: { some: {} } };

  const [reminders, dues] = await Promise.all([
    prisma.task.findMany({
      where: {
        completed: false,
        reminderSentAt: null,
        reminder: { lte: now, gte: oldest },
        user: withDevices,
      },
      select: { id: true, title: true, userId: true, dueDate: true },
      take: BATCH,
    }),
    prisma.task.findMany({
      where: {
        completed: false,
        dueNotifiedAt: null,
        dueDate: { lte: now, gte: oldest },
        user: withDevices,
      },
      select: { id: true, title: true, userId: true },
      take: BATCH,
    }),
  ]);

  let sent = 0;

  for (const task of reminders) {
    // Claim the task first so overlapping cron runs can't send it twice.
    const claimed = await prisma.task.updateMany({
      where: { id: task.id, reminderSentAt: null },
      data: { reminderSentAt: now },
    });
    if (!claimed.count) continue;
    sent += await sendPushToUser(task.userId, {
      title: `Reminder: ${task.title}`,
      // Relative wording ("due in 45 minutes") because the server doesn't know the user's time zone.
      body: task.dueDate
        ? `Due ${DateTime.fromJSDate(task.dueDate).toRelative({ base: DateTime.fromJSDate(now) })}.`
        : "Tap to open the task.",
      url: `/dashboard?task=${task.id}`,
      tag: `reminder-${task.id}`,
      taskId: task.id,
    });
  }

  for (const task of dues) {
    const claimed = await prisma.task.updateMany({
      where: { id: task.id, dueNotifiedAt: null },
      data: { dueNotifiedAt: now },
    });
    if (!claimed.count) continue;
    sent += await sendPushToUser(task.userId, {
      title: `Due now: ${task.title}`,
      body: "This task's due time has arrived.",
      url: `/dashboard?task=${task.id}`,
      tag: `due-${task.id}`,
      taskId: task.id,
    });
  }

  return NextResponse.json({
    reminders: reminders.length,
    due: dues.length,
    delivered: sent,
  });
}

export const GET = handle;
export const POST = handle;
