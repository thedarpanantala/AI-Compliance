import { Nav } from "../../components/Nav";
import { ClinicalRiskAssessment } from "../../components/ClinicalRiskAssessment";

export default function Page() {
  return (
    <main className="p-8 space-y-4">
      <Nav />
      <h1 className="text-2xl font-bold">Health AI Inventory</h1>
      <ClinicalRiskAssessment />
    </main>
  );
}
