import { EvidenceGapBanner } from "@/components/EvidenceGapBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AISystemDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">AI System Detail</h1>
      <p className="text-sm text-muted-foreground">System ID: {params.id}</p>
      <EvidenceGapBanner systemName={params.id} />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><Card><CardContent className="p-4 text-sm">System metadata and risk context for compliance checks.</CardContent></Card></TabsContent>
        <TabsContent value="controls"><Card><CardHeader><CardTitle className="text-base">Controls</CardTitle></CardHeader><CardContent className="text-sm">Control evaluation and remediation tasks are shown here.</CardContent></Card></TabsContent>
        <TabsContent value="evidence"><Card><CardHeader><CardTitle className="text-base">Evidence</CardTitle></CardHeader><CardContent className="text-sm">Evidence timeline and uploaded artifacts for this system.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
