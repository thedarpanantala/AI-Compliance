import { getSupabaseProjectHost, isSupabaseConfigured } from "../lib/supabase";

export function SupabaseConnectionCard() {
  const host = getSupabaseProjectHost();

  return (
    <section className="card space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Supabase Deployment Readiness</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isSupabaseConfigured ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {isSupabaseConfigured ? "Configured" : "Needs env vars"}
        </span>
      </div>
      <p className="text-sm text-slate-600">
        {isSupabaseConfigured
          ? `Frontend is pointed at Supabase project ${host}.`
          : "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to connect this frontend to Supabase."}
      </p>
      <ul className="list-disc pl-5 text-sm text-slate-700">
        <li>Frontend env file: <code>frontend/.env.local</code></li>
        <li>Backend env file: <code>backend/.env</code></li>
        <li>Deployment guide: <code>docs/deployment/supabase.md</code></li>
      </ul>
    </section>
  );
}
