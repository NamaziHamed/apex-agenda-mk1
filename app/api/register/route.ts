import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { predefinedCategories } from "@/utils/predefined";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return NextResponse.json(
        { message: "User Exists, try signing in" },
        { status: 409 }
      );
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });

    const categoriesToCreate = predefinedCategories.map((item) => ({
      title: item.title,
      icon: item.icon,
      userId: newUser.id,
    }));

    await prisma.category.createMany({
      data: categoriesToCreate,
    });

    return NextResponse.json(
      {
        user: { name: newUser.name, email: newUser.email },
        message: "Registration successful!",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ message: error.issues }, { status: 400 });
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}