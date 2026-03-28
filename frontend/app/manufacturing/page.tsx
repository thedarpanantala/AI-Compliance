import { Nav } from "../../components/Nav";
import { FactoryHeatmap } from "../../components/FactoryHeatmap";

export default function Page() {
  return (
    <main className="p-8 space-y-4">
      <Nav />
      <h1 className="text-2xl font-bold">Factory Compliance Heatmap</h1>
      <FactoryHeatmap />
    </main>
  );
}
