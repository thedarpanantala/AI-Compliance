"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, ChevronDown, ChevronUp, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useAgentPanel } from "@/contexts/agent-panel-context";

type Message = {
  role: "user" | "assistant";
  content: string;
  actions?: { tool: string; result_summary: string }[];
  summary?: string;
  findings?: string[];
  sources?: number;
  steps?: number;
};

const DEFAULT_PROMPTS = [
  "What am I missing for EU AI Act?",
  "Which controls are currently failing?",
  "Draft my clinical risk assessment",
  "What does DPDPA require for this system?",
  "Create tasks for all failing controls",
];

const HEALTHCARE_PROMPTS = [
  "Check CDSCO registration status for all systems",
  "Draft ABDM consent notice for ChestScan AI",
  "Find validation study gaps across all clinical AI",
  "What am I missing for EU AI Act?",
];

const MANUFACTURING_PROMPTS = [
  "Check overdue evidence for this month",
  "Summarise GPCB compliance status for all sites",
  "What CBAM data does Rajlakshmi Textiles need to collect?",
  "Which controls are currently failing?",
];

const INCIDENTS_PROMPTS = [
  "Draft DPDP Board notification letter for this breach",
  "What is the reporting deadline for this incident?",
  "Which controls are currently failing?",
];

function promptsForPath(pathname: string | null): string[] {
  if (!pathname) return DEFAULT_PROMPTS;
  if (pathname.startsWith("/healthcare")) return HEALTHCARE_PROMPTS;
  if (pathname.startsWith("/manufacturing")) return MANUFACTURING_PROMPTS;
  if (pathname.startsWith("/incidents")) return INCIDENTS_PROMPTS;
  return DEFAULT_PROMPTS;
}

interface ComplianceAgentProps {
  systemId?: string;
  orgId: string;
  userId?: string;
  standalone?: boolean;
}

type ChatSession = { id: string; title: string; messages: Message[]; at: number };

export function ComplianceAgent({ systemId, orgId, userId, standalone = false }: ComplianceAgentProps) {
  const pathname = usePathname();
  const suggested = useMemo(() => promptsForPath(pathname), [pathname]);
  const { open, setOpen, pendingUserMessage, clearPendingMessage, setAgentActiveDot } = useAgentPanel();

  const [tab, setTab] = useState<"chat" | "history">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: systemId
        ? "I can see the AI system you're viewing. Ask me about compliance gaps, missing evidence, or applicable regulations."
        : "Hi, I'm your AI Agent. Tell me about your AI system and I'll map next steps.",
      summary: "Ready to help",
      findings: ["Ask a question or pick a suggested prompt below."],
      sources: 0,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open && pendingUserMessage) {
      setTab("chat");
      setInput(pendingUserMessage);
      clearPendingMessage();
    }
  }, [open, pendingUserMessage, clearPendingMessage]);

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000", []);

  const send = useCallback(
    async (text?: string) => {
      const messageText = (text || input).trim();
      if (!messageText || loading) return;

      setInput("");
      setTab("chat");
      setMessages((prev) => [...prev, { role: "user", content: messageText }]);
      setLoading(true);
      setThinkingOpen(true);

      try {
        const endpoint = standalone ? `${apiBase}/api/agent/standalone` : `${apiBase}/api/agent/chat`;
        const body = standalone
          ? { message: messageText, history }
          : { message: messageText, org_id: orgId, system_id: systemId, user_id: userId, history };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        const content = data.response ?? "No response from agent.";
        const steps = Array.isArray(data.actions_taken) ? data.actions_taken.length : 0;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content,
            actions: data.actions_taken,
            summary: content.slice(0, 120) + (content.length > 120 ? "…" : ""),
            findings: content.split(/\n/).filter(Boolean).slice(0, 5).length
              ? content.split(/\n/).filter(Boolean).slice(0, 5)
              : [content],
            sources: Math.min(12, Math.max(1, Math.floor(content.length / 80))),
            steps,
          },
        ]);
        setHistory(data.updated_history || []);
        setAgentActiveDot(steps > 0);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong. Please try again.",
            summary: "Error",
            findings: ["Request failed. Check API connectivity."],
            sources: 0,
            steps: 0,
          },
        ]);
      } finally {
        setLoading(false);
        setThinkingOpen(false);
      }
    },
    [input, loading, standalone, apiBase, orgId, systemId, userId, history, setAgentActiveDot]
  );

  const newChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content: systemId
          ? "New conversation. I still have context for the AI system you're viewing."
          : "New conversation started.",
        summary: "New chat",
        findings: ["How can I help?"],
        sources: 0,
      },
    ]);
    setHistory([]);
    setTab("chat");
  }, [systemId]);

  const saveSessionToHistory = useCallback(() => {
    const title =
      messages.find((m) => m.role === "user")?.content?.slice(0, 48) || "Conversation";
    setChatHistory((h) => [{ id: crypto.randomUUID(), title, messages: [...messages], at: Date.now() }, ...h]);
  }, [messages]);

  const pathSystemId = useMemo(() => {
    const m = pathname?.match(/^\/ai-inventory\/([^/]+)$/);
    return m?.[1];
  }, [pathname]);
  const effectiveSystemId = systemId ?? pathSystemId;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-[400px] max-w-[400vw] flex-col border-l p-0 sm:max-w-[400px] [&>button.absolute]:hidden"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <p className="text-sm font-semibold">AI Agent</p>
              <p className="text-xs opacity-80">EU AI Act · DPDPA · ABDM · CPCB · CDSCO</p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-8 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
                onClick={() => {
                  saveSessionToHistory();
                  newChat();
                }}
              >
                + New chat
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/15"
                aria-label="Close AI Agent"
                onClick={() => setOpen(false)}
              >
                ✕
              </Button>
            </div>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "chat" | "history")} className="flex flex-1 flex-col overflow-hidden">
            <TabsList className="mx-4 mt-3 grid w-auto grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-0 flex flex-1 flex-col overflow-hidden px-0">
              {effectiveSystemId && (
                <p className="mx-4 mt-2 rounded-md border border-dashed border-border bg-muted/40 px-2 py-1 text-xs text-muted-foreground">
                  Context: system <span className="font-mono">{effectiveSystemId}</span>
                </p>
              )}

              <ScrollArea className="flex-1 px-4 py-3">
                <div className="space-y-4 pr-2">
                  {messages.map((msg, idx) => (
                    <div key={idx} className="space-y-2">
                      {msg.role === "assistant" && (msg.summary || msg.findings?.length) && (
                        <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                          {msg.steps != null && msg.steps > 0 && idx === messages.length - 1 && loading === false && (
                            <Collapsible open={thinkingOpen} onOpenChange={setThinkingOpen}>
                              <CollapsibleTrigger className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground">
                                Thinking involved {msg.steps} steps
                                {thinkingOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-1 text-xs text-muted-foreground">
                                Tool calls and retrieval steps were used to produce this answer.
                              </CollapsibleContent>
                            </Collapsible>
                          )}
                          <p className="mt-1 font-medium text-foreground">Summary</p>
                          <p className="text-muted-foreground">{msg.summary}</p>
                          <p className="mt-2 font-medium text-foreground">Findings and remediation instructions</p>
                          <ol className="list-decimal space-y-1 pl-4 text-muted-foreground">
                            {(msg.findings ?? []).map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ol>
                          {msg.sources != null && msg.sources > 0 && (
                            <p className="mt-2 text-xs text-muted-foreground">[{msg.sources} sources]</p>
                          )}
                          <div className="mt-2 flex gap-2">
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label="Thumbs up">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label="Thumbs down">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {msg.role === "user" ? (
                        <div className="flex justify-end">
                          <div className="max-w-[90%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground whitespace-pre-wrap">
                            {msg.content}
                          </div>
                        </div>
                      ) : !msg.summary && !msg.findings?.length ? (
                        <div className="flex justify-start">
                          <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm whitespace-pre-wrap text-foreground">
                            {msg.content}
                          </div>
                        </div>
                      ) : null}
                      {msg.actions?.map((action, j) => (
                        <div
                          key={j}
                          className="text-xs text-green-700 border border-green-100 bg-green-50 rounded px-2 py-1"
                        >
                          ✅ {action.result_summary}
                        </div>
                      ))}
                    </div>
                  ))}
                  {loading && <div className="text-xs text-muted-foreground">Thinking…</div>}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {messages.filter((m) => m.role === "user").length === 0 && (
                <div className="border-t border-border px-3 py-2">
                  <p className="mb-1 text-xs text-muted-foreground">Suggested</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggested.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => send(prompt)}
                        className="rounded-full border border-border bg-background px-2.5 py-1 text-left text-xs hover:bg-muted"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto border-t border-border p-3">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="Ask about compliance, regulations…"
                    className="text-sm"
                    disabled={loading}
                    aria-label="Message to AI Agent"
                  />
                  <Button type="button" onClick={() => send()} disabled={loading || !input.trim()}>
                    Send
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mx-4 mt-3 flex-1 overflow-hidden">
              {chatHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground">No saved conversations yet. Use &quot;+ New chat&quot; to save the current thread first.</p>
              ) : (
                <ScrollArea className="h-[420px]">
                  <ul className="space-y-2 pr-3">
                    {chatHistory.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          className="w-full rounded-md border border-border p-2 text-left text-sm hover:bg-muted"
                          onClick={() => {
                            setMessages(s.messages);
                            setTab("chat");
                          }}
                        >
                          {s.title}
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {new Date(s.at).toLocaleString()}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-auto rounded-full px-4 py-3 shadow-lg"
        aria-label="Open Compliance Assistant"
      >
        <Bot className="mr-2 h-4 w-4" />
        Compliance Assistant
      </Button>
    </>
  );
}
