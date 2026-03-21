import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SecurityPosturePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Security Posture</h1>
      <Card><CardHeader><CardTitle className="text-base">Overview</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Connected systems, alerting status, and policy enforcement posture.</CardContent></Card>
    </div>
  );
}
