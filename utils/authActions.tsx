"use server";

import { signIn } from "@/auth";
import { credentialsProps, registerSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma"; // Import prisma directly
import bcrypt from "bcryptjs"; // You'll need this for hashing

export async function signInWithGoogle() {
  await signIn("google");
}

export async function signInWithCredentials(data: credentialsProps) {
  try {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return res;
  } catch (error) {
    if (error instanceof AuthError)
      throw new Error("Invalid email or password");
    throw error;
  }
}

// ✅ FIXED: No more fetch() to localhost
export async function registerWithCredentials(data: credentialsProps) {
  const validatedData = registerSchema.parse(data);

  // 1. Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  // 3. Create user
  const newUser = await prisma.user.create({
    data: {
      name: validatedData.name, // Ensure your schema has a name field if you use it
      email: validatedData.email,
      password: hashedPassword,
    },
  });

  // Optional: You can return the user (excluding password) or just a success message
  return { success: true, userId: newUser.id };
}
