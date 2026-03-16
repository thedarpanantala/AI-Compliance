"use client";
import { useMemo, useState } from "react";

const templates = [
  { id: "eu-ai-act-annex-iv", label: "EU AI Act Annex IV" },
  { id: "icmr-health-ai", label: "ICMR Health AI HITL" },
  { id: "bodh-readiness", label: "BODH Readiness" },
  { id: "gpcb-monthly", label: "GPCB Monthly" },
];

export function ReportWizard() {
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");

  const preview = useMemo(() => templates.find((t) => t.id === templateId)?.label, [templateId]);

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Generate Report Wizard</h2>

      <div>
        <label className="block text-sm mb-1">Template Picker</label>
        <select className="border rounded px-2 py-1" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
          {templates.map((t) => <option value={t.id} key={t.id}>{t.label}</option>)}
        </select>
        <p className="text-xs text-slate-500 mt-1">Preview: {preview}</p>
      </div>

      <div className="text-sm">
        <p>Step {step} / 4</p>
        <ul className="list-disc ml-5">
          <li>Evidence auto-population + manual upload</li>
          <li>LLM generation progress</li>
          <li>Human review checkpoint</li>
          <li>Issue to Regulator/Buyer</li>
        </ul>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 bg-slate-200 rounded" onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</button>
        <button
          className="px-3 py-2 bg-emerald-600 text-white rounded"
          onClick={() => setStatus("generated")}
        >
          Generate
        </button>
      </div>

      <p className="text-sm">Status: <span className="font-medium">{status}</span></p>
      <button className="px-3 py-2 bg-purple-600 text-white rounded">Issue to Regulator/Buyer</button>
    </div>
  );
}
