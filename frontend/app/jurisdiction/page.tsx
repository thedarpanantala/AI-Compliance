'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  ShieldCheck, 
  FileWarning, 
  Clock, 
  BookOpen, 
  Search,
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';

const JURISDICTIONS = [
  {
    id: 'india',
    country: 'India',
    flag: '🇮🇳',
    frameworks: ['DPDPA (2023)', 'ABDM', 'CDSCO'],
    summary: 'Focus on data localization and clinical validation for medical AI systems.',
    requirements: [
      { category: 'Data Privacy', detail: 'Mandatory consent manager architecture for PII processing.', status: 'critical' },
      { category: 'Healthcare', detail: 'NABH/CDSCO approval required for Class C Medical AI.', status: 'high' }
    ],
    timeline: '18-24 Months to comply with DPDPA rules.'
  },
  {
    id: 'eu',
    country: 'European Union',
    flag: '🇪🇺',
    frameworks: ['EU AI Act', 'GDPR', 'MDR'],
    summary: 'The gold standard for risk-based AI regulation with strict high-risk classification.',
    requirements: [
      { category: 'Risk Assessment', detail: 'Fundamental Rights Impact Assessment (FRIA) for High-Risk AI.', status: 'critical' },
      { category: 'Transparency', detail: 'Disclosure requirements for GPAI and deepfake systems.', status: 'moderate' }
    ],
    timeline: 'Phased rollout 2024-2026.'
  },
  {
    id: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    frameworks: ['NIST AI RMF', 'FDA 510(k)', 'Executive Order 14110'],
    summary: 'Sector-specific guidance (FDA) moving towards a voluntary but standard-driven RMF.',
    requirements: [
      { category: 'Safety', detail: 'FDA Algorithm Change Control Plans (PCCPs) for adaptive AI.', status: 'high' },
      { category: 'Security', detail: 'Red-teaming requirements for dual-use foundation models.', status: 'moderate' }
    ],
    timeline: 'Varies by industry (Healthcare is active).'
  }
];

export default function JurisdictionPage() {
  const [selected, setSelected] = useState(JURISDICTIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Multi-Jurisdiction Rules</h1>
          <p className="text-slate-500 font-medium">Global regulatory database for AI and data infrastructure.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all shadow-md active:scale-95">
          <Plus size={18} /> Request Country Addition
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Selection */}
        <div className="lg:col-span-1 space-y-3">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search markets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium"
            />
          </div>
          
          {JURISDICTIONS.filter(j => j.country.toLowerCase().includes(searchQuery.toLowerCase())).map((j) => (
            <button
              key={j.id}
              onClick={() => setSelected(j)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                selected.id === j.id 
                  ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{j.flag}</span>
                <span className={`font-black text-sm ${selected.id === j.id ? 'text-white' : 'text-slate-800'}`}>{j.country}</span>
              </div>
              <ChevronRight size={18} className={selected.id === j.id ? 'text-white/70' : 'text-slate-300'} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-4xl shadow-sm">
                  {selected.flag}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selected.country}</h2>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selected.frameworks.map(f => (
                      <span key={f} className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-100">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm px-4 py-2 hover:bg-white rounded-xl transition-all">
                Registry Link <ExternalLink size={14} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <section className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Globe size={14} /> Regional Summary
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed">{selected.summary}</p>
              </section>

              <section className="space-y-4">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} /> Key Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selected.requirements.map((req, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-400 text-[10px] uppercase tracking-wider">{req.category}</span>
                        {req.status === 'critical' ? (
                          <span className="flex items-center gap-1 text-rose-600 font-black text-[9px] uppercase tracking-widest">
                            <FileWarning size={10} /> Critical
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-600 font-black text-[9px] uppercase tracking-widest">
                            <Clock size={10} /> High Priority
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] font-bold text-slate-700 leading-snug">{req.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-black text-indigo-900 text-sm mb-1">Enforcement Timeline</h4>
                  <p className="text-indigo-700 text-[13px] font-medium leading-normal">{selected.timeline}</p>
                </div>
              </section>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <BookOpen size={14} /> Full Legislative Text
              </div>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 transition-all">
                Map Controls to {selected.country}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
