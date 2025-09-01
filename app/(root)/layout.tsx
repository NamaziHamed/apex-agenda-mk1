import Header from "@/components/header/Header";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-1 sm:flex sm:justify-center sm:items-center sm:flex-col items-stretch">
        {children}
      </main>
    </div>
  );
};

export default layout;
