"use client";
import Header from "@/components/header/Header";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUiStore } from "@/store/uiStore";
import React, { ReactNode, useEffect } from "react";

interface layoutProps {
  children: ReactNode;
  taskView: ReactNode;
  categoryView: ReactNode;
}

const layout = ({ children, categoryView, taskView }: layoutProps) => {
  const setIsMobile = useUiStore((state) => state.setIsMobile);
  const mediaQuery = useMediaQuery(640);

  useEffect(() => {
    setIsMobile(mediaQuery);
  }, [mediaQuery]);

  console.log(mediaQuery);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className="flex-1 bg-card sm:grid sm:grid-cols-[25%_75%] sm:m-10 sm:rounded-2xl 
      text-card-foreground p-4 xl:p-6 relative"
      >
        {!mediaQuery && <div>{categoryView}</div>} <div>{taskView}</div>
      </div>
      {children}
    </div>
  );
};

export default layout;
