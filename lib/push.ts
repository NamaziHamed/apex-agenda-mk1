import "server-only";
import webpush from "web-push";
import { prisma } from "./prisma";

export interface PushPayload {
  title: string;
  body: string;
  /** Page to open when the notification is clicked. */
  url?: string;
  /** Notifications with the same tag replace each other instead of stacking. */
  tag?: string;
  taskId?: string;
}

let configured = false;

/** Returns false when the VAPID keys are missing, so callers can report it. */
function configure() {
  if (configured) return true;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return false;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@example.com",
    publicKey,
    privateKey
  );
  configured = true;
  return true;
}

export function isPushConfigured() {
  return configure();
}

/**
 * Sends a notification to every device the user has subscribed.
 * Subscriptions the push service reports as gone (404/410) are deleted.
 * Returns how many devices received it.
 */
export async function sendPushToUser(userId: string, payload: PushPayload) {
  if (!configure()) throw new Error("Push notifications are not configured");

  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  });

  const body = JSON.stringify(payload);
  const expired: string[] = [];
  let delivered = 0;

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          body,
          { TTL: 60 * 60, urgency: "high" }
        );
        delivered++;
      } catch (error) {
        const status = (error as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) expired.push(sub.id);
        else console.error("Push send failed", status, (error as Error).message);
      }
    })
  );

  if (expired.length) {
    await prisma.pushSubscription.deleteMany({ where: { id: { in: expired } } });
  }

  return delivered;
}
