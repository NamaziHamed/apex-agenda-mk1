import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import NextAuthSessionProvider from "./session-provider";
import QueryClientP from "./query-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientP>
      <NextAuthSessionProvider>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </NextAuthSessionProvider>
    </QueryClientP>
  );
};

export default Providers;
