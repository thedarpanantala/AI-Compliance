"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  Factory,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  ListChecks,
  Lock,
  Radar,
  Shield,
  ShieldAlert,
  UserCircle,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useOrgType, type OrgType } from "@/contexts/org-type-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type NavLeaf = { href: string; label: string; icon?: ReactNode };

function NavGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <p
        className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9CA3AF]"
        style={{ letterSpacing: "0.08em" }}
      >
        {label}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function NavItem({ href, label, icon, sub }: NavLeaf & { sub?: boolean }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md py-2 text-sm transition-colors",
        sub ? "pl-[28px] text-[13px]" : "pl-3 pr-2",
        active
          ? "border-l-[3px] border-brand-purple bg-[#F5F3FF] font-medium text-brand-purple"
          : "border-l-[3px] border-transparent text-foreground hover:bg-muted/80"
      )}
    >
      {icon && !sub ? <span className="h-[18px] w-[18px] shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]">{icon}</span> : null}
      <span className="truncate">{label}</span>
    </Link>
  );
}

function verticalsForOrg(
  orgType: OrgType,
  verticalFocus: "healthcare" | "manufacturing"
): { key: string; label: string; icon: ReactNode; items: NavLeaf[] }[] {
  const healthcare = {
    key: "healthcare",
    label: "Healthcare Suite",
    icon: <Heart className="text-rose-600" />,
    items: [
      { href: "/healthcare", label: "Clinical AI Systems" },
      { href: "/healthcare?tab=validation", label: "Validation Studies" },
      { href: "/healthcare?tab=consent", label: "Consent Records" },
      { href: "/healthcare?tab=abdm", label: "ABDM Integration" },
      { href: "/healthcare?tab=cdsco", label: "CDSCO Registry" },
      { href: "/healthcare?tab=nabh", label: "NABH Checklist" },
    ],
  };
  const manufacturing = {
    key: "manufacturing",
    label: "Manufacturing Suite",
    icon: <Factory className="text-amber-700" />,
    items: [
      { href: "/manufacturing", label: "Factory Sites" },
      { href: "/manufacturing?tab=emissions", label: "Emission Sources" },
      { href: "/manufacturing?tab=clearances", label: "Site Clearances" },
      { href: "/manufacturing?tab=evidence", label: "Evidence Inbox" },
      { href: "/manufacturing?tab=esg", label: "ESG Disclosures" },
      { href: "/manufacturing?tab=buyers", label: "Buyer Profiles" },
      { href: "/manufacturing?tab=gpcb", label: "GPCB Reports" },
    ],
  };

  if (orgType === "hospital" || orgType === "lab" || orgType === "pharma") return [healthcare];
  if (orgType === "factory") return [manufacturing];
  if (orgType === "multi") {
    const first = verticalFocus === "healthcare" ? healthcare : manufacturing;
    const second = verticalFocus === "healthcare" ? manufacturing : healthcare;
    return [first, second];
  }
  if (orgType === "tech") {
    return [
      {
        key: "tech",
        label: "Tech Suite",
        icon: <LayoutDashboard className="text-blue-600" />,
        items: [
          { href: "/ai-inventory", label: "Software AI Systems" },
          { href: "/processings", label: "Data Processing Records" },
          { href: "/controls", label: "Vendor Risk" },
          { href: "/jurisdiction-bridge", label: "Trust Center" },
        ],
      },
    ];
  }
  if (orgType === "government") {
    return [healthcare, manufacturing];
  }
  return [healthcare];
}

export function OrgAwareSidebar() {
  const { orgType, setOrgType, verticalFocus, setVerticalFocus } = useOrgType();
  const blocks = verticalsForOrg(orgType, verticalFocus);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col border-r border-border bg-white">
      <div className="flex h-14 items-center border-b border-border px-3">
        <span className="text-lg font-semibold tracking-tight text-foreground">aiC</span>
        <span className="ml-1 text-xs text-muted-foreground">Compliance</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Main">
        <NavGroup label="Core">
          <NavItem href="/" label="Dashboard" icon={<Home className="h-[18px] w-[18px]" />} />
          <NavItem href="/ai-inventory" label="AI Systems" icon={<Bot className="h-[18px] w-[18px]" />} />
          <NavItem
            href="/ai-assessment"
            label="AI Assessment"
            icon={<ClipboardList className="h-[18px] w-[18px]" />}
          />
        </NavGroup>

        <NavGroup label="Privacy & risk">
          <NavItem href="/processings" label="Processings (ROPA)" icon={<FileText className="h-[18px] w-[18px]" />} />
          <NavItem href="/privacy-by-design" label="Privacy by Design" icon={<Shield className="h-[18px] w-[18px]" />} />
          <NavItem
            href="/impact-assessments"
            label="Impact Assessments"
            icon={<BarChart3 className="h-[18px] w-[18px]" />}
          />
          <NavItem href="/incidents" label="Incidents & Breaches" icon={<ShieldAlert className="h-[18px] w-[18px]" />} />
          <NavItem
            href="/data-subject-requests"
            label="Data Subject Requests"
            icon={<UserCircle className="h-[18px] w-[18px]" />}
          />
        </NavGroup>

        <NavGroup label="Governance">
          <NavItem href="/frameworks" label="Frameworks & Controls" icon={<ListChecks className="h-[18px] w-[18px]" />} />
          <NavItem href="/risk-register" label="Risk Register" icon={<Activity className="h-[18px] w-[18px]" />} />
          <NavItem href="/reporting" label="Reporting & Artifacts" icon={<FileText className="h-[18px] w-[18px]" />} />
        </NavGroup>

        <NavGroup label="Verticals">
          {orgType === "multi" && (
            <div className="mb-2 px-3">
              <Select
                value={verticalFocus}
                onValueChange={(v) => setVerticalFocus(v as "healthcare" | "manufacturing")}
              >
                <SelectTrigger className="h-8 text-xs" aria-label="Active vertical">
                  <SelectValue placeholder="Vertical" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare first</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing first</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {blocks.map((block) => (
            <div key={block.key} className="mb-3">
              <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-foreground">
                {block.icon}
                <span className="truncate">{block.label}</span>
              </div>
              {block.items.map((item) => (
                <NavItem key={item.href + item.label} {...item} sub />
              ))}
            </div>
          ))}
        </NavGroup>

        <NavGroup label="Operations">
          <NavItem href="/my-work" label="My Work" icon={<ClipboardList className="h-[18px] w-[18px]" />} />
          <NavItem href="/workflows" label="Actions & Workflows" icon={<Workflow className="h-[18px] w-[18px]" />} />
          <NavItem href="/monitoring" label="Continuous Monitoring" icon={<Radar className="h-[18px] w-[18px]" />} />
          <NavItem href="/analytics" label="Analytics & Telemetry" icon={<BarChart3 className="h-[18px] w-[18px]" />} />
        </NavGroup>

        <div className="px-3 pb-2">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9CA3AF]">Org type</p>
          <Select value={orgType} onValueChange={(v) => setOrgType(v as OrgType)}>
            <SelectTrigger className="h-8 text-xs" aria-label="Organisation type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hospital">Hospital / Clinic</SelectItem>
              <SelectItem value="factory">MSME Factory</SelectItem>
              <SelectItem value="lab">Diagnostic Lab</SelectItem>
              <SelectItem value="pharma">Pharma</SelectItem>
              <SelectItem value="tech">Tech / SaaS</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="multi">Multi-site</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </nav>

      <Separator />
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2 rounded-md border border-border p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">DA</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Darpan Antala</p>
            <p className="truncate text-xs text-muted-foreground">Compliance Officer</p>
          </div>
          <button type="button" className="text-muted-foreground hover:text-foreground" aria-label="Log out">
            →
          </button>
        </div>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <Link href="/security/posture" className="flex items-center gap-1.5 hover:text-foreground">
            <Lock className="h-3.5 w-3.5" />
            Security posture
          </Link>
          <Link href="/help" className="flex items-center gap-1.5 hover:text-foreground">
            <Building2 className="h-3.5 w-3.5" />
            Help &amp; support
          </Link>
        </div>
      </div>
    </aside>
  );
}
