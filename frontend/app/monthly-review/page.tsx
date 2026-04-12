'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  FileText,
  ChevronRight,
  Zap,
  Star,
  Activity,
  ArrowUpRight
} from 'lucide-react';

const HISTORIC_DATA = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 61 },
  { month: 'Apr', score: 68 },
  { month: 'May', score: 75 },
  { month: 'Jun', score: 82 },
];

const DISTRIBUTION_DATA = [
  { name: 'Compliant', value: 65, color: '#10b981' },
  { name: 'Partial', value: 25, color: '#f59e0b' },
  { name: 'Critical', value: 10, color: '#ef4444' },
];

export default function MonthlyReviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Star className="text-amber-400" fill="currentColor" /> Executive Overview
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">Monthly compliance health and strategic risk posture.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Clock size={18} /> June 2024 Report
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md active:scale-95">
            <FileText size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 group hover:border-indigo-100 transition-all">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Aggregate Posture</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900">82%</p>
            <span className="text-emerald-600 font-black text-xs flex items-center tracking-tighter">
              <ArrowUpRight size={14} /> +4%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-indigo-600 w-[82%] rounded-full" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Gaps</p>
          <p className="text-3xl font-black text-slate-900">14</p>
          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[10px] uppercase tracking-wider">
            <AlertTriangle size={12} /> 3 High Priority
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Next Audit</p>
          <p className="text-3xl font-black text-slate-900">18d</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Internal ISO 13485</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Managed Systems</p>
          <p className="text-3xl font-black text-slate-900">32</p>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">2 New Discovered</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Compliance Velocity</h3>
            <div className="px-3 py-1 bg-slate-50 rounded-lg text-slate-400 font-black text-[10px] uppercase tracking-widest">Last 6 Months</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HISTORIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                  itemStyle={{ color: '#4f46e5', fontWeight: 900, fontSize: '14px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={40}>
                  {HISTORIC_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === HISTORIC_DATA.length - 1 ? '#4f46e5' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-slate-900 tracking-tight text-center">Control Distribution</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">142</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Controls</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {DISTRIBUTION_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[12px] font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="text-[12px] font-black text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Critical Action Items</h3>
          <button className="text-indigo-600 font-bold text-xs flex items-center gap-1.5 hover:gap-2.5 transition-all">
            Full Task List <ChevronRight size={16} />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-rose-100">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="font-black text-slate-800 text-[14px]">Update EU AI Act Registry</p>
                <p className="text-slate-500 text-[12px] font-medium leading-relaxed">3 AI Systems currently unclassified under Annex III.</p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-[12px] hover:bg-slate-800 transition-all shadow-md active:scale-95 leading-none">Execute Fix</button>
          </div>
          <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-indigo-100">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-black text-slate-800 text-[14px]">Validate DPDPA Consent Paths</p>
                <p className="text-slate-500 text-[12px] font-medium leading-relaxed">Monthly verification required for Hospital Patient Portal.</p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-[12px] hover:bg-slate-50 transition-all shadow-sm active:scale-95 leading-none">Schedule</button>
          </div>
        </div>
      </div>

      {/* Promotion Footer */}
      <div className="bg-slate-900 rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Zap size={20} fill="currentColor" />
              <span className="font-black text-[11px] uppercase tracking-widest">Executive AI Pulse</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight font-serif italic">"Transparency is your current bottleneck."</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              We identified that **80% of your current gaps** relate to the new 'User Disclosure' mandates. Our agent can auto-generate the required disclaimers for all your active models.
            </p>
          </div>
          <button className="group flex items-center gap-2.5 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-900/40">
            Enable Auto-Remediation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
