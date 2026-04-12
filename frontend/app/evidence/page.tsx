import { EvidenceTimeline } from "../../components/EvidenceTimeline";

const events = [
  { id: "1", title: "Validation study uploaded", source: "manual", at: "2026-01-01" },
  { id: "2", title: "Deployment approval captured", source: "github", at: "2026-01-03" },
  { id: "3", title: "Model test results collected", source: "mlflow", at: "2026-01-05" }
];

export default function Page() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Evidence Repository</h1>
      <EvidenceTimeline events={events} />
    </main>
  );
}
