import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { taskUpdateSchema } from "@/lib/validations";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskId = (await context.params).taskId;

  // Only accept the fields a user may change. Previously the raw body went
  // straight to Prisma, so a crafted request could rewrite userId and similar.
  const parsed = taskUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid task data" }, { status: 400 });
  }
  const { reminder, dueDate, completedAt, setTodayDate, categoryId, ...rest } =
    parsed.data;
  const toDate = (v: string | null | undefined) =>
    v === undefined ? undefined : v === null ? null : new Date(v);

  try {
    // A moved list must belong to this user too.
    if (categoryId) {
      const owns = await prisma.category.count({
        where: { id: categoryId, userId: session.user.id },
      });
      if (!owns) {
        return NextResponse.json({ error: "List not found" }, { status: 404 });
      }
    }

    const current = await prisma.task.findFirst({
      where: { id: taskId, userId: session.user.id },
      select: { reminder: true, dueDate: true },
    });
    if (!current) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const nextReminder = toDate(reminder);
    const nextDue = toDate(dueDate);
    const changed = (a: Date | null, b: Date | null | undefined) =>
      b !== undefined && (a?.getTime() ?? null) !== (b?.getTime() ?? null);

    const updatedTask = await prisma.task.update({
      where: { id: taskId, userId: session.user.id },
      data: {
        ...rest,
        categoryId,
        reminder: nextReminder,
        dueDate: nextDue,
        completedAt: toDate(completedAt),
        setTodayDate: toDate(setTodayDate),
        // A new reminder / due time should notify again.
        ...(changed(current.reminder, nextReminder) && { reminderSentAt: null }),
        ...(changed(current.dueDate, nextDue) && { dueNotifiedAt: null }),
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ taskId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { taskId } = await context.params;

    const taskToDelete = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    });

    if (!taskToDelete) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
