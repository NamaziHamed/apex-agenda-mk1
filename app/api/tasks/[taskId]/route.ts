import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = params;
  const body = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId, userId: session.user.id },
      data: body,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const session = await auth();

  if (!session?.user.id)
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });

  const taskId = params.taskId;
  try {
    const res = await prisma.task.delete({
      where: { id: taskId, userId: session.user.id },
    });
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server error!" },
      { status: 500 }
    );
  }
}
