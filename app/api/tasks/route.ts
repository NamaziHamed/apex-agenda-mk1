import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskPayloadSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await prisma.task.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = taskPayloadSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        ...validatedData.data,
        setTodayDate: validatedData.data.setTodayDate
          ? new Date(validatedData.data.setTodayDate)
          : null,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
