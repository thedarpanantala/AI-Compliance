"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { href: string; label: string };
type NavSection = { icon: string; title: string; items: NavItem[] };

const navSections: NavSection[] = [
  { icon: "🏠", title: "OVERVIEW", items: [{ href: "/", label: "Dashboard" }, { href: "/overview/my-compliance", label: "My Compliance" }] },
  { icon: "🤖", title: "AI GOVERNANCE", items: [{ href: "/try", label: "AI Agent" }, { href: "/ai-inventory", label: "AI Systems" }, { href: "/ai-governance/ai-assessment", label: "AI Assessment" }, { href: "/ai-governance/ai-architecture", label: "AI Architecture" }] },
  { icon: "🔒", title: "PRIVACY & DATA", items: [{ href: "/privacy/ropa", label: "ROPA" }, { href: "/privacy/data-subjects", label: "Data Subjects" }, { href: "/privacy/dpia", label: "DPIA" }, { href: "/privacy/privacy-by-design", label: "Privacy by Design" }] },
  { icon: "🚨", title: "INCIDENTS", items: [{ href: "/incidents/incidents", label: "Incidents" }, { href: "/incidents/breaches", label: "Breaches" }, { href: "/incidents/reports", label: "Reports" }] },
  { icon: "✅", title: "COMPLIANCE", items: [{ href: "/compliance", label: "Frameworks" }, { href: "/controls", label: "Controls" }, { href: "/compliance/gap-analysis", label: "Gap Analysis" }, { href: "/jurisdiction-bridge", label: "Mappings" }] },
  { icon: "📁", title: "DOCUMENTS", items: [{ href: "/documents/document-vault", label: "Document Vault" }, { href: "/evidence", label: "Evidence" }, { href: "/workflows", label: "Workflows" }] },
  { icon: "🌍", title: "EXPORT & TRADE", items: [{ href: "/export-trade/export-intelligence", label: "Export Intelligence" }, { href: "/export-trade/global-bridge", label: "Global Bridge" }, { href: "/export-trade/shipments", label: "Shipments" }] },
  { icon: "📈", title: "REPORTS", items: [{ href: "/reporting/compliance-dashboards", label: "Dashboards" }, { href: "/reporting/generate-report", label: "Generate Report" }, { href: "/reporting/audit-trails", label: "Audit Trail" }] },
  { icon: "⚙️", title: "SETTINGS", items: [{ href: "/settings/organization", label: "Organization" }, { href: "/settings/users-roles", label: "Users & Roles" }, { href: "/settings/integrations", label: "Integrations" }, { href: "/settings/notifications", label: "Notifications" }, { href: "/settings/help-support", label: "Help & Support" }] }
];

export function Nav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={collapsed ? "sidebar-shell collapsed" : "sidebar-shell"}>
      <div className="brand-panel">
        <div className="brand-title">SHASIT</div>
        {!collapsed && <div className="brand-subtitle">Automated Compliance Intelligence</div>}
        <button className="collapse-btn" onClick={() => setCollapsed((value) => !value)}>{collapsed ? "»" : "«"}</button>
      </div>
      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <section key={section.title} className="sidebar-section">
            <h3 className="section-title">{section.icon} {!collapsed && section.title}</h3>
            {!collapsed && (
              <ul className="section-items">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link className={active ? "nav-link active" : "nav-link"} href={item.href}>{item.label}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </nav>
    </aside>
import Link from "next/link";

const pages = [
  ["/", "Dashboard"],
  ["/ai-inventory", "AI System Inventory"],
  ["/controls", "Control Library"],
  ["/compliance", "Compliance Dashboard"],
  ["/evidence", "Evidence Viewer"],
  ["/workflows", "Workflow Tasks"],
  ["/healthcare", "Health AI Inventory"],
  ["/manufacturing", "Factory Compliance Heatmap"],
  ["/artifacts", "Artifact Library"],
  ["/jurisdiction-bridge", "Jurisdiction Bridge"],
  ["/try", "Try Agent"]
];

export function Nav() {
  return (
    <nav className="flex gap-4 text-sm mb-6 flex-wrap">
      {pages.map(([href, label]) => (
        <Link className="px-3 py-2 rounded bg-slate-200" key={href} href={href}>{label}</Link>
      ))}
    </nav>
  );
}
