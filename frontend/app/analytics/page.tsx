'use client';
import { useState } from 'react';

const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;

const FRAMEWORKS = ['EU AI Act','DPDPA','ISO 42001','NABH','CDSCO SaMD','NIST AI RMF'];
const AI_SYSTEMS = ['ChestScan AI','PredictDiag','SkinScan','Fall Detect','AirGuard'];

// heatmap data: score 0-100 per [system][framework]
const HEATMAP: number[][] = [
  [72, 88,  61, 95, 80, 55],
  [45, 70,  40, 60, 55, 38],
  [90, 92,  75, 98, 88, 70],
  [58, 65,  52, 72, 60, 48],
  [40, 55,  35, 30, 50, 42],
];

function heatColor(v: number) {
  if (v >= 80) return { bg: 'bg-emerald-500', text: 'text-white' };
  if (v >= 65) return { bg: 'bg-lime-400', text: 'text-slate-800' };
  if (v >= 50) return { bg: 'bg-amber-400', text: 'text-slate-800' };
  if (v >= 35) return { bg: 'bg-orange-500', text: 'text-white' };
  return { bg: 'bg-red-600', text: 'text-white' };
}

const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const SCORE_TREND = [68,70,69,72,74,71,75,78,76,80,82,85];
const EVIDENCE_VOLS = [12,18,14,22,8,30,25,28,35,40,38,45];
const OPEN_TASKS = [15,18,20,16,22,19,17,21,18,15,12,9];
const CLOSED_TASKS = [8,10,12,14,10,16,15,18,20,22,25,28];
const AGENT_DAILY = [12,25,18,30,22,35,28,40,32,45,38,50,42];

const TOP_QS = [
  {q:'What am I missing for EU AI Act?', n:142},
  {q:'Draft my clinical risk assessment', n:98},
  {q:'Which controls are failing?', n:87},
  {q:'What does DPDPA require?', n:76},
  {q:'When does NABH accreditation expire?', n:61},
  {q:'Explain Annex III risk classification', n:55},
  {q:'Help with GPCB effluent report', n:44},
];

function MiniBar({ vals, max, color='bg-indigo-500', h=60 }: { vals: number[]; max: number; color?: string; h?: number }) {
  return (
    <div className="flex items-end gap-1" style={{height: `${h}px`}}>
      {vals.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0">
          <div className={`w-full ${color} rounded-t opacity-80 hover:opacity-100 transition-opacity`} style={{height: `${(v / max) * h}px`}} title={String(v)}/>
        </div>
      ))}
    </div>
  );
}

function SparkLine({ vals, max, color='#4f46e5' }: { vals: number[]; max: number; color?: string }) {
  const W = 300; const H = 80;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * W},${H - (v / max) * H}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:80}}>
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" points={pts}/>
      {vals.map((v,i) => <circle key={i} cx={(i/(vals.length-1))*W} cy={H-(v/max)*H} r="3" fill={color}/>)}
    </svg>
  );
}

export default function AnalyticsPage() {
  const [tab, setTab] = useState('Overview');
  const [heatCell, setHeatCell] = useState<{sys: number; fw: number} | null>(null);

  return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6">
        <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Analytics & Telemetry</span></nav>
        <h1 className="text-2xl font-black text-slate-800">Analytics & Telemetry</h1>
        <p className="text-[12.5px] text-slate-500 mt-1 font-medium">Organisation-wide compliance intelligence and AI agent usage metrics</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['Overview','Compliance Trends','Risk Heatmap','Agent Usage'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>{t}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/60">
          {tab === 'Overview' && (
            <div className="p-8 space-y-6">
              {/* KPI row */}
              <div className="grid grid-cols-4 gap-5">
                {[
                  {l:'Overall Compliance Score', v:'82%', delta:'+3% vs last month', up:true},
                  {l:'Controls Assessed', v:'47/52', delta:'90% pass rate', up:true},
                  {l:'Evidence Uploads (Mar)', v:'45', delta:'+18% vs Feb', up:true},
                  {l:'Open Tasks', v:'9', delta:'−6 vs last month', up:true},
                ].map(k => (
                  <div key={k.l} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{k.l}</p>
                    <p className="text-[32px] font-black text-slate-800 tabular-nums">{k.v}</p>
                    <p className={`text-[11.5px] font-bold mt-1 ${k.up ? 'text-emerald-600' : 'text-rose-600'}`}>{k.up ? '↑ ' : '↓ '}{k.delta}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-black text-[11px] text-slate-500 uppercase tracking-widest mb-4">Compliance Score Over Time</h3>
                  <SparkLine vals={SCORE_TREND} max={100}/>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                    <span>{MONTHS[0]}</span><span>{MONTHS[6]}</span><span>{MONTHS[11]}</span>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-black text-[11px] text-slate-500 uppercase tracking-widest mb-4">Evidence Upload Volume</h3>
                  <MiniBar vals={EVIDENCE_VOLS} max={50} color="bg-violet-500"/>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                    <span>{MONTHS[0]}</span><span>{MONTHS[6]}</span><span>{MONTHS[11]}</span>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm col-span-2">
                  <h3 className="font-black text-[11px] text-slate-500 uppercase tracking-widest mb-4">Open vs Closed Tasks Over Time</h3>
                  <div className="flex items-end gap-2 h-[80px]">
                    {MONTHS.map((m,i) => (
                      <div key={m} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex gap-0.5 items-end" style={{height:70}}>
                          <div className="flex-1 bg-rose-400 rounded-t opacity-80" style={{height:`${(OPEN_TASKS[i]/45)*70}px`}}/>
                          <div className="flex-1 bg-emerald-400 rounded-t opacity-80" style={{height:`${(CLOSED_TASKS[i]/45)*70}px`}}/>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold">{m}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-6 mt-2">
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-400 rounded"/><span className="text-[11px] font-bold text-slate-500">Open</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-400 rounded"/><span className="text-[11px] font-bold text-slate-500">Closed</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'Compliance Trends' && (
            <div className="p-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-black text-[11px] text-slate-500 uppercase tracking-widest mb-6">Compliance Score Trend by Framework</h3>
                <div className="space-y-5">
                  {[
                    {fw:'EU AI Act 2024', vals:[60,62,65,68,70,69,72,74,73,76,78,80]},
                    {fw:'DPDPA 2023',     vals:[75,78,80,82,80,83,84,86,85,87,88,90]},
                    {fw:'NABH AI',        vals:[80,82,84,85,86,88,90,91,92,93,94,95]},
                    {fw:'ISO 42001',      vals:[40,42,45,48,50,52,54,56,58,60,61,63]},
                  ].map(f => (
                    <div key={f.fw}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[12.5px] font-bold text-slate-700">{f.fw}</span>
                        <span className="font-black text-[13px] text-slate-800">{f.vals[f.vals.length-1]}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{width:`${f.vals[f.vals.length-1]}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'Risk Heatmap' && (
            <div className="p-8">
              <p className="text-[13px] font-medium text-slate-500 mb-6">Click a cell to drill into control details. X-axis: Frameworks · Y-axis: AI Systems</p>
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {/* header */}
                <div className="grid bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest" style={{gridTemplateColumns:`140px repeat(${FRAMEWORKS.length}, 1fr)`}}>
                  <div className="px-4 py-3 opacity-0">—</div>
                  {FRAMEWORKS.map(f => <div key={f} className="px-2 py-3 text-center">{f}</div>)}
                </div>
                {AI_SYSTEMS.map((sys, si) => (
                  <div key={sys} className="grid border-b border-slate-100 last:border-0" style={{gridTemplateColumns:`140px repeat(${FRAMEWORKS.length}, 1fr)`}}>
                    <div className="px-4 py-4 font-bold text-[12px] text-slate-700 border-r border-slate-100 flex items-center">{sys}</div>
                    {FRAMEWORKS.map((fw, fi) => {
                      const v = HEATMAP[si][fi];
                      const { bg, text } = heatColor(v);
                      const active = heatCell?.sys === si && heatCell?.fw === fi;
                      return (
                        <button key={fw} onClick={() => setHeatCell(active ? null : {sys:si, fw:fi})}
                          className={`${bg} ${text} font-black text-[13px] py-4 text-center hover:opacity-90 transition-all ${active ? 'ring-2 ring-inset ring-white' : ''}`}>
                          {v}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-[11px] font-bold text-slate-400">Score:</span>
                {[{l:'≥80 Compliant',c:'bg-emerald-500'},{l:'65–79 Good',c:'bg-lime-400'},{l:'50–64 Partial',c:'bg-amber-400'},{l:'35–49 At Risk',c:'bg-orange-500'},{l:'<35 Critical',c:'bg-red-600'}].map(x=>(
                  <div key={x.l} className="flex items-center gap-1.5"><div className={`w-3 h-3 ${x.c} rounded`}/><span className="text-[11px] font-bold text-slate-500">{x.l}</span></div>
                ))}
              </div>

              {/* Drilldown */}
              {heatCell && (
                <div className="mt-6 bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-black text-[14px] text-slate-800 mb-1">{AI_SYSTEMS[heatCell.sys]} × {FRAMEWORKS[heatCell.fw]}</h3>
                  <p className="text-[12px] text-slate-500 font-medium mb-4">Score: <strong>{HEATMAP[heatCell.sys][heatCell.fw]}%</strong> — {HEATMAP[heatCell.sys][heatCell.fw] >= 65 ? 'Generally compliant. Minor gaps below.' : 'Significant gaps requiring immediate action.'}</p>
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                      <span className="text-[12.5px] font-medium text-slate-700">Control {i} — Sample control title for {FRAMEWORKS[heatCell.fw]}</span>
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded ${i===2?'bg-rose-100 text-rose-700':'bg-emerald-100 text-emerald-700'}`}>{i===2?'Gap':'✓ Compliant'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'Agent Usage' && (
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-3 gap-5">
                {[{l:'Conversations this month', v:'342'},{l:'Tokens used (Mar)', v:'1.2M'},{l:'Est. cost (Mar)', v:'₹840'}].map(k => (
                  <div key={k.l} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{k.l}</p>
                    <p className="text-[28px] font-black text-slate-800">{k.v}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-black text-[11px] text-slate-500 uppercase tracking-widest mb-4">Conversations per Day (Last 13 days)</h3>
                <MiniBar vals={AGENT_DAILY} max={55} color="bg-violet-500" h={80}/>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-black text-[11px] text-slate-500 uppercase tracking-widest mb-4">Top Questions Asked</h3>
                <div className="space-y-3">
                  {TOP_QS.map(q => (
                    <div key={q.q} className="flex items-center gap-3">
                      <div className="flex-1 flex items-center gap-3">
                        <span className="text-[12.5px] font-medium text-slate-700 flex-1">{q.q}</span>
                        <div className="w-[160px] bg-slate-100 rounded-full h-1.5 shrink-0">
                          <div className="bg-violet-500 h-1.5 rounded-full" style={{width:`${(q.n/142)*100}%`}}/>
                        </div>
                      </div>
                      <span className="font-black text-[12px] text-slate-500 w-10 text-right shrink-0">{q.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-black text-[11px] text-slate-500 uppercase tracking-widest mb-4">Plan Usage</h3>
                <div className="space-y-3">
                  {[{l:'Tokens used', used:1.2, max:5, unit:'M'},{l:'Storage used', used:2.8, max:10, unit:'GB'},{l:'API calls', used:342, max:1000, unit:''}].map(p=>(
                    <div key={p.l}>
                      <div className="flex justify-between text-[12px] font-bold text-slate-600 mb-1.5">
                        <span>{p.l}</span><span>{p.used}{p.unit} / {p.max}{p.unit}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${(p.used/p.max)>0.8?'bg-rose-500':(p.used/p.max)>0.6?'bg-amber-400':'bg-indigo-600'}`} style={{width:`${(p.used/p.max)*100}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
