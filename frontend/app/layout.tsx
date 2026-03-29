import "./styles.css";
import type { ReactNode } from "react";
import { ComplianceAgent } from "../components/ComplianceAgent";
import { Nav } from "../components/Nav";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Nav />
          <div className="content-shell">
            <header className="top-header">
              <input className="global-search" placeholder="Search systems, controls, incidents…" />
              <div className="header-right">
                <button className="ghost-btn" aria-label="notifications">🔔 3</button>
                <button className="ghost-btn">Darpan</button>
              </div>
            </header>
            <div className="page-content">{children}</div>
          </div>
        </div>
        <ComplianceAgent orgId="demo-org" userId="demo-user" />
      </body>
    </html>
  );
}
