import { tasksChemaProps } from "./validations";

export async function fetchTasks(): Promise<tasksChemaProps[]> {
  const res = await fetch("/api/tasks", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    let errorMessage = `Error ${res.status}: ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorMessage;
    } catch (e) {
      // If parsing the error body fails, we just use the default message
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
