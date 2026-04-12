import { Nav } from "../../components/Nav";
import { JurisdictionBridge } from "../../components/JurisdictionBridge";

export default function BridgePage() {
  return (
    <main className="p-8 space-y-4">
      <Nav />
      <h1 className="text-2xl font-bold">Jurisdiction Bridge</h1>
      <JurisdictionBridge />
    </main>
  );
}
