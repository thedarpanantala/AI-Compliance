'use client';
import { useState } from 'react';

const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const X = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Bot = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>;
const Pencil = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>;
const Template = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;

const STEPS = ['Set Processing Data','Data Categories','Legal Basis','Recipients & Transfers','Retention & Security'];

const LEGAL_BASES = [
  'Consent (DPDPA)',
  'Legitimate Interest',
  'Contractual Necessity',
  'Legal Obligation',
  'Vital Interest',
  'Public Interest / Public Task',
];

const DATA_CATS = [
  'Name / Identity','Contact Details','Health / Medical',
  'Biometric','Financial','Employment',
  'Location / GPS','Children\'s Data','Criminal Records',
];

const PROCESSINGS = [
  { id:'PRC-001', name:'Patient Registration & EMR', controller:'City General Hospital', basis:'Explicit Consent', category:'Health', status:'Active', risk:'Low', updated:'15 Mar 2025' },
  { id:'PRC-002', name:'Analytics — ChestScan AI Outputs', controller:'Radiology Dept.', basis:'Research Ethics Waiver', category:'Health / Biometric', status:'Under Review', risk:'High', updated:'19 Mar 2025' },
  { id:'PRC-003', name:'Payroll Processing', controller:'HR Operations', basis:'Contractual Necessity', category:'Financial / Employment', status:'Active', risk:'Low', updated:'01 Feb 2025' },
];

type Mode = '' | 'scratch' | 'ai' | 'template';

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{children}</label>;
}

function Multi({ opts, sel, set }: { opts: string[]; sel: string[]; set: (s: string[]) => void }) {
  const toggle = (o: string) => set(sel.includes(o) ? sel.filter(x => x !== o) : [...sel, o]);
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map(o => (
        <button key={o} onClick={() => toggle(o)} aria-pressed={sel.includes(o)}
          className={`px-3 py-1.5 rounded-lg border-2 text-[12px] font-bold transition-all ${sel.includes(o) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function ProcessingsPage() {
  const [tab, setTab] = useState('All Processings');
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('');
  const [step, setStep] = useState(1);
  const [aiText, setAiText] = useState('');
  const [dataCats, setDataCats] = useState<string[]>([]);
  const [legalBasis, setLegalBasis] = useState('');
  const [xborder, setXborder] = useState<'yes'|'no'|''>('');

  const close = () => { setModalOpen(false); setMode(''); setStep(1); setAiText(''); setDataCats([]); setLegalBasis(''); setXborder(''); };

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
            <span>Home</span><ChevR /><span className="text-slate-800 font-bold">Processings</span>
          </nav>
          <h1 className="text-2xl font-black text-slate-800">Data Processing Records (ROPA)</h1>
        </div>
        <button onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all">
          <Plus /> Create Processing
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['All Processings','Add New','Templates','Import/Export'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60">
          {tab === 'All Processings' && (
            <div className="p-0">
              <div className="px-6 py-3 bg-white border-b border-slate-200 flex gap-3 items-center">
                <input placeholder="Search processings…" className="border border-slate-200 rounded-lg px-3 py-1.5 text-[13px] w-64 outline-none focus:border-indigo-400" />
                {['Legal Basis','Category','Status','Risk Level'].map(f => (
                  <button key={f} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-500 hover:bg-slate-50 bg-white">
                    {f} ▼
                  </button>
                ))}
              </div>
              <table className="w-full text-left text-[13px] bg-white">
                <thead>
                  <tr className="border-b border-slate-200">
                    {['Processing Name','Data Controller','Legal Basis','Category','Status','Risk','Updated'].map(h => (
                      <th key={h} className="px-6 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {PROCESSINGS.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{p.name}</div>
                        <div className="text-[11px] text-slate-400">{p.id}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{p.controller}</td>
                      <td className="px-6 py-4 text-slate-600">{p.basis}</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold">{p.category}</span></td>
                      <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded text-[11px] font-bold ${p.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span></td>
                      <td className="px-6 py-4"><span className={`text-[12px] font-black ${p.risk === 'High' ? 'text-rose-600' : 'text-emerald-600'}`}>{p.risk}</span></td>
                      <td className="px-6 py-4 text-slate-400 text-right">{p.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab !== 'All Processings' && (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
              <p className="font-black text-slate-500 uppercase tracking-widest">{tab}</p>
              <p className="text-[12px] text-slate-400 mt-1">This section is part of the enterprise admin workflow.</p>
            </div>
          )}
        </div>
      </div>

      {/* ══ CREATE MODAL ══ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          {mode === '' ? (
            /* ── Mode picker ── */
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[720px] p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-black text-slate-800">Create a processing</h2>
                <button onClick={close} className="text-slate-400 hover:text-slate-700 transition-colors"><X /></button>
              </div>
              <p className="text-[13px] text-slate-500 font-medium mb-8">Choose how you want to create your new data processing record.</p>
              <div className="grid grid-cols-3 gap-5">
                <button onClick={() => setMode('scratch')}
                  className="flex flex-col items-center gap-4 p-7 rounded-xl border-2 border-slate-200 hover:border-indigo-400 hover:ring-4 hover:ring-indigo-50 transition-all group">
                  <div className="w-14 h-14 bg-slate-100 group-hover:bg-indigo-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors"><Pencil /></div>
                  <div className="text-center">
                    <p className="font-black text-[14px] text-slate-800">From scratch</p>
                    <p className="text-[11.5px] text-slate-500 mt-1 font-medium">Blank form, full control</p>
                  </div>
                </button>

                <button onClick={() => setMode('ai')}
                  className="flex flex-col items-center gap-4 p-7 rounded-xl border-2 border-indigo-400 ring-4 ring-indigo-50 bg-indigo-50/30 hover:bg-indigo-50 transition-all relative group">
                  <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase">New</span>
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600"><Bot /></div>
                  <div className="text-center">
                    <p className="font-black text-[14px] text-indigo-900">Assisted by AI</p>
                    <p className="text-[11.5px] text-indigo-700 mt-1 font-medium">AI-generated draft</p>
                  </div>
                </button>

                <button onClick={() => setMode('template')}
                  className="flex flex-col items-center gap-4 p-7 rounded-xl border-2 border-slate-200 hover:border-indigo-400 hover:ring-4 hover:ring-indigo-50 transition-all group">
                  <div className="w-14 h-14 bg-slate-100 group-hover:bg-indigo-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors"><Template /></div>
                  <div className="text-center">
                    <p className="font-black text-[14px] text-slate-800">From template</p>
                    <p className="text-[11.5px] text-slate-500 mt-1 font-medium">Pre-filled templates</p>
                  </div>
                </button>
              </div>
            </div>
          ) : mode === 'ai' && step === 0 ? (
            /* ── AI text input ── */
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[640px] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><Bot /></div>
                  <h2 className="text-[18px] font-black text-slate-800">Describe your processing</h2>
                </div>
                <button onClick={() => setMode('')} className="text-slate-400 hover:text-slate-700"><X /></button>
              </div>
              <Label>Tell us about your processing activity</Label>
              <textarea value={aiText} onChange={e => { if (e.target.value.length <= 300) setAiText(e.target.value); }} rows={5}
                placeholder="Example: Patient management with Epic EMR software…"
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 resize-none transition-colors" />
              <div className="flex justify-between items-center mt-2 mb-6">
                <p className="text-[11px] text-slate-400 font-medium">The AI will draft a complete ROPA entry based on your description. Always review before saving.</p>
                <span className="text-[11px] text-slate-400 font-bold tabular-nums">{aiText.length}/300</span>
              </div>
              <button onClick={() => setStep(1)} disabled={aiText.length < 10}
                className="w-full bg-indigo-600 text-white font-black py-3 rounded-xl text-[13px] hover:bg-indigo-700 disabled:opacity-40 transition-all">
                Let's go →
              </button>
            </div>
          ) : (
            /* ── 5-step wizard ── */
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[760px] flex flex-col overflow-hidden" style={{ maxHeight: '90vh' }}>
              {/* header */}
              <div className="px-8 py-5 bg-indigo-600 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {mode === 'ai' && <Bot />}
                  <h3 className="font-black text-[15px] uppercase tracking-widest">
                    {mode === 'ai' ? 'AI-Assisted Processing' : mode === 'scratch' ? 'New Processing' : 'From Template'}
                  </h3>
                </div>
                <button onClick={close} className="hover:bg-white/10 p-1.5 rounded-full transition-colors"><X /></button>
              </div>

              {/* progress bar */}
              <div className="bg-slate-50 px-8 py-3 border-b border-slate-200 flex items-center gap-4 shrink-0">
                <span className="text-[12px] font-bold text-slate-500 whitespace-nowrap">Step {step} of {STEPS.length}</span>
                <div className="flex-1 flex gap-1 h-1.5">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`flex-1 rounded-full ${i < step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                  ))}
                </div>
                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest whitespace-nowrap">{STEPS[step - 1]}</span>
              </div>

              {/* body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-5">
                {step === 1 && (
                  <>
                    <Label>Processing Activity Name *</Label>
                    <input defaultValue={mode === 'ai' ? aiText.slice(0, 60) : ''}
                      placeholder="e.g. Patient Registration & EMR Processing"
                      className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors" />
                    <Label>Data Controller *</Label>
                    <input placeholder="e.g. City General Hospital"
                      className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors" />
                    <Label>Processing Purpose *</Label>
                    <textarea rows={3} placeholder="Describe the purpose of this data processing…"
                      className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors resize-none" />
                  </>
                )}

                {step === 2 && (
                  <>
                    <Label>Categories of Personal Data *</Label>
                    <Multi opts={DATA_CATS} sel={dataCats} set={setDataCats} />
                    {dataCats.some(x => ['Health / Medical','Biometric','Children\'s Data'].includes(x)) && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-[12px] font-black text-amber-900 uppercase tracking-widest mb-1">Special Category Data Detected</p>
                        <p className="text-[12px] text-amber-800 font-medium">DPDPA requires explicit consent and additional safeguards for sensitive personal data including health, biometric or children's data.</p>
                      </div>
                    )}
                    <Label>Categories of Data Subjects *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Patients (Public)','Hospital Staff','Vendors/Partners','Minors (Under 18)'].map(x => (
                        <label key={x} className="flex items-center gap-2 p-3 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                          <input type="checkbox" className="rounded text-indigo-600" />
                          <span className="text-[13px] font-bold text-slate-700">{x}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <Label>Applicable Legal Basis (DPDPA / GDPR) *</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {LEGAL_BASES.map(b => (
                        <label key={b} onClick={() => setLegalBasis(b)}
                          className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${legalBasis === b ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                          <span className="text-[13px] font-bold text-slate-800">{b}</span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${legalBasis === b ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                            {legalBasis === b && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <Label>Recipients of Personal Data</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Internal Clinical Teams','Insurance Providers','Government Regulators','Third-party AI vendors','Audit Firms'].map(r => (
                        <label key={r} className="flex items-center gap-2 p-3 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                          <input type="checkbox" className="rounded text-indigo-600" />
                          <span className="text-[12px] font-bold text-slate-700">{r}</span>
                        </label>
                      ))}
                    </div>
                    <Label>International Data Transfers?</Label>
                    <div className="flex gap-2">
                      {(['yes','no'] as const).map(v => (
                        <button key={v} onClick={() => setXborder(v)} aria-pressed={xborder === v}
                          className={`px-5 py-2 rounded-lg border-2 text-[12px] font-black uppercase tracking-wider transition-all ${xborder === v ? (v === 'yes' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-emerald-600 border-emerald-600 text-white') : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}>
                          {v === 'yes' ? '✓ Yes' : '✗ No'}
                        </button>
                      ))}
                    </div>
                    {xborder === 'yes' && (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                        <p className="text-[12px] font-black text-rose-900 uppercase tracking-widest mb-1">DPDPA Section 16 — Cross-Border Transfer Flag</p>
                        <p className="text-[12px] text-rose-800 font-medium">Data transfer outside India must comply with the government's restricted territory list. A cross-border DPIA is mandatory before finalising this record.</p>
                      </div>
                    )}
                  </>
                )}

                {step === 5 && (
                  <>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <Label>Retention Period *</Label>
                        <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                          <option>1 year</option><option>2 years</option><option>5 years</option><option>10 years</option><option>Indefinite</option>
                        </select>
                      </div>
                      <div>
                        <Label>Deletion Mechanism *</Label>
                        <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                          <option>Automated purge</option><option>Manual review & delete</option><option>Anonymisation</option>
                        </select>
                      </div>
                    </div>
                    <Label>Technical Security Measures</Label>
                    <div className="flex flex-wrap gap-2">
                      {['AES-256 Encryption','Role-based Access','TLS 1.3 in Transit','Audit Logging','Pseudonymisation'].map(m => (
                        <label key={m} className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                          <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                          <span className="text-[12px] font-bold text-slate-700">{m}</span>
                        </label>
                      ))}
                    </div>
                    <Label>Organisational Measures</Label>
                    <textarea rows={3} placeholder="Training, policies, DPO review process…"
                      className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors resize-none" />
                  </>
                )}
              </div>

              {/* footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
                <button disabled={step === 1 && mode !== 'ai'} onClick={() => step > 1 ? setStep(s => s - 1) : setMode('')}
                  className="px-6 py-2.5 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-all">
                  ← Back
                </button>
                <button onClick={() => step < STEPS.length ? setStep(s => s + 1) : close()}
                  className="px-10 py-3 bg-slate-900 text-white font-black rounded-xl text-[13px] hover:bg-slate-800 shadow-lg transition-all">
                  {step === STEPS.length ? '✓ Save Processing Record' : 'Next →'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
