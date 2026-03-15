import "./styles.css";
import type { ReactNode } from "react";
import { ComplianceAgent } from "../components/ComplianceAgent";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">{children}<ComplianceAgent orgId="demo-org" userId="demo-user" /></body>
    </html>
  );
}
