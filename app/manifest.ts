import type { MetadataRoute } from "next";

/** Makes the app installable; iPhones only allow web push for installed apps. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Apex Agenda",
    short_name: "Apex Agenda",
    description: "Simple, clean, organized and to the point todo app",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png" },
      {
        src: "/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
