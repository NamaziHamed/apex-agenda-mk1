"use client";
import Header from "@/components/header/Header";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUiStore } from "@/store/uiStore";
import { MenuIcon } from "lucide-react";
import React, { ReactNode, useEffect } from "react";

interface layoutProps {
  children: ReactNode;
  taskView: ReactNode;
  categoryView: ReactNode;
}

const layout = ({ children, categoryView, taskView }: layoutProps) => {
  const { matches: isMobile, isLoading } = useMediaQuery(640);

  if (isLoading) return <MenuIcon className="w-3 h-3" />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className="flex-1 bg-card grid sm:grid-cols-[25%_75%] sm:m-10 sm:rounded-2xl 
      text-card-foreground p-4 xl:p-6 relative"
      >
        {!isMobile && <div>{categoryView}</div>}
        <div>{taskView}</div>
      </div>
      {children}
    </div>
  );
};

export default layout;
