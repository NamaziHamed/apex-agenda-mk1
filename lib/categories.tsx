import { Category } from "@/types/categoryTypes";

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to fetch categories" }));
    throw new Error(error.error || `Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export async function createCategory(data: { title: string; icon?: string }) {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Faild to create list");
  }
  return res.json();
}
