import type { ReactNode } from "react";

import { OrgAwareSidebar } from "@/components/OrgAwareSidebar";
import { TopNav } from "@/components/TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <OrgAwareSidebar />
      <div className="pl-[240px]">
        <TopNav />
        <main id="main-content" className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
