import { ComplianceAgent } from "../../../components/ComplianceAgent";
import { Nav } from "../../../components/Nav";

export default function AISystemDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-8 space-y-4">
      <Nav />
      <h1 className="text-2xl font-bold">AI System Detail</h1>
      <p className="text-sm text-slate-600">System ID: {params.id}</p>
      <div className="card">
        <p>Detailed metadata, controls, evidence, and assessments can be shown here.</p>
      </div>
      <ComplianceAgent systemId={params.id} orgId="demo-org" userId="demo-user" />
    </main>
  );
}
