'use client';
import { useState } from 'react';
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const ChevDown = ({ open }: { open: boolean }) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${open?'rotate-180':''}`}><path d="m6 9 6 6 6-6"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

const SYSTEMS = [
  { name:'ChestScan AI v3.1', type:'Diagnostic Imaging', risk:'High Risk', val:'NABH Validated', score:87, abdm:true },
  { name:'PredictDiag v1.0', type:'Predictive Analytics', risk:'High Risk', val:'Pending Validation', score:62, abdm:false },
  { name:'SkinScan Derma', type:'Screening', risk:'Limited Risk', val:'NABH Validated', score:94, abdm:true },
  { name:'Elder Fall Detect', type:'Monitoring / Safety', risk:'High Risk', val:'Under Clinical Trial', score:71, abdm:false },
];

const NABH_ITEMS = [
  { code:'MOM.3', desc:'Medical orders for AI-assisted decisions include human reviewer sign-off', status:'Pass', ev:'Radiologist sign-off policy v2.pdf' },
  { code:'IPB.7', desc:'Patient information includes AI involvement disclosure', status:'Pass', ev:'Consent form 2025 Q1.docx' },
  { code:'COP.4', desc:'Clinical AI failure mode documented and tested', status:'Fail', ev:null },
  { code:'FMS.8', desc:'AI systems listed in medical equipment register', status:'Pass', ev:'Equipment register Mar 2025.xlsx' },
  { code:'MOM.6', desc:'AI incident reporting integrated with NABH adverse events', status:'Warning', ev:'Partial implementation' },
  { code:'HIS.3', desc:'ABDM-linked consent records archived for 3 years', status:'Pass', ev:'ABDM consent archive log.pdf' },
];

const ABDM_RECORDS = [
  { sys:'ChestScan AI v3.1', src:'PHHR/ABHA', purpose:'Radiology consultation', expires:'30 Jun 2025', count:1482, ver:true },
  { sys:'SkinScan Derma', src:'ABHA Mobile App', purpose:'Dermatology screening', expires:'31 Mar 2025', count:234, ver:false },
  { sys:'PredictDiag v1.0', src:'HIP Gateway', purpose:'Disease risk scoring', expires:'15 Apr 2025', count:892, ver:true },
];

const STATUS_ICON: Record<string, { cls: string; icon: string }> = {
  Pass:    { cls:'text-emerald-700 bg-emerald-50 border-emerald-200', icon:'✓' },
  Fail:    { cls:'text-red-700 bg-red-50 border-red-200', icon:'✗' },
  Warning: { cls:'text-amber-700 bg-amber-50 border-amber-200', icon:'⚠' },
};

function NabhRow({ item }: { item: typeof NABH_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  const s = STATUS_ICON[item.status];
  return (
    <div className={`border rounded-xl overflow-hidden ${item.status==='Fail'?'border-red-200':item.status==='Warning'?'border-amber-200':'border-slate-200'}`}>
      <button onClick={()=>setOpen(o=>!o)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors text-left">
        <div className="flex items-center gap-4">
          <span className="font-black text-[11.5px] text-slate-400 shrink-0 w-16">{item.code}</span>
          <span className="font-semibold text-[13px] text-slate-800">{item.desc}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`px-2.5 py-1 rounded border text-[11px] font-black ${s.cls}`}>{s.icon} {item.status}</span>
          <ChevDown open={open}/>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-slate-100 flex gap-6 items-center pt-4">
          <div className="flex-1"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Evidence</p><p className="text-[12.5px] font-medium text-slate-700">{item.ev||'No evidence uploaded'}</p></div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white font-black text-[12px] rounded-lg hover:bg-indigo-700">{item.ev?'View Evidence':'Upload Evidence'}</button>
            {item.status!=='Pass' && <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold text-[12px] rounded-lg hover:bg-slate-50">Create Task</button>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HealthcarePage() {
  const [tab, setTab] = useState('Clinical AI Systems');

  return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Healthcare Suite</span></nav>
          <h1 className="text-2xl font-black text-slate-800">Healthcare Compliance Suite</h1>
          <p className="text-[12.5px] text-slate-500 mt-1 font-medium">NABH · ABDM · CDSCO SaMD · DPDPA Special Category</p>
        </div>
        <button className="bg-rose-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-rose-700 transition-all"><Plus /> Register AI System</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex overflow-x-auto">
          {['Clinical AI Systems','Validation Studies','Consent Records','ABDM Integration','CDSCO Registry','NABH Checklist'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-4 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60">
          {tab==='Clinical AI Systems' && (
            <div className="p-8 grid grid-cols-2 gap-5">
              {SYSTEMS.map(s=>(
                <div key={s.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-[15px] text-slate-800 group-hover:text-indigo-700 transition-colors">{s.name}</h3>
                      <p className="text-[12px] text-slate-500 font-medium mt-0.5">{s.type}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-black px-2 py-1 rounded ${s.risk==='High Risk'?'bg-rose-100 text-rose-700':'bg-amber-100 text-amber-700'}`}>{s.risk}</span>
                      {s.abdm && <span className="text-[10px] font-black px-2 py-1 rounded bg-indigo-100 text-indigo-700">ABDM ✓</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-full bg-slate-100 rounded-full h-2 mr-4">
                      <div className={`h-2 rounded-full ${s.score>=85?'bg-emerald-500':s.score>=65?'bg-amber-400':'bg-rose-500'}`} style={{width:`${s.score}%`}}/>
                    </div>
                    <span className={`font-black text-[14px] shrink-0 ${s.score>=85?'text-emerald-700':s.score>=65?'text-amber-600':'text-rose-600'}`}>{s.score}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-[11px] font-bold px-2 py-1 rounded ${s.val.includes('Validated')?'bg-emerald-50 text-emerald-700':s.val.includes('Pending')?'bg-amber-50 text-amber-700':'bg-slate-100 text-slate-600'}`}>{s.val}</span>
                    <button className="text-[12px] font-black text-indigo-600 hover:text-indigo-800">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab==='NABH Checklist' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-black text-[15px] text-slate-800">NABH Clinical AI Standards Checklist</h3>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">Monthly auto-check runs on 1st of every month. Last run: 1 Mar 2025</p>
                </div>
                <div className="flex gap-3">
                  {[{l:'Pass',n:4,c:'bg-emerald-100 text-emerald-700'},{l:'Warning',n:1,c:'bg-amber-100 text-amber-700'},{l:'Fail',n:1,c:'bg-red-100 text-red-700'}].map(x=>(
                    <div key={x.l} className={`${x.c} px-4 py-2 rounded-xl text-[12px] font-black`}>{x.l}: {x.n}</div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {NABH_ITEMS.map(item=><NabhRow key={item.code} item={item}/>)}
              </div>
            </div>
          )}

          {tab==='ABDM Integration' && (
            <div className="p-8 space-y-6">
              {/* Status card */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div>
                  <p className="font-black text-[16px] text-emerald-900">ABDM API Connection — Active</p>
                  <p className="text-[12.5px] text-emerald-700 font-medium mt-0.5">Health ID Gateway v4.2 · Last ping: 2 seconds ago · Uptime: 99.97%</p>
                </div>
                <button className="ml-auto border-2 border-emerald-300 text-emerald-700 font-black text-[12px] px-4 py-2 rounded-xl hover:bg-emerald-100">Test Connection</button>
              </div>
              {/* Consent table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="font-black text-[13px] text-slate-700 uppercase tracking-widest">Consent Record References</h3>
                </div>
                <table className="w-full text-[13px] text-left">
                  <thead><tr className="border-b border-slate-200">{['AI System','Consent Source','Purpose Codes','Expires','Count','Verified'].map(h=><th key={h} className="px-5 py-3 font-black text-[10px] text-slate-400 uppercase tracking-widest">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {ABDM_RECORDS.map(r=>(
                      <tr key={r.sys} className="hover:bg-slate-50">
                        <td className="px-5 py-4 font-bold text-slate-800">{r.sys}</td>
                        <td className="px-5 py-4 text-slate-500 text-[12px]">{r.src}</td>
                        <td className="px-5 py-4 text-slate-500 text-[12px]">{r.purpose}</td>
                        <td className="px-5 py-4"><span className={`text-[11px] font-black px-2 py-0.5 rounded ${new Date(r.expires)<new Date()?'bg-red-100 text-red-700':'bg-slate-100 text-slate-600'}`}>{r.expires}</span></td>
                        <td className="px-5 py-4 font-bold text-slate-700 tabular-nums">{r.count.toLocaleString()}</td>
                        <td className="px-5 py-4"><span className={`text-[11px] font-black ${r.ver?'text-emerald-600':'text-amber-600'}`}>{r.ver?'✓ Verified':'⚠ Unverified'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['Validation Studies','Consent Records','CDSCO Registry'].includes(tab) && (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
              <p className="font-black text-slate-500 uppercase tracking-widest">{tab}</p>
              <p className="text-[12px] text-slate-400 mt-1">Content is part of the enterprise healthcare workflow.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
