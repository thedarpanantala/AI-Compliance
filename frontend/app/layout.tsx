import "./styles.css";
import type { ReactNode } from "react";
import { ComplianceAgent } from "../components/ComplianceAgent";
import { Nav } from "../components/Nav";
import { Breadcrumbs } from "../components/Breadcrumbs";

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
      </body>
    </html>
  );
}
