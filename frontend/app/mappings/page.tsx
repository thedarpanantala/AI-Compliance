'use client';

import React, { useState } from 'react';
import { 
  Link, 
  Search, 
  Filter, 
  CheckCircle2, 
  ArrowRightLeft,
  Zap,
  Shield,
  FileText,
  ChevronDown
} from 'lucide-react';

const MAPPINGS = [
  { id: 1, control: 'Data Encryption at Rest', framework_a: 'DPDPA Section 8', framework_b: 'GDPR Article 32', status: 'mapped', strength: 'Exact' },
  { id: 2, control: 'Bias Monitoring Protocol', framework_a: 'EU AI Act Art 10', framework_b: 'NIST AI RMF 2.3', status: 'mapped', strength: 'Significant' },
  { id: 3, control: 'Breach Notification (72hr)', framework_a: 'DPDPA Section 11', framework_b: 'GDPR Article 33', status: 'mapped', strength: 'Exact' },
  { id: 4, control: 'Clinical Data Lineage', framework_a: 'NABH Digital v2', framework_b: 'ISO 13485:2016', status: 'pending', strength: 'Partial' },
  { id: 5, control: 'AI Explainability (XAI)', framework_a: 'EU AI Act Art 13', framework_b: 'DPDPA (Transparency)', status: 'mapped', strength: 'Significant' },
];

export default function MappingsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ArrowRightLeft className="text-indigo-600" /> Cross-Framework Mappings
          </h1>
          <p className="text-slate-500 font-medium">Map once, comply everywhere. Dynamic linkage between global standards.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all shadow-md active:scale-95">
          <Zap size={18} /> Run AI Auto-Mapper
        </button>
      </div>

      {/* Selector Component */}
      <div className="bg-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-bold">Select Framework Pair</h3>
          <p className="text-indigo-200 text-sm font-medium">Projecting India DPDPA requirements onto European GDPR controls.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
            <span className="text-xs font-black uppercase text-indigo-300">Base</span>
            <span className="font-bold text-sm">DPDPA (India)</span>
            <ChevronDown size={14} className="text-indigo-300" />
          </div>
          <ArrowRightLeft className="text-indigo-400" />
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
            <span className="text-xs font-black uppercase text-indigo-300">Target</span>
            <span className="font-bold text-sm">EU AI Act / GDPR</span>
            <ChevronDown size={14} className="text-indigo-300" />
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
              placeholder="Search mapped controls..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <FileText size={16} /> Export Mappings (CSV)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Base Control Item</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Target Mapping</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Overlap Strength</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic font-medium">
              {MAPPINGS.filter(m => m.control.toLowerCase().includes(searchTerm.toLowerCase())).map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors not-italic">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-black text-slate-800 text-[13.5px] mb-0.5">{m.control}</p>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tight">{m.framework_a}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                        <Link size={12} />
                      </div>
                      <span className="text-[13px] font-bold text-slate-600">{m.framework_b}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${m.strength === 'Exact' ? 'bg-emerald-500 w-full' : m.strength === 'Significant' ? 'bg-indigo-500 w-3/4' : 'bg-amber-500 w-1/3'}`}
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase">{m.strength} Match</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      m.status === 'mapped' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1.5 text-indigo-600 font-bold text-[12px] hover:underline">
                      <Shield size={14} /> Shared Evidence
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Shield size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">Reciprocal Controls</h4>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            We have identified that 72% of your DPDPA evidence can be reused for EU AI Act Article 10 compliance. Click 'Auto-Mapper' to link them instantly.
          </p>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">Compliance Multiplier</h4>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            Every 1 control implemented in your Indian operations currently yields approximately 1.4 equivalent controls in international markets.
          </p>
        </div>
      </div>
    </div>
  );
}
