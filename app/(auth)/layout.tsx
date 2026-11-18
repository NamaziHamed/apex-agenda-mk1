import React, { ReactNode } from "react";
import Logo from "@/components/header/Logo";
import ThemeToggle from "@/components/header/ThemeToggle";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-[-14rem] -z-10 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <header className="flex h-14 items-center justify-between px-4 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-start justify-center px-4 pt-6 pb-16 sm:items-center sm:pt-0">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
