"use client";

import { useState } from "react";
import { Nav } from "../../components/Nav";

export default function BreachManagementPage() {
  const [breaches, setBreaches] = useState([
    { id: "BR-001", detected: "Mar 22, 2026 14:30", severity: 7, status: "Reported to Board", deadline: "Expired (72h passed)" },
    { id: "BR-002", detected: "Mar 25, 2026 09:12", severity: 4, status: "Investigating", deadline: "14 hours remaining" },
  ]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-6xl mx-auto">
        <div className="mb-8">
           <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Breach Management & Incident Reporting</h1>
           <p className="text-sm text-gray-500 font-medium italic">DPDPA 2023 - All data breaches involving personal data must be reported to the Data Protection Board within <strong>72 hours</strong>.</p>
        </div>

        <div className="p-5 bg-red-100 border-2 border-red-300 rounded-2xl mb-8 flex items-center gap-4 animate-pulse">
           <div className="p-3 bg-red-600 text-white rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
           </div>
           <p className="text-red-900 font-black text-sm uppercase tracking-wider">Active Breach Detected: BR-002 requires immediate filing before 72-hour regulatory deadline.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-black text-gray-800 mb-6 uppercase">Incident Ingestion</h2>
              <form className="space-y-4">
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Impact Type</label>
                    <select className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:border-red-400">
                       <option>Unauthorized Access</option>
                       <option>Accidental Disclosure</option>
                       <option>Loss of Encryption Key</option>
                       <option>System Intrusion</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Severity / Damage Score (1-10)</label>
                    <input type="range" min="1" max="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
                 </div>
                 <button className="w-full py-4 bg-red-600 text-white text-sm font-black rounded-xl hover:bg-red-700 shadow-xl shadow-red-200 transition-all uppercase">
                    Initialize Regulatory Filing →
                 </button>
              </form>
           </div>

           <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                 <h2 className="text-[14px] font-black text-gray-800 uppercase tracking-widest">Active Audit Log</h2>
                 <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">2 CRITICAL</span>
              </div>
              <div className="flex-1 divide-y divide-gray-100 overflow-y-auto">
                 {breaches.map(b => (
                    <div key={b.id} className="p-6 hover:bg-gray-50">
                       <div className="flex justify-between mb-2">
                          <span className="font-black text-blue-600 text-sm">{b.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase tracking-wider ${b.severity >= 7 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                             Severity Level {b.severity}
                          </span>
                       </div>
                       <p className="text-[13px] text-gray-800 font-bold mb-1 italic">"{b.status}"</p>
                       <p className="text-[11px] text-gray-400 font-medium tracking-tight mb-3">Detected at: {b.detected}</p>
                       <div className="p-3 bg-gray-100 rounded-xl flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${b.deadline === 'Expired (72h passed)' ? 'bg-red-600 animate-ping' : 'bg-amber-500'}`} />
                          <span className="text-[11px] font-black text-gray-600 uppercase tracking-wide">Deadline: {b.deadline}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
