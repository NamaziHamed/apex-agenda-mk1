import { userData } from "@/types/categoryTypes";
import { tasksChemaProps } from "./validations";

export async function fetchUserData(): Promise<userData> {
  const res = await fetch("/api/userdata");

  if (!res.ok) {
    let errorMessage = `Error ${res.status}: ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorMessage;
    } catch {
      throw new Error("Internal server error!");
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function createTask(
  title: string,
  view: string,
  categoryId: string
) {
  const payload: {
    title: string;
    isToday?: boolean;
    setTodayDate?: Date;
    isImportant?: boolean;
    categoryId?: string | null;
  } = {
    title,
  };

  switch (view) {
    case "Today":
      payload.isToday = true;
      payload.setTodayDate = new Date();
      break;
    case "Planned":
    case "Completed":
      throw new Error("Cannot manually create tasks in this category");
    case "Important":
      payload.isImportant = true;
      break;
    case "All":
      payload.categoryId = null;
      break;
    default:
      payload.categoryId = categoryId;
  }

  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Internal Server Error");

  return res.json();
}

export async function updateTask(data: tasksChemaProps, taskId: string) {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Update failed, try again!");
  }

  return res.json();
}

export async function deleteTask(taskId: string) {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Delete failed, try again!");
  }

  return res.json();
}
