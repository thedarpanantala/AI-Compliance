import { Nav } from "../../components/Nav";
import { ReportWizard } from "../../components/ReportWizard";

export default function ArtifactsPage() {
  return (
    <main className="p-8 space-y-4">
      <Nav />
      <h1 className="text-2xl font-bold">Artifact Library & Report Generation</h1>
      <ReportWizard />
      <div className="card">
        <h2 className="font-semibold">Artifact Library</h2>
        <p className="text-sm">Statuses: draft / approved / issued · Re-run with updated evidence · Download history + audit trail.</p>
      </div>
    </main>
  );
}
