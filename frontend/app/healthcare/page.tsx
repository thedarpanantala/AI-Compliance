import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SearchParams = { tab?: string };

const rows = [
  ["ChestScan AI v3.1", "Class II", "-", "Pending Registration", "-", "-", "Begin"],
  ["SepsisAlert", "Class III", "-", "Not Started", "-", "-", "Begin"],
  ["TeleHealth Bot", "Class I", "CDSCO/AI/....", "Registered", "12/03/25", "2027", "View"],
] as const;

export default function HealthcarePage({ searchParams }: { searchParams: SearchParams }) {
  const initial = searchParams.tab ?? "systems";
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Healthcare Suite</h1>
      <Tabs defaultValue={initial}>
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="systems">Clinical AI Systems</TabsTrigger>
          <TabsTrigger value="validation">Validation Studies</TabsTrigger>
          <TabsTrigger value="consent">Consent Records</TabsTrigger>
          <TabsTrigger value="abdm">ABDM Integration</TabsTrigger>
          <TabsTrigger value="cdsco">CDSCO Registry</TabsTrigger>
          <TabsTrigger value="nabh">NABH Checklist</TabsTrigger>
        </TabsList>
        <TabsContent value="systems"><Card><CardContent className="p-4 text-sm">Clinical AI system inventory, risk classes, and owner assignments.</CardContent></Card></TabsContent>
        <TabsContent value="validation"><Card><CardContent className="p-4 text-sm">Validation study tracker and quality flags.</CardContent></Card></TabsContent>
        <TabsContent value="consent"><Card><CardContent className="p-4 text-sm">Consent records and retention status across systems.</CardContent></Card></TabsContent>
        <TabsContent value="abdm"><Card><CardContent className="p-4 text-sm">ABDM integration status and consent manager mappings.</CardContent></Card></TabsContent>
        <TabsContent value="nabh"><Card><CardContent className="p-4 text-sm">NABH checklist with evidence linking and monthly checks.</CardContent></Card></TabsContent>
        <TabsContent value="cdsco" className="space-y-4">
          <div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold">CDSCO SaMD Registry</h2><p className="text-sm text-muted-foreground">Track registration status of all AI systems classified as Software as a Medical Device under CDSCO guidance.</p></div></div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Registered</p><p className="text-2xl font-semibold">1</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Pending Registration</p><p className="text-2xl font-semibold">1</p></CardContent></Card>
            <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Not Started</p><p className="text-2xl font-semibold">1</p></CardContent></Card>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>SYSTEM NAME</TableHead><TableHead>RISK CLASS</TableHead><TableHead>REGISTRATION NO.</TableHead><TableHead>STATUS</TableHead><TableHead>SUBMITTED</TableHead><TableHead>VALIDITY</TableHead><TableHead>ACTIONS</TableHead></TableRow></TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r[0]}>
                      <TableCell>{r[0]}</TableCell><TableCell>{r[1]}</TableCell><TableCell>{r[2]}</TableCell><TableCell><Badge variant="outline">{r[3]}</Badge></TableCell><TableCell>{r[4]}</TableCell><TableCell>{r[5]}</TableCell><TableCell>{r[6]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle className="text-base">Guidance</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">AI systems used for diagnosis, prognosis, or treatment decisions in India may qualify as SaMD under CDSCO guidance. Class II and III systems require pre-market submission.</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
