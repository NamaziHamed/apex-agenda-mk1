import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { categoryFormSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import z from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const categoryId = params.categoryId;

  try {
    const body = await req.json();
    const validatedData = categoryFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { userId: session.user.id, id: categoryId },
      data: { title: validatedData.data.title, icon: validatedData.data.icon },
    });

    return NextResponse.json(
      { message: "Category updated successfully", updatedCategory },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ message: "Invalid title" }, { status: 400 });
    return NextResponse.json(
      { message: "Internal Server error!" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const categoryId = params.categoryId;
  try {
    const res = await prisma.category.delete({
      where: { id: categoryId, userId: session.user.id },
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
