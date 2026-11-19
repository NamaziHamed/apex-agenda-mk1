"use client";
import React, { useMemo, useState } from "react";
import { Bell, BellOff, CalendarClock, BellRing, Loader2, Share, SquarePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useOpenTask, useReminderWatcher } from "@/hooks/useReminderWatcher";
import { useTaskDataStore } from "@/store/taskDataStore";
import { formatShortDate } from "../TaskViews/TaskItem";
import { Tasks } from "@/types/categoryTypes";
import { cn } from "@/lib/utils";

const DAY = 24 * 60 * 60 * 1000;

interface Alert {
  task: Tasks;
  at: Date;
  kind: "reminder" | "due";
}

/** Collects reminder and due times of open tasks into missed (last 24h) and upcoming. */
function useAlerts() {
  const tasks = useTaskDataStore((s) => s.tasks.all.active);
  return useMemo(() => {
    const now = Date.now();
    const alerts: Alert[] = [];
    for (const task of tasks) {
      if (task.reminder) alerts.push({ task, at: new Date(task.reminder), kind: "reminder" });
      if (task.dueDate) alerts.push({ task, at: new Date(task.dueDate), kind: "due" });
    }
    const missed = alerts
      .filter((a) => a.at.getTime() <= now && a.at.getTime() > now - DAY)
      .sort((a, b) => b.at.getTime() - a.at.getTime());
    const upcoming = alerts
      .filter((a) => a.at.getTime() > now)
      .sort((a, b) => a.at.getTime() - b.at.getTime())
      .slice(0, 5);
    return { missed, upcoming };
  }, [tasks]);
}

const AlertRow = ({ alert, onOpen }: { alert: Alert; onOpen: () => void }) => {
  const Icon = alert.kind === "reminder" ? BellRing : CalendarClock;
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <Icon className="size-4 shrink-0 text-blue-500" />
        <span className="min-w-0 flex-1 truncate">{alert.task.title}</span>
        <span className="shrink-0 text-xs text-muted-foreground">{formatShortDate(alert.at)}</span>
      </button>
    </li>
  );
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [testing, setTesting] = useState(false);
  const { status, busy, enable, disable, sendTest } = usePushNotifications();
  const { missed, upcoming } = useAlerts();
  const openTask = useOpenTask();
  useReminderWatcher(status === "on");

  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        await enable();
        toast.success("Notifications are on for this device.");
      } else {
        await disable();
        toast("Notifications are off for this device.");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      await sendTest();
      toast.success("Test sent. It should arrive in a few seconds.");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setTesting(false);
    }
  };

  const openAlert = (alert: Alert) => {
    setOpen(false);
    openTask(alert.task);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={missed.length ? `Notifications, ${missed.length} missed` : "Notifications"}
        >
          {status === "denied" ? <BellOff /> : <Bell />}
          {missed.length > 0 && (
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500 ring-2 ring-background" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="push-toggle" className="flex flex-col items-start gap-1">
              <span className="font-semibold">Push notifications</span>
              <span className="text-xs font-normal text-muted-foreground">
                Alerts on this device when a reminder or due time comes up.
              </span>
            </Label>
            <Switch
              id="push-toggle"
              checked={status === "on"}
              disabled={busy || !(status === "on" || status === "off")}
              onCheckedChange={handleToggle}
            />
          </div>

          {status === "loading" && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" /> Checking this device…
            </p>
          )}

          {status === "ios-needs-install" && (
            <div className="space-y-2 rounded-lg border bg-muted/50 p-3 text-xs">
              <p className="font-medium">On iPhone, add Apex Agenda to your Home Screen first:</p>
              <ol className="space-y-1.5 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Share className="size-3.5 shrink-0" /> Tap Share in Safari
                </li>
                <li className="flex items-center gap-2">
                  <SquarePlus className="size-3.5 shrink-0" /> Choose “Add to Home Screen”
                </li>
                <li className="flex items-center gap-2">
                  <Bell className="size-3.5 shrink-0" /> Open it from the Home Screen and turn this on
                </li>
              </ol>
            </div>
          )}

          {status === "denied" && (
            <p className="rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
              Notifications are blocked for this site. Allow them in your browser&apos;s site
              settings, then reload the page.
            </p>
          )}

          {status === "unsupported" && (
            <p className="rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
              This browser can&apos;t receive push notifications. You&apos;ll still see alerts
              here while the app is open.
            </p>
          )}

          {status === "on" && (
            <Button variant="outline" size="sm" className="w-full" onClick={handleTest} disabled={testing}>
              {testing && <Loader2 className="animate-spin" />}
              Send a test notification
            </Button>
          )}
        </div>

        <Separator />

        <div className="max-h-72 space-y-3 overflow-y-auto p-2">
          {missed.length > 0 && (
            <section>
              <h4 className="px-2 pb-1 text-xs font-medium text-red-500">Missed (last 24 hours)</h4>
              <ul>
                {missed.map((a) => (
                  <AlertRow key={`${a.kind}-${a.task.id}`} alert={a} onOpen={() => openAlert(a)} />
                ))}
              </ul>
            </section>
          )}
          <section>
            <h4 className="px-2 pb-1 text-xs font-medium text-muted-foreground">Coming up</h4>
            {upcoming.length ? (
              <ul>
                {upcoming.map((a) => (
                  <AlertRow key={`${a.kind}-${a.task.id}`} alert={a} onOpen={() => openAlert(a)} />
                ))}
              </ul>
            ) : (
              <p className={cn("px-2 pb-2 text-xs text-muted-foreground")}>
                Nothing scheduled. Open a task to set a due date or reminder.
              </p>
            )}
          </section>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
