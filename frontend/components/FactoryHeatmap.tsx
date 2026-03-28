const matrix = [
  ["Site A", "green"],
  ["Site B", "amber"],
  ["Site C", "red"],
] as const;

const classes: Record<string, string> = {
  green: "bg-green-100",
  amber: "bg-amber-100",
  red: "bg-red-100",
};

export function FactoryHeatmap() {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Factory Compliance Heatmap</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {matrix.map(([site, status]) => (
          <div key={site} className={`p-3 rounded ${classes[status]}`}>
            <p className="font-medium">{site}</p>
            <p className="text-sm uppercase">{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
