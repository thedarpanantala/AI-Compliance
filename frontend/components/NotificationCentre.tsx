'use client';
import { useState } from 'react';

interface NotifItem {
  id: string; level: 'critical'|'warning'|'success'|'info'|'task';
  title: string; sub: string; time: string; read: boolean;
}

const INIT_NOTIFS: NotifItem[] = [
  { id:'n1', level:'critical', title:'NABH accreditation expires in 7 days', sub:'Sahyadri Hospital — renew before 27 Mar 2025', time:'2m ago', read:false },
  { id:'n2', level:'warning',  title:'ETP effluent report overdue for March 2025', sub:'Rajlakshmi Textiles — GPCB submission pending', time:'14m ago', read:false },
  { id:'n3', level:'critical', title:'Compliance score dropped below 60%', sub:'SepsisAlert ICU Model — immediate review required', time:'1h ago', read:false },
  { id:'n4', level:'success',  title:'Monthly compliance check completed', sub:'3 critical items found — review recommended', time:'3h ago', read:true },
  { id:'n5', level:'info',     title:'Compliance report ready to download', sub:'February 2025 — Full NABH evidence bundle', time:'Yesterday', read:true },
  { id:'n6', level:'task',     title:'New task assigned to you', sub:'Upload IRB approval for ChestScan AI', time:'Yesterday', read:false },
  { id:'n7', level:'warning',  title:'ABDM consent for PredictDiag expiring', sub:'892 consent records expire 15 Apr 2025', time:'2d ago', read:true },
];

const ICON: Record<string, { emoji: string; ring: string; dot: string }> = {
  critical: { emoji:'🔴', ring:'border-red-200 bg-red-50',    dot:'bg-red-500' },
  warning:  { emoji:'🟡', ring:'border-amber-200 bg-amber-50', dot:'bg-amber-500' },
  success:  { emoji:'✅', ring:'border-emerald-200 bg-emerald-50', dot:'bg-emerald-500' },
  info:     { emoji:'📄', ring:'border-blue-200 bg-blue-50',   dot:'bg-blue-500' },
  task:     { emoji:'👤', ring:'border-indigo-200 bg-indigo-50', dot:'bg-indigo-500' },
};

export function NotificationCentre() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(INIT_NOTIFS);
  const [activeTab, setActiveTab] = useState<'All'|'Unread'|'Critical'>('All');

  const unreadCount = notifs.filter(n => !n.read).length;

  function markRead(id: string) { setNotifs(prev => prev.map(n => n.id === id ? {...n, read:true} : n)); }
  function markAllRead() { setNotifs(prev => prev.map(n => ({...n, read:true}))); }

  const displayed = notifs.filter(n => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Critical') return n.level === 'critical';
    return true;
  });

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="relative p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" aria-label="Notifications">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white">{unreadCount}</span>
        )}
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)}/>
          {/* panel */}
          <div className="absolute right-0 top-10 z-40 w-[400px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{maxHeight:'80vh'}}>
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="font-black text-[14px] text-slate-800">Notifications</h3>
              <button onClick={markAllRead} className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Mark all read</button>
            </div>

            {/* tabs */}
            <div className="flex border-b border-slate-100 px-5 shrink-0">
              {(['All','Unread','Critical'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`px-4 py-2.5 text-[12px] font-bold transition-colors border-b-2 ${activeTab === t ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-slate-800'}`}>
                  {t}
                  {t === 'Unread' && unreadCount > 0 && <span className="ml-1.5 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
                </button>
              ))}
            </div>

            {/* items */}
            <div className="overflow-y-auto flex-1">
              {displayed.length === 0 && (
                <div className="p-12 text-center opacity-40">
                  <p className="font-black text-slate-500 text-[12px] uppercase tracking-widest">No notifications</p>
                </div>
              )}
              {displayed.map(n => {
                const s = ICON[n.level];
                return (
                  <div key={n.id} className={`px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-indigo-50/30' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`w-9 h-9 rounded-xl border ${s.ring} flex items-center justify-center text-[16px] shrink-0 mt-0.5`}>{s.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-[12.5px] font-bold text-slate-800 leading-snug ${!n.read ? 'font-black' : ''}`}>{n.title}</p>
                          {!n.read && <div className={`w-2 h-2 ${s.dot} rounded-full shrink-0 mt-1.5`}/>}
                        </div>
                        <p className="text-[11.5px] font-medium text-slate-500 mt-0.5 leading-snug">{n.sub}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10.5px] text-slate-400 font-medium">{n.time}</span>
                          {!n.read && <button onClick={() => markRead(n.id)} className="text-[10.5px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Mark read</button>}
                          <button className="text-[10.5px] font-bold text-slate-500 hover:text-slate-800 transition-colors">Go to item →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-3 border-t border-slate-100 shrink-0 bg-slate-50">
              <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors w-full text-center">View all notifications →</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
