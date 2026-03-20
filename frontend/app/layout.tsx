import "./styles.css";
import type { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { AppShell } from "../components/AppShell";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 font-sans antialiased text-[13px] leading-[1.5]">
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
