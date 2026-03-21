import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RiskRegisterPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Risk Register</h1>
      <Card>
        <CardHeader><CardTitle className="text-base">Multiple registers</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">Separate registers by business unit, framework, and risk category.</CardContent>
      </Card>
    </div>
  );
}
