import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  "Tasks assigned to me",
  "Approvals I need to give",
  "Documents I need to review",
  "Licences I own that are expiring",
  "Impact assessment items waiting on me",
];

export default function MyWorkPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My Work</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sections.map((s) => (
          <Card key={s}><CardHeader><CardTitle className="text-base">{s}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Prioritized items for this week are listed here.</CardContent></Card>
        ))}
      </div>
    </div>
  );
}
