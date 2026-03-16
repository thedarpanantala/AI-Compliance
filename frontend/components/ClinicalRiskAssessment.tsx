const steps = [
  "System intent and patient population",
  "Clinical failure mode analysis",
  "Validation and study quality",
  "Fallback procedures",
  "Approval and sign-off"
];

export function ClinicalRiskAssessment() {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-2">Clinical Risk Assessment (5-step)</h2>
      <ol className="list-decimal ml-5 space-y-1 text-sm">
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </div>
  );
}
