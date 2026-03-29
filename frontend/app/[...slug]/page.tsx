const pageMeta: Record<string, { title: string; description: string }> = {
  "getting-started/quick-setup-wizard": { title: "Quick Setup Wizard", description: "Step-by-step setup to configure organization profile, regions, and baseline frameworks." },
  "getting-started/system-discovery": { title: "System Discovery", description: "Connect sources, auto-scan AI assets, and validate discovered systems." },
  "getting-started/guided-onboarding": { title: "Guided Onboarding", description: "Six-step onboarding flow from organization setup to go-live milestone." },
  "home/ai-agent-insights": { title: "AI Agent Insights", description: "Track automation suggestions, adoption, and generated compliance outcomes." },
  "home/global-intelligence": { title: "Global Intelligence", description: "Monitor regulatory updates and jurisdiction-specific compliance insights." },
  "ai-governance/risk-classification": { title: "Risk Classification", description: "Auto-classify systems into risk tiers with visual prioritization." },
  "ai-governance/impact-assessments": { title: "Impact Assessments", description: "Run and store impact assessments with reviewer checkpoints." },
  "ai-governance/deployment-tracking": { title: "Deployment Tracking", description: "Track deployment state, monitoring hooks, and approval gates." },
  "privacy/processing-records": { title: "Processing Records (ROPA)", description: "Maintain records of processing activities across data flows." },
  "privacy/data-subject-requests": { title: "Data Subject Requests", description: "Manage DSR intake, SLA tracking, and response workflows." },
  "privacy/privacy-by-design": { title: "Privacy by Design", description: "Apply privacy controls early with templates and default safeguards." },
  "compliance/gap-analysis": { title: "Gap Analysis", description: "Identify missing controls, prioritize risk, and assign remediation owners." },
  "export-trade/export-intelligence": { title: "Export Intelligence", description: "Get market access compliance insights for target export regions." },
  "export-trade/multi-jurisdiction-rules": { title: "Multi-Jurisdiction Rules", description: "Compare obligations across EU, India, US, and other regions." },
  "export-trade/global-bridge": { title: "Global Bridge", description: "Bridge control mappings and evidence between target jurisdictions." },
  "incidents/incident-logging": { title: "Incident Logging", description: "Capture incidents with chronology, severity, and ownership." },
  "incidents/breach-assessment": { title: "Breach Assessment", description: "Assess incidents for breach thresholds and response obligations." },
  "incidents/regulatory-reporting": { title: "Regulatory Reporting", description: "Prepare regulator-ready incident reports with audit trails." },
  "documents/document-vault": { title: "Document Vault", description: "Securely store policies, procedures, and versioned compliance docs." },
  "reporting/compliance-dashboards": { title: "Compliance Dashboards", description: "Executive and operational dashboards for risk and readiness tracking." },
  "reporting/automated-reports": { title: "Automated Reports", description: "Generate scheduled compliance reports with approval workflow." },
  "reporting/audit-trails": { title: "Audit Trails", description: "View immutable logs of assessments, approvals, and evidence changes." },
  "settings/organization-profile": { title: "Organization Profile", description: "Configure legal entity, industry profile, and operating regions." },
  "settings/users-roles": { title: "Users & Roles", description: "Manage role-based access and responsibility assignments." },
  "settings/integrations": { title: "Integrations", description: "Connect source systems, identity providers, and messaging tools." }
};

const onboardingSteps = [
  "Organization Setup (name, industry, regions → auto-frameworks)",
  "System Discovery (connect/upload, auto-scan, manual add)",
  "Risk Classification (EU AI Act tiers, heat map, priority queue)",
  "Gap Analysis & Auto-Generation (missing docs, AI draft, human checkpoint)",
  "Team & Workflows (owner assignment, role templates, invites)",
  "Go Live (first report, monitoring activation)"
];

export default function DynamicSectionPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const meta = pageMeta[slug] ?? {
    title: slug.replace(/-/g, " "),
    description: "Section under construction with the new cockpit IA structure."
  };

  const showOnboarding = slug === "getting-started/guided-onboarding";
  const showEmptyState = slug === "incidents/regulatory-reporting";

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">{meta.title}</h1>
      <p className="muted">{meta.description}</p>

      {showOnboarding && (
        <section className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Onboarding Flow</h2>
            <span className="muted text-sm">Last saved 2m ago</span>
          </div>
          <div className="step-grid">
            {onboardingSteps.map((step, index) => (
              <div key={step} className={index < 2 ? "step-item done" : "step-item"}>
                <span className="step-badge">{index < 2 ? "✓" : index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-2 max-w-lg">
            <label className="text-sm font-medium">Company Name <span className="danger">*</span></label>
            <input className="global-search" placeholder="Enter company name" />
          </div>
          <div className="flex justify-end gap-2">
            <button className="ghost-btn">Save Draft</button>
            <button className="ghost-btn">Continue</button>
          </div>
        </section>
      )}

      {showEmptyState && (
        <section className="card">
          <div className="empty-state">
            <p className="font-semibold">No items found</p>
            <p className="muted">No reportable regulatory breaches detected for this period.</p>
            <button className="ghost-btn mt-2">Create Incident Report</button>
          </div>
        </section>
      )}
    </main>
  );
}
