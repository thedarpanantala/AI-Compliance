import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MonitoringPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Continuous Monitoring</h1>
      <Tabs defaultValue="health">
        <TabsList>
          <TabsTrigger value="health">Control Health</TabsTrigger>
          <TabsTrigger value="checks">Checks</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="configure">Configure</TabsTrigger>
        </TabsList>
        <TabsContent value="health">
          <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>CHECK NAME</TableHead><TableHead>SYSTEM</TableHead><TableHead>FRAMEWORK</TableHead><TableHead>LAST RUN</TableHead><TableHead>STATUS</TableHead><TableHead>FREQUENCY</TableHead><TableHead>TREND</TableHead></TableRow></TableHeader><TableBody>
            <TableRow><TableCell>Consent validity</TableCell><TableCell>ChestScan AI</TableCell><TableCell>DPDPA</TableCell><TableCell>2h ago</TableCell><TableCell>Passing</TableCell><TableCell>Daily</TableCell><TableCell>Stable</TableCell></TableRow>
          </TableBody></Table></CardContent></Card>
        </TabsContent>
        <TabsContent value="checks"><Card><CardContent className="p-4 text-sm">Scheduled and on-demand checks with execution logs.</CardContent></Card></TabsContent>
        <TabsContent value="alerts"><Card><CardContent className="p-4 text-sm">Triggered alerts with actions: acknowledge, create task, dismiss.</CardContent></Card></TabsContent>
        <TabsContent value="configure"><Card><CardContent className="p-4 text-sm">Automation rules: evidence reminders, licence expiry warnings, score drop alerts.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
