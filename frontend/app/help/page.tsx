import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Help & Support</h1>
      <Card><CardHeader><CardTitle className="text-base">Support Channels</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Contact compliance support, product support, and incident response.</CardContent></Card>
    </div>
  );
}
