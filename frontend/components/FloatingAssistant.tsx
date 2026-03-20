'use client';
import { useState, useRef, useEffect } from 'react';

interface Message { role: 'user' | 'assistant'; content: string; actions?: string[]; }

const SUGGESTED = [
  "What am I missing for EU AI Act?",
  "Draft my clinical risk assessment",
  "Which controls are failing?",
  "What does DPDPA require for this system?",
  "When does our NABH accreditation expire?",
  "Help me respond to the H&M ESG questionnaire",
];

const BOT_RESPONSES: Record<string, { content: string; actions?: string[] }> = {
  default: { content: "I've analysed your compliance data. Based on the current state of your systems, here's what I recommend:" },
  "what am i missing for eu ai act": {
    content: "For EU AI Act compliance, ChestScan AI v3.1 (High Risk — Annex III) is missing:\n\n1. **Technical documentation** (Annex IV) — not uploaded\n2. **Post-market monitoring plan** (Art. 72) — not started\n3. **Human oversight documentation** (Art. 14) — partial\n4. **Conformity assessment** — pending\n\nWould you like me to draft the Annex IV technical documentation?",
    actions: ["✅ Created task: Complete Annex IV documentation", "✅ Set reminder: Submit conformity assessment by Apr 2 2025"]
  },
  "which controls are failing": {
    content: "3 controls currently in **Gap** status:\n\n- **EU-A5-006** — Fallback documentation missing (ChestScan AI)\n- **ISO42-6-2** — AI lifecycle management not documented\n- **CDSCO-3B** — SaMD classification under review\n\nAll three should be addressed before your NABH audit on 15 Apr.",
    actions: ["✅ Created task: Upload fallback documentation for ChestScan AI"]
  },
  "when does our nabh accreditation expire": {
    content: "Your NABH accreditation is valid until **30 Sep 2025** — you have 193 days. The renewal workflow has 7 steps; you're currently on Step 5 (Evidence Upload).\n\nCritical: COP.4 (AI failure mode documentation) is still failing. This must be resolved before step 6.",
    actions: ["✅ Draft task: Complete COP.4 remediation by 15 Apr"]
  },
  "draft my clinical risk assessment": {
    content: "I'll draft the Clinical Risk Assessment for **ChestScan AI v3.1**. This will cover:\n\n- Clinical indication & intended setting\n- CDSCO SaMD classification (Class IIb)\n- Bias and safety risk scores\n- Existing controls & mitigations\n- Human oversight mechanism\n\nShall I proceed? It will take ~60 seconds to generate the full draft.",
    actions: ["✅ Draft saved: Clinical Risk Assessment — ChestScan AI v3.1"]
  },
};

function getBotResponse(msg: string) {
  const key = Object.keys(BOT_RESPONSES).find(k => msg.toLowerCase().includes(k));
  return BOT_RESPONSES[key || 'default'];
}

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState('ChestScan AI v3.1 (Class IIb, High Risk)');
  const [showCtx, setShowCtx] = useState(true);
  const [attachHint, setAttachHint] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  async function send(text: string) {
    if (!text.trim()) return;
    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    const resp = getBotResponse(text);
    setMessages(prev => [...prev, { role: 'assistant', content: resp.content, actions: resp.actions }]);
    setTyping(false);
  }

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(o => !o)} aria-label="Compliance Assistant"
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${open ? 'bg-slate-900 rotate-45' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="8" cy="10" r="1" fill="white"/><circle cx="12" cy="10" r="1" fill="white"/><circle cx="16" cy="10" r="1" fill="white"/></svg>}
        {!open && messages.length === 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white"/>}
      </button>

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-screen w-[420px] z-50 flex flex-col bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-900 text-white flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>
              </div>
              <div>
                <p className="font-black text-[14px]">Compliance Assistant</p>
                <p className="text-[10px] opacity-60 font-medium">EU AI Act · DPDPA · ABDM · CPCB · CDSCO</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          {showCtx && context && (
            <div className="mt-3 flex items-center justify-between bg-white/10 rounded-xl px-3 py-2">
              <p className="text-[11px] font-bold text-indigo-200">Context: <span className="text-white">{context}</span></p>
              <button onClick={() => setShowCtx(false)} className="text-white/50 hover:text-white ml-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          )}
        </div>

        {/* Thread */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-slate-50/50">
          {messages.length === 0 && (
            <div className="space-y-3 pt-4">
              <p className="text-[11.5px] font-black text-slate-400 uppercase tracking-widest text-center">Suggested Prompts</p>
              <div className="grid grid-cols-1 gap-2">
                {SUGGESTED.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="text-left px-4 py-3 bg-white border border-slate-200 rounded-xl text-[12.5px] font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40 hover:text-indigo-700 transition-all shadow-sm">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[88%]">
                <div className={`px-4 py-3 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                }`}>
                  <pre className="whitespace-pre-wrap font-sans leading-relaxed">{m.content}</pre>
                </div>
                {m.actions && (
                  <div className="mt-2 space-y-1.5">
                    {m.actions.map((a, j) => (
                      <div key={j} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <span className="text-[11.5px] font-bold text-emerald-700">{a}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white border border-slate-200 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef}/>
        </div>

        {/* Input bar */}
        <div className="px-4 py-4 bg-white border-t border-slate-200 flex-shrink-0">
          {attachHint && (
            <div className="mb-3 p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
              <p className="text-[11.5px] font-bold text-indigo-700">📎 Attach a document — agent will read and advise</p>
              <button onClick={() => setAttachHint(false)} className="text-indigo-400 hover:text-indigo-600">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <button onClick={() => setAttachHint(h => !h)} className="p-2.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0" aria-label="Attach document">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }}}
              placeholder="Ask a compliance question…"
              rows={1}
              className="flex-1 resize-none border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors max-h-[120px] leading-relaxed"
              style={{overflowY:'auto'}}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || typing}
              className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 transition-all shrink-0" aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[1px]" onClick={() => setOpen(false)}/>}
    </>
  );
}
