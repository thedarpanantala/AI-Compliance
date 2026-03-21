import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const breaches: Array<{id:string;date:string;type:string;data:string;individuals:string;status:string;deadline:string;assigned:string}> = [];

export default function IncidentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Incidents & Breaches</h1>
      <Tabs defaultValue="breaches">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="breaches">Breaches</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><Card><CardContent className="p-4 text-sm">Incident trend and severity overview.</CardContent></Card></TabsContent>
        <TabsContent value="incidents"><Card><CardContent className="p-4 text-sm">Operational incident queue and assignment board.</CardContent></Card></TabsContent>
        <TabsContent value="breaches" className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Open</p><p className="text-2xl font-semibold">0</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Notified to regulator</p><p className="text-2xl font-semibold">0</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Resolved</p><p className="text-2xl font-semibold">0</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total</p><p className="text-2xl font-semibold">0</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Data Breaches</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Table>
                <TableHeader><TableRow><TableHead>BREACH ID</TableHead><TableHead>DATE DISCOVERED</TableHead><TableHead>TYPE</TableHead><TableHead>DATA AFFECTED</TableHead><TableHead>INDIVIDUALS</TableHead><TableHead>STATUS</TableHead><TableHead>NOTIFICATION DEADLINE</TableHead><TableHead>ASSIGNED</TableHead></TableRow></TableHeader>
                <TableBody>
                  {breaches.length === 0 ? <TableRow><TableCell colSpan={8} className="text-center text-sm text-muted-foreground">No data breaches recorded. Report immediately if one occurs.</TableCell></TableRow> : null}
                </TableBody>
              </Table>
              <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">Under DPDPA Section 8(6), breaches must be reported to the Data Protection Board of India without undue delay.</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Regulatory Notification Tracker</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded border p-2"><span>DPDP Board (India)</span><Badge variant="outline">72 hours - Pending</Badge></div>
              <div className="flex items-center justify-between rounded border p-2"><span>CERT-In (if applicable)</span><Badge variant="outline">6 hours - Pending</Badge></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reporting"><Card><CardContent className="p-4 text-sm">Regulatory letters and export logs.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
