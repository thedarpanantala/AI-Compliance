"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };
type NavSection = { icon: string; title: string; items: NavItem[] };

const navSections: NavSection[] = [
  {
    icon: "🚀",
    title: "GETTING STARTED",
    items: [
      { href: "/getting-started/quick-setup-wizard", label: "Quick Setup Wizard" },
      { href: "/getting-started/system-discovery", label: "System Discovery" },
      { href: "/getting-started/guided-onboarding", label: "Guided Onboarding" }
    ]
  },
  {
    icon: "🏠",
    title: "HOME",
    items: [
      { href: "/", label: "Executive Dashboard" },
      { href: "/home/ai-agent-insights", label: "AI Agent Insights" },
      { href: "/home/global-intelligence", label: "Global Intelligence" }
    ]
  },
  {
    icon: "🤖",
    title: "AI GOVERNANCE",
    items: [
      { href: "/ai-inventory", label: "AI Systems Inventory" },
      { href: "/ai-governance/risk-classification", label: "Risk Classification" },
      { href: "/ai-governance/impact-assessments", label: "Impact Assessments" },
      { href: "/ai-governance/deployment-tracking", label: "Deployment Tracking" }
    ]
  },
  {
    icon: "🔒",
    title: "PRIVACY & DATA",
    items: [
      { href: "/privacy/processing-records", label: "Processing Records (ROPA)" },
      { href: "/privacy/data-subject-requests", label: "Data Subject Requests" },
      { href: "/privacy/privacy-by-design", label: "Privacy by Design" }
    ]
  },
  {
    icon: "⚖️",
    title: "FRAMEWORK COMPLIANCE",
    items: [
      { href: "/compliance", label: "Active Frameworks" },
      { href: "/controls", label: "Control Library" },
      { href: "/jurisdiction-bridge", label: "Cross-Framework Mappings" },
      { href: "/compliance/gap-analysis", label: "Gap Analysis" }
    ]
  },
  {
    icon: "🌍",
    title: "EXPORT & TRADE",
    items: [
      { href: "/export-trade/export-intelligence", label: "Export Intelligence" },
      { href: "/export-trade/multi-jurisdiction-rules", label: "Multi-Jurisdiction Rules" },
      { href: "/manufacturing", label: "Factory Ops" },
      { href: "/export-trade/global-bridge", label: "Global Bridge" }
    ]
  },
  {
    icon: "🔔",
    title: "INCIDENTS & BREACHES",
    items: [
      { href: "/incidents/incident-logging", label: "Incident Logging" },
      { href: "/incidents/breach-assessment", label: "Breach Assessment" },
      { href: "/incidents/regulatory-reporting", label: "Regulatory Reporting" }
    ]
  },
  {
    icon: "📁",
    title: "DOCUMENTS & EVIDENCE",
    items: [
      { href: "/documents/document-vault", label: "Document Vault" },
      { href: "/evidence", label: "Evidence Repository" },
      { href: "/artifacts", label: "Auto-Generated Artifacts" },
      { href: "/workflows", label: "Workflows" }
    ]
  },
  {
    icon: "📊",
    title: "REPORTING",
    items: [
      { href: "/reporting/compliance-dashboards", label: "Compliance Dashboards" },
      { href: "/reporting/automated-reports", label: "Automated Reports" },
      { href: "/reporting/audit-trails", label: "Audit Trails" }
    ]
  },
  {
    icon: "⚙️",
    title: "SETTINGS",
    items: [
      { href: "/settings/organization-profile", label: "Organization Profile" },
      { href: "/settings/users-roles", label: "Users & Roles" },
      { href: "/settings/integrations", label: "Integrations" }
    ]
  }
];

export function Nav() {
  const pathname = usePathname();

  return (
    <aside className="sidebar-shell">
      <div className="brand-panel">
        <div className="brand-title">aic Privacy Cockpit</div>
        <div className="brand-subtitle">AI Compliance Automation</div>
      </div>
      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <section key={section.title} className="sidebar-section">
            <h3 className="section-title">{section.icon} {section.title}</h3>
            <ul className="section-items">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link className={active ? "nav-link active" : "nav-link"} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}
