'use client';

import React, { useState } from 'react';
import { 
  Book, 
  Search, 
  Filter, 
  ChevronRight, 
  Shield, 
  Database, 
  Cpu, 
  FileText,
  Bookmark,
  ExternalLink,
  Plus
} from 'lucide-react';

const CONTROLS = [
  { id: 'DPDPA-08', title: 'Data Fiduciary Obligations', framework: 'DPDPA (India)', category: 'Privacy', impact: 'Critical', desc: 'Mandates for ensuring completeness, accuracy and consistency of personal data.' },
  { id: 'AIACT-10', title: 'Data & Governance', framework: 'EU AI Act', category: 'Ethics', impact: 'High', desc: 'Training, validation and testing data sets must be subject to appropriate governance.' },
  { id: 'GDPR-32', title: 'Security of Processing', framework: 'GDPR (EU)', category: 'Security', impact: 'Critical', desc: 'Technical and organizational measures to ensure a level of security appropriate to risk.' },
  { id: 'NIST-2.3', title: 'Bias Mitigation', framework: 'NIST AI RMF', category: 'Governance', impact: 'Medium', desc: 'Processes for identifying and managing bias in AI development and deployment.' },
  { id: 'NABH-D1', title: 'Clinical Data Integrity', framework: 'NABH (Healthcare)', category: 'Safety', impact: 'High', desc: 'Verification of AI outputs in clinical settings for medical decision making.' },
];

export default function ControlsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Book className="text-indigo-600" /> Global Control Library
          </h1>
          <p className="text-slate-500 font-medium">Browse and search the world's most comprehensive regulatory framework database.</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by keyword, section ID, or jurisdiction..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} /> Frameworks
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-lg transition-all active:scale-95 shadow-md">
            Custom Control
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONTROLS.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.framework.toLowerCase().includes(search.toLowerCase())).map((control) => (
          <div key={control.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full hover:border-indigo-200 transition-all group cursor-pointer relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-indigo-600 border border-indigo-100 bg-indigo-50 px-2.5 py-1 rounded-lg uppercase tracking-widest whitespace-nowrap">
                {control.id}
              </span>
              <Bookmark className="text-slate-200 group-hover:text-amber-400 transition-colors" size={20} />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {control.category === 'Privacy' ? <Shield size={12} /> : control.category === 'AI' ? <Cpu size={12} /> : <FileText size={12} />}
                {control.category}
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                {control.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {control.desc}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{control.framework}</p>
                <div className="flex gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${control.impact === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{control.impact} Impact</span>
                </div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/30 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:bg-indigo-100/50 transition-all" />
          </div>
        ))}

        {/* Placeholder for more */}
        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <Plus size={24} />
          </div>
          <p className="font-bold text-slate-400 text-sm uppercase tracking-widest">Load More Frameworks<br/><span className="text-[10px] opacity-70">(1,240+ Available)</span></p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-indigo-900 rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl overflow-hidden relative">
        <div className="flex-1 space-y-2 relative z-10">
          <h4 className="text-xl font-black tracking-tight">Enterprise Framework Sync</h4>
          <p className="text-indigo-200 text-sm font-medium leading-relaxed max-w-xl">
            Our Control Library is automatically updated every 24 hours. The last major update included the **US Executive Order 14110** and **India Digital Personal Data Protection Act Implementation Rules**.
          </p>
        </div>
        <button className="px-8 py-3 bg-white text-indigo-950 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-lg relative z-10 flex items-center gap-2">
          Sync Now <ExternalLink size={16} />
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
