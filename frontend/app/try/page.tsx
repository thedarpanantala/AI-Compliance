import { ComplianceAgent } from "../../components/ComplianceAgent";

export default function TryAgentPage() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Try Compliance Assistant</h1>
      <p className="text-sm text-slate-600">Public standalone mode with no database access.</p>
      <ComplianceAgent standalone={true} orgId="public" />
    </main>
  );
}
