import Header from "@/components/header/Header";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 z-50 w-full ">
        <Header />
      </header>
      {children}
    </div>
  );
};

export default layout;
