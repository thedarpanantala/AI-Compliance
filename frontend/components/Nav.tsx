"use client";
import Link from "next/link";

const pages = [
  ["/", "Dashboard"],
  ["/ai-inventory", "AI System Inventory"],
  ["/controls", "Control Library"],
  ["/compliance", "Compliance Dashboard"],
  ["/evidence", "Evidence Viewer"],
  ["/workflows", "Workflow Tasks"],
  ["/healthcare", "Health AI Inventory"],
  ["/manufacturing", "Factory Compliance Heatmap"],
  ["/artifacts", "Artifact Library"],
  ["/jurisdiction-bridge", "Jurisdiction Bridge"],
  ["/try", "Try Agent"]
];

export function Nav() {
  return (
    <nav className="flex gap-4 text-sm mb-6 flex-wrap">
      {pages.map(([href, label]) => (
        <Link className="px-3 py-2 rounded bg-slate-200" key={href} href={href}>{label}</Link>
      ))}
    </nav>
  );
}
