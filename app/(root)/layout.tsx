import Header from "@/components/header/Header";
import SiteFooter from "@/components/landing/SiteFooter";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="marketing" />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default layout;
