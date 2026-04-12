"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  actions?: { tool: string; result_summary: string }[];
};

const SUGGESTED_PROMPTS = [
  "What mandatory licenses do I need for Textile in India?",
  "Draft a task for my FSSAI renewal",
  "What am I missing for EU AI Act compliance?",
  "Which controls are currently failing?",
  "Draft my clinical risk assessment",
];

interface ComplianceAgentProps {
  systemId?: string;
  orgId: string;
  userId?: string;
  standalone?: boolean;
}

export function ComplianceAgent({ systemId, orgId, userId, standalone = false }: ComplianceAgentProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: systemId
        ? "I can see the AI system you're viewing. Ask me about compliance gaps, missing evidence, or applicable regulations."
        : "Hi, I'm your compliance assistant. Tell me about your AI system and I’ll map next steps.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000", []);

  const send = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    setLoading(true);

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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response ?? "No response from agent.",
          actions: data.actions_taken,
        },
      ]);
      setHistory(data.updated_history || []);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 text-white px-4 py-3 shadow-lg hover:bg-blue-700"
      >
        🤖 Compliance Assistant
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 h-[560px] w-96 overflow-hidden rounded-2xl border bg-white shadow-2xl flex flex-col">
      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold">Compliance Assistant</p>
          <p className="text-xs opacity-80">EU AI Act · DPDPA · ABDM · CPCB</p>
        </div>
        <button onClick={() => setOpen(false)} className="rounded px-2 py-1 hover:bg-blue-700">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%] space-y-1.5">
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                  msg.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.content}
                {msg.actions?.some(a => a.tool === 'generate_document') && (
                  <div className="mt-3 pt-3 border-t border-indigo-100 flex flex-col gap-2">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Action Available</p>
                    <a 
                      href="/vault" 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all group"
                    >
                      <span className="font-bold text-xs">View Generated Artifact</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
              {msg.actions?.map((action, j) => (
                <div key={j} className="text-xs text-green-700 border border-green-100 bg-green-50 rounded px-2 py-1">
                  ✅ {action.result_summary}
                </div>
              ))}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-gray-500">Thinking…</div>}
        <div ref={bottomRef} />
      </div>

      {messages.filter((m) => m.role === "user").length === 0 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt)}
              className="text-xs px-2.5 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="border-t p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask about compliance, regulations…"
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
          disabled={loading}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="rounded-xl bg-blue-600 text-white px-3 py-2 disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
