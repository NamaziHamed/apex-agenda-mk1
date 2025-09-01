"use client";
import { useState, useEffect } from "react";

export function useMediaQuery(threshold: number = 640) {
  const [isBelowThreshold, setIsBelowThreshold] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsBelowThreshold(window.innerWidth < threshold);
    };

    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, [threshold]);

  return isBelowThreshold;
}
