import Link from "next/link";

import { FrameworkProgressChart, DeadlinesChart } from "@/components/DashboardCharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const myWork = [
  { label: "Tasks assigned to me", value: 4 },
  { label: "Approvals waiting", value: 2 },
  { label: "Licences expiring < 30d", value: 3 },
];

const teamRates = [
  ["Clinical Team", 82],
  ["Admin", 100],
  ["IT", 54],
  ["Risk Team", 71],
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="sticky top-14 z-20 grid grid-cols-1 gap-3 bg-[#F9FAFB] pb-3 md:grid-cols-3">
        {myWork.map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center justify-between p-4">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
        <div className="md:col-span-3">
          <Link href="/my-work" className="text-sm text-primary hover:underline">
            View all my work
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Framework: All</SelectItem>
            <SelectItem value="eu">EU AI Act</SelectItem>
            <SelectItem value="dpdpa">DPDPA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Framework Progress</CardTitle>
            <CardDescription>Last 6 months, one line per active framework.</CardDescription>
          </CardHeader>
          <CardContent><FrameworkProgressChart /></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
            <CardDescription>Gantt-style deadline progress across key obligations.</CardDescription>
          </CardHeader>
          <CardContent><DeadlinesChart /></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Control Health</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Passing: <strong>42</strong> ✅</p>
            <p>Failing: <strong>8</strong> ❌</p>
            <p>Partial: <strong>12</strong> ⚠</p>
            <p>Not assessed: <strong>6</strong> ○</p>
            <Button size="sm" variant="outline">Run full scan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Agent Activity Feed</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>🤖 Agent created 3 tasks for ChestScan AI — 2h ago</p>
            <p>🤖 DPDPA consent gap found in SepsisAlert — 5h ago</p>
            <p>🤖 GPCB report generated for Rajlakshmi — yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Program task completion rate</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {teamRates.map(([team, rate]) => (
            <div key={team} className="space-y-1">
              <div className="flex items-center justify-between text-sm"><span>{team}</span><span>{rate}%</span></div>
              <div className="h-2 rounded bg-muted">
                <div className="h-2 rounded bg-primary" style={{ width: `${rate}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
