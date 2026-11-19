"use client";
import { useCallback, useEffect, useState } from "react";

export type PushStatus =
  | "loading"
  /** Browser can't do web push at all. */
  | "unsupported"
  /** iPhone/iPad in a normal Safari tab: must be added to the home screen first. */
  | "ios-needs-install"
  /** User blocked notifications in browser settings. */
  | "denied"
  | "off"
  | "on";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function base64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

function isIos() {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac, but Macs don't have touch screens.
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

async function getRegistration() {
  return (
    (await navigator.serviceWorker.getRegistration("/")) ??
    (await navigator.serviceWorker.register("/sw.js", { scope: "/" }))
  );
}

async function saveSubscription(sub: PushSubscription) {
  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub.toJSON()),
  });
  if (!res.ok) throw new Error("Couldn't save this device. Try again.");
}

export function usePushNotifications() {
  const [status, setStatus] = useState<PushStatus>("loading");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const supported =
      "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;

    if (!supported) {
      setStatus(isIos() && !isStandalone() ? "ios-needs-install" : "unsupported");
      return;
    }
    if (!VAPID_PUBLIC_KEY) return setStatus("unsupported");
    if (Notification.permission === "denied") return setStatus("denied");

    const registration = await getRegistration();
    const sub = await registration.pushManager.getSubscription();
    if (sub && Notification.permission === "granted") {
      // Re-save on every visit: keeps the server copy fresh and attached to this user.
      saveSubscription(sub).catch(() => {});
      setStatus("on");
    } else {
      setStatus("off");
    }
  }, []);

  useEffect(() => {
    refresh().catch(() => setStatus("unsupported"));
  }, [refresh]);

  const enable = useCallback(async () => {
    if (!VAPID_PUBLIC_KEY) throw new Error("Notifications aren't set up yet.");
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "off");
        throw new Error(
          permission === "denied"
            ? "Notifications are blocked. Allow them in your browser's site settings."
            : "Permission wasn't granted."
        );
      }
      const registration = await getRegistration();
      const sub =
        (await registration.pushManager.getSubscription()) ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(VAPID_PUBLIC_KEY),
        }));
      await saveSubscription(sub);
      setStatus("on");
    } finally {
      setBusy(false);
    }
  }, []);

  const disable = useCallback(async () => {
    setBusy(true);
    try {
      const registration = await navigator.serviceWorker.getRegistration("/");
      const sub = await registration?.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setStatus("off");
    } finally {
      setBusy(false);
    }
  }, []);

  const sendTest = useCallback(async () => {
    const res = await fetch("/api/push/test", { method: "POST" });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || "Test notification failed.");
  }, []);

  return { status, busy, enable, disable, sendTest };
}
