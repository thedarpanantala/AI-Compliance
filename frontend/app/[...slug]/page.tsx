const pageMeta: Record<string, { title: string; description: string }> = {
  "overview/my-compliance": { title: "My Compliance", description: "Your personalized compliance obligations, health score, and priority queue." },
  "ai-governance/ai-assessment": { title: "AI Assessment", description: "Run structured AI risk and framework assessments with scheduling." },
  "ai-governance/ai-architecture": { title: "AI Architecture", description: "Document model architecture, data pipelines, and deployment controls." },
  "privacy/ropa": { title: "ROPA", description: "Record of Processing Activities for DPDPA/GDPR aligned operations." },
  "privacy/data-subjects": { title: "Data Subjects", description: "Track requests, SLA status, and fulfillment evidence." },
  "privacy/dpia": { title: "DPIA", description: "Data Protection Impact Assessments with AI-assisted drafting." },
  "privacy/privacy-by-design": { title: "Privacy by Design", description: "Embed privacy controls at design-time with policy templates." },
  "incidents/incidents": { title: "Incidents", description: "Log incidents with severity, owners, timelines, and remediation." },
  "incidents/breaches": { title: "Breaches", description: "Assess and manage breach notifications across jurisdictions." },
  "incidents/reports": { title: "Reports", description: "Regulatory reporting package builder for incidents and breaches." },
  "compliance/gap-analysis": { title: "Gap Analysis", description: "Identify control deficiencies and assign remediation tasks." },
  "documents/document-vault": { title: "Document Vault", description: "Versioned repository of compliance evidence and generated documents." },
  "export-trade/export-intelligence": { title: "Export Intelligence", description: "Country-specific export compliance requirements and alerts." },
  "export-trade/global-bridge": { title: "Global Bridge", description: "Cross-market obligations mapping for EU/US/UK expansion." },
  "export-trade/shipments": { title: "Shipments", description: "Shipment-level compliance checks and export document readiness." },
  "reporting/compliance-dashboards": { title: "Dashboards", description: "Executive and operational compliance dashboards." },
  "reporting/generate-report": { title: "Generate Report", description: "AI-assisted report generation with human approval checkpoints." },
  "reporting/audit-trails": { title: "Audit Trail", description: "Tamper-evident activity trail for audits and investigations." },
  "settings/organization": { title: "Organization", description: "Org profile, industry mapping, and regional operations setup." },
  "settings/users-roles": { title: "Users & Roles", description: "Role-based access model (Admin, DPO, Auditor, Executive)." },
  "settings/integrations": { title: "Integrations", description: "Connect GitHub, MLflow, Databricks, and enterprise systems." },
  "settings/notifications": { title: "Notifications", description: "Configure alerts for deadlines, incidents, and regulatory updates." },
  "settings/help-support": { title: "Help & Support", description: "Knowledge base, guides, and support channels." }
};

const industries = [
  "Healthcare & Medical", "Textile & Apparel", "Manufacturing & Engineering", "Chemical Industry", "Food & Agriculture", "Electronics & IT"
];

const roles = ["Admin", "Compliance Officer", "DPO", "Executive", "Auditor"];

export default function DynamicSectionPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const meta = pageMeta[slug] ?? { title: slug.replace(/-/g, " "), description: "SHASIT section scaffold ready for feature wiring." };

  return (
    <main className="space-y-4">
      <h1 className="page-title">{meta.title}</h1>
      <p className="muted">{meta.description}</p>

      <section className="card">
        <h2 className="card-title">Industry Coverage</h2>
        <div className="grid md:grid-cols-2 gap-2 mt-3">
          {industries.map((industry) => <span key={industry}>• {industry}</span>)}
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">Role Visibility</h2>
        <div className="grid md:grid-cols-5 gap-2 mt-3">
          {roles.map((role) => <span key={role} className="badge-info">{role}</span>)}
        </div>
      </section>
    </main>
  );
}
