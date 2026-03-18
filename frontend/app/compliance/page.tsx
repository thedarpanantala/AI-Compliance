import { Nav } from "../../components/Nav";
import { ControlStatusTable } from "../../components/ControlStatusTable";

const rows = [
  { code: "EUAI-HR-001", title: "Monitoring enabled", framework: "EU AI Act", status: "pass" as const },
  { code: "ISO42001-5.3", title: "Accountability owner assigned", framework: "ISO 42001", status: "partial" as const },
  { code: "NIST-MAP-001", title: "Impact mapping evidence", framework: "NIST AI RMF", status: "fail" as const },
];

export default function Page() {
  return (
    <main className="p-8 space-y-4">
      <Nav />
      <h1 className="text-2xl font-bold">Compliance Dashboard</h1>
      <ControlStatusTable rows={rows} />
    </main>
  );
}
