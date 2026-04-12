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
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Bot, 
  Cpu, 
  DollarSign, 
  Zap, 
  Activity, 
  History, 
  Search,
  ChevronRight,
  ShieldCheck,
  Brain
} from 'lucide-react';

const COST_DATA = [
  { day: 'Mon', cost: 12.4 },
  { day: 'Tue', cost: 15.2 },
  { day: 'Wed', cost: 28.5 },
  { day: 'Thu', cost: 22.1 },
  { day: 'Fri', cost: 35.8 },
  { day: 'Sat', cost: 8.4 },
  { day: 'Sun', cost: 6.2 },
];

const REASONING_LOGS = [
  { id: 1, action: 'Auto-Discovery', system: 'AWS Sagemaker', confidence: '98%', time: '2m ago' },
  { id: 2, action: 'Risk Classification', system: 'Inventory #42', confidence: '92%', time: '14m ago' },
  { id: 3, action: 'Document Generation', system: 'DPDPA Notice', confidence: '100%', time: '1h ago' },
  { id: 4, action: 'Jurisdiction Check', system: 'EU Markets', confidence: '95%', time: '3h ago' },
];

export default function AgentInsightsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Brain className="text-indigo-600" /> AI Agent Insights
          </h1>
          <p className="text-slate-500 font-medium">Monitoring the performance and costs of your Compliance Assistant.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Activity size={18} /> Reality Check
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Tokens (30d)</p>
          <p className="text-3xl font-black text-slate-900">4.2M</p>
          <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase">
            Anthropic Claude-3.5
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Est. Cost (June)</p>
          <p className="text-3xl font-black text-slate-900">$128.42</p>
          <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase">
             Optimized (Saved 12%)
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Avg. Confidence</p>
          <p className="text-3xl font-black text-slate-900">96.4%</p>
          <div className="flex items-center gap-1 text-indigo-600 font-bold text-[10px] uppercase">
            High Quality Inference
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Autonomous Fixes</p>
          <p className="text-3xl font-black text-slate-900">842</p>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-[10px] uppercase">
            Pending Approval: 12
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cost Graph */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Daily Compute Expenditure</h3>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> USD Cost</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COST_DATA}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeights: 700}} dy={10} />
                <YAxis hide domain={[0, 40]} />
                <Tooltip 
                  cursor={{stroke: '#e2e8f0', strokeWidth: 2}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="cost" stroke="#4f46e5" fillOpacity={1} fill="url(#colorCost)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reasoning Logs */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Inference Stream</h3>
          <div className="space-y-4 flex-1">
            {REASONING_LOGS.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 group cursor-pointer hover:border-indigo-200 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{log.action}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{log.time}</span>
                </div>
                <p className="text-[13px] font-bold text-slate-800">{log.system}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: log.confidence }} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-600">{log.confidence}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 bg-slate-50 text-slate-500 rounded-2xl font-bold text-[12px] hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
            View Deep Logs <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Performance Monitoring Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-indigo-900 rounded-3xl text-white space-y-4 shadow-xl">
          <h4 className="text-xl font-black flex items-center gap-2">
            <ShieldCheck size={24} className="text-indigo-300" /> Compliance Hardening
          </h4>
          <p className="text-indigo-200 text-sm font-medium leading-relaxed">
            The agent is using **Prompt-Level Isolation** for all patient data processing, ensuring non-retention compliance for DPDPA Section 12.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-indigo-800 rounded-lg text-[10px] font-black uppercase tracking-widest">Isolated</span>
            <span className="px-3 py-1 bg-indigo-800 rounded-lg text-[10px] font-black uppercase tracking-widest">Enrypted</span>
          </div>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h4 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu size={24} className="text-indigo-600" /> Model Integrity
          </h4>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Automatic drift detection enabled. No significant performance decay or bias shifts detected in the last 72 hours of operations.
          </p>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
            <Zap size={14} fill="currentColor" /> System Healthy
          </div>
        </div>
      </div>
    </div>
  );
}
