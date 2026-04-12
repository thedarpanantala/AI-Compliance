const frameworkRows = [
  { name: "EU AI Act 2024", value: 72 },
  { name: "DPDPA 2023", value: 88 },
  { name: "ISO 42001", value: 61 },
  { name: "NABH Clinical", value: 95 },
  { name: "NIST AI RMF", value: 55 },
  { name: "CDSCO SaMD", value: 80 }
];

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      <div>
        <h1 className="page-title">Good morning, Darpan</h1>
        <p className="muted">Monday, March 30, 2026 · SHASIT compliance cockpit</p>
      </div>

      <section className="card card-elevated">
        <h2 className="card-title">Compliance Health Score</h2>
        <div className="flex items-center gap-4 mt-2">
          <div className="metric-card">
            <p className="text-3xl font-bold">87%</p>
            <p className="success text-sm">▲ +3% from last month</p>
          </div>
          <div>
            <p className="muted">Your compliance posture is strong.</p>
            <button className="btn-primary mt-2">View Detailed Report</button>
          </div>
        </div>
      </section>

      <section className="two-col">
        <div className="card">
          <h2 className="card-title">⚠️ Action Required</h2>
          <ul className="action-list">
            <li className="warning">ISO 42001 renewal in 15 days</li>
            <li className="warning">ROPA review due in 7 days</li>
            <li className="danger">3 compliance gaps identified</li>
          </ul>
          <button className="btn-primary">Take Action Now</button>
        </div>
        <div className="card">
          <h2 className="card-title">📅 Upcoming Deadlines</h2>
          <ul className="action-list">
            <li>Mar 30: DSR DSR-005</li>
            <li>Apr 05: NABH audit</li>
            <li>Apr 15: ISO review</li>
            <li>Apr 30: DPIA annual update</li>
          </ul>
          <div className="flex gap-2">
            <button className="btn-secondary">View All Deadlines</button>
            <button className="btn-ghost">Add Reminder</button>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">Framework Compliance Overview</h2>
        {frameworkRows.map((row) => (
          <div className="progress-row" key={row.name}>
            <span>{row.name}</span>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${row.value}%` }} /></div>
            <span>{row.value}%</span>
          </div>
        ))}
      </section>

      <section className="two-col">
        <div className="card">
          <h2 className="card-title">🤖 AI Agent Activity</h2>
          <ul className="action-list">
            <li>Generated DPIA document</li>
            <li>Checked 12 new regulations</li>
            <li>Flagged 3 gaps</li>
          </ul>
          <button className="btn-primary">Chat with AI Agent</button>
        </div>
        <div className="card">
          <h2 className="card-title">📊 Compliance Trends</h2>
          <svg className="sparkline" viewBox="0 0 160 60">
            <polyline fill="none" stroke="#2563EB" strokeWidth="3" points="0,52 24,46 48,44 72,38 96,32 120,24 144,16 160,10" />
          </svg>
        </div>
      </section>
import { Nav } from "../components/Nav";
import { SupabaseConnectionCard } from "../components/SupabaseConnectionCard";

export default function DashboardPage() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold mb-4">AI Compliance Platform</h1>
      <Nav />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card"><h2>Active AI Systems</h2><p className="text-2xl">42</p></div>
        <div className="card"><h2>Open Risks</h2><p className="text-2xl">7</p></div>
        <div className="card"><h2>Audit Readiness</h2><p className="text-2xl">91%</p></div>
      </section>
      <SupabaseConnectionCard />
    </main>
  );
}
