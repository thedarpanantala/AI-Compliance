'use client';
import { useState } from 'react';
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const X = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const TYPES = [
  { id: 'clinical', emoji: '🏥', title: 'Clinical AI Risk Assessment', sub: 'Healthcare — NABH / CDSCO', color: 'rose' },
  { id: 'safety',   emoji: '🏭', title: 'Process AI Safety Assessment', sub: 'MSME Manufacturing', color: 'amber' },
  { id: 'dpdpa',    emoji: '🔐', title: 'DPDPA Data Protection Impact Assessment', sub: 'India Privacy Law', color: 'indigo' },
  { id: 'euai',     emoji: '🤖', title: 'EU AI Act Conformity Assessment', sub: 'EU Regulation 2024/1689', color: 'violet' },
  { id: 'env',      emoji: '🌿', title: 'Environmental AI Impact', sub: 'MSME / GPCB', color: 'emerald' },
];

const STEPS_CLINICAL = ['Clinical Context','Data & Consent','Risk Analysis','Mitigations','Sign-off'];

const EXISTING = [
  { id:'IA-001', type:'Clinical AI', system:'ChestScan v3.1', dept:'Radiology', status:'Under Review', risk:'High', date:'19 Mar 2025' },
  { id:'IA-002', type:'DPDPA DPIA', system:'Patient Portal', dept:'Engineering', status:'Approved', risk:'Medium', date:'10 Mar 2025' },
  { id:'IA-003', type:'EU AI Act', system:'PredictDiag AI', dept:'Clinical', status:'In Progress', risk:'High', date:'20 Mar 2025' },
];

function Lbl({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{children}</label>;
}
function Inp({ placeholder, full }: { placeholder: string; full?: boolean }) {
  return <input placeholder={placeholder} className={`${full?'w-full':''} border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors`} />;
}
function Txt({ placeholder, rows=3 }: { placeholder:string; rows?:number }) {
  return <textarea rows={rows} placeholder={placeholder} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 resize-none transition-colors" />;
}

function Slider({ label, name }: { label: string; name: string }) {
  const [v, setV] = useState(2);
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Lbl>{label}</Lbl>
        <span className={`text-[12px] font-black px-2 py-0.5 rounded ${v >= 4 ? 'bg-rose-100 text-rose-700' : v >= 3 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{v}/5</span>
      </div>
      <input type="range" min={1} max={5} value={v} onChange={e => setV(+e.target.value)} className="w-full accent-indigo-600" aria-label={label} />
      <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
        <span>Low</span><span>Medium</span><span>High</span>
      </div>
    </div>
  );
}

export default function ImpactAssessmentsPage() {
  const [tab, setTab] = useState('All Assessments');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [step, setStep] = useState(1);
  const [xborder, setXborder] = useState<'yes'|'no'|''>('');
  const [abdm, setAbdm] = useState<'yes'|'no'|''>('');
  const [declared, setDeclared] = useState(false);

  const close = () => { setShowCreate(false); setSelectedType(''); setStep(1); setXborder(''); setAbdm(''); setDeclared(false); };

  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
            <span>Home</span><ChevR /><span className="text-slate-800 font-bold">Impact Assessments</span>
          </nav>
          <h1 className="text-2xl font-black text-slate-800">Impact Assessments</h1>
        </div>
        <button onClick={() => { setShowCreate(true); setTab('Create New'); }}
          className="bg-indigo-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all">
          <Plus /> Create Assessment
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['All Assessments','Create New','Templates'].map(t => (
            <button key={t} onClick={() => { setTab(t); if(t==='Create New') { setShowCreate(true); } }}
              className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60 p-0">
          {tab === 'All Assessments' && (
            <table className="w-full text-left text-[13px] bg-white">
              <thead>
                <tr className="border-b border-slate-200">
                  {['ID','Assessment Type','System','Department','Status','Risk','Date'].map(h => (
                    <th key={h} className="px-6 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXISTING.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-6 py-4 font-bold text-slate-500 text-[11px]">{r.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{r.type}</td>
                    <td className="px-6 py-4 text-slate-600">{r.system}</td>
                    <td className="px-6 py-4 text-slate-500">{r.dept}</td>
                    <td className="px-6 py-4"><span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded text-[11px] font-bold">{r.status}</span></td>
                    <td className="px-6 py-4"><span className={`text-[12px] font-black ${r.risk==='High'?'text-rose-600':'text-amber-600'}`}>{r.risk}</span></td>
                    <td className="px-6 py-4 text-slate-400">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab !== 'All Assessments' && !showCreate && (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
              <p className="font-black text-slate-500 uppercase tracking-widest">{tab}</p>
            </div>
          )}
        </div>
      </div>

      {/* ══ CREATE MODAL ══ */}
      {showCreate && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          {!selectedType ? (
            /* type picker */
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[840px] p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[18px] font-black text-slate-800">Select Assessment Type</h2>
                <button onClick={close}><X /></button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {TYPES.map(t => (
                  <button key={t.id} onClick={() => setSelectedType(t.id)}
                    className="flex items-center gap-5 p-5 border-2 border-slate-100 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-left group">
                    <span className="text-[28px] shrink-0">{t.emoji}</span>
                    <div>
                      <p className="font-black text-[14px] text-slate-800 group-hover:text-indigo-700 transition-colors">{t.title}</p>
                      <p className="text-[12px] text-slate-500 font-medium mt-0.5">{t.sub}</p>
                    </div>
                    <ChevR />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 5-step Clinical AI wizard (shows for all types for now) */
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[760px] flex flex-col overflow-hidden" style={{maxHeight:'90vh'}}>
              <div className="px-8 py-5 bg-indigo-600 text-white flex items-center justify-between shrink-0">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-0.5">{TYPES.find(t=>t.id===selectedType)?.title}</p>
                  <h3 className="font-black text-[15px]">{STEPS_CLINICAL[step-1]}</h3>
                </div>
                <button onClick={close} className="hover:bg-white/10 p-1.5 rounded-full"><X /></button>
              </div>
              {/* progress */}
              <div className="bg-slate-50 px-8 py-3 border-b border-slate-200 flex items-center gap-4 shrink-0">
                <span className="text-[12px] font-bold text-slate-500 whitespace-nowrap">Step {step}/{STEPS_CLINICAL.length}</span>
                <div className="flex-1 flex gap-1">
                  {STEPS_CLINICAL.map((_,i) => <div key={i} className={`flex-1 h-1.5 rounded-full ${i<step?'bg-indigo-600':'bg-slate-200'}`}/>)}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-5">
                {step===1 && (<>
                  <div><Lbl>Clinical Indication *</Lbl><Inp placeholder="e.g. Chest X-Ray abnormality detection" full /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Lbl>Intended Setting</Lbl>
                      <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] text-slate-800 outline-none focus:border-indigo-400">
                        {['Inpatient ICU','Outpatient Clinic','Emergency Dept.','Radiology Suite','Remote / Tele-Health'].map(x=><option key={x}>{x}</option>)}
                      </select>
                    </div>
                    <div><Lbl>Target Population</Lbl><Inp placeholder="e.g. Adults 18–80, at-risk TB" full /></div>
                  </div>
                  <div><Lbl>Decision Type</Lbl>
                    <div className="flex flex-wrap gap-2">
                      {['Screening','Diagnostic','Triage','Monitoring','Treatment'].map(x=>(
                        <label key={x} className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                          <input type="radio" name="dectype" className="text-indigo-600"/><span className="text-[12px] font-bold text-slate-700">{x}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div><Lbl>Failure Mode Description</Lbl><Txt placeholder="What happens when the AI gives a wrong answer?"/></div>
                  <div><Lbl>Fallback Procedure</Lbl><Txt placeholder="How does the clinical team handle AI unavailability?"/></div>
                </>)}
                {step===2 && (<>
                  <div><Lbl>Data Sources</Lbl>
                    <div className="flex flex-wrap gap-2">
                      {['EHR','PACS / DICOM','Lab Results','Wearables','ABDM HIE','GP Notes','Pharmacy Data','Genomics'].map(x=>(
                        <label key={x} className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                          <input type="checkbox" className="rounded text-indigo-600"/><span className="text-[12px] font-bold text-slate-700">{x}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div><Lbl>Consent / Lawful Basis</Lbl>
                    <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] text-slate-800 outline-none focus:border-indigo-400">
                      <option>Explicit Consent (DPDPA)</option><option>Research Ethics Waiver</option><option>ABHA-linked Consent</option><option>Legal Obligation</option>
                    </select>
                  </div>
                  <div><Lbl>De-identification Method</Lbl>
                    <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] text-slate-800 outline-none focus:border-indigo-400">
                      <option>HIPAA Safe Harbour</option><option>K-Anonymity</option><option>Differential Privacy</option><option>None — identifiable data used</option>
                    </select>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-slate-700">ABDM Consent Manager Integrated?</p>
                    <div className="flex gap-2">
                      {(['yes','no'] as const).map(v=><button key={v} onClick={()=>setAbdm(v)} aria-pressed={abdm===v} className={`px-4 py-2 rounded-lg border-2 text-[12px] font-black uppercase tracking-wider transition-all ${abdm===v?(v==='yes'?'bg-emerald-600 border-emerald-600 text-white':'bg-rose-600 border-rose-600 text-white'):'bg-white border-slate-200 text-slate-400'}`}>{v==='yes'?'✓ Yes':'✗ No'}</button>)}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-slate-700">Cross-border Data Transfer?</p>
                    <div className="flex gap-2">
                      {(['yes','no'] as const).map(v=><button key={v} onClick={()=>setXborder(v)} aria-pressed={xborder===v} className={`px-4 py-2 rounded-lg border-2 text-[12px] font-black uppercase tracking-wider transition-all ${xborder===v?(v==='yes'?'bg-rose-600 border-rose-600 text-white':'bg-emerald-600 border-emerald-600 text-white'):'bg-white border-slate-200 text-slate-400'}`}>{v==='yes'?'✓ Yes':'✗ No'}</button>)}
                    </div>
                  </div>
                  {xborder==='yes' && <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl"><p className="text-[12px] font-black text-rose-900 uppercase tracking-widest mb-1">DPDPA Section 16 — Cross-Border Flag</p><p className="text-[12px] text-rose-800 font-medium">A cross-border DPIA is mandatory before this assessment can be approved.</p></div>}
                </>)}
                {step===3 && (<div className="space-y-6">
                  <Slider label="Bias / Equity Risk" name="bias"/>
                  <Slider label="Patient Safety Risk" name="safety"/>
                  <Slider label="Privacy Risk" name="privacy"/>
                  <Slider label="Over-reliance Risk" name="overreliance"/>
                  <div><Lbl>Highest-Risk Scenario</Lbl><Txt placeholder="Describe the worst-case misuse or failure scenario…" rows={4}/></div>
                  <div><Lbl>Vulnerable Populations Affected</Lbl>
                    <div className="flex flex-wrap gap-2">
                      {['Minors','Elderly (75+)','Pregnant Women','Immunocompromised','Rural / Low-literacy','Tribal Communities'].map(x=>(
                        <button key={x} className="px-3 py-1.5 border-2 border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-all">{x}</button>
                      ))}
                    </div>
                  </div>
                </div>)}
                {step===4 && (<>
                  <div><Lbl>Human Oversight Mechanism</Lbl><Txt placeholder="Describe how a clinician reviews or overrides AI decisions…" rows={4}/></div>
                  <div><Lbl>Fallback When AI Unavailable</Lbl><Txt placeholder="What is the manual clinical protocol if the AI system goes offline?"/></div>
                  <div><Lbl>Existing Controls</Lbl>
                    <div className="grid grid-cols-2 gap-2">
                      {['Radiologist double-reads all AI flags','Random 10% audit by DPO','Monthly accuracy drift report','Incident logging to NABH Portal','ABDM consent expiry checks'].map(x=>(
                        <label key={x} className="flex items-center gap-2 p-3 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                          <input type="checkbox" className="rounded text-indigo-600"/><span className="text-[12px] font-bold text-slate-700">{x}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div><Lbl>Next Clinical Validation Date</Lbl><input type="date" className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] text-slate-800 outline-none focus:border-indigo-400"/></div>
                </>)}
                {step===5 && (<>
                  <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl">
                    <p className="text-[12px] font-black text-amber-900 uppercase tracking-widest mb-1">⚠ Warning — Assessment Lock</p>
                    <p className="text-[12px] text-amber-800 font-medium">Once submitted for approval, this assessment will be locked and require a formal amendment process to modify. Ensure all information is accurate before proceeding.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Lbl>Next Review Date *</Lbl><input type="date" className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] text-slate-800 outline-none focus:border-indigo-400"/></div>
                    <div><Lbl>Approving Clinician</Lbl><Inp placeholder="Name of clinical lead" full/></div>
                  </div>
                  <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={declared} onChange={e=>setDeclared(e.target.checked)} className="mt-0.5 rounded text-indigo-600"/>
                    <span className="text-[12.5px] font-semibold text-slate-700">I declare that all information in this assessment is accurate and complete to the best of my knowledge. I understand that submitting will lock this record for regulatory purposes.</span>
                  </label>
                </>)}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between shrink-0">
                <button disabled={step===1 && !selectedType} onClick={()=>step>1?setStep(s=>s-1):setSelectedType('')}
                  className="px-6 py-2.5 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-all">
                  ← Back
                </button>
                <button onClick={()=>step<STEPS_CLINICAL.length?setStep(s=>s+1):close()}
                  disabled={step===5 && !declared}
                  className="px-10 py-3 bg-slate-900 text-white font-black rounded-xl text-[13px] hover:bg-slate-800 shadow-lg transition-all disabled:opacity-40">
                  {step===STEPS_CLINICAL.length?'✓ Submit for Approval':'Next →'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
