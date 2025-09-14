import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { categoryFormSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        title: true,
        icon: true,
        createdAt: true,
        userId: true,
        _count: {
          select: {
            tasks: {
              where: {
                completed: false,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = categoryFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, icon } = validatedData.data;

    const existingList = await prisma.category.findMany({
      where: {
        userId,
        title,
      },
    });

    if (existingList.length > 0) {
      return NextResponse.json(
        { error: "A list with the same title exists!" },
        { status: 409 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        title,
        icon,
        userId,
      },
      select: {
        id: true,
        title: true,
        icon: true,
        createdAt: true,
        userId: true,
        _count: {
          select: { tasks: true },
        },
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "A list with the same title exists!" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create new list" },
      { status: 500 }
    );
  }
}
