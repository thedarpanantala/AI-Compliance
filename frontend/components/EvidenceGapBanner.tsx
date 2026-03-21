"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgentPanel } from "@/contexts/agent-panel-context";

export function EvidenceGapBanner({ systemName }: { systemName: string }) {
  const { openWithMessage } = useAgentPanel();

  return (
    <div className="mb-4 flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
      <div className="flex items-center gap-2 text-amber-900">
        <AlertTriangle className="h-4 w-4" />
        <span>AI Agent found gaps in the provided evidence for {systemName}.</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">Dismiss</Button>
        <Button
          size="sm"
          onClick={() => openWithMessage(`Review evidence gaps for ${systemName} and provide remediation actions.`)}
        >
          Review evaluation
        </Button>
      </div>
    </div>
  );
}
