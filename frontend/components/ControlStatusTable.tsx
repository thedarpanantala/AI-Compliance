export type ControlRow = {
  code: string;
  title: string;
  framework: string;
  status: "pass" | "fail" | "partial";
};

export function ControlStatusTable({ rows }: { rows: ControlRow[] }) {
  return (
    <div className="card overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">Control Status</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Code</th>
            <th className="py-2">Title</th>
            <th className="py-2">Framework</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code} className="border-b">
              <td className="py-2">{row.code}</td>
              <td className="py-2">{row.title}</td>
              <td className="py-2">{row.framework}</td>
              <td className="py-2 capitalize">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
