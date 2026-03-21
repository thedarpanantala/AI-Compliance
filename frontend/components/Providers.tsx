"use client";

import type { ReactNode } from "react";

import { AgentPanelProvider } from "@/contexts/agent-panel-context";
import { OrgTypeProvider } from "@/contexts/org-type-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OrgTypeProvider>
      <AgentPanelProvider>{children}</AgentPanelProvider>
    </OrgTypeProvider>
  );
}
