import { ComplianceAgent } from "../../components/ComplianceAgent";

const suggestedTasks = [
  { title: "License Compliance Check", description: "Check all required licenses for your organization." },
  { title: "Generate DPIA Document", description: "Create Data Protection Impact Assessment draft." },
  { title: "Compliance Health Report", description: "Get detailed compliance analysis by framework." },
  { title: "Export Readiness Assessment", description: "Check EU/US/UK market requirements." }
];

export default function TryAgentPage() {
  return (
    <main className="space-y-4">
      <h1 className="page-title">🤖 SHASIT AI Agent</h1>
      <p className="muted">Your compliance assistant for license checks, document generation, and regulatory guidance.</p>

      <section className="card">
        <p className="muted mb-2">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary">Check My Licenses</button>
          <button className="btn-secondary">Generate Document</button>
          <button className="btn-secondary">Ask a Question</button>
        </div>
      </section>

      <ComplianceAgent standalone={true} orgId="public" />

      <section className="card">
        <h2 className="card-title">Suggested Tasks</h2>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          {suggestedTasks.map((task) => (
            <div key={task.title} className="card" style={{ padding: 16 }}>
              <p className="font-semibold">{task.title}</p>
              <p className="muted text-sm">{task.description}</p>
            </div>
          ))}
        </div>
      </section>
export default function TryAgentPage() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Try Compliance Assistant</h1>
      <p className="text-sm text-slate-600">Public standalone mode with no database access.</p>
      <ComplianceAgent standalone={true} orgId="public" />
    </main>
  );
}
