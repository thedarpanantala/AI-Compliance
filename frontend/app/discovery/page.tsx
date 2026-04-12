'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Cpu, 
  Cloud, 
  Database, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  MoreVertical, 
  Filter,
  Zap,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function DiscoveryPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [items, setItems] = useState([
    { id: 'disc_1', name: 'OpenAI API v4', type: 'External API', source: 'Network Proxy', status: 'unassigned', date: '2024-04-10', risk: 'Medium' },
    { id: 'disc_2', name: 'AWS SageMaker Endpoint [Rad-X]', type: 'Cloud Model', source: 'AWS Connector', status: 'mapped', date: '2024-04-09', risk: 'High' },
    { id: 'disc_3', name: 'Stripe Payment Processor', type: 'FinTech API', source: 'Log Analysis', status: 'unassigned', date: '2024-04-12', risk: 'Low' },
    { id: 'disc_4', name: 'Internal Python Microservice (7001)', type: 'On-Prem', source: 'Docker Socket', status: 'unassigned', date: '2024-04-12', risk: 'Medium' },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Logic would go here to fetch real backend discovery results
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Discovery</h1>
          <p className="text-slate-500 font-medium">Identify and map unassigned AI systems and APIs across your infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              isScanning 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 shadow-md active:scale-95'
            }`}
          >
            {isScanning ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
            {isScanning ? 'Scanning Infrastructure...' : 'Start Active Scan'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Unassigned</p>
            <p className="text-2xl font-black text-slate-900">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Cpu size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Discovered (30d)</p>
            <p className="text-2xl font-black text-slate-900">48</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Mapped to Inventory</p>
            <p className="text-2xl font-black text-slate-900">92%</p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter shadow systems..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Discovered System</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Type / Source</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Risk Tier</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-800 text-[13.5px]">{item.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">Found: {item.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                        {item.type.includes('API') ? <Database size={14} /> : item.type.includes('Cloud') ? <Cloud size={14} /> : <Cpu size={14} />}
                      </div>
                      <div>
                        <p className="text-[12.5px] font-bold text-slate-600">{item.type}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.source}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      item.risk === 'High' ? 'bg-rose-50 text-rose-600' : 
                      item.risk === 'Medium' ? 'bg-amber-50 text-amber-600' : 
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {item.risk} Risk
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'mapped' ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[13px]">
                        <CheckCircle2 size={16} />
                        Mapped
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[13px]">
                        <AlertTriangle size={16} />
                        Unassigned
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === 'unassigned' && (
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-[11.5px] hover:bg-indigo-100 transition-colors flex items-center gap-1">
                          Assign <Plus size={14} />
                        </button>
                      )}
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotion Footer */}
      <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Zap className="text-amber-400" /> Automated Inventory Synchronization
            </h3>
            <p className="text-indigo-200 text-sm opacity-90 leading-relaxed font-medium">
              Enable the multi-cloud connector to automatically monitor your AWS, Azure, and Google Cloud environments for new model deployments.
            </p>
          </div>
          <button className="group flex items-center gap-2 px-6 py-3 bg-white text-indigo-950 rounded-2xl font-black text-sm whitespace-nowrap hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
            Configure Connectors <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full translate-y-1/2 -translate-x-1/4 opacity-20 blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
