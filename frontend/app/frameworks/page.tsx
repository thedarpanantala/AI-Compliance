'use client';
import { useState } from 'react';
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;

const FRAMEWORKS = [
  { name:'EU AI Act 2024', ver:'Reg.(EU) 2024/1689', coverage:72, total:68, assessed:49, color:'indigo' },
  { name:'DPDPA 2023', ver:'India Act No.22 of 2023', coverage:88, total:34, assessed:30, color:'emerald' },
  { name:'ISO 42001', ver:'AI Management System', coverage:61, total:52, assessed:32, color:'blue' },
  { name:'NABH Clinical AI', ver:'5th Edition 2024', coverage:95, total:28, assessed:27, color:'violet' },
  { name:'CDSCO SaMD', ver:'Medical Device Rules 2017', coverage:80, total:41, assessed:33, color:'rose' },
  { name:'NIST AI RMF', ver:'Version 1.0', coverage:55, total:80, assessed:44, color:'amber' },
];

const ALL_PACKS = ['GDPR (EU)','HIPAA (US)','AERB','CPCB / SPCB','CBAM','CS3D','ISO 27001','SOC 2'];

const CONTROLS = [
  { code:'EU-A5-001', title:'Prohibition on Real-time Biometric', fw:'EU AI Act 2024', obligation:'Mandatory', status:'Compliant', evidence:3, tags:['Art. 5','High Risk'] },
  { code:'DPDPA-7-1', title:'Consent for Personal Data Processing', fw:'DPDPA 2023', obligation:'Mandatory', status:'Compliant', evidence:5, tags:['§7','Consent'] },
  { code:'ISO42-6-2', title:'AI System Life-cycle Management', fw:'ISO 42001', obligation:'Mandatory', status:'Gap', evidence:1, tags:['Clause 6.2','Governance'] },
  { code:'NABH-AI-4', title:'Clinical AI Validation Protocol', fw:'NABH Clinical AI', obligation:'Mandatory', status:'Compliant', evidence:4, tags:['Standard 4','Healthcare'] },
  { code:'CDSCO-3B', title:'SaMD Classification Assessment', fw:'CDSCO SaMD', obligation:'Conditional', status:'Under Review', evidence:2, tags:['Rule 3','Medical Device'] },
  { code:'NIST-GV1', title:'AI Governance Policy & Accountability', fw:'NIST AI RMF', obligation:'Recommended', status:'In Progress', evidence:0, tags:['GOVERN','Policy'] },
];

const STATUS_C: Record<string, string> = { Compliant:'bg-emerald-100 text-emerald-700', Gap:'bg-rose-100 text-rose-700', 'Under Review':'bg-amber-100 text-amber-700', 'In Progress':'bg-blue-100 text-blue-700' };
const OBL_C: Record<string, string> = { Mandatory:'bg-slate-800 text-white', Recommended:'bg-slate-100 text-slate-600', Conditional:'bg-indigo-100 text-indigo-700' };

const COL: Record<string, string> = { indigo:'bg-indigo-600', emerald:'bg-emerald-500', blue:'bg-blue-500', violet:'bg-violet-500', rose:'bg-rose-500', amber:'bg-amber-500' };

const MAPPINGS = [
  ['DPDPA §7','GDPR Art. 6','HIPAA 164.508','—'],
  ['DPDPA §8','GDPR Art. 7','—','—'],
  ['DPDPA §13','GDPR Art. 17','HIPAA 164.524','ISO 42001 9.4'],
  ['DPDPA §16','GDPR Ch. V','—','NIST GV-1.2'],
];

export default function FrameworksPage() {
  const [tab, setTab] = useState('Active Frameworks');
  const [drawer, setDrawer] = useState<typeof CONTROLS[0]|null>(null);
  const [search, setSearch] = useState('');
  const filt = CONTROLS.filter(c=>c.title.toLowerCase().includes(search.toLowerCase())||c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6">
        <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Frameworks & Controls</span></nav>
        <h1 className="text-2xl font-black text-slate-800">Frameworks & Controls</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['Active Frameworks','Control Library','Mappings','Policy Packs'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60">
          {tab==='Active Frameworks' && (
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-3 gap-5">
                {FRAMEWORKS.map(f=>(
                  <div key={f.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-black text-[14px] text-slate-800">{f.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{f.ver}</p>
                      </div>
                      <div className="relative w-14 h-14">
                        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                          <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e8f0" strokeWidth="5"/>
                          <circle cx="28" cy="28" r="22" fill="none" stroke="#4f46e5" strokeWidth="5" strokeDasharray={`${(f.coverage/100)*138} 138`} strokeLinecap="round"/>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-slate-800">{f.coverage}%</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                        <span>Controls Assessed</span><span>{f.assessed}/{f.total}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`${COL[f.color]} h-2 rounded-full`} style={{width:`${f.coverage}%`}}/>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-slate-900 text-white font-black text-[11.5px] py-2 rounded-lg hover:bg-slate-800">View Controls</button>
                      <button className="flex-1 border-2 border-slate-200 text-slate-600 font-black text-[11.5px] py-2 rounded-lg hover:bg-slate-50">Run Assessment</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='Control Library' && (
            <div>
              <div className="px-6 py-3 bg-white border-b border-slate-200 flex gap-3">
                <div className="relative flex-1 max-w-md">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search controls…" className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] outline-none focus:border-indigo-400"/>
                </div>
                {['Framework','Obligation','Status'].map(f=>(
                  <button key={f} className="px-3 py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-500 hover:bg-slate-50 bg-white">{f} ▼</button>
                ))}
              </div>
              <table className="w-full text-left text-[13px] bg-white">
                <thead>
                  <tr className="border-b border-slate-200">
                    {['CODE','TITLE','FRAMEWORK','OBLIGATION','STATUS','EVIDENCE','TAGS'].map(h=>(
                      <th key={h} className="px-5 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filt.map(c=>(
                    <tr key={c.code} onClick={()=>setDrawer(c)} className="hover:bg-slate-50 cursor-pointer">
                      <td className="px-5 py-4 font-black text-indigo-600 text-[12px]">{c.code}</td>
                      <td className="px-5 py-4 font-bold text-slate-800 max-w-[200px]">{c.title}</td>
                      <td className="px-5 py-4 text-[12px] text-slate-500 font-medium">{c.fw}</td>
                      <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] font-black ${OBL_C[c.obligation]}`}>{c.obligation}</span></td>
                      <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] font-black ${STATUS_C[c.status]}`}>{c.status}</span></td>
                      <td className="px-5 py-4 text-center font-black text-slate-700">{c.evidence}</td>
                      <td className="px-5 py-4"><div className="flex flex-wrap gap-1">{c.tags.map(t=><span key={t} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">{t}</span>)}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab==='Mappings' && (
            <div className="p-8">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-4 bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest">
                  {['DPDPA 2023','GDPR (EU)','HIPAA (US)','ISO 42001'].map(h=><div key={h} className="px-5 py-4">{h}</div>)}
                </div>
                {MAPPINGS.map((row,i)=>(
                  <div key={i} className={`grid grid-cols-4 border-b border-slate-100 ${i%2===0?'bg-white':'bg-slate-50'}`}>
                    {row.map((cell,j)=>(
                      <div key={j} className={`px-5 py-4 text-[13px] ${j===0?'font-black text-indigo-700':'font-medium text-slate-600'} ${j>0&&cell==='—'?'text-slate-300':''}`}>{cell}</div>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-[11.5px] text-slate-500 font-medium mt-4">Cross-framework control mappings are generated automatically from obligation text analysis. Always verify with the original regulation text.</p>
            </div>
          )}

          {tab==='Policy Packs' && (
            <div className="p-8">
              <div className="grid grid-cols-4 gap-4">
                {ALL_PACKS.map(p=>(
                  <div key={p} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
                    <p className="font-black text-[13.5px] text-slate-800 group-hover:text-indigo-700">{p}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Available to add</p>
                    <button className="mt-4 w-full bg-indigo-600 text-white font-black text-[11.5px] py-2 rounded-lg hover:bg-indigo-700">+ Add Framework</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control Drawer */}
      {drawer && (
        <div className="fixed inset-0 bg-slate-900/30 z-50 flex justify-end" onClick={()=>setDrawer(null)}>
          <div className="w-[500px] bg-white h-full shadow-2xl flex flex-col" onClick={e=>e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-start">
              <div><p className="font-black text-[11px] text-indigo-600 uppercase tracking-widest mb-1">{drawer.code}</p><h3 className="font-black text-[17px] text-slate-800">{drawer.title}</h3></div>
              <button onClick={()=>setDrawer(null)} className="text-slate-400 hover:text-slate-700 mt-1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <div className="flex gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded text-[11px] font-black ${STATUS_C[drawer.status]}`}>{drawer.status}</span>
                <span className={`px-2.5 py-1 rounded text-[11px] font-black ${OBL_C[drawer.obligation]}`}>{drawer.obligation}</span>
                {drawer.tags.map(t=><span key={t} className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2 py-1 rounded">{t}</span>)}
              </div>
              {[['Framework', drawer.fw],['Evidence Count', drawer.evidence.toString()],['Regulation Citation', drawer.code.split('-').slice(0,2).join(' — ')],['Test Procedure','Review system documentation, interview responsible persons, verify evidence artefacts in Evidence vault.'],['Description','This control ensures compliance with the stated regulatory provision. Regular assessment against documented test criteria should be performed at least annually or on any system change affecting the control scope.']].map(([k,v])=>(
                <div key={k}><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{k}</p><p className="text-[13px] font-medium text-slate-700 leading-relaxed">{v}</p></div>
              ))}
            </div>
            <div className="px-8 py-5 border-t border-slate-200 flex gap-3">
              <button className="flex-1 bg-slate-900 text-white font-black py-3 rounded-xl text-[13px] hover:bg-slate-800">Add Evidence</button>
              <button className="flex-1 border-2 border-slate-200 rounded-xl py-3 text-[13px] font-bold text-slate-500 hover:bg-slate-50">Create Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
