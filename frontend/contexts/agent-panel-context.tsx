"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type AgentPanelContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  pendingUserMessage: string | null;
  clearPendingMessage: () => void;
  openWithMessage: (message: string) => void;
  agentActiveDot: boolean;
  setAgentActiveDot: (v: boolean) => void;
};

const AgentPanelContext = createContext<AgentPanelContextValue | null>(null);

export function AgentPanelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
  const [agentActiveDot, setAgentActiveDot] = useState(false);

  const openWithMessage = useCallback((message: string) => {
    setPendingUserMessage(message);
    setOpen(true);
  }, []);

  const clearPendingMessage = useCallback(() => {
    setPendingUserMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      pendingUserMessage,
      clearPendingMessage,
      openWithMessage,
      agentActiveDot,
      setAgentActiveDot,
    }),
    [open, pendingUserMessage, clearPendingMessage, openWithMessage, agentActiveDot]
  );

  return <AgentPanelContext.Provider value={value}>{children}</AgentPanelContext.Provider>;
}

export function useAgentPanel() {
  const ctx = useContext(AgentPanelContext);
  if (!ctx) throw new Error("useAgentPanel must be used within AgentPanelProvider");
  return ctx;
}
