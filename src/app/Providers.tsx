"use client";

import { DEFAULT_THEME } from "@/lib/constants";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={DEFAULT_THEME}>
      {children}
    </ThemeProvider>
  );
}
