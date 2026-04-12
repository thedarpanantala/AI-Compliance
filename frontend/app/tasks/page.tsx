'use client';
import { useState } from 'react';

const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const X = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
type KanbanCol = 'Open' | 'In Progress' | 'Blocked' | 'Completed' | 'Overdue';

const PRIO_C: Record<Priority, string> = {
  Critical: 'bg-red-100 text-red-700',
  High:     'bg-orange-100 text-orange-700',
  Medium:   'bg-amber-100 text-amber-700',
  Low:      'bg-slate-100 text-slate-500',
};

interface Task { id: string; title: string; priority: Priority; system: string; due: string; col: KanbanCol; assignee: string; }

const INIT: Task[] = [
  { id:'T-001', title:'Upload IRB approval for ChestScan AI', priority:'Critical', system:'ChestScan AI v3.1', due:'22 Mar 2025', col:'Open', assignee:'Darpan Antala' },
  { id:'T-002', title:'Conduct Cross-Border DPIA — ABDM', priority:'High', system:'ABDM Gateway', due:'25 Mar 2025', col:'In Progress', assignee:'DPO Office' },
  { id:'T-003', title:'Update Patient Privacy Notice v2', priority:'Medium', system:'Patient Portal', due:'30 Mar 2025', col:'Open', assignee:'Legal' },
  { id:'T-004', title:'Complete GPCB effluent self-monitoring report', priority:'High', system:'AirGuard MSME AI', due:'28 Mar 2025', col:'Blocked', assignee:'GPCB Liaison' },
  { id:'T-005', title:'NABH COP.4 documentation — fallback protocol', priority:'High', system:'ChestScan AI v3.1', due:'18 Mar 2025', col:'Overdue', assignee:'Clinical Lead' },
  { id:'T-006', title:'Enable ABDM Consent Expiry Alerts', priority:'Medium', system:'Consent Manager', due:'05 Apr 2025', col:'Completed', assignee:'IT Security' },
  { id:'T-007', title:'Validate SkinScan Derma bias test', priority:'Low', system:'SkinScan Derma', due:'15 Apr 2025', col:'Open', assignee:'Data Science' },
  { id:'T-008', title:'Complete ISO 42001 gap assessment', priority:'Medium', system:'Enterprise', due:'10 Apr 2025', col:'In Progress', assignee:'DPO Office' },
];

const APPROVALS = [
  { name:'ChestScan Clinical Risk Assessment', system:'ChestScan AI v3.1', by:'Dr. R. Mehta', date:'19 Mar 2025' },
  { name:'DPDPA DPIA — Patient Portal', system:'Patient Portal', by:'IT Security Team', date:'20 Mar 2025' },
  { name:'GPCB Q4 Emission Report', system:'AirGuard MSME AI', by:'GPCB Liaison', date:'22 Mar 2025' },
];

const WORKFLOWS = [
  { name:'Clinical AI Incident Resolution', template:'Incident Response', started:'18 Mar 2025', step:'Regulatory Notification', steps:5, current:4, owner:'DPO Office' },
  { name:'New AI System Onboarding — SepsisAlert', template:'AI System Lifecycle', started:'15 Mar 2025', step:'Risk Classification', steps:6, current:2, owner:'Clinical Lead' },
  { name:'Annual NABH Accreditation Renewal', template:'NABH Audit', started:'01 Mar 2025', step:'Evidence Upload', steps:7, current:5, owner:'Compliance Officer' },
];

const COLS: KanbanCol[] = ['Open','In Progress','Blocked','Completed','Overdue'];
const COL_C: Record<KanbanCol, string> = {
  'Open':       'bg-slate-100 text-slate-600',
  'In Progress':'bg-blue-100 text-blue-700',
  'Blocked':    'bg-orange-100 text-orange-700',
  'Completed':  'bg-emerald-100 text-emerald-700',
  'Overdue':    'bg-red-100 text-red-700',
};

function TaskCard({ task, onMove }: { task: Task; onMove: (id: string, col: KanbanCol) => void }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${task.col === 'Overdue' ? 'border-l-4 border-l-red-400' : task.col === 'Blocked' ? 'border-l-4 border-l-orange-400' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${PRIO_C[task.priority]}`}>{task.priority}</span>
        <span className="text-[10px] text-slate-400 font-medium">{task.id}</span>
      </div>
      <p className="font-bold text-[12.5px] text-slate-800 mb-2 leading-snug">{task.title}</p>
      <p className="text-[11px] text-slate-400 font-medium mb-3">{task.system}</p>
      <div className="flex justify-between items-center">
        <span className={`text-[11px] font-bold ${task.col === 'Overdue' ? 'text-red-600' : 'text-slate-500'}`}>Due {task.due}</span>
        <select value={task.col} onChange={e => onMove(task.id, e.target.value as KanbanCol)}
          className="text-[10px] font-black border border-slate-200 rounded-lg px-2 py-1 outline-none hover:border-indigo-300 transition-colors bg-white text-slate-500">
          {COLS.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100">
        <div className="w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[8px] font-black shrink-0">{task.assignee.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <span className="text-[11px] text-slate-500 font-medium">{task.assignee}</span>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [tab, setTab] = useState('My Tasks');
  const [tasks, setTasks] = useState(INIT);
  const [wfDetail, setWfDetail] = useState<typeof WORKFLOWS[0] | null>(null);

  function moveTask(id: string, col: KanbanCol) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, col } : t));
  }

  const myTasks = tasks.filter(t => t.assignee === 'Darpan Antala');

  return (
    <div className="w-full max-w-[1380px] mx-auto font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2"><span>Home</span><ChevR /><span className="text-slate-800 font-bold">Actions & Workflows</span></nav>
          <h1 className="text-2xl font-black text-slate-800">Actions & Workflows</h1>
        </div>
        <button className="bg-indigo-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all"><Plus /> New Task</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['My Tasks','All Tasks','Approvals','Workflows'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>
              {t}
              {t === 'Approvals' && <span className="ml-2 bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{APPROVALS.length}</span>}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto bg-slate-50/60">
          {(tab === 'My Tasks' || tab === 'All Tasks') && (
            <div className="p-6 flex gap-4 overflow-x-auto min-h-[520px]">
              {COLS.map(col => {
                const colTasks = (tab === 'My Tasks' ? myTasks : tasks).filter(t => t.col === col);
                return (
                  <div key={col} className="flex flex-col gap-3 min-w-[240px] shrink-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-black px-3 py-1.5 rounded-full ${COL_C[col]}`}>{col}</span>
                      <span className="text-[11px] font-black text-slate-400">{colTasks.length}</span>
                    </div>
                    {colTasks.map(task => <TaskCard key={task.id} task={task} onMove={moveTask}/>)}
                    {colTasks.length === 0 && (
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                        <p className="text-[11px] text-slate-400 font-medium">No tasks</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'Approvals' && (
            <div>
              <div className="px-6 py-3 bg-white border-b border-slate-200">
                <p className="text-[12px] font-bold text-slate-500">{APPROVALS.length} items awaiting your approval</p>
              </div>
              <table className="w-full text-left text-[13px] bg-white">
                <thead>
                  <tr className="border-b border-slate-200">
                    {['ASSESSMENT','SYSTEM','SUBMITTED BY','DATE','ACTIONS'].map(h => (
                      <th key={h} className="px-5 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {APPROVALS.map(a => (
                    <tr key={a.name} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-bold text-slate-800">{a.name}</td>
                      <td className="px-5 py-4 text-slate-500 text-[12px]">{a.system}</td>
                      <td className="px-5 py-4 text-slate-500 text-[12px]">{a.by}</td>
                      <td className="px-5 py-4 text-slate-400 text-[12px]">{a.date}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="text-[12px] font-black text-indigo-600 hover:text-indigo-800 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all">Preview</button>
                          <button className="text-[12px] font-black text-white bg-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-all">Approve ✓</button>
                          <button className="text-[12px] font-black text-white bg-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-700 transition-all">Reject ✗</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'Workflows' && (
            <div className="p-6 space-y-4">
              {WORKFLOWS.map(w => (
                <div key={w.name} onClick={() => setWfDetail(w)} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-300 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-black text-[14px] text-slate-800 group-hover:text-indigo-700">{w.name}</p>
                      <p className="text-[12px] text-slate-400 font-medium mt-0.5">Template: {w.template} · Owner: {w.owner}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-indigo-50 text-indigo-700 font-black text-[11px] px-2.5 py-1 rounded">{w.step}</span>
                      <span className="text-[11px] text-slate-400">Step {w.current}/{w.steps}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{width:`${(w.current/w.steps)*100}%`}}/>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">Started {w.started} · {Math.round((w.current/w.steps)*100)}% complete</p>
                </div>
              ))}

              {/* Workflow detail panel */}
              {wfDetail && (
                <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div><h3 className="font-black text-[16px] text-slate-800">{wfDetail.name}</h3><p className="text-[12px] text-slate-400 mt-0.5">{wfDetail.template} · {wfDetail.owner}</p></div>
                      <button onClick={() => setWfDetail(null)}><X /></button>
                    </div>
                    <div className="space-y-3">
                      {Array.from({length: wfDetail.steps}, (_,i) => i + 1).map(s => {
                        const done = s < wfDetail.current;
                        const active = s === wfDetail.current;
                        const labels: Record<string, string[]> = {
                          'Incident Response': ['Incident Logged','Triage Complete','DPO Review','Regulatory Notification','Resolution & Sign-off'],
                          'AI System Lifecycle': ['System Registered','Risk Classification','Impact Assessment','Controls Review','Evidence Upload','Approval & Activation'],
                          'NABH Audit': ['Scope Definition','Checklist Review','Evidence Upload','Gap Remediation','Internal Audit','Regulator Submission','Accreditation'],
                        };
                        const label = labels[wfDetail.template]?.[s-1] || `Step ${s}`;
                        return (
                          <div key={s} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${active ? 'border-indigo-400 bg-indigo-50' : done ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[12px] shrink-0 ${active ? 'bg-indigo-600 text-white' : done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {done ? '✓' : s}
                            </div>
                            <div className="flex-1">
                              <p className={`font-bold text-[13px] ${active ? 'text-indigo-800' : done ? 'text-emerald-800' : 'text-slate-400'}`}>{label}</p>
                              {active && <p className="text-[11px] text-indigo-600 font-medium mt-0.5">Current step — action required</p>}
                            </div>
                            {active && <button className="bg-indigo-600 text-white font-black text-[11.5px] px-4 py-2 rounded-lg hover:bg-indigo-700">Act →</button>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
