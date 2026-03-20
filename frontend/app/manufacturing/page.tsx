'use client';
import { useState } from 'react';
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const ChevDown = ({ open }: { open: boolean }) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${open?'rotate-180':''}`}><path d="m6 9 6 6 6-6"/></svg>;

const SITES = [
  { name:'Ahmedabad Textile Unit', loc:'Ahmedabad, Gujarat', cat:'Red', sector:'Textiles / Garments', markets:['EU / CS3D','H&M','Zara'], score:68 },
  { name:'Surat Dye Processing', loc:'Surat, Gujarat', cat:'Orange', sector:'Chemical Processing', markets:['CBAM','Decathlon'], score:52 },
  { name:'Rajkot Auto Components', loc:'Rajkot, Gujarat', cat:'Green', sector:'Auto Parts MSME', markets:['ISO 14001','Domestic'], score:81 },
];

const CAT_COLOR: Record<string, string> = { Red:'bg-red-600 text-white', Orange:'bg-orange-500 text-white', Green:'bg-emerald-600 text-white', White:'bg-slate-100 text-slate-600' };

const HEATMAP = [
  { domain:'🌿 Environment', score:58, issues:3, tasks:5, color:'amber' },
  { domain:'👷 Labour', score:88, issues:0, tasks:1, color:'emerald' },
  { domain:'🦺 Safety', score:74, issues:1, tasks:2, color:'amber' },
  { domain:'🤖 AI Governance', score:62, issues:2, tasks:4, color:'amber' },
  { domain:'📊 ESG / Export', score:45, issues:4, tasks:7, color:'rose' },
];

const EVIDENCE_CATS: Array<{ name: string; items: Array<{ name: string; due: string; status: 'Done'|'Overdue'|'Pending' }> }> = [
  { name:'Environment', items:[{name:'PM2.5 Monthly Reading Submission',due:'28 Mar',status:'Done'},{name:'Liquid Effluent COD Report',due:'31 Mar',status:'Pending'},{name:'Stack emission GPCB consent renewal',due:'15 Apr',status:'Pending'}] },
  { name:'Labour', items:[{name:'Wage register — March 2025',due:'05 Apr',status:'Pending'},{name:'ESI contribution proof',due:'15 Apr',status:'Pending'}] },
  { name:'AI Oversight', items:[{name:'ChestScan AI drift report',due:'01 Mar',status:'Done'},{name:'AirGuard AI threshold audit',due:'20 Mar',status:'Overdue'}] },
];

const BUYERS = [
  { name:'H&M', fw:'CS3D / Higg FEM', pct:72, reqs:['Supply chain due diligence','Scope 1+2 emissions verified','AI governance attestation','Worker rights declaration'] },
  { name:'Zara / Inditex', fw:'Inditex RSC', pct:58, reqs:['RSL compliance','Chemical safety test reports','GPCB consent valid','Fair pay evidence'] },
  { name:'Decathlon', fw:'Decathlon DQS', pct:84, reqs:['ISO 14001 certification','OEKO-TEX standard 100','CBAM declaration','Social audit passed'] },
];

const ESG_TABLE = [
  { period:'Q1 2025',type:'CBAM (Carbon)',pct:68,verified:false},
  { period:'Q1 2025',type:'CS3D Supply Chain',pct:72,verified:false},
  { period:'FY2024',type:'BRSR ESG Report',pct:91,verified:true},
  { period:'FY2024',type:'Scope 1+2 GHG',pct:85,verified:true},
];

function EvidenceSec({ cat }: { cat: typeof EVIDENCE_CATS[0] }) {
  const [open, setOpen] = useState(true);
  const S: Record<string, string> = { Done:'text-emerald-700', Overdue:'text-red-700', Pending:'text-amber-700' };
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={()=>setOpen(o=>!o)} className="w-full flex items-center justify-between px-5 py-3 bg-slate-50 hover:bg-slate-100 transition-colors">
        <span className="font-black text-[13px] text-slate-700">{cat.name}</span>
        <ChevDown open={open}/>
      </button>
      {open && (
        <div className="divide-y divide-slate-100">
          {cat.items.map(item=>(
            <div key={item.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-black w-12 shrink-0 ${S[item.status]}`}>{item.status}</span>
                <span className="text-[13px] font-medium text-slate-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-slate-400 font-medium">Due {item.due}</span>
                {item.status!=='Done' && <button className="px-3 py-1.5 bg-indigo-600 text-white font-black text-[11px] rounded-lg hover:bg-indigo-700">Upload</button>}
               {item.status==='Done' && <button className="px-3 py-1.5 border border-slate-200 text-slate-500 font-bold text-[11px] rounded-lg">View</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ManufacturingPage() {
  const [tab, setTab] = useState('Factory Sites');
  const [selectedSite, setSelectedSite] = useState<typeof SITES[0]|null>(null);
  const [siteTab, setSiteTab] = useState('Compliance Heatmap');
  const [month, setMonth] = useState('Mar 2025');

  if (selectedSite) {
    const done = EVIDENCE_CATS.flatMap(c=>c.items).filter(i=>i.status==='Done').length;
    const overdue = EVIDENCE_CATS.flatMap(c=>c.items).filter(i=>i.status==='Overdue').length;
    const total = EVIDENCE_CATS.flatMap(c=>c.items).length;
    return (
      <div className="w-full max-w-[1380px] mx-auto font-sans">
        <div className="mb-6">
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
            <span>Home</span><ChevR /><button onClick={()=>setSelectedSite(null)} className="hover:text-indigo-600">Manufacturing Suite</button><ChevR /><span className="text-slate-800 font-bold">{selectedSite.name}</span>
          </nav>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-black text-slate-800">{selectedSite.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] font-black px-2 py-1 rounded ${CAT_COLOR[selectedSite.cat]}`}>{selectedSite.cat} Category</span>
                <span className="text-[12px] text-slate-400 font-medium">{selectedSite.loc} · {selectedSite.sector}</span>
                {selectedSite.markets.map(m=><span key={m} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{m}</span>)}
              </div>
            </div>
            <div className={`text-[28px] font-black ${selectedSite.score>=75?'text-emerald-700':selectedSite.score>=55?'text-amber-600':'text-rose-600'}`}>{selectedSite.score}<span className="text-[14px]">%</span></div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 pt-4 flex overflow-x-auto">
            {['Compliance Heatmap','Evidence Inbox','Clearances','ESG','Buyer Profiles','AI Systems'].map(t=>(
              <button key={t} onClick={()=>setSiteTab(t)} className={`px-4 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${siteTab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
            ))}
          </div>
          <div className="overflow-y-auto bg-slate-50/60" style={{maxHeight:'70vh'}}>
            {siteTab==='Compliance Heatmap' && (
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-5 gap-4">
                  {HEATMAP.map(h=>(
                    <div key={h.domain} className={`bg-white border-2 ${h.color==='rose'?'border-rose-200':h.color==='amber'?'border-amber-200':'border-emerald-200'} rounded-2xl p-5 shadow-sm`}>
                      <p className="font-black text-[12px] text-slate-700 mb-3">{h.domain}</p>
                      <p className={`text-[30px] font-black ${h.color==='rose'?'text-rose-600':h.color==='amber'?'text-amber-600':'text-emerald-600'}`}>{h.score}%</p>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2"><div className={`h-1.5 rounded-full ${h.color==='rose'?'bg-rose-500':h.color==='amber'?'bg-amber-500':'bg-emerald-500'}`} style={{width:`${h.score}%`}}/></div>
                      <div className="mt-3 flex justify-between text-[11px] font-bold text-slate-500">
                        <span className="text-rose-600">{h.issues} issues</span><span className="text-indigo-600">{h.tasks} tasks</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="font-black text-[12px] text-amber-900 uppercase tracking-widest mb-2">Clearance Expiry Alerts</p>
                  {[{name:'GPCB Air Consent',exp:'15 Apr 2025',days:26},{name:'Factory License Renewal',exp:'30 Apr 2025',days:41}].map(x=>(
                    <div key={x.name} className="flex items-center justify-between py-2 border-b border-amber-100 last:border-0">
                      <span className="text-[12.5px] font-semibold text-amber-900">{x.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-amber-700 font-medium">Expires {x.exp}</span>
                        <span className={`text-[11px] font-black px-2 py-0.5 rounded ${x.days<=30?'bg-red-100 text-red-700':'bg-amber-100 text-amber-700'}`}>{x.days}d</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {siteTab==='Evidence Inbox' && (
              <div className="p-8 space-y-5">
                <div className="flex justify-between items-center">
                  <select value={month} onChange={e=>setMonth(e.target.value)} className="border-2 border-slate-200 rounded-xl px-4 py-2 text-[13px] font-bold text-slate-700 outline-none focus:border-indigo-400">
                    {['Mar 2025','Feb 2025','Jan 2025'].map(m=><option key={m}>{m}</option>)}
                  </select>
                  <div className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl text-[12px] font-black">Done: {done}</span>
                    <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-xl text-[12px] font-black">Overdue: {overdue}</span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-[12px] font-black">Total: {total}</span>
                  </div>
                </div>
                {EVIDENCE_CATS.map(cat=><EvidenceSec key={cat.name} cat={cat}/>)}
              </div>
            )}
            {siteTab==='ESG' && (
              <div className="p-8">
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-[13px] text-left">
                    <thead><tr className="border-b border-slate-200 bg-slate-50">{['Period','Type','Completion','Verified','Download'].map(h=><th key={h} className="px-5 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest">{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {ESG_TABLE.map((r,i)=>(
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-5 py-4 font-bold text-slate-700">{r.period}</td>
                          <td className="px-5 py-4 text-slate-600">{r.type}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2"><div className="w-20 bg-slate-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${r.pct>=80?'bg-emerald-500':r.pct>=60?'bg-amber-400':'bg-rose-500'}`} style={{width:`${r.pct}%`}}/></div><span className="font-black text-[12px] text-slate-700">{r.pct}%</span></div>
                          </td>
                          <td className="px-5 py-4"><span className={`text-[11px] font-black ${r.verified?'text-emerald-700':'text-amber-600'}`}>{r.verified?'✓ Verified':'Pending'}</span></td>
                          <td className="px-5 py-4"><button className="text-[12px] font-black text-indigo-600 hover:text-indigo-800">↓ Download</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {siteTab==='Buyer Profiles' && (
              <div className="p-8 grid grid-cols-3 gap-5">
                {BUYERS.map(b=>(
                  <div key={b.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div><p className="font-black text-[16px] text-slate-800">{b.name}</p><p className="text-[11.5px] text-slate-500 font-medium mt-0.5">{b.fw}</p></div>
                      <span className={`text-[16px] font-black ${b.pct>=80?'text-emerald-700':b.pct>=60?'text-amber-600':'text-rose-600'}`}>{b.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-4"><div className={`h-2 rounded-full ${b.pct>=80?'bg-emerald-500':b.pct>=60?'bg-amber-400':'bg-rose-500'}`} style={{width:`${b.pct}%`}}/></div>
                    <div className="space-y-2">
                      {b.reqs.map(r=>(
                        <div key={r} className="flex items-center gap-2 text-[12px]">
                          <span className="text-emerald-500 shrink-0">✓</span>
                          <span className="font-medium text-slate-700">{r}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 border-2 border-slate-200 text-slate-600 font-black text-[12px] py-2 rounded-xl hover:bg-slate-50">View All Requirements →</button>
                  </div>
                ))}
              </div>
            )}
            {['Clearances','AI Systems'].includes(siteTab) && (
              <div className="flex flex-col items-center justify-center p-24 opacity-40">
                <p className="font-black text-slate-500 uppercase tracking-widest">{siteTab}</p>
              </div>
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
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Manufacturing Suite</span></nav>
          <h1 className="text-2xl font-black text-slate-800">MSME / Manufacturing Compliance</h1>
          <p className="text-[12.5px] text-slate-500 mt-1 font-medium">GPCB · CBAM · CS3D · BRSR ESG · Buyer Profiles</p>
        </div>
        <button className="bg-indigo-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all">+ Add Factory Site</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex overflow-x-auto">
          {['Factory Sites','Emission Sources','Clearances','Evidence Inbox','ESG Disclosures','Buyer Profiles','GPCB Reports'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-4 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab===t?'text-indigo-600 border-b-2 border-indigo-600':'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto bg-slate-50/60">
          {tab==='Factory Sites' && (
            <div className="p-8 grid grid-cols-3 gap-5">
              {SITES.map(s=>(
                <div key={s.name} onClick={()=>setSelectedSite(s)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded ${CAT_COLOR[s.cat]}`}>{s.cat} Category</span>
                    <span className={`text-[24px] font-black ${s.score>=75?'text-emerald-700':s.score>=55?'text-amber-600':'text-rose-600'}`}>{s.score}%</span>
                  </div>
                  <h3 className="font-black text-[15px] text-slate-800 group-hover:text-indigo-700 mt-3 mb-1 transition-colors">{s.name}</h3>
                  <p className="text-[12px] text-slate-400 font-medium mb-3">{s.loc} · {s.sector}</p>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                    <div className={`h-1.5 rounded-full ${s.score>=75?'bg-emerald-500':s.score>=55?'bg-amber-400':'bg-rose-500'}`} style={{width:`${s.score}%`}}/>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.markets.map(m=><span key={m} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{m}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-slate-900 text-white font-black text-[11.5px] py-2 rounded-xl hover:bg-slate-800 transition-all">View Details</button>
                    <button className="px-3 py-2 border-2 border-slate-200 text-slate-500 font-bold text-[11.5px] rounded-xl hover:bg-slate-50">Run Check</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab!=='Factory Sites' && (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
              <p className="font-black text-slate-500 uppercase tracking-widest">{tab}</p>
              <p className="text-[12px] text-slate-400 mt-1">Open a factory site to access this tab.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
