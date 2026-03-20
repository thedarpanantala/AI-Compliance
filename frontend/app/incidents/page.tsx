'use client';
import { useState } from 'react';
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const X = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const SEV = { Critical:'bg-red-100 text-red-700', High:'bg-rose-100 text-rose-700', Medium:'bg-amber-100 text-amber-700', Low:'bg-emerald-100 text-emerald-700'};
const STATUS_C = { New:'bg-slate-100 text-slate-600', 'Under Review':'bg-blue-100 text-blue-700', Escalated:'bg-orange-100 text-orange-700', 'Reported to Regulator':'bg-purple-100 text-purple-700', Resolved:'bg-emerald-100 text-emerald-700', Closed:'bg-slate-200 text-slate-500'};

const INCIDENTS = [
  { id:'INC-001', date:'20 Mar 2025', status:'Escalated', sev:'Critical', desc:'False negative in TB screening — treatment delayed 11 days', cls:'Clinical AI Error / False Negative', sys:'ChestScan v3.1', assigned:'Dr. Sarah Johnson', modified:'Today 09:14' },
  { id:'INC-002', date:'18 Mar 2025', status:'Under Review', sev:'High', desc:'Unauthorised access to patient ABDM records via API', cls:'Unauthorised Access / DPDPA Violation', sys:'ABDM Gateway', assigned:'IT Security Team', modified:'18 Mar 14:32' },
  { id:'INC-003', date:'15 Mar 2025', status:'Reported to Regulator', sev:'High', desc:'PM2.5 sensor AI threshold breach — factory emission spike undetected', cls:'Environmental Threshold Breach', sys:'AirGuard MSME AI', assigned:'GPCB Liaison', modified:'16 Mar 10:00' },
  { id:'INC-004', date:'10 Mar 2025', status:'Resolved', sev:'Medium', desc:'Consent expiry not flagged — 14 data principals affected', cls:'Consent Failure', sys:'Consent Manager', assigned:'DPO Office', modified:'12 Mar 08:00' },
];

const METRIC_CARDS = [
  { label: 'Total This Month', value: '12', color: 'text-slate-800', bg: 'bg-white' },
  { label: 'Critical Open', value: '3', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
  { label: 'Reported to Regulator', value: '2', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  { label: 'Resolved', value: '7', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
];

const REGULATORS = [
  { id: 'cdsco', name: 'CDSCO', sub: 'Medical AI / Class B-D Device', icon: '🏥' },
  { id: 'dpdp', name: 'DPDP Board', sub: 'Data Breach / DPDPA Violation', icon: '🔐' },
  { id: 'gpcb', name: 'GPCB / CPCB', sub: 'Emissions AI Threshold', icon: '🌿' },
  { id: 'aerb', name: 'AERB', sub: 'Radiation AI Anomaly', icon: '☢️' },
  { id: 'nabh', name: 'NABH', sub: 'Clinical AI Incident', icon: '🏨' },
];

export default function IncidentsPage() {
  const [tab, setTab] = useState('Overview');
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState('');
  const [detail, setDetail] = useState<typeof INCIDENTS[0] | null>(null);
  const [detailTab, setDetailTab] = useState('Details');

  if (detail) {
    return (
      <div className="w-full max-w-[1380px] mx-auto font-sans">
        <div className="mb-6">
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
            <span>Home</span><ChevR /><button onClick={()=>setDetail(null)} className="hover:text-indigo-600">Incidents & Breaches</button><ChevR /><span className="text-slate-800 font-bold">{detail.id}</span>
          </nav>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-black text-slate-800 mb-1">{detail.desc}</h1>
              <span className={`text-[11px] font-black px-2.5 py-1 rounded ${SEV[detail.sev as keyof typeof SEV]}`}>{detail.sev}</span>
              <span className={`ml-2 text-[11px] font-black px-2.5 py-1 rounded ${STATUS_C[detail.status as keyof typeof STATUS_C]}`}>{detail.status}</span>
            </div>
            <button onClick={()=>setDetail(null)} className="text-slate-400 hover:text-slate-700"><X /></button>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 pt-4 flex">
            {['Details','Timeline','Evidence','Regulatory Reporting','Comments'].map(t=>(
              <button key={t} onClick={()=>setDetailTab(t)} className={`px-4 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${detailTab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
            ))}
          </div>
          <div className="p-8">
            {detailTab==='Details' && (
              <div className="grid grid-cols-2 gap-6">
                {[['Incident ID', detail.id],['Date', detail.date],['Classification', detail.cls],['System', detail.sys],['Assigned To', detail.assigned],['Last Modified', detail.modified]].map(([k,v])=>(
                  <div key={k} className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k}</p>
                    <p className="font-bold text-slate-800 text-[13.5px]">{v}</p>
                  </div>
                ))}
              </div>
            )}
            {detailTab==='Timeline' && (
              <div className="space-y-6">
                {[{t:'20 Mar 09:14',e:'Escalated to Clinical Lead',by:'System (auto)'},{t:'20 Mar 08:30',e:'Incident reviewed by DPO',by:'DPO Office'},{t:'20 Mar 07:45',e:'Incident logged and triaged',by:'Nurse Supervisor'},{t:'19 Mar 22:10',e:'AI flag generated — no human review within SLA',by:'ChestScan v3.1'}].map((x,i)=>(
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center"><div className="w-3 h-3 bg-indigo-600 rounded-full mt-1"/>{i<3&&<div className="w-0.5 bg-slate-200 flex-1 mt-2"/>}</div>
                    <div className="pb-6">
                      <p className="font-black text-[13px] text-slate-800">{x.e}</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{x.t} · by {x.by}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {detailTab==='Regulatory Reporting' && (
              <div className="space-y-4">
                <p className="text-[13px] text-slate-600 font-medium mb-4">Select the regulatory body to notify and generate the required notification letter.</p>
                {REGULATORS.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-5 border-2 border-slate-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/20 transition-all">
                    <div className="flex items-center gap-4"><span className="text-[22px]">{r.icon}</span><div><p className="font-black text-[13.5px] text-slate-800">{r.name}</p><p className="text-[12px] text-slate-500 font-medium">{r.sub}</p></div></div>
                    <button className="bg-indigo-600 text-white font-black text-[11.5px] px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all">Generate Letter →</button>
                  </div>
                ))}
              </div>
            )}
            {['Evidence','Comments'].includes(detailTab) && (
              <div className="text-center py-12 text-slate-400"><p className="font-bold">{detailTab} section</p><p className="text-[12px] mt-1">Content loaded from incident workflow.</p></div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Incidents & Breaches</span></nav>
          <h1 className="text-2xl font-black text-slate-800">Incidents & Breaches</h1>
        </div>
        <button onClick={()=>setModal(true)} className="bg-rose-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-rose-700 transition-all"><Plus /> Log Incident</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['Overview','Incidents','Breaches','Reporting','Configuration'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60">
          {tab==='Overview' && (
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-4 gap-5">
                {METRIC_CARDS.map(m=>(
                  <div key={m.label} className={`${m.bg} border border-slate-200 rounded-2xl p-6 shadow-sm`}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                    <p className={`text-[40px] font-black ${m.color} tabular-nums`}>{m.value}</p>
                  </div>
                ))}
              </div>
              {/* sparkline chart */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-black text-[13px] text-slate-700 uppercase tracking-widest mb-6">Incident Trend — Last 12 Months</h3>
                <div className="flex items-end gap-3 h-[140px]">
                  {[2,1,3,4,2,5,3,6,4,7,9,12].map((v,i)=>(
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full rounded-t-md bg-rose-500 opacity-80 hover:opacity-100 transition-opacity" style={{height:`${v*10}px`}} title={`${v} incidents`}/>
                      <span className="text-[9px] text-slate-400 font-bold">{['A','M','J','J','A','S','O','N','D','J','F','M'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab==='Incidents' && (
            <table className="w-full text-left text-[13px] bg-white">
              <thead>
                <tr className="border-b border-slate-200">
                  {['INCIDENT ID & DATE','STATUS','SEVERITY','DESCRIPTION','CLASSIFICATION','SYSTEM','ASSIGNED TO','MODIFIED'].map(h=>(
                    <th key={h} className="px-5 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INCIDENTS.map(r=>(
                  <tr key={r.id} onClick={()=>setDetail(r)} className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-5 py-4"><div className="font-bold text-indigo-600 text-[12px]">{r.id}</div><div className="text-[10px] text-slate-400">{r.date}</div></td>
                    <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] font-black ${STATUS_C[r.status as keyof typeof STATUS_C]}`}>{r.status}</span></td>
                    <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] font-black ${SEV[r.sev as keyof typeof SEV]}`}>{r.sev}</span></td>
                    <td className="px-5 py-4 max-w-[200px]"><p className="text-[12px] font-semibold text-slate-700 leading-tight line-clamp-2">{r.desc}</p></td>
                    <td className="px-5 py-4 text-[11px] text-slate-500 font-medium max-w-[150px]">{r.cls}</td>
                    <td className="px-5 py-4 text-[12px] text-slate-600 font-medium">{r.sys}</td>
                    <td className="px-5 py-4 text-[12px] text-slate-600">{r.assigned}</td>
                    <td className="px-5 py-4 text-[11px] text-slate-400">{r.modified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {['Breaches','Reporting','Configuration'].includes(tab) && (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
              <p className="font-black text-slate-500 uppercase tracking-widest">{tab}</p>
            </div>
          )}
        </div>
      </div>

      {/* Create modal */}
      {modal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          {!mode ? (
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[640px] p-8">
              <div className="flex justify-between mb-6"><h2 className="text-[18px] font-black text-slate-800">Log an Incident</h2><button onClick={()=>setModal(false)}><X /></button></div>
              <div className="space-y-3">
                {[{id:'scratch',icon:'✏️',t:'From scratch',s:'Blank form, full control'},{id:'ai',icon:'🤖',t:'AI-assisted',s:'Describe the incident, agent fills in the form'},{id:'template',icon:'📋',t:'From template',s:'Pre-filled templates by incident type'}].map(m=>(
                  <button key={m.id} onClick={()=>setMode(m.id)} className="w-full flex items-center gap-4 p-5 border-2 border-slate-100 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-left group">
                    <span className="text-[24px]">{m.icon}</span>
                    <div><p className="font-black text-[14px] text-slate-800">{m.t}</p><p className="text-[12px] text-slate-500">{m.s}</p></div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[640px] p-8">
              <div className="flex justify-between mb-6"><h2 className="text-[18px] font-black text-slate-800">Incident Details</h2><button onClick={()=>{setModal(false);setMode('');}}><X /></button></div>
              <div className="space-y-4">
                <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Incident Description *</label><textarea rows={3} className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-indigo-400 resize-none" placeholder="What happened? Include date, time, clinical context…"/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Severity</label>
                    <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-indigo-400"><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
                  </div>
                  <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Classification</label>
                    <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-indigo-400"><option>Clinical AI Error</option><option>False Negative</option><option>False Positive</option><option>Data Breach</option><option>Unauthorised Access</option><option>Consent Failure</option><option>DPDPA Violation</option><option>Environmental Threshold Breach</option></select>
                  </div>
                </div>
                <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">AI System Involved</label>
                  <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-indigo-400"><option>ChestScan v3.1</option><option>ABDM Gateway</option><option>PredictDiag AI</option><option>AirGuard MSME AI</option></select>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={()=>setMode('')} className="px-6 py-2.5 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500">← Back</button>
                <button onClick={()=>{setModal(false);setMode('');}} className="px-8 py-3 bg-rose-600 text-white font-black rounded-xl text-[13px] hover:bg-rose-700">Log Incident →</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
