"use client";

import { useSession as useNextAuthSession } from "next-auth/react";

export function useSessionDebug(componentName: string) {
  const session = useNextAuthSession();

  if (typeof window !== "undefined") {
    console.log(
      `%cuseSession called in ${componentName}`,
      "color: yellow; font-weight: bold;",
      { session }
    );
  }

  return session;
}
