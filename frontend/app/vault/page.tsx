'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Filter, 
  Plus, 
  MoreVertical,
  Cpu,
  CheckCircle2,
  Lock,
  History,
  Info
} from 'lucide-react';

const DOCUMENTS = [
  {
    id: 'DOC-001',
    name: 'DPDPA Privacy Notice (v1.2)',
    category: 'Privacy',
    framework: 'DPDPA 2023',
    status: 'Verified',
    generated: '2026-03-20',
    owner: 'Arjun S.'
  },
  {
    id: 'DOC-002',
    name: 'AI Risk Management Plan',
    category: 'AI Ethics',
    framework: 'EU AI Act / NIST',
    status: 'Draft',
    generated: '2026-03-25',
    owner: 'Compliance AI'
  },
  {
    id: 'DOC-003',
    name: 'Clinical Safety Protocol',
    category: 'Healthcare',
    framework: 'NABH / CDSCO',
    status: 'Verified',
    generated: '2026-03-10',
    owner: 'Dr. Sarah K.'
  }
];

export default function DocumentVault() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Evidence Repository & Vault</h1>
          <p className="text-slate-500 mt-1">Audit-ready documentation, AI-generated artifacts, and version control</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Plus size={18} />
            Bulk Upload
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-shadow shadow-sm">
            <Cpu size={18} />
            AI Document Generator
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-indigo-600 uppercase">Trust Score</p>
            <p className="text-2xl font-bold text-slate-900">92%</p>
            <p className="text-[10px] text-slate-400">Validated by 48 evidence points</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <ShieldCheck size={28} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-rose-600 uppercase">Audit Gaps</p>
            <p className="text-2xl font-bold text-slate-900">3</p>
            <p className="text-[10px] text-slate-400">Mandatory artifacts missing</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <Lock size={28} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-emerald-600 uppercase">Certifications</p>
            <p className="text-2xl font-bold text-slate-900">Active</p>
            <p className="text-[10px] text-slate-400">ISO 27001, SOC2, ABDM</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle2 size={28} />
          </div>
        </div>
      </div>

      {/* Main Vault Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        {/* Filters & Tabs */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
          <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
            {['All', 'Privacy', 'AI Ethics', 'Healthcare', 'Factory'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeTab === tab.toLowerCase() ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 transition-all w-64"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table/List View */}
        <div className="flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Framework</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Generated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DOCUMENTS.map((doc) => (
                <tr key={doc.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-white transition-all shadow-sm">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                        <p className="text-[10px] text-slate-400">{doc.id} • {doc.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                      {doc.framework}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        doc.status === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                      <span className="text-xs font-semibold text-slate-700">{doc.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Clock size={14} /> {doc.generated}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View History" className="p-2 hover:bg-white hover:text-indigo-600 text-slate-400 rounded-lg transition-all border border-transparent hover:border-slate-200">
                        <History size={16} />
                      </button>
                      <button title="View Document" className="p-2 hover:bg-white hover:text-indigo-600 text-slate-400 rounded-lg transition-all border border-transparent hover:border-slate-200">
                        <Eye size={16} />
                      </button>
                      <button title="Download PDF" className="p-2 hover:bg-indigo-600 hover:text-white text-slate-400 rounded-lg transition-all border border-transparent">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State / AI Prompt */}
          <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <Info size={32} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">Missing an Artifact?</p>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Use our AI Generator to pre-fill compliance reports based on your organization's technical profile.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
              <Cpu size={18} />
              Open AI Creation Suite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
