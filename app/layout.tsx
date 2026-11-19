import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Agenda",
  description: "Simple, clean, organized and to the point todo app",
  icons: {
    icon: "/favicon.ico",
    apple: "/pwa-icon/192",
  },
  // Lets iPhone users add the app to the home screen, which iOS requires for push.
  appleWebApp: {
    capable: true,
    title: "Apex Agenda",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased min-h-screen`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
