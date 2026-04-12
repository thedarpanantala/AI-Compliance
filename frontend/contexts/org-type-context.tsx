"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OrgType = "hospital" | "factory" | "lab" | "pharma" | "tech" | "government" | "multi";

const STORAGE_KEY = "org_type";
const VERTICAL_KEY = "active_vertical";

type VerticalFocus = "healthcare" | "manufacturing";

type OrgTypeContextValue = {
  orgType: OrgType;
  setOrgType: (t: OrgType) => void;
  /** When orgType is multi, which vertical suite is expanded/focused */
  verticalFocus: VerticalFocus;
  setVerticalFocus: (v: VerticalFocus) => void;
};

const OrgTypeContext = createContext<OrgTypeContextValue | null>(null);

export function OrgTypeProvider({ children }: { children: ReactNode }) {
  const [orgType, setOrgTypeState] = useState<OrgType>("hospital");
  const [verticalFocus, setVerticalFocusState] = useState<VerticalFocus>("healthcare");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) as OrgType | null;
      if (raw && isOrgType(raw)) setOrgTypeState(raw);
      const v = localStorage.getItem(VERTICAL_KEY) as VerticalFocus | null;
      if (v === "healthcare" || v === "manufacturing") setVerticalFocusState(v);
    } catch {
      /* ignore */
    }
  }, []);

  const setOrgType = useCallback((t: OrgType) => {
    setOrgTypeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const setVerticalFocus = useCallback((v: VerticalFocus) => {
    setVerticalFocusState(v);
    try {
      localStorage.setItem(VERTICAL_KEY, v);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ orgType, setOrgType, verticalFocus, setVerticalFocus }),
    [orgType, setOrgType, verticalFocus, setVerticalFocus]
  );

  return <OrgTypeContext.Provider value={value}>{children}</OrgTypeContext.Provider>;
}

function isOrgType(s: string): s is OrgType {
  return ["hospital", "factory", "lab", "pharma", "tech", "government", "multi"].includes(s);
}

export function useOrgType() {
  const ctx = useContext(OrgTypeContext);
  if (!ctx) throw new Error("useOrgType must be used within OrgTypeProvider");
  return ctx;
}
