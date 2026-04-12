const pageMeta: Record<string, { title: string; description: string }> = {
  "overview/my-compliance": { title: "My Compliance", description: "Track licenses, certifications, and document obligations from a single cockpit." },
  "ai-governance/ai-assessment": { title: "AI Assessment", description: "Risk-tier classification and compliance checks for all AI systems." },
  "ai-governance/ai-architecture": { title: "AI Architecture", description: "Model architecture, deployment flow, and control mapping." },
  "privacy/ropa": { title: "ROPA", description: "Record of Processing Activities aligned with DPDPA/GDPR." },
  "privacy/data-subjects": { title: "Data Subjects", description: "Manage DSRs, SLA deadlines, and fulfillment records." },
  "privacy/dpia": { title: "DPIA", description: "AI-assisted DPIA creation with mandatory human review." },
  "privacy/privacy-by-design": { title: "Privacy by Design", description: "Shift-left privacy controls across AI lifecycle." },
  "incidents/incidents": { title: "Incidents", description: "Incident registry with severity, owner, and remediation workflow." },
  "incidents/breaches": { title: "Breaches", description: "Breach assessment and regulator-notification workflow." },
  "incidents/reports": { title: "Reports", description: "Incident reporting packets for internal and external stakeholders." },
  "compliance/gap-analysis": { title: "Gap Analysis", description: "Framework-wise control gap analysis and remediation queue." },
  "documents/document-vault": { title: "Document Vault", description: "Versioned compliance documents with approvals and evidence linkage." },
  "export-trade/export-intelligence": { title: "Export Intelligence", description: "EU/US/UK export requirements and market readiness guidance." },
  "export-trade/global-bridge": { title: "Global Bridge", description: "Cross-framework and cross-jurisdiction mapping layer." },
  "export-trade/shipments": { title: "Shipments", description: "Shipment-level compliance pre-checks and documentation readiness." },
  "reporting/compliance-dashboards": { title: "Dashboards", description: "Role-based dashboard views for Executive and Compliance Officer." },
  "reporting/generate-report": { title: "Generate Report", description: "Generate board-ready and audit-ready compliance reports." },
  "reporting/audit-trails": { title: "Audit Trail", description: "Tamper-evident activity logs and evidentiary history." },
  "settings/organization": { title: "Organization", description: "Industry category, sub-category, markets, and profile setup." },
  "settings/users-roles": { title: "Users & Roles", description: "Role-based access (Admin, Compliance Officer, DPO, Executive, Auditor)." },
  "settings/integrations": { title: "Integrations", description: "Connect ERP, DMS, e-signature, and government portals." },
  "settings/notifications": { title: "Notifications", description: "Configure reminders, escalation rules, and delivery channels." },
  "settings/help-support": { title: "Help & Support", description: "Guides, support tickets, and onboarding help center." }
};

const industries = [
  { label: "🏥 Healthcare & Medical", children: ["Hospitals & Clinics", "Diagnostic Laboratories", "Medical Device Manufacturing", "Pharmaceutical Manufacturing", "Medical Tourism Services"] },
  { label: "🧵 Textile & Apparel", children: ["Textile Manufacturing", "Garment Manufacturing", "Protective Textiles", "Technical Textiles", "Readymade Garments Export"] },
  { label: "🏭 Manufacturing & Engineering", children: ["General Manufacturing", "Machinery & Equipment", "Automotive Components", "Heavy Engineering", "Electrical Equipment", "Electronics Manufacturing", "Precision Engineering"] },
  { label: "🧪 Chemical Industry", children: ["Basic Chemicals", "Specialty Chemicals", "Agrochemicals", "Pharmaceutical Intermediates", "Petrochemicals", "Paints & Coatings"] },
  { label: "🍽️ Food & Agriculture", children: ["Food Processing & Manufacturing", "Agricultural Products Export", "Spices Processing", "Meat & Poultry Processing", "Dairy Processing", "Seafood Processing", "Organic Food Products"] },
  { label: "⚡ Electronics & IT", children: ["Consumer Electronics", "Industrial Electronics", "IT Hardware Manufacturing", "Semiconductor Manufacturing"] },
  { label: "🏗️ Environmental Services", children: ["Pollution Control Equipment", "Waste Management", "Water Treatment", "Environmental Consulting"] },
  { label: "🏢 MSME General", children: ["All MSME Categories"] }
];


const licenseCatalogHighlights = {
  "Chemical Industry": ["Factory License", "Hazardous Waste Authorization", "Explosives License", "REACH Registration", "TSCA Inventory"],
  "Food & Agriculture": ["FSSAI License", "APEDA Registration", "Agmark", "EU Food Import Requirements", "FDA Food Facility Registration"],
  "Manufacturing & Engineering": ["Factory License", "Pollution CTE/CTO", "CE Marking", "FCC/UL Listing"],
};

const licenseRows = [
  ["GST Registration", "✅ Valid", "Perpetual", "View"],
  ["MSME/Udyam Registration", "✅ Valid", "Perpetual", "View"],
  ["NABH Accreditation", "⚠️ Soon", "Jun 15, 2026", "Renew"],
  ["Clinical Establishment", "✅ Valid", "Dec 31, 2026", "View"],
  ["Fire NOC", "⚠️ Soon", "Apr 30, 2026", "Renew"],
  ["Electrical Certificate", "❌ Expired", "Mar 15, 2026", "Renew"],
  ["BMW Authorization", "✅ Valid", "Aug 20, 2027", "View"],
  ["Pollution CTO", "✅ Valid", "Mar 14, 2029", "View"]
];

export default function DynamicSectionPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const meta = pageMeta[slug] ?? { title: slug.replace(/-/g, " "), description: "SHASIT section scaffold ready for feature wiring." };

  return (
    <main className="space-y-4">
      <h1 className="page-title">{meta.title}</h1>
      <p className="muted">{meta.description}</p>

      

      <section className="card">
        <h2 className="card-title">Dynamic Compliance Checklist Engine Coverage</h2>
        <p className="muted">Universal + industry-specific + export conditional certifications are supported.</p>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          {Object.entries(licenseCatalogHighlights).map(([industry, items]) => (
            <div key={industry} className="card" style={{ padding: 16 }}>
              <p className="font-semibold">{industry}</p>
              <ul className="action-list">
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {slug === "settings/organization" && (
        <section className="card">
          <h2 className="card-title">Industry Categories</h2>
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            {industries.map((industry) => (
              <div key={industry.label} className="card" style={{ padding: 16 }}>
                <p className="font-semibold">{industry.label}</p>
                <ul className="action-list">
                  {industry.children.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {slug === "overview/my-compliance" && (
        <>
          <section className="kpi-grid">
            <div className="metric-card"><p>Total Licenses</p><p className="text-2xl font-bold">24</p></div>
            <div className="metric-card"><p>Expiring Soon</p><p className="text-2xl font-bold warning">2</p></div>
            <div className="metric-card"><p>Expired</p><p className="text-2xl font-bold danger">1</p></div>
          </section>
          <section className="card">
            <h2 className="card-title">License Tracking Dashboard</h2>
            <table className="status-table mt-3">
              <thead><tr><th>License / Certificate</th><th>Status</th><th>Expires</th><th>Action</th></tr></thead>
              <tbody>
                {licenseRows.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td><span className={row[1].includes("Expired") ? "badge-danger" : row[1].includes("Soon") ? "badge-warning" : "badge-success"}>{row[1]}</span></td>
                    <td>{row[2]}</td>
                    <td><button className="btn-ghost">{row[3]}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {slug === "ai-governance/ai-assessment" && (
        <section className="card">
          <h2 className="card-title">AI Compliance Workflow</h2>
          <ol className="action-list">
            <li>Step 1: Organization Profile Setup</li>
            <li>Step 2: AI Agent analyzes industry + market requirements</li>
            <li>Step 3: Compliance status assessment (Compliant/Attention/Missing)</li>
            <li>Step 4: Auto-generate missing documents</li>
            <li>Step 5: Human review and approval checkpoint</li>
          </ol>
        </section>
      )}

      {slug === "reporting/compliance-dashboards" && (
        <section className="two-col">
          <div className="card">
            <h2 className="card-title">Executive Dashboard</h2>
            <ul className="action-list">
              <li>Compliance Health: 87%</li>
              <li>Open Issues: 12</li>
              <li>Pending Actions: 8</li>
              <li>Audit Status: On Track</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="card-title">Compliance Officer Dashboard</h2>
            <ul className="action-list">
              <li>Open Tasks: Review DPIA, Approve ROPA</li>
              <li>Expiring Soon: Fire NOC, ISO 9001</li>
              <li>AI Activity: Documents 5, Checks 24, Alerts 3</li>
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
