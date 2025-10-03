"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
