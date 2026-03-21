import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PrivacyByDesignPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Privacy by Design</h1>
      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="assessments">
          <Card><CardContent className="p-4 text-sm">Current privacy-by-design assessments across teams.</CardContent></Card>
        </TabsContent>
        <TabsContent value="templates">
          <Card><CardContent className="p-4 text-sm">Template library with DPDPA and GDPR article mappings.</CardContent></Card>
        </TabsContent>
        <TabsContent value="translations">
          <Card><CardContent className="p-4 text-sm">Multilingual labels for assessment forms.</CardContent></Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Default Assessment Template</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Which template to use when creating a new assessment.</p>
              <Select defaultValue="dpdpa"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                <SelectItem value="dpdpa">DPDPA Privacy by Design</SelectItem>
                <SelectItem value="gdpr">GDPR Art. 25</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent></Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Approval Workflow</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span>Require sign-off before complete</span><Switch defaultChecked /></div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <Select defaultValue="risk"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="risk">Risk Manager</SelectItem></SelectContent></Select>
                <Select defaultValue="30"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="30">30 days after creation</SelectItem></SelectContent></Select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between"><span>Notify me when assigned</span><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><span>Notify me when overdue</span><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><span>Notify assessor near deadline (7 days)</span><Switch /></div>
              <div className="flex items-center justify-between"><span>Send monthly summary of open assessments</span><Switch defaultChecked /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
