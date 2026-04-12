'use client';

import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { 
  Target, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown,
  Info
} from 'lucide-react';

const RADAR_DATA = [
  { subject: 'Privacy', A: 85, B: 110, fullMark: 150 },
  { subject: 'Security', A: 98, B: 130, fullMark: 150 },
  { subject: 'Ethics', A: 45, B: 130, fullMark: 150 },
  { subject: 'Data Qual.', A: 70, B: 140, fullMark: 150 },
  { subject: 'Transparency', A: 60, B: 120, fullMark: 150 },
  { subject: 'Human Ovs.', A: 40, B: 150, fullMark: 150 },
];

const GAP_ITEMS = [
  { id: 1, title: 'Fundamental Rights Assessment', status: 'missing', framework: 'EU AI Act', difficulty: 'High' },
  { id: 2, title: 'Data Subject Request Workflow', status: 'partial', framework: 'DPDPA', difficulty: 'Medium' },
  { id: 3, title: 'Model Drift Monitoring', status: 'missing', framework: 'NIST RMF', difficulty: 'High' },
  { id: 4, title: 'Biometric Consent Flow', status: 'partial', framework: 'GDPR', difficulty: 'Low' },
];

export default function GapAnalysisPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Compliance Gap Analysis</h1>
          <p className="text-slate-500 font-medium">Measuring the delta between current posture and global mandates.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2 shadow-sm">
            Target: EU + USA + India <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Target className="text-indigo-600" /> Compliance Coverage Radar
            </h3>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Current</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200" /> Target</div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Current Posture"
                  dataKey="A"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.15}
                  strokeWidth={3}
                />
                <Radar
                  name="Requirement"
                  dataKey="B"
                  stroke="#e2e8f0"
                  fill="#f8fafc"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Gaps Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-950 rounded-3xl p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <TrendingUp className="text-indigo-300" />
              </div>
              <h3 className="text-xl font-black tracking-tight">Readiness Score</h3>
              <p className="text-5xl font-black tracking-tighter text-indigo-300">62%</p>
              <p className="text-sm font-medium text-indigo-200 leading-relaxed">
                You are **38% away** from full compliance in your targeted export markets (EU MDR + AI Act).
              </p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={14} className="text-rose-500" /> Critical Gaps (4)
            </h4>
            <div className="space-y-3">
              {GAP_ITEMS.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-all">
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.framework}</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="p-8 bg-emerald-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> Recommended Action Pathway
          </h3>
          <p className="text-emerald-100 text-sm font-medium">Resolving 'Human Oversight' gaps will increase your score by **12%**.</p>
        </div>
        <button className="px-8 py-3 bg-white text-emerald-950 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-all active:scale-95 shadow-lg">
          Launch Resolution Wizard
        </button>
      </div>
    </div>
  );
}
