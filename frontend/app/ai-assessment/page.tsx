'use client';
import { useState } from 'react';

type YesNo = 'yes' | 'no' | '';
const ChevDown = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
);
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const DlIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const UlIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;

function Sec({ n, title, children, open: initOpen = false }: { n: number; title: string; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(initOpen);
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left" aria-expanded={open}>
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 bg-indigo-600 text-white rounded-full text-[11px] font-black flex items-center justify-center shrink-0">{n}</span>
          <span className="font-bold text-[13.5px] text-slate-800">{title}</span>
        </div>
        <ChevDown open={open} />
      </button>
      {open && <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-5">{children}</div>}
    </div>
  );
}

function YN({ v, set, id }: { v: YesNo; set: (x: YesNo) => void; id: string }) {
  return (
    <div className="flex gap-2" role="group" aria-labelledby={id}>
      {(['yes', 'no'] as const).map(x => (
        <button key={x} onClick={() => set(x)} aria-pressed={v === x}
          className={`px-5 py-2 rounded-lg border-2 text-[12px] font-black uppercase tracking-wider transition-all ${v === x ? (x === 'yes' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-rose-600 border-rose-600 text-white') : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}>
          {x === 'yes' ? '✓ Yes' : '✗ No'}
        </button>
      ))}
    </div>
  );
}

function QRow({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between gap-4">
      <p className="text-[13px] font-semibold text-slate-700 flex-1">{q}</p>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{children}</label>;
}

function Multi({ opts, sel, set }: { opts: string[]; sel: string[]; set: (s: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map(o => (
        <button key={o} onClick={() => set(sel.includes(o) ? sel.filter(x => x !== o) : [...sel, o])} aria-pressed={sel.includes(o)}
          className={`px-3 py-1.5 rounded-lg border-2 text-[12px] font-bold transition-all ${sel.includes(o) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

const RISK_META = {
  unacceptable: { label: 'Unacceptable Risk', bg: 'bg-red-100', txt: 'text-red-700', dot: 'bg-red-600', ring: 'border-red-300' },
  high:         { label: 'High Risk',          bg: 'bg-rose-100', txt: 'text-rose-700',  dot: 'bg-rose-500', ring: 'border-rose-300' },
  limited:      { label: 'Limited Risk',       bg: 'bg-amber-100', txt: 'text-amber-700', dot: 'bg-amber-500', ring: 'border-amber-300' },
  minimal:      { label: 'Minimal Risk',       bg: 'bg-emerald-100', txt: 'text-emerald-700', dot: 'bg-emerald-500', ring: 'border-emerald-300' },
};

const LANGS: Record<string, [string, string][]> = {
  Hindi:   [['Intended purpose?','उद्देश्य क्या है?'],['Provider name','प्रदाता का नाम'],['Sector','क्षेत्र'],['Deployer','तैनात संगठन']],
  Tamil:   [['Intended purpose?','நோக்கம்?'],['Provider name','வழங்குபவர்'],['Sector','துறை'],['Deployer','நிறுவனம்']],
  Marathi: [['Intended purpose?','उद्देश?'],['Provider name','प्रदाता नाव'],['Sector','क्षेत्र'],['Deployer','संस्था']],
  Telugu:  [['Intended purpose?','ఉద్దేశ్యం?'],['Provider name','ప్రదాత పేరు'],['Sector','రంగం'],['Deployer','వినియోగదారు']],
};

export default function AIAssessmentPage() {
  const [tab, setTab] = useState('Form Builder');
  const [lang, setLang] = useState('Hindi');

  // S1
  const [purpose, setPurpose] = useState('');
  const [provider, setProvider] = useState('');
  const [sector, setSector] = useState('');
  const [deployer, setDeployer] = useState('');
  // S2
  const [mil, setMil] = useState<YesNo>('');
  const [gpai, setGpai] = useState<YesNo>('');
  const [res, setRes] = useState<YesNo>('');
  // S3
  const HR_OPTS = ['Credit Scoring','Insurance','Employment','Education','Law Enforcement','Migration','Critical Infrastructure','Medical Diagnosis','Biometric Identification'];
  const [hrSel, setHrSel] = useState<string[]>([]);
  // S4
  const [cdsco, setCdsco] = useState<YesNo>('');
  const [phd, setPhd] = useState<YesNo>('');
  const [factory, setFactory] = useState<YesNo>('');
  const [cb, setCb] = useState<YesNo>('');
  // S5
  const DT_OPTS = ['PHI (Patient Health Info)','PII (Personal Info)','Biometric','Financial','Location','Behavioural'];
  const [dtSel, setDtSel] = useState<string[]>([]);
  const [deid, setDeid] = useState<'yes'|'no'|'partial'|''>('');
  const [consent, setConsent] = useState('');
  const [abdm, setAbdm] = useState<YesNo>('');
  // S6
  const [override, setOverride] = useState<YesNo>('');
  const [fallback, setFallback] = useState('');
  const [inclog, setInclog] = useState<YesNo>('');
  const [overseer, setOverseer] = useState('');

  const excluded = mil === 'yes' || gpai === 'yes' || res === 'yes';
  const BAD = ['Biometric Identification','Law Enforcement','Critical Infrastructure'];
  const euRisk: keyof typeof RISK_META = excluded ? 'minimal'
    : BAD.some(x => hrSel.includes(x)) ? 'unacceptable'
    : hrSel.length > 0 ? 'high'
    : purpose ? 'limited'
    : 'minimal';
  const rm = RISK_META[euRisk];

  const indiaClass = cdsco === 'yes'    ? 'CDSCO SaMD — Class C/D Device Approval Required'
    : phd === 'yes'      ? 'DPDPA — Special Category Personal Data'
    : cb === 'yes'       ? 'DPDPA §16 — Cross-border Transfer Restricted'
    : factory === 'yes'  ? 'Industrial Safety Assessment Required'
    : '—';

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
            <span>Home</span><ChevR /><span className="text-slate-800 font-bold">AI Assessment</span>
          </nav>
          <h1 className="text-2xl font-black text-slate-800">AI Act Classification Assessment</h1>
          <p className="text-[12.5px] text-slate-500 mt-1 font-medium">Complete all 6 sections to auto-generate your EU AI Act and India risk classification.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['Form Builder','Translations','History','Settings'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60">

          {tab === 'Form Builder' && (
            <div className="grid grid-cols-12 gap-8 p-8">
              <div className="col-span-8 flex flex-col gap-4">

                {/* S1 */}
                <Sec n={1} title="AI System Main Information" open>
                  <div className="grid grid-cols-2 gap-5 pt-1">
                    <div className="col-span-2">
                      <Label>Q1. Intended purpose of the AI system *</Label>
                      <textarea value={purpose} onChange={e => setPurpose(e.target.value)} rows={3}
                        placeholder="Describe clinical, operational or commercial purpose…"
                        className="w-full border-2 border-slate-100 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors resize-none" />
                    </div>
                    <div>
                      <Label>Q2. AI System Provider Name *</Label>
                      <input value={provider} onChange={e => setProvider(e.target.value)} placeholder="e.g. Philips HealthSuite AI"
                        className="w-full border-2 border-slate-100 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <Label>Q3. Operating Sector *</Label>
                      <select value={sector} onChange={e => setSector(e.target.value)}
                        className="w-full border-2 border-slate-100 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                        <option value="">Select sector…</option>
                        {['Healthcare / Clinical','Financial Services','Manufacturing / Industry','Education','Law Enforcement','Insurance','Human Resources','Government / Public Administration'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Label>Q4. Deployer Organisation *</Label>
                      <input value={deployer} onChange={e => setDeployer(e.target.value)} placeholder="e.g. City General Hospital — Radiology Dept."
                        className="w-full border-2 border-slate-100 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors" />
                    </div>
                  </div>
                </Sec>

                {/* S2 */}
                <Sec n={2} title="Qualification — EU AI Act Art. 2(3) Exclusions">
                  <QRow q="Q5. Used exclusively for military or national security?"><YN v={mil} set={setMil} id="q5" /></QRow>
                  <QRow q="Q6. Is it a general-purpose AI model (GPAI)?"><YN v={gpai} set={setGpai} id="q6" /></QRow>
                  <QRow q="Q7. Used solely for scientific research?"><YN v={res} set={setRes} id="q7" /></QRow>
                  {excluded && (
                    <div className="flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 shrink-0 mt-0.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                      <div>
                        <p className="text-[12px] font-black text-emerald-900 uppercase tracking-widest mb-0.5">System Excluded from EU AI Act Scope</p>
                        <p className="text-[12px] text-emerald-800 font-medium">Art. 2(3) exclusion applies. No EU AI Act obligations. India-specific rules still apply.</p>
                      </div>
                    </div>
                  )}
                </Sec>

                {/* S3 */}
                <Sec n={3} title="Risk Classification — Annex III Check">
                  <div>
                    <Label>Q8. Does the system make or assist decisions about: <span className="normal-case font-bold text-slate-400 ml-1">(select all that apply)</span></Label>
                    <Multi opts={HR_OPTS} sel={hrSel} set={setHrSel} />
                  </div>
                  {hrSel.length > 0 && !excluded && (
                    <div className={`flex items-center gap-4 p-4 rounded-xl border-2 ${rm.ring} ${rm.bg}`}>
                      <div className={`w-3 h-3 rounded-full ${rm.dot} shrink-0`} />
                      <div>
                        <p className={`font-black text-[13px] uppercase tracking-widest ${rm.txt}`}>{rm.label}</p>
                        <p className={`text-[11.5px] font-medium ${rm.txt} mt-0.5`}>
                          {euRisk === 'unacceptable' ? 'Art. 5 — Prohibited. Cannot be deployed in the EU.' : 'Art. 6 + Annex III — Conformity assessment, technical docs & human oversight required.'}
                        </p>
                      </div>
                    </div>
                  )}
                </Sec>

                {/* S4 India */}
                <Sec n={4} title="India-Specific Classification">
                  <QRow q="Q9. Used in healthcare (CDSCO SaMD)?"><YN v={cdsco} set={setCdsco} id="q9" /></QRow>
                  <QRow q="Q10. Processes personal health data (DPDPA / ABDM)?"><YN v={phd} set={setPhd} id="q10" /></QRow>
                  <QRow q="Q11. Deployed in a factory controlling a physical process?"><YN v={factory} set={setFactory} id="q11" /></QRow>
                  <QRow q="Q12. Does it send data outside India?"><YN v={cb} set={setCb} id="q12" /></QRow>
                  {cb === 'yes' && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                      <p className="text-[11.5px] font-black text-rose-900 uppercase tracking-widest mb-1">DPDPA Section 16 — Cross-Border Transfer Restricted</p>
                      <p className="text-[11.5px] text-rose-800 font-medium">Transfer outside India requires government-approved territory list compliance. A dedicated DPIA must be completed before deployment.</p>
                    </div>
                  )}
                </Sec>

                {/* S5 Data */}
                <Sec n={5} title="Data Governance">
                  <div>
                    <Label>Q13. What data does the system use?</Label>
                    <Multi opts={DT_OPTS} sel={dtSel} set={setDtSel} />
                  </div>
                  <div>
                    <Label>Q14. Is the training data de-identified?</Label>
                    <div className="flex gap-2">
                      {(['yes','no','partial'] as const).map(x => (
                        <button key={x} onClick={() => setDeid(x)} aria-pressed={deid === x}
                          className={`px-5 py-2 rounded-lg border-2 text-[12px] font-black uppercase tracking-wider transition-all ${deid === x ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}>
                          {x}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Q15. Consent mechanism in place</Label>
                    <select value={consent} onChange={e => setConsent(e.target.value)}
                      className="w-full border-2 border-slate-100 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                      <option value="">Select mechanism…</option>
                      {['Explicit written consent (DPDPA)','Opt-in on portal','ABHA-linked consent','Research ethics board waiver','Implied consent','No consent (legal obligation)'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <QRow q="Q16. Is ABDM Consent Manager integrated?"><YN v={abdm} set={setAbdm} id="q16" /></QRow>
                </Sec>

                {/* S6 Oversight */}
                <Sec n={6} title="Human Oversight">
                  <QRow q="Q17. Is there a human override mechanism?"><YN v={override} set={setOverride} id="q17" /></QRow>
                  <div>
                    <Label>Q18. Describe the fallback procedure</Label>
                    <textarea value={fallback} onChange={e => setFallback(e.target.value)} rows={3}
                      placeholder="What happens when the AI system is overridden or fails?"
                      className="w-full border-2 border-slate-100 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors resize-none" />
                  </div>
                  <QRow q="Q19. Is incident logging enabled?"><YN v={inclog} set={setInclog} id="q19" /></QRow>
                  <div>
                    <Label>Q20. Designated human overseer</Label>
                    <input value={overseer} onChange={e => setOverseer(e.target.value)} placeholder="e.g. Dr. Sarah Johnson, Chief Radiologist"
                      className="w-full border-2 border-slate-100 rounded-lg px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors" />
                  </div>
                </Sec>

              </div>

              {/* ── sticky Summary ── */}
              <div className="col-span-4">
                <div className="sticky top-6 flex flex-col gap-4">
                  <div className={`rounded-2xl border-2 ${rm.ring} p-6 shadow-sm ${rm.bg}`}>
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-3">EU AI ACT CLASSIFICATION</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3.5 h-3.5 rounded-full ${rm.dot}`} />
                      <span className={`text-[17px] font-black tracking-tight ${rm.txt}`}>{rm.label}</span>
                    </div>
                    <p className={`text-[11.5px] font-medium ${rm.txt}`}>
                      {excluded ? 'Art. 2(3) exclusion — no EU obligations.' :
                       euRisk === 'unacceptable' ? 'Art. 5 — Prohibited from deployment.' :
                       euRisk === 'high' ? 'Art. 10–16 obligations apply.' :
                       euRisk === 'limited' ? 'Art. 50 transparency obligations apply.' :
                       'Voluntary codes of conduct apply.'}
                    </p>
                  </div>

                  <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-3">INDIA CLASSIFICATION</p>
                    <p className="font-black text-[13.5px] text-slate-800">{indiaClass || 'Answer Q9–Q12 to classify'}</p>
                    {abdm === 'yes' && <p className="mt-3 text-[11.5px] text-emerald-700 font-bold bg-emerald-50 rounded-lg px-3 py-2">ABDM Consent Manager ✓</p>}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-3">KEY OBLIGATIONS & STATUS</p>
                    <ul className="space-y-2 text-[12px] font-bold">
                      {override === 'yes' && <li className="text-emerald-700">✓ Human override confirmed</li>}
                      {inclog === 'yes' && <li className="text-emerald-700">✓ Incident logging active</li>}
                      {abdm === 'yes' && <li className="text-emerald-700">✓ ABDM Consent Gateway</li>}
                      {override !== 'yes' && <li className="text-amber-700">⚠ Human override not confirmed</li>}
                      {inclog !== 'yes' && <li className="text-amber-700">⚠ Incident log not confirmed</li>}
                      {cb === 'yes' && <li className="text-rose-700">⚠ Cross-border DPIA required</li>}
                    </ul>
                  </div>

                  <button className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl text-[13px] hover:bg-slate-800 shadow-xl transition-all uppercase tracking-widest">
                    Create Assessment Record →
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'Translations' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Language</label>
                  <select value={lang} onChange={e => setLang(e.target.value)}
                    className="border-2 border-slate-200 rounded-lg px-4 py-2 text-[13px] font-bold text-slate-700 outline-none focus:border-indigo-400">
                    {Object.keys(LANGS).map(l => <option key={l}>{l}</option>)}
                    <option>Telugu</option><option>Kannada</option><option>Bengali</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50">
                    <UlIcon /> Import CSV
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-[12px] font-bold hover:bg-indigo-700">
                    <DlIcon /> Export CSV
                  </button>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200">
                  <div className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">ENGLISH (Default)</div>
                  <div className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-200">{lang.toUpperCase()}</div>
                </div>
                {(LANGS[lang] || LANGS['Hindi']).map(([en, tgt], i) => (
                  <div key={i} className="grid grid-cols-2 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <div className="px-6 py-4 text-[13px] font-medium text-slate-700">{en}</div>
                    <div className="px-6 py-4 border-l border-slate-100">
                      <input defaultValue={tgt} className="w-full text-[13px] font-medium text-slate-800 outline-none bg-transparent focus:bg-indigo-50 rounded px-2 py-1 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {['History', 'Settings'].includes(tab) && (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
              <p className="font-black text-slate-500 uppercase tracking-widest text-[13px]">{tab} Interface</p>
              <p className="text-[12px] text-slate-400 mt-1">Assessment version history and configuration are part of the enterprise admin workflow.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
