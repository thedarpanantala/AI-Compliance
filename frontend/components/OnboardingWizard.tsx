'use client';
import { useState, useEffect } from 'react';

const STEP_LABELS = ['Org Setup','Discovery','Risk','Gap Analysis','Team','Go Live'];

const ORG_TYPES = [
  { id:'healthcare',  emoji:'🏥', label:'Healthcare / Medical' },
  { id:'textile',     emoji:'🧵', label:'Textile / Apparel' },
  { id:'chemical',    emoji:'🧪', label:'Chemical / Biotech' },
  { id:'manufacturing',emoji:'🏭', label:'Manufacturing / MSME' },
  { id:'electronics', emoji:'🔌', label:'Electronics / IT' },
  { id:'food_processing', emoji:'🍱', label:'Food & Agriculture' },
];

const FRAMEWORKS = [
  {id:'euai',   label:'EU AI Act 2024',     sub:'High-risk AI regulation', regions: ['EU']},
  {id:'dpdpa',  label:'DPDPA 2023',         sub:'India data protection', regions: ['India']},
  {id:'cdsco',  label:'CDSCO SaMD',         sub:'Medical device rules', regions: ['India']},
  {id:'nabh',   label:'NABH Clinical AI',   sub:'Hospital accreditation', regions: ['India']},
  {id:'cpcb',   label:'CPCB / SPCB',        sub:'Pollution board norms', regions: ['India']},
  {id:'iso',    label:'ISO 42001',           sub:'AI management system', regions: ['Global']},
  {id:'nist',   label:'NIST AI RMF',        sub:'Risk management framework', regions: ['US']},
];

const MARKETS = ['India', 'EU', 'US', 'UAE', 'Southeast Asia', 'UK'];

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
  const [regions, setRegions] = useState<string[]>([]);
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Auto-detect frameworks logic
  useEffect(() => {
    const autoFws = FRAMEWORKS.filter(f => f.regions.some(r => regions.includes(r)) || f.regions.includes('Global')).map(f => f.id);
    setFrameworks(autoFws);
  }, [regions]);

  function toggleRegion(r: string) { setRegions(prev => prev.includes(r) ? prev.filter(x=>x!==r) : [...prev, r]); }

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setInventoryCount(12);
      setIsScanning(false);
    }, 2000);
  };

  const finish = () => {
    setDone(true);
    setTimeout(() => { onComplete(); }, 4000);
  };

  if (done) return (
    <>
      <Confetti/>
      <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-[480px] text-center">
          <div className="text-[56px] mb-4">🎯</div>
          <h2 className="text-[22px] font-black text-slate-800 mb-2">100% Audit Ready!</h2>
          <p className="text-[13.5px] font-medium text-slate-500 mb-6">Continuous monitoring is now activated. Your first automated compliance report is ready for review.</p>
          <div className="flex gap-2 justify-center">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-bold">MONITORING ACTIVE</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-[10px] font-bold">DASHBOARD READY</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[720px] flex flex-col overflow-hidden" style={{maxHeight:'92vh'}}>
        {/* Progress header */}
        <div className="px-8 pt-8 pb-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[22px] font-black tracking-tight text-rose-600">aiC</div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Privacy Cockpit • Automated Setup</p>
            </div>
            <span className="text-[11px] font-black text-slate-400">Step {step} of 6</span>
          </div>
          <div className="flex gap-2">
            {STEP_LABELS.map((l,i) => (
              <div key={l} className="flex-1 flex flex-col gap-1.5">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${i < step ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]' : 'bg-slate-200'}`}/>
                <p className={`text-[9px] font-black uppercase tracking-widest text-center ${i === step-1 ? 'text-indigo-600' : 'text-slate-300'}`}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-8">
          {/* Step 1: Organization Setup */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-[24px] font-black text-slate-800 mb-2">Configure workspace</h2>
              <p className="text-[14px] font-medium text-slate-400 mb-8">Select your industry and regions to auto-detect applicable regulations.</p>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Industry Sector</label>
                  <div className="grid grid-cols-3 gap-3">
                    {ORG_TYPES.map(o => (
                      <button key={o.id} onClick={() => setOrg(o.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${org === o.id ? 'border-indigo-600 bg-indigo-50 shadow-md ring-4 ring-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}>
                        <span className="text-[24px] block mb-2">{o.emoji}</span>
                        <span className={`font-black text-[12px] truncate block ${org === o.id ? 'text-indigo-700' : 'text-slate-800'}`}>{o.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Operating Regions</label>
                  <div className="flex flex-wrap gap-2">
                    {MARKETS.map(m => (
                      <button key={m} onClick={() => toggleRegion(m)}
                        className={`px-5 py-2.5 rounded-xl border-2 font-bold text-[13px] transition-all ${regions.includes(m) ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-100 text-slate-600 hover:border-slate-300'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: System Discovery */}
          {step === 2 && (
            <div className="text-center py-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
              </div>
              <h2 className="text-[22px] font-black text-slate-800 mb-2">Automated system discovery</h2>
              <p className="text-[14px] font-medium text-slate-400 mb-10 max-w-sm mx-auto">Connect your cloud stack or upload an inventory list to let aiC auto-map your systems.</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                <button onClick={startScan} className="p-6 border-2 border-slate-100 rounded-2xl hover:border-indigo-400 transition-all flex flex-col items-center gap-2">
                  <span className="text-2xl">☁️</span>
                  <span className="text-[13px] font-black text-slate-700">Scan Cloud Stack</span>
                </button>
                <button className="p-6 border-2 border-slate-100 rounded-2xl hover:border-indigo-400 transition-all flex flex-col items-center gap-2">
                  <span className="text-2xl">📄</span>
                  <span className="text-[13px] font-black text-slate-700">Upload Inventory</span>
                </button>
              </div>

              {isScanning && <div className="text-sm font-black text-indigo-600 animate-pulse">Scanning infrastructure...</div>}
              {inventoryCount > 0 && <div className="text-sm font-black text-emerald-600">✅ Found {inventoryCount} AI systems across your stack</div>}
            </div>
          )}

          {/* Step 3: Risk Classification */}
          {step === 3 && (
            <div>
              <h2 className="text-[22px] font-black text-slate-800 mb-2">Risk classification heatmap</h2>
              <p className="text-[14px] font-medium text-slate-400 mb-8">Systems have been auto-classified based on EU AI Act and industry norms.</p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-end mb-4">
                  <div className="flex gap-1 h-32 items-end">
                    {[20, 45, 80, 15].map((h, i) => (
                      <div key={i} className={`w-8 rounded-t-lg ${i === 2 ? 'bg-red-500' : 'bg-indigo-400'}`} style={{height: `${h}%`}}/>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-[22px] font-black text-red-600">High Risk</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Primary Focus Area</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {['Clinical Decision Support','Predictive Hiring AI','Financial Risk Scoring'].map(s => (
                  <div key={s} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-white shadow-sm">
                    <span className="text-[13px] font-bold text-slate-700">{s}</span>
                    <span className="bg-red-50 text-red-700 text-[10px] font-black px-2 py-0.5 rounded">High Risk</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Gap Analysis */}
          {step === 4 && (
            <div>
              <h2 className="text-[22px] font-black text-slate-800 mb-1">Gap analysis & auto-gen</h2>
              <p className="text-[14px] font-medium text-slate-400 mb-8">We found missing compliance artifacts. aiC will auto-generate base items.</p>
              
              <div className="space-y-3">
                {[
                  { label: 'Mandatory Industry License Bundle', missing: true },
                  { label: 'DPDPA Privacy Policy v1.0', missing: true },
                  { label: 'EU AI Act Risk Record', missing: true },
                  { label: 'Local Factory Safety Audit', missing: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      {item.missing ? <span className="text-rose-500">⚠️</span> : <span className="text-emerald-500">✓</span>}
                      <span className="text-[13px] font-bold text-slate-700">{item.label}</span>
                    </div>
                    {item.missing && <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded">Auto-Generating</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Team & Workflows */}
          {step === 5 && (
            <div>
              <h2 className="text-[22px] font-black text-slate-800 mb-2">Team & workflows</h2>
              <p className="text-[14px] font-medium text-slate-400 mb-8">Assign responsibilities to relevant departments automatically.</p>
              
              <div className="space-y-4">
                {[
                  { dept: 'IT / Security', task: 'DSR Management', owner: 'Unassigned' },
                  { dept: 'Clinical / Ops', task: 'Licence Renewal Cycle', owner: 'Unassigned' },
                  { dept: 'Legal / HR', task: 'Privacy Policy Approval', owner: 'Unassigned' },
                ].map(row => (
                  <div key={row.dept} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <div className="flex-1">
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{row.dept}</p>
                      <p className="text-[13.5px] font-bold text-slate-800">{row.task}</p>
                    </div>
                    <select className="border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-bold outline-none bg-white">
                      <option>Suggest Owner</option>
                      <option>Invite via Email</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Go Live */}
          {step === 6 && (
            <div className="text-center py-10">
              <div className="text-[64px] mb-6">🏁</div>
              <h2 className="text-[28px] font-black text-slate-800 mb-2">Workspace initialized</h2>
              <p className="text-[15px] font-medium text-slate-400 mb-10">Your compliance cockpit is ready. Click below to launch.</p>
              
              <div className="bg-emerald-50 border-2 border-emerald-100 rounded-2xl p-6 flex items-center justify-between text-left max-w-sm mx-auto">
                <div>
                  <p className="text-[11px] font-black text-emerald-800 uppercase tracking-widest">Compliance Status</p>
                  <p className="text-[20px] font-black text-emerald-600">Audit Ready</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">100</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-10 py-6 border-t border-slate-100 flex justify-between items-center shrink-0 bg-slate-50">
          <button disabled={step === 1} onClick={() => setStep(s => s - 1)}
            className="px-6 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-all shadow-sm">← Back</button>
          
          <button
            onClick={step < 6 ? () => setStep(s => s + 1) : finish}
            disabled={step === 1 && (!org || regions.length === 0)}
            className="px-10 py-3.5 bg-indigo-600 text-white font-black rounded-xl text-[14px] hover:bg-indigo-700 disabled:opacity-40 shadow-xl shadow-indigo-100 transition-all">
            {step < 5 ? 'Continue →' : step === 5 ? 'Process Config →' : 'Launch Cockpit 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
