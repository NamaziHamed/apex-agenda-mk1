"use client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useTaskDataStore } from "@/store/taskDataStore";
import { useTaskDetailsStore } from "@/store/taskDetailsStore";
import { Tasks } from "@/types/categoryTypes";

const CHECK_EVERY_MS = 15_000;

/** Opens the task details sheet for a task id, if the task is loaded. */
export function useOpenTask() {
  const setTaskContent = useTaskDetailsStore((s) => s.setTaskContent);
  return (task: Tasks) => {
    setTaskContent(task);
    useTaskDetailsStore.setState({ isSheetOpen: true });
  };
}

/**
 * While the dashboard is open, pops a toast when a reminder or due time
 * arrives. Skipped when push is on, since the system notification covers it.
 * Also opens a task when the app is launched from a notification.
 */
export function useReminderWatcher(pushOn: boolean) {
  const tasks = useTaskDataStore((s) => s.tasks.all.active);
  const openTask = useOpenTask();
  const lastCheck = useRef(Date.now());
  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;
  const openRef = useRef(openTask);
  openRef.current = openTask;

  // In-app toasts.
  useEffect(() => {
    if (pushOn) return;
    const tick = () => {
      const now = Date.now();
      const since = lastCheck.current;
      lastCheck.current = now;
      for (const task of tasksRef.current) {
        const hits: string[] = [];
        if (task.reminder) {
          const t = new Date(task.reminder).getTime();
          if (t > since && t <= now) hits.push("Reminder");
        }
        if (task.dueDate) {
          const t = new Date(task.dueDate).getTime();
          if (t > since && t <= now) hits.push("Due now");
        }
        if (hits.length) {
          toast(`${hits.join(" · ")}: ${task.title}`, {
            duration: 15_000,
            action: { label: "Open", onClick: () => openRef.current(task) },
          });
        }
      }
    };
    const id = window.setInterval(tick, CHECK_EVERY_MS);
    return () => window.clearInterval(id);
  }, [pushOn]);

  // Opening a task from a notification: "?task=<id>" on launch, or a message
  // from the service worker when the dashboard tab was already open.
  useEffect(() => {
    const openById = (id?: string | null) => {
      if (!id) return false;
      const task = tasksRef.current.find((t) => t.id === id);
      if (task) openRef.current(task);
      return !!task;
    };

    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("task");
    if (fromUrl && openById(fromUrl)) {
      params.delete("task");
      const query = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (query ? `?${query}` : ""));
    }

    if (!("serviceWorker" in navigator)) return;
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "open-task") openById(event.data.taskId);
    };
    navigator.serviceWorker.addEventListener("message", onMessage);
    return () => navigator.serviceWorker.removeEventListener("message", onMessage);
    // Re-run when tasks first load so "?task=" can resolve.
  }, [tasks.length]);
}
