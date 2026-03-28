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
