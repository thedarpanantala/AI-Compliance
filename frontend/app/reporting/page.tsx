import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReportingPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Reporting & Artifacts</h1>
      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="templates"><Card><CardHeader><CardTitle className="text-base">Templates</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Clinical risk assessment, DPDPA impact assessment, GPCB monthly report, and auditor bundle templates.</CardContent></Card></TabsContent>
        <TabsContent value="generate"><Card><CardContent className="p-4 text-sm">Generate reports from selected system or site and period.</CardContent></Card></TabsContent>
        <TabsContent value="scheduled"><Card><CardContent className="p-4 text-sm">Scheduled report runs with recipients and next run times.</CardContent></Card></TabsContent>
        <TabsContent value="archive"><Card><CardContent className="p-4 text-sm">Report archive with download and hash verification.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
