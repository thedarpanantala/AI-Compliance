import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">AI Systems</h1>
      <Card>
        <CardHeader><CardTitle className="text-base">System list</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><Link href="/ai-inventory/chestscan-ai-v31" className="text-primary hover:underline">ChestScan AI v3.1</Link> - High risk clinical assistant</p>
          <p><Link href="/ai-inventory/sepsis-alert" className="text-primary hover:underline">SepsisAlert</Link> - ICU risk model</p>
        </CardContent>
      </Card>
    </div>
  );
}
