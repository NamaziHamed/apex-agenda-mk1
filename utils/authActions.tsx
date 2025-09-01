"use server";
import { signIn } from "@/auth";
import { credentialsProps, registerSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

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

export async function registerWithCredentials(data: credentialsProps) {
  const validatedData = registerSchema.parse(data);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed.");
  }

  return res.json();
}
