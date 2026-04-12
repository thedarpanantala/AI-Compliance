"use client";

const indian = [
  { control: "DPDPA-Consent-Record-30days", status: "green" },
  { control: "ABDM-Consent-Token-Validation", status: "amber" },
  { control: "ICMR-HITL-Review-Log", status: "red" },
] as const;

const mapped = [
  { indian: "DPDPA-Consent-Record-30days", eu: "EUAI-Art10-Transparency", gap: "None" },
  { indian: "ABDM-Consent-Token-Validation", eu: "GDPR-Art7-Consent", gap: "Needs consent revocation trace" },
  { indian: "ICMR-HITL-Review-Log", eu: "EUAI-Art15-HITL", gap: "Missing escalation policy" },
];

export function JurisdictionBridge() {
  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Jurisdiction Bridge Dashboard</h2>

      <div>
        <h3 className="font-medium">Indian Controls</h3>
        <ul className="text-sm list-disc ml-5">
          {indian.map((row) => <li key={row.control}>{row.control} — {row.status}</li>)}
        </ul>
      </div>

      <div>
        <h3 className="font-medium">Mapped EU/US Equivalents + Gaps</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th className="text-left p-2 border">Indian</th>
              <th className="text-left p-2 border">Equivalent</th>
              <th className="text-left p-2 border">Gap</th>
            </tr>
          </thead>
          <tbody>
            {mapped.map((row) => (
              <tr key={row.indian}>
                <td className="p-2 border">{row.indian}</td>
                <td className="p-2 border">{row.eu}</td>
                <td className="p-2 border">{row.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="px-3 py-2 rounded bg-indigo-600 text-white">Generate Cross-Border Report</button>
    </div>
  );
}
