"use client";

import { Bot, ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAgentPanel } from "@/contexts/agent-panel-context";
import { cn } from "@/lib/utils";

export function TopNav() {
  const { setOpen, open, agentActiveDot } = useAgentPanel();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-white px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1 font-normal" aria-label="Select module">
            Compliance Cockpit
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Compliance Cockpit</DropdownMenuItem>
          <DropdownMenuItem>AI Systems</DropdownMenuItem>
          <DropdownMenuItem>Reporting</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1 font-normal text-muted-foreground" aria-label="Select organisation">
            Demo Organisation
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Demo Organisation</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative mx-4 max-w-xl flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search frameworks, systems, controls…"
          className="h-9 pl-9"
          aria-label="Global search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative shrink-0"
          aria-label="Open AI Agent"
          aria-pressed={open}
          onClick={() => setOpen(true)}
        >
          <Bot className="h-5 w-5" />
          {agentActiveDot ? (
            <span
              className={cn(
                "absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white",
                "motion-safe:animate-pulse"
              )}
              aria-hidden
            />
          ) : null}
        </Button>

        <Button type="button" variant="ghost" size="icon" className="relative shrink-0" aria-label="Notifications, 4 unread">
          <span className="text-lg" aria-hidden>
            🔔
          </span>
          <Badge className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-[10px]" variant="destructive">
            4
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 font-normal" aria-label="User menu">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">DA</span>
              <span className="hidden sm:inline">Darpan</span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
