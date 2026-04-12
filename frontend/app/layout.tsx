import "./styles.css";
import type { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { AppShell } from "../components/AppShell";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Nav />
          <div className="content-shell">
            <header className="top-header">
              <input className="global-search" placeholder="Search licenses, controls, incidents, documents..." />
              <div className="header-right">
                <button className="ghost-btn" aria-label="notifications">🔔 <span className="danger">3 urgent</span></button>
                <button className="ghost-btn">Darpan Antala</button>
              </div>
            </header>
            <div className="breadcrumb-wrap"><Breadcrumbs /></div>
            <div className="page-content">{children}</div>
          </div>
        </div>
        <ComplianceAgent orgId="demo-org" userId="demo-user" />
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
