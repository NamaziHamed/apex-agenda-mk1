"use client";
import { useUiStore } from "@/store/uiStore";
import { useState, useEffect } from "react";

export function useMediaQuery(threshold: number = 640) {
  const [matches, setMatches] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const setIsMobile = useUiStore((state) => state.setIsMobile);

  useEffect(() => {
    const checkWidth = () => {
      setMatches(window.innerWidth < threshold);
      setIsLoading(false);
    };
    checkWidth();

    window.addEventListener("resize", checkWidth);
    setIsLoading(false);

    return () => window.removeEventListener("resize", checkWidth);
  }, [threshold]);

  useEffect(() => {
    setIsMobile(matches);
  }, [matches]);

  return { matches, isLoading };
}
