import React, { ReactNode } from "react";
import Header from "@/components/header/Header";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="flex-1 flex items-stretch sm:items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
