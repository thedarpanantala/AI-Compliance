import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FrameworksPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Frameworks & Controls</h1>
      <Tabs defaultValue="policy-packs">
        <TabsList>
          <TabsTrigger value="active">Active Frameworks</TabsTrigger>
          <TabsTrigger value="library">Control Library</TabsTrigger>
          <TabsTrigger value="mappings">Mappings</TabsTrigger>
          <TabsTrigger value="policy-packs">Policy Packs</TabsTrigger>
        </TabsList>
        <TabsContent value="policy-packs"><Card><CardHeader><CardTitle className="text-base">Policy Packs</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Prebuilt policy packs aligned to DPDPA, ISO 42001, and sector obligations.</CardContent></Card></TabsContent>
        <TabsContent value="active"><Card><CardContent className="p-4 text-sm">Framework activation and coverage cards.</CardContent></Card></TabsContent>
        <TabsContent value="library"><Card><CardContent className="p-4 text-sm">Control library with framework filters.</CardContent></Card></TabsContent>
        <TabsContent value="mappings"><Card><CardContent className="p-4 text-sm">Cross-framework mapping matrix.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
