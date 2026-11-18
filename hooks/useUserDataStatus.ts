"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "@/lib/tasks";

/**
 * Read-only view of the ["userData"] query status for presentational
 * components (skeletons). `enabled: false` means this observer never
 * triggers a request itself — it only mirrors the cache that
 * `useGetUserData` populates.
 */
export function useUserDataStatus() {
  const { status } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    enabled: false,
  });
  return { isLoading: status === "pending", isError: status === "error" };
}
