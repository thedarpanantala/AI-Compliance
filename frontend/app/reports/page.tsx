'use client';
import { useState } from 'react';

const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const X = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const TEMPLATES = [
  { id:'clinical',  emoji:'🏥', title:'Clinical Risk Assessment',       sub:'NABH / CDSCO required' },
  { id:'euai',      emoji:'📋', title:'EU AI Act Annex IV Technical Doc', sub:'Art. 11 — High Risk systems' },
  { id:'dpdpa',     emoji:'🔐', title:'DPDPA Impact Assessment',        sub:'Data Protection Authority' },
  { id:'gpcb',      emoji:'🌿', title:'GPCB Monthly Compliance Report', sub:'Pollution control board' },
  { id:'msme',      emoji:'🏭', title:'MSME Compliance Snapshot',       sub:'Factory + ESG summary' },
  { id:'esg',       emoji:'📊', title:'ESG Disclosure Report',          sub:'CBAM / CS3D / BRSR' },
  { id:'board',     emoji:'🎯', title:'Board-Level Risk Summary',       sub:'Executive overview' },
  { id:'auditor',   emoji:'🔍', title:'Auditor Evidence Bundle',        sub:'SHA-256 locked archive' },
];

const SCHEDULED = [
  { name:'Monthly NABH Compliance', template:'Clinical Risk Assessment', freq:'Monthly', next:'01 Apr 2025', recip:'DPO, Clinical Lead', active:true },
  { name:'GPCB Q1 Emission Report', template:'GPCB Monthly Compliance', freq:'Quarterly', next:'01 Apr 2025', recip:'GPCB Liaison', active:true },
  { name:'Board Risk Summary',      template:'Board-Level Risk Summary', freq:'Monthly',  next:'01 Apr 2025', recip:'CEO, Board',      active:false },
  { name:'H&M ESG Disclosure',     template:'ESG Disclosure Report',    freq:'Quarterly', next:'30 Jun 2025', recip:'Procurement',    active:true },
];

const AI_SYSTEMS = ['ChestScan AI v3.1','PredictDiag v1.0','SkinScan Derma','AirGuard MSME AI','Patient Portal'];
const SITES = ['Ahmedabad Textile Unit','Surat Dye Processing','Rajkot Auto Components'];
const GEN_STEPS = ['Select Scope','Preview Content','Review & Export'];

function GenWizard({ tmpl, onClose }: { tmpl: typeof TEMPLATES[0]; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [sys, setSys] = useState(AI_SYSTEMS[0]);
  const [period, setPeriod] = useState('Q1 2025');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  async function generate() {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1800));
    setGenerating(false);
    setGenerated(true);
    setStep(3);
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[720px] flex flex-col overflow-hidden" style={{maxHeight:'90vh'}}>
        {/* Header */}
        <div className="px-8 py-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">{tmpl.emoji} {tmpl.title}</p>
            <h3 className="font-black text-[15px]">{GEN_STEPS[step - 1]}</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-1.5 rounded-full"><X /></button>
        </div>
        {/* progress */}
        <div className="bg-slate-50 px-8 py-3 border-b border-slate-200 flex items-center gap-4 shrink-0">
          <span className="text-[12px] font-bold text-slate-500 whitespace-nowrap">Step {step}/3</span>
          <div className="flex-1 flex gap-1">
            {GEN_STEPS.map((_,i) => <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < step ? 'bg-indigo-600' : 'bg-slate-200'}`}/>)}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">AI System or Factory Site</label>
                <select value={sys} onChange={e => setSys(e.target.value)} className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                  <optgroup label="AI Systems">{AI_SYSTEMS.map(s => <option key={s}>{s}</option>)}</optgroup>
                  <optgroup label="Factory Sites">{SITES.map(s => <option key={s}>{s}</option>)}</optgroup>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Reporting Period</label>
                <select value={period} onChange={e => setPeriod(e.target.value)} className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                  {['Q1 2025','Q4 2024','Q3 2024','FY 2024–25','March 2025','February 2025'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Additional Recipients (optional)</label>
                <input type="email" placeholder="email@hospital.co.in, ceo@hospital.co.in" className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors"/>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                <svg className="animate-spin shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <p className="text-[12.5px] font-bold text-indigo-800">AI agent is pre-filling content from compliance database for <strong>{sys}</strong>, period <strong>{period}</strong>…</p>
              </div>
              {[
                { section:'1. System Overview', content:'ChestScan AI v3.1 — Class IIb Medical Device (CDSCO). Deployed in Radiology, City General Hospital. Risk tier: High. EU AI Act classification: Annex III Art. 6(1). Current validation status: NABH-approved, last audit March 2025.', flag:false },
                { section:'2. Risk Assessment Summary', content:'Bias risk: 3/5 (moderate). Safety risk: 4/5 (high). Privacy risk: 2/5 (low — de-identified data used). Over-reliance risk: 4/5 — radiologist double-read protocol is in place but not always followed.', flag:true },
                { section:'3. Compliance Controls', content:'47 of 52 controls assessed. 5 gaps identified: missing fallback documentation (EU-A5-006), ABDM consent log not archived past 90 days, IRB approval renewal pending.', flag:true },
                { section:'4. Incident Summary', content:'1 critical incident (INC-001 — false negative TB screening). Escalated to clinical lead. CDSCO notification letter generated and pending review by DPO.', flag:false },
              ].map(s => (
                <div key={s.section} className={`border-2 rounded-xl p-5 ${s.flag ? 'border-amber-300 bg-amber-50/50' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-black text-[12px] text-slate-700 uppercase tracking-widest">{s.section}</p>
                    {s.flag && <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded">⚠ Review Required</span>}
                  </div>
                  <p className="text-[13px] font-medium text-slate-700 leading-relaxed">{s.content}</p>
                </div>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex items-center gap-4 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="font-black text-[14px] text-emerald-900">Report generated successfully</p>
                  <p className="text-[12px] text-emerald-700 font-medium mt-0.5">SHA-256: <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">a3f7b2...d94c11</code> · Locked evidence bundle created</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all text-[13px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download PDF
                </button>
                <button className="flex items-center justify-center gap-2 p-4 border-2 border-slate-200 text-slate-700 font-black rounded-xl hover:bg-slate-50 transition-all text-[13px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
                  View in Browser
                </button>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Evidence Bundle Contents</p>
                <div className="space-y-2">
                  {['Compliance assessment data export','Control evidence artefacts (47 items)','Incident logs (INC-001)','ABDM consent records','AI drift reports — March 2025'].map((f,i) => (
                    <div key={i} className="flex items-center gap-2 text-[12.5px] font-medium text-slate-700">
                      <span className="text-emerald-500">✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-between shrink-0 bg-slate-50">
          <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="px-6 py-2.5 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-all">← Back</button>
          {step === 1 && <button onClick={() => setStep(2)} className="px-10 py-3 bg-indigo-600 text-white font-black rounded-xl text-[13px] hover:bg-indigo-700 shadow-lg transition-all">Generate Preview →</button>}
          {step === 2 && !generated && <button onClick={generate} disabled={generating} className="px-10 py-3 bg-slate-900 text-white font-black rounded-xl text-[13px] hover:bg-slate-800 disabled:opacity-60 shadow-lg transition-all flex items-center gap-2">
            {generating ? <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Generating…</> : 'Generate Report →'}
          </button>}
          {step === 3 && <button onClick={onClose} className="px-10 py-3 bg-emerald-600 text-white font-black rounded-xl text-[13px] hover:bg-emerald-700 shadow-lg transition-all">Done ✓</button>}
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [tab, setTab] = useState('Generate');
  const [selected, setSelected] = useState<typeof TEMPLATES[0] | null>(null);
  const [scheduled, setScheduled] = useState(SCHEDULED.map(s => ({ ...s })));

  return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6">
        <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Reporting & Artifacts</span></nav>
        <h1 className="text-2xl font-black text-slate-800">Reporting & Artifacts</h1>
        <p className="text-[12.5px] text-slate-500 mt-1 font-medium">AI-assisted report generation with SHA-256 locked evidence bundles</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['Generate','Scheduled','Archive','Templates'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60">
          {tab === 'Generate' && (
            <div className="p-8">
              <p className="text-[13px] font-medium text-slate-500 mb-6">Select a template to start the AI-assisted report generation workflow.</p>
              <div className="grid grid-cols-4 gap-4">
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setSelected(t)}
                    className="bg-white border-2 border-slate-100 rounded-2xl p-6 text-left hover:border-indigo-400 hover:shadow-md hover:bg-indigo-50/20 transition-all group flex flex-col gap-3">
                    <span className="text-[28px]">{t.emoji}</span>
                    <div>
                      <p className="font-black text-[13.5px] text-slate-800 group-hover:text-indigo-700 transition-colors leading-tight">{t.title}</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-1">{t.sub}</p>
                    </div>
                    <span className="text-[11.5px] font-black text-indigo-600 group-hover:text-indigo-800 transition-colors mt-auto">Generate →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'Scheduled' && (
            <div>
              <div className="px-6 py-3 bg-white border-b border-slate-200 flex justify-between items-center">
                <p className="text-[12px] font-medium text-slate-500">{scheduled.filter(s => s.active).length} active scheduled reports</p>
                <button className="bg-indigo-600 text-white font-black text-[12px] px-4 py-2 rounded-lg hover:bg-indigo-700">+ Schedule Report</button>
              </div>
              <table className="w-full text-left text-[13px] bg-white">
                <thead>
                  <tr className="border-b border-slate-200">
                    {['REPORT NAME','TEMPLATE','FREQUENCY','NEXT RUN','RECIPIENTS','STATUS','ACTIONS'].map(h => (
                      <th key={h} className="px-5 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scheduled.map((r, i) => (
                    <tr key={r.name} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-bold text-slate-800">{r.name}</td>
                      <td className="px-5 py-4 text-slate-500 text-[12px]">{r.template}</td>
                      <td className="px-5 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[11px] font-bold">{r.freq}</span></td>
                      <td className="px-5 py-4 text-slate-500 text-[12px]">{r.next}</td>
                      <td className="px-5 py-4 text-slate-500 text-[12px] max-w-[120px] truncate">{r.recip}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => setScheduled(prev => prev.map((s, j) => j === i ? { ...s, active: !s.active } : s))}
                          className={`w-10 h-5 rounded-full transition-all relative ${r.active ? 'bg-emerald-500' : 'bg-slate-300'}`} aria-label="Toggle schedule">
                          <div className={`w-4 h-4 bg-white rounded-full shadow absolute top-0.5 transition-all ${r.active ? 'left-5' : 'left-0.5'}`}/>
                        </button>
                      </td>
                      <td className="px-5 py-4 flex gap-2">
                        <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800">Edit</button>
                        <button className="text-[12px] font-bold text-rose-500 hover:text-rose-700">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {['Archive','Templates'].includes(tab) && (
            <div className="flex flex-col items-center justify-center p-24 text-center">
              <span className="text-[40px] mb-4">📁</span>
              <p className="font-black text-slate-500 uppercase tracking-widest text-[12px]">{tab}</p>
              <p className="text-[12px] text-slate-400 mt-1 max-w-xs">Generated reports and templates will appear here. Generate your first report to get started.</p>
            </div>
          )}
        </div>
      </div>

      {selected && <GenWizard tmpl={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
