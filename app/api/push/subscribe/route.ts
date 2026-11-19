import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const subscriptionSchema = z.object({
  endpoint: z.url(),
  keys: z.object({ p256dh: z.string().min(1), auth: z.string().min(1) }),
});

/** Save (or move to this user) the browser's push subscription. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = subscriptionSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  const { endpoint, keys } = parsed.data;
  const userAgent = req.headers.get("user-agent")?.slice(0, 300) ?? null;

  // Upsert by endpoint: if someone else used this browser before, it now belongs to this user.
  await prisma.pushSubscription.upsert({
    where: { endpoint },
    create: {
      endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      userAgent,
      userId: session.user.id,
    },
    update: {
      p256dh: keys.p256dh,
      auth: keys.auth,
      userAgent,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

/** Remove this browser's subscription. */
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const endpoint = typeof body?.endpoint === "string" ? body.endpoint : null;
  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
  }

  await prisma.pushSubscription.deleteMany({
    where: { endpoint, userId: session.user.id },
  });

  return NextResponse.json({ ok: true });
}
