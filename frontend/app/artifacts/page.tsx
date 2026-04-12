import { ReportWizard } from "../../components/ReportWizard";

export default function ArtifactsPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Auto-Generated Artifacts</h1>
      <ReportWizard />
      <div className="card">
        <h2 className="font-semibold">Artifact Library</h2>
        <p className="text-sm muted">Statuses: draft / approved / issued · Re-run with updated evidence · Download history + audit trail.</p>
      </div>
    </main>
  );
}
