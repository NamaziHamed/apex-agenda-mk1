/* Apex Agenda service worker: shows task reminders pushed by the server. */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "Apex Agenda", body: event.data ? event.data.text() : "" };
  }

  const title = data.title || "Apex Agenda";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/pwa-icon/192",
      badge: "/pwa-icon/96",
      tag: data.tag,
      renotify: Boolean(data.tag),
      data: { url: data.url || "/dashboard", taskId: data.taskId },
    })
  );
});

// Focus an open dashboard tab if there is one, otherwise open a new one.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "/dashboard", self.location.origin);

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of windows) {
        if (new URL(client.url).pathname.startsWith("/dashboard")) {
          await client.focus();
          client.postMessage({ type: "open-task", taskId: event.notification.data?.taskId });
          return;
        }
      }
      await self.clients.openWindow(target.href);
    })()
  );
});

// The browser rotated the subscription: re-register it with the server.
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    (async () => {
      const sub =
        event.newSubscription ||
        (await self.registration.pushManager.subscribe(event.oldSubscription.options));
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(sub.toJSON()),
      });
    })()
  );
});
