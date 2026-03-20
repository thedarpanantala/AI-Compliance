'use client';
import { useState, useEffect } from 'react';

const STEP_LABELS = ['Organisation Type','State & Sector','Active Frameworks','First AI System'];

const ORG_TYPES = [
  { id:'hospital',  emoji:'🏥', label:'Hospital / Clinic' },
  { id:'factory',   emoji:'🏭', label:'MSME Factory' },
  { id:'lab',       emoji:'🔬', label:'Diagnostic Lab' },
  { id:'pharma',    emoji:'💊', label:'Pharma / Biotech' },
  { id:'govt',      emoji:'🏛️',  label:'Government Body' },
  { id:'tech',      emoji:'🔧', label:'Tech Company' },
];

const FRAMEWORKS = [
  {id:'euai',   label:'EU AI Act 2024',     sub:'High-risk AI regulation'},
  {id:'dpdpa',  label:'DPDPA 2023',         sub:'India data protection'},
  {id:'cdsco',  label:'CDSCO SaMD',         sub:'Medical device rules'},
  {id:'nabh',   label:'NABH Clinical AI',   sub:'Hospital accreditation'},
  {id:'cpcb',   label:'CPCB / SPCB',        sub:'Pollution board norms'},
  {id:'iso',    label:'ISO 42001',           sub:'AI management system'},
  {id:'nist',   label:'NIST AI RMF',        sub:'Risk management framework'},
  {id:'cbam',   label:'CBAM / CS3D',        sub:'EU export compliance'},
];

const MARKETS = ['EU', 'US', 'UK', 'UAE', 'Southeast Asia', 'Domestic Only'];
const STATES = ['Maharashtra','Gujarat','Karnataka','Tamil Nadu','Delhi NCR','Rajasthan','West Bengal','Telangana'];
const RISK_TIERS = ['Unacceptable', 'High Risk', 'Limited Risk', 'Minimal Risk'];
const SYS_TYPES = ['Clinical Decision Support', 'Diagnostic Imaging AI', 'Predictive Analytics', 'NLP / Document AI', 'Process Automation', 'Environmental Monitoring'];

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {Array.from({length:60}).map((_,i) => (
        <div key={i} className="absolute animate-bounce"
          style={{
            left:`${Math.random()*100}%`,
            top:`${Math.random()*100}%`,
            width:`${6+Math.random()*10}px`,
            height:`${6+Math.random()*10}px`,
            background:['#4f46e5','#16a34a','#dc2626','#ea580c','#0891b2'][i%5],
            borderRadius: Math.random()>0.5 ? '50%':'2px',
            animationDelay:`${Math.random()*1.5}s`,
            animationDuration:`${0.6+Math.random()*0.8}s`,
            opacity: 0.85,
          }}/>
      ))}
    </div>
  );
}

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [org, setOrg] = useState('');
  const [state, setState] = useState('');
  const [pollCat, setPollCat] = useState('');
  const [markets, setMarkets] = useState<string[]>([]);
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [sysMame, setSysName] = useState('');
  const [sysType, setSysType] = useState(SYS_TYPES[0]);
  const [sysRisk, setSysRisk] = useState(RISK_TIERS[1]);

  function toggleMarket(m: string) { setMarkets(prev => prev.includes(m) ? prev.filter(x=>x!==m) : [...prev, m]); }
  function toggleFw(id: string) { setFrameworks(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]); }

  function finish() {
    setDone(true);
    setTimeout(() => { onComplete(); }, 2800);
  }

  if (done) return (
    <>
      <Confetti/>
      <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-[480px] text-center">
          <div className="text-[56px] mb-4">🎉</div>
          <h2 className="text-[22px] font-black text-slate-800 mb-2">You're all set!</h2>
          <p className="text-[13.5px] font-medium text-slate-500 mb-6">Your compliance workspace has been configured. A standard licence checklist has been created based on your selections.</p>
          <div className="flex gap-3 justify-center">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-[12px] font-black">{frameworks.length} Frameworks active</div>
            {sysMame && <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl text-[12px] font-black">1 AI System registered</div>}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[680px] flex flex-col overflow-hidden" style={{maxHeight:'92vh'}}>
        {/* Progress header */}
        <div className="px-8 pt-8 pb-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[22px] font-black tracking-tight text-rose-600 mb-0.5">aiC</div>
              <p className="text-[11px] text-slate-400 font-medium">Privacy Cockpit — Platform Setup</p>
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Step {step} of 4</span>
          </div>
          <div className="flex gap-2">
            {STEP_LABELS.map((l,i) => (
              <div key={l} className="flex-1 flex flex-col gap-1.5">
                <div className={`h-1.5 rounded-full transition-all ${i < step ? 'bg-indigo-600' : 'bg-slate-100'}`}/>
                <p className={`text-[9px] font-black uppercase tracking-widest text-center ${i === step-1 ? 'text-indigo-600' : 'text-slate-300'}`}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Step 1: Organisation type */}
          {step === 1 && (
            <div>
              <h2 className="text-[20px] font-black text-slate-800 mb-1">What type of organisation are you?</h2>
              <p className="text-[13px] font-medium text-slate-400 mb-6">We'll configure your compliance workspace accordingly.</p>
              <div className="grid grid-cols-3 gap-3">
                {ORG_TYPES.map(o => (
                  <button key={o.id} onClick={() => setOrg(o.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all hover:border-indigo-400 hover:shadow-md ${org === o.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100'}`}>
                    <span className="text-[28px] block mb-2">{o.emoji}</span>
                    <span className={`font-black text-[13px] ${org === o.id ? 'text-indigo-700' : 'text-slate-800'}`}>{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: State & sector */}
          {step === 2 && (
            <div>
              <h2 className="text-[20px] font-black text-slate-800 mb-1">State & sector details</h2>
              <p className="text-[13px] font-medium text-slate-400 mb-6">Used to determine applicable regulations and pollution categories.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">State</label>
                  <select value={state} onChange={e => setState(e.target.value)} className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium outline-none focus:border-indigo-400 transition-colors">
                    <option value="">Select state…</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                {(org === 'factory') && (
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">GPCB Pollution Category</label>
                    <div className="flex gap-3">
                      {['Red','Orange','Green','White'].map(c => (
                        <button key={c} onClick={() => setPollCat(c)}
                          className={`flex-1 py-2.5 rounded-xl font-black text-[12px] border-2 transition-all ${pollCat === c ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}>{c}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Export Markets</label>
                  <div className="flex flex-wrap gap-2">
                    {MARKETS.map(m => (
                      <button key={m} onClick={() => toggleMarket(m)}
                        className={`px-4 py-2 rounded-full border-2 font-bold text-[12px] transition-all ${markets.includes(m) ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Frameworks */}
          {step === 3 && (
            <div>
              <h2 className="text-[20px] font-black text-slate-800 mb-1">Select active compliance frameworks</h2>
              <p className="text-[13px] font-medium text-slate-400 mb-6">You can always add or remove frameworks later.</p>
              <div className="grid grid-cols-2 gap-3">
                {FRAMEWORKS.map(f => (
                  <button key={f.id} onClick={() => toggleFw(f.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${frameworks.includes(f.id) ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-indigo-300'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${frameworks.includes(f.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                        {frameworks.includes(f.id) && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <div>
                        <p className={`font-black text-[13px] ${frameworks.includes(f.id) ? 'text-indigo-700' : 'text-slate-800'}`}>{f.label}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{f.sub}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: First AI system */}
          {step === 4 && (
            <div>
              <h2 className="text-[20px] font-black text-slate-800 mb-1">Register your first AI system</h2>
              <p className="text-[13px] font-medium text-slate-400 mb-6">You can skip this and add systems later from the AI Systems section.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">System Name</label>
                  <input value={sysMame} onChange={e => setSysName(e.target.value)} placeholder="e.g. ChestScan AI v3.1" className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium outline-none focus:border-indigo-400 transition-colors"/>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">System Type</label>
                  <select value={sysType} onChange={e => setSysType(e.target.value)} className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium outline-none focus:border-indigo-400 transition-colors">
                    {SYS_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">EU AI Act Risk Tier</label>
                  <div className="grid grid-cols-2 gap-2">
                    {RISK_TIERS.map(r => (
                      <button key={r} onClick={() => setSysRisk(r)}
                        className={`py-3 rounded-xl border-2 font-black text-[12px] transition-all ${sysRisk === r ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-100 text-slate-600 hover:border-slate-300'}`}>{r}</button>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-[12px] font-bold text-amber-800">⚠️ A standard licence checklist and compliance task list will be auto-generated based on your selections.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-8 py-5 border-t border-slate-100 flex justify-between items-center shrink-0 bg-slate-50">
          <button disabled={step === 1} onClick={() => setStep(s => s - 1)}
            className="px-6 py-2.5 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-all">← Back</button>
          <div className="flex gap-3">
            {step === 4 && (
              <button onClick={onComplete} className="px-6 py-3 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:bg-slate-50 transition-all">Skip for now</button>
            )}
            <button
              onClick={step < 4 ? () => setStep(s => s + 1) : finish}
              disabled={step === 1 && !org}
              className="px-10 py-3 bg-indigo-600 text-white font-black rounded-xl text-[13px] hover:bg-indigo-700 disabled:opacity-40 shadow-lg transition-all">
              {step < 4 ? 'Continue →' : '🚀 Launch Platform'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
