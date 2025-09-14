import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const data = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        tasks: true,
        categories: {
          include: {
            _count: {
              select: {
                tasks: {
                  where: { completed: false },
                },
              },
            },
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Error message:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
