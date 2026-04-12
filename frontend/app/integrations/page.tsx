'use client';

import React from 'react';
import { 
  Cloud, 
  Database, 
  Globe, 
  Plus, 
  Settings2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';

const CONNECTORS = [
  { id: 1, name: 'AWS CloudWatch (Multi-Region)', type: 'Infrastructure', status: 'connected', logs: 'Active', latency: '42ms' },
  { id: 2, name: 'OpenAI Enterprise API', type: 'AI Service', status: 'connected', logs: 'Polling', latency: '120ms' },
  { id: 3, name: 'Azure ML Studio (Prod)', type: 'Infrastructure', status: 'error', logs: 'Auth Failed', latency: '-' },
  { id: 4, name: 'Stripe Global Connector', type: 'Payments/Data', status: 'connected', logs: 'Active', latency: '85ms' },
  { id: 5, name: 'Internal PostgreSQL (Cluster-A)', type: 'Database', status: 'pending', logs: 'Inbound Only', latency: '12ms' },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Connectors & Sync
          </h1>
          <p className="text-slate-500 font-medium">Link your infrastructure for autonomous discovery and real-time monitoring.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-lg transition-all shadow-md active:scale-95">
          <Plus size={18} /> Add New Connector
        </button>
      </div>

      {/* Connection Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-indigo-100 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Cloud size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-900">Cloud Infra</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">3 Active</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-indigo-100 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-900">AI Services</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">5 Active</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-indigo-100 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
            <Database size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-900">DB Clusters</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">2 Active</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-indigo-100 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
            <Globe size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-900">Webhooks</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">12 Active</p>
          </div>
        </div>
      </div>

      {/* Active Connectors Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search connectors..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
                <RefreshCw size={20} />
             </button>
             <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
                <Filter size={20} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Source Connector</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Sync Activity</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CONNECTORS.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.status === 'connected' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                          {c.type === 'Infrastructure' ? <Cloud size={16} /> : <Zap size={16} />}
                       </div>
                       <span className="font-bold text-slate-800 text-[14px]">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{c.type}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${c.status === 'connected' ? 'bg-emerald-500' : c.status === 'error' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                       <span className={`text-[12px] font-black uppercase tracking-tight ${c.status === 'connected' ? 'text-emerald-600' : c.status === 'error' ? 'text-rose-600' : 'text-amber-600'}`}>
                          {c.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                       <p className="text-[13px] font-bold text-slate-600">{c.logs}</p>
                       <p className="text-[10px] text-slate-400 font-medium">Latency: {c.latency}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
                          <Settings2 size={18} />
                       </button>
                       <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all">
                          <ArrowRight size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Promotion */}
      <div className="p-8 bg-indigo-950 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-indigo-400" /> Secure Data Pipeline
          </h3>
          <p className="text-indigo-200 text-sm font-medium">Connectors use **Role-Based Access** and **AES-256 Encryption** for all metadata sync.</p>
        </div>
        <button className="px-8 py-3 bg-white text-indigo-950 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all active:scale-95 shadow-lg relative z-10">
          Sync Global Directory
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
