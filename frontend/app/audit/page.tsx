'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Clock, 
  User, 
  ExternalLink, 
  CheckCircle2, 
  Lock,
  Download,
  Terminal,
  Activity
} from 'lucide-react';

const AUDIT_LOGS = [
  { id: 'LOG-8821', action: 'Policy Override', actor: 'System (AI)', timestamp: '2024-06-12 14:22:01', status: 'verified', hash: '0x8f2...e4a', severity: 'Critical' },
  { id: 'LOG-8820', action: 'Document Signed', actor: 'John Doe (DPO)', timestamp: '2024-06-12 12:05:45', status: 'verified', hash: '0x3a1...c29', severity: 'Low' },
  { id: 'LOG-8819', action: 'System Discovery', actor: 'AWS Connector', timestamp: '2024-06-12 11:40:12', status: 'verified', hash: '0x9d4...f13', severity: 'Medium' },
  { id: 'LOG-8818', action: 'Risk Tier Change', actor: 'System (AI)', timestamp: '2024-06-12 10:15:22', status: 'verified', hash: '0x7b2...a88', severity: 'High' },
  { id: 'LOG-8817', action: 'User Login', actor: 'Sarah Chen', timestamp: '2024-06-12 09:02:11', status: 'verified', hash: '0x1c9...d55', severity: 'Low' },
];

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Lock className="text-indigo-600" /> Immutable Audit Trails
          </h1>
          <p className="text-slate-500 font-medium">Tamper-proof ledger of all compliance and system activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all shadow-md active:scale-95">
            <Shield size={18} /> Export Evidence Bundle
          </button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Integrity Status</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight text-emerald-600">Verified 100%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Log Retention</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">7 Years</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Events (24h)</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">1,242</p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter audit logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download size={16} /> CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Event ID</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Action Performed</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Actor</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Proof (SHA256)</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AUDIT_LOGS.filter(l => l.action.toLowerCase().includes(searchTerm.toLowerCase())).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-black text-slate-400 text-[12px]">{log.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${log.severity === 'Critical' ? 'bg-rose-500' : log.severity === 'High' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <span className="font-bold text-slate-800 text-[13.5px]">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                        <User size={14} />
                      </div>
                      <span className="text-[13px] font-bold text-slate-600">{log.actor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-medium text-slate-400">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-400 bg-indigo-50/50 px-2 py-1 rounded-lg w-fit">
                      <Terminal size={10} /> {log.hash}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[11px] uppercase tracking-widest">
                       <Shield size={14} /> {log.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotion Footer */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-indigo-400">
              <Lock size={20} /> Advanced Evidence Management
            </h3>
            <p className="text-slate-400 text-sm opacity-90 leading-relaxed font-medium">
              Enable **Blockchain Notarization** to store your audit hashes on an immutable public ledger for absolute regulatory transparency.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
            Connect Chain Layer <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
