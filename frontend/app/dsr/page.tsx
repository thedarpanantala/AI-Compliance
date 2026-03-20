'use client';
import { useState, useEffect } from 'react';
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const X = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

function DaysTimer({ days }: { days: number }) {
  const color = days <= 5 ? 'text-red-600 bg-red-50 border-red-200' : days <= 14 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-emerald-600 bg-emerald-50 border-emerald-200';
  return <span className={`px-2.5 py-1 rounded border font-black text-[11px] ${color}`}>{days}d left</span>;
}

const REQS = [
  { id:'DSR-001', type:'Access', subject:'Priya Sharma (Patient ID 4421)', date:'01 Mar 2025', status:'In Progress', deadline: 19, assigned:'DPO Office' },
  { id:'DSR-002', type:'Erasure', subject:'Rajesh Kumar (Staff ID 8823)', date:'05 Mar 2025', status:'Received', deadline: 23, assigned:'IT Security' },
  { id:'DSR-003', type:'Correction', subject:'Meena Patel (Patient ID 2201)', date:'10 Mar 2025', status:'Fulfilled', deadline: 30, assigned:'Records Team' },
  { id:'DSR-004', type:'Nomination', subject:'Arjun Gill (Next of kin)', date:'12 Mar 2025', status:'Escalated', deadline: 6, assigned:'DPO Office' },
  { id:'DSR-005', type:'Grievance', subject:'Suman Das (Patient ID 9981)', date:'18 Mar 2025', status:'Received', deadline: 4, assigned:'CISO' },
];

const TYPE_C = { Access:'bg-blue-100 text-blue-700', Correction:'bg-amber-100 text-amber-700', Erasure:'bg-rose-100 text-rose-700', Nomination:'bg-purple-100 text-purple-700', Grievance:'bg-slate-100 text-slate-600' };
const STATUS_C = { Received:'bg-slate-100 text-slate-600', 'In Progress':'bg-blue-100 text-blue-700', Fulfilled:'bg-emerald-100 text-emerald-700', Rejected:'bg-red-100 text-red-700', Escalated:'bg-orange-100 text-orange-700' };

export default function DSRPage() {
  const [tab, setTab] = useState('All Requests');
  const [detail, setDetail] = useState<typeof REQS[0]|null>(null);
  const [detailTab, setDetailTab] = useState('Details');
  const [modal, setModal] = useState(false);

  if (detail) return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6">
        <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
          <span>Home</span><ChevR /><button onClick={()=>setDetail(null)} className="hover:text-indigo-600">Data Subject Requests</button><ChevR /><span className="text-slate-800 font-bold">{detail.id}</span>
        </nav>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-black text-slate-800 mb-2">{detail.type} Request — {detail.subject}</h1>
            <div className="flex gap-2 items-center">
              <span className={`text-[11px] font-black px-2.5 py-1 rounded ${TYPE_C[detail.type as keyof typeof TYPE_C]}`}>{detail.type}</span>
              <span className={`text-[11px] font-black px-2.5 py-1 rounded ${STATUS_C[detail.status as keyof typeof STATUS_C]}`}>{detail.status}</span>
              <DaysTimer days={detail.deadline} />
              <span className="text-[11px] text-slate-400 font-medium ml-2">DPDPA mandates response within 30 days</span>
            </div>
          </div>
          <button onClick={()=>setDetail(null)} className="text-slate-400 hover:text-slate-700"><X /></button>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['Details','Response','Audit Trail'].map(t=>(
            <button key={t} onClick={()=>setDetailTab(t)} className={`px-4 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${detailTab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>
        <div className="p-8">
          {detailTab==='Details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[['Request ID',detail.id],['Request Type',detail.type],['Date Received',detail.date],['Status',detail.status],['Assigned To',detail.assigned],['DPDPA Deadline',`${detail.deadline} days remaining`]].map(([k,v])=>(
                  <div key={k} className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k}</p>
                    <p className="font-bold text-slate-800">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Data Principal Request Details</label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700">Request submitted via patient portal on {detail.date}. The data principal has requested {detail.type.toLowerCase()} of their personal health data including EMR records, consent logs, and ABDM-linked data.</div>
              </div>
            </div>
          )}
          {detailTab==='Response' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                <p className="text-[12px] font-black text-indigo-800 uppercase tracking-widest mb-1">AI Draft Response Generated</p>
                <p className="text-[12px] text-indigo-700 font-medium">Review the auto-generated response below. Edit and send directly from this page. Response will be logged to the audit trail automatically.</p>
              </div>
              <textarea rows={8} defaultValue={`Dear ${detail.subject.split(' ').slice(0,2).join(' ')},\n\nThank you for your ${detail.type} request dated ${detail.date}.\n\nWe have verified your identity and are processing your request in accordance with the DPDPA 2023 (Section ${detail.type === 'Erasure' ? '13' : '11'}).\n\nWe will complete this request within 30 days. If you have any questions, contact our Grievance Officer at dpo@hospital.co.in.\n\nRegards,\nDPO Office — City General Hospital`}
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 resize-none transition-colors" />
              <div className="flex gap-3">
                <button className="flex-1 bg-slate-900 text-white font-black py-3 rounded-xl text-[13px] hover:bg-slate-800 transition-all">Send Response</button>
                <button className="px-6 py-3 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:bg-slate-50">Save Draft</button>
              </div>
            </div>
          )}
          {detailTab==='Audit Trail' && (
            <div className="space-y-4">
              {[{t:'20 Mar 10:00',e:'Response draft generated by AI agent',by:'System'},{t:'20 Mar 09:30',e:'Request assigned to DPO Office',by:'DPO Manager'},{t:'19 Mar 17:00',e:'Identity verification completed',by:'Front Desk'},{t:detail.date+' 09:15',e:'Request received via Patient Portal',by:'System (auto)'}].map((x,i)=>(
                <div key={i} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5 shrink-0"/>
                  <div><p className="font-bold text-[13px] text-slate-800">{x.e}</p><p className="text-[11px] text-slate-400 mt-0.5">{x.t} · {x.by}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Data Subject Requests</span></nav>
          <h1 className="text-2xl font-black text-slate-800">Data Subject Requests</h1>
          <p className="text-[12.5px] text-slate-500 mt-1 font-medium">DPDPA 2023 — All requests must be fulfilled within <strong>30 days</strong></p>
        </div>
        <button onClick={()=>setModal(true)} className="bg-indigo-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all"><Plus /> Log Request</button>
      </div>

      {/* banner for expiring requests */}
      {REQS.some(r=>r.deadline<=7&&r.status!=='Fulfilled') && (
        <div className="mb-5 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600 shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
          <p className="text-[12.5px] font-bold text-red-800">{REQS.filter(r=>r.deadline<=7&&r.status!=='Fulfilled').length} requests expiring within 7 days — immediate action required to avoid DPDPA non-compliance.</p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['All Requests','Create','Settings'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>
        {tab==='All Requests' && (
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                {['REQUEST ID','TYPE','SUBJECT','DATE','STATUS','DEADLINE','ASSIGNED','ACTIONS'].map(h=>(
                  <th key={h} className="px-5 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REQS.map(r=>(
                <tr key={r.id} className="hover:bg-slate-50 cursor-pointer bg-white">
                  <td className="px-5 py-4 font-bold text-indigo-600 text-[12px]">{r.id}</td>
                  <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] font-black ${TYPE_C[r.type as keyof typeof TYPE_C]}`}>{r.type}</span></td>
                  <td className="px-5 py-4 font-medium text-slate-700 text-[12px]">{r.subject}</td>
                  <td className="px-5 py-4 text-slate-400 text-[12px]">{r.date}</td>
                  <td className="px-5 py-4"><span className={`px-2 py-1 rounded text-[10px] font-black ${STATUS_C[r.status as keyof typeof STATUS_C]}`}>{r.status}</span></td>
                  <td className="px-5 py-4"><DaysTimer days={r.deadline}/></td>
                  <td className="px-5 py-4 text-[12px] text-slate-600">{r.assigned}</td>
                  <td className="px-5 py-4"><button onClick={()=>setDetail(r)} className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800">View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab!=='All Requests' && <div className="p-24 text-center text-slate-400 opacity-50"><p className="font-black uppercase tracking-widest">{tab}</p></div>}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[560px] p-8">
            <div className="flex justify-between mb-6"><h2 className="text-[18px] font-black text-slate-800">Log Data Subject Request</h2><button onClick={()=>setModal(false)}><X /></button></div>
            <div className="space-y-4">
              <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Request Type</label>
                <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-indigo-400"><option>Access</option><option>Correction</option><option>Erasure</option><option>Nomination</option><option>Grievance</option></select>
              </div>
              <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Data Principal Name</label><input placeholder="Full name of the data principal" className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-indigo-400"/></div>
              <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Contact Email / Phone</label><input placeholder="email or phone for response" className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-indigo-400"/></div>
              <div><label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Request Details</label><textarea rows={3} placeholder="What is the data principal requesting?" className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-indigo-400 resize-none"/></div>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[11.5px] font-bold text-indigo-700">⟳ 30-day DPDPA countdown will start from today's date automatically.</div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={()=>setModal(false)} className="flex-1 border-2 border-slate-200 rounded-xl py-3 text-[13px] font-bold text-slate-500">Cancel</button>
              <button onClick={()=>setModal(false)} className="flex-1 bg-indigo-600 text-white font-black rounded-xl py-3 text-[13px] hover:bg-indigo-700">Log Request →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
