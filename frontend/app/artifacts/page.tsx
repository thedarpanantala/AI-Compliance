'use client';

import React from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  Eye, 
  CheckCircle2,
  Trash2
} from 'lucide-react';

const ARTIFACTS = [
  { id: 'ART-001', name: 'DPDPA Patient Consent Notice v2.1', type: 'Privacy Notice', date: '2024-06-10', status: 'Approved', size: '1.2 MB' },
  { id: 'ART-002', name: 'EU AI Act Annex III Declaration', type: 'Regulatory Declaration', date: '2024-06-08', status: 'Approved', size: '2.4 MB' },
  { id: 'ART-003', name: 'NABH Digital Health Audit Bundle', type: 'Audit Readiness', date: '2024-06-05', status: 'Pending Review', size: '14.8 MB' },
  { id: 'ART-004', name: 'Model Bias Disclosure (ChestScan AI)', type: 'Transparency Artifact', date: '2024-06-01', status: 'Approved', size: '840 KB' },
  { id: 'ART-005', name: 'CDSCO Class C SaMD Certificate', type: 'Operating License', date: '2024-05-28', status: 'Approved', size: '3.1 MB' },
];

export default function ArtifactsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <FileText className="text-indigo-600" /> Compliance Artifacts
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">Export and manage your verified regulatory evidence and certificates.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-lg transition-all shadow-md active:scale-95">
              <Download size={18} /> Download All Evidence
           </button>
        </div>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 group hover:border-indigo-200 transition-all">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Approved Assets</p>
            <p className="text-2xl font-black text-slate-900">42</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Auditor Access</p>
            <p className="text-2xl font-black text-slate-900">Live Vault</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Next Auto-Archive</p>
            <p className="text-2xl font-black text-slate-900">14h</p>
          </div>
        </div>
      </div>

      {/* Artifacts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter artifacts by system or type..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
                <Filter size={20} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Artifact Name</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Gen Date</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic">
              {ARTIFACTS.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/50 transition-colors group not-italic">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <FileText size={20} />
                       </div>
                       <div>
                          <p className="font-black text-slate-800 text-[14.5px] tracking-tight">{art.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{art.size}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[12px] font-bold text-slate-600 whitespace-nowrap">{art.type}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-slate-400">
                       <Clock size={14} /> {art.date}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      art.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                       {art.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
                          <Eye size={18} />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
                          <Download size={18} />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-rose-600 transition-all">
                          <Trash2 size={18} />
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
      <div className="p-8 bg-indigo-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> Auditor Direct Access
          </h3>
          <p className="text-indigo-200 text-sm font-medium leading-relaxed max-w-xl">
             You can create a temporary **secure hash link** for external auditors to view specific artifact bundles without full system access.
          </p>
        </div>
        <button className="px-8 py-3 bg-white text-indigo-950 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-lg relative z-10">
          Create Auditor Link
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
