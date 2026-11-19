import Header from "@/components/header/Header";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full">
        <Header />
      </header>
      <main className="flex-1">{children}</main>
      <Separator />
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Apex Agenda
      </footer>
    </div>
  );
};

export default layout;
