import { auth } from "@/auth";
import { isPushConfigured, sendPushToUser } from "@/lib/push";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Sends a test notification to all of the signed-in user's devices. */
export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isPushConfigured()) {
    return NextResponse.json(
      { error: "Push notifications are not set up on the server yet." },
      { status: 503 }
    );
  }

  const delivered = await sendPushToUser(session.user.id, {
    title: "Notifications are on",
    body: "You'll get an alert here when a task's reminder or due time comes up.",
    url: "/dashboard",
    tag: "apex-test",
  });

  if (delivered === 0) {
    return NextResponse.json(
      { error: "No device is subscribed. Turn notifications on first." },
      { status: 404 }
    );
  }
  return NextResponse.json({ delivered });
}
