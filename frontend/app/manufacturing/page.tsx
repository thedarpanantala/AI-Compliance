import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SearchParams = { tab?: string };

export default function ManufacturingPage({ searchParams }: { searchParams: SearchParams }) {
  const initial = searchParams.tab ?? "sites";
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Manufacturing Suite</h1>
      <Tabs defaultValue={initial}>
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="sites">Factory Sites</TabsTrigger>
          <TabsTrigger value="emissions">Emission Sources</TabsTrigger>
          <TabsTrigger value="clearances">Site Clearances</TabsTrigger>
          <TabsTrigger value="evidence">Evidence Inbox</TabsTrigger>
          <TabsTrigger value="esg">ESG Disclosures</TabsTrigger>
          <TabsTrigger value="buyers">Buyer Profiles</TabsTrigger>
          <TabsTrigger value="gpcb">GPCB Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="sites"><Card><CardContent className="p-4 text-sm">Factory card view with compliance score and risk badges.</CardContent></Card></TabsContent>
        <TabsContent value="emissions"><Card><CardContent className="p-4 text-sm">Emission source mapping and threshold tracking.</CardContent></Card></TabsContent>
        <TabsContent value="clearances"><Card><CardContent className="p-4 text-sm">Site clearances, validity windows, and reminders.</CardContent></Card></TabsContent>
        <TabsContent value="evidence"><Card><CardContent className="p-4 text-sm">Evidence inbox by month and category.</CardContent></Card></TabsContent>
        <TabsContent value="esg"><Card><CardContent className="p-4 text-sm">ESG disclosure status for CBAM and buyer questionnaires.</CardContent></Card></TabsContent>
        <TabsContent value="buyers">
          <Card>
            <CardHeader><CardTitle className="text-base">Buyer Profiles</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table><TableHeader><TableRow><TableHead>BUYER</TableHead><TableHead>REQUIRED FRAMEWORK</TableHead><TableHead>COMPLETION</TableHead><TableHead>NEXT ACTION</TableHead></TableRow></TableHeader><TableBody>
                <TableRow><TableCell>H&M</TableCell><TableCell>CS3D</TableCell><TableCell>82%</TableCell><TableCell>Upload supplier attestation</TableCell></TableRow>
                <TableRow><TableCell>Zara</TableCell><TableCell>CBAM</TableCell><TableCell>60%</TableCell><TableCell>Provide emission intensity data</TableCell></TableRow>
              </TableBody></Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gpcb">
          <Card>
            <CardHeader><CardTitle className="text-base">GPCB Reports</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table><TableHeader><TableRow><TableHead>REPORT</TableHead><TableHead>SITE</TableHead><TableHead>PERIOD</TableHead><TableHead>STATUS</TableHead></TableRow></TableHeader><TableBody>
                <TableRow><TableCell>Monthly Effluent Summary</TableCell><TableCell>Rajlakshmi Unit 1</TableCell><TableCell>Mar 2026</TableCell><TableCell>Draft</TableCell></TableRow>
                <TableRow><TableCell>Air Emission Compliance</TableCell><TableCell>Rajlakshmi Unit 2</TableCell><TableCell>Mar 2026</TableCell><TableCell>Ready</TableCell></TableRow>
              </TableBody></Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
