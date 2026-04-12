'use client';

import React from 'react';
import { 
  Rocket, 
  Map, 
  ChevronRight, 
  ShieldCheck, 
  Cloud, 
  FileText, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Org Profile & Footprint', desc: 'Define your industry, size, and primary markets.', icon: <Rocket size={20} />, status: 'completed' },
  { id: 2, title: 'System Discovery Scan', desc: 'Auto-detect shadow AI and cloud endpoints.', icon: <Cloud size={20} />, status: 'active' },
  { id: 3, title: 'Framework Selection', desc: 'Link DPDPA, EU AI Act, or NIST RMF.', icon: <ShieldCheck size={20} />, status: 'pending' },
  { id: 4, title: 'Gap Analysis', desc: 'Identify immediate high-risk compliance holes.', icon: <ArrowRight size={20} />, status: 'pending' },
  { id: 5, title: 'Collaborator Setup', desc: 'Invite Legal, Dev, and Ops teams.', icon: <Users size={20} />, status: 'pending' },
  { id: 6, title: 'Launch Workspace', desc: 'Deploy your interactive compliance cockpit.', icon: <Zap size={20} />, status: 'pending' },
];

export default function OnboardingGuidePage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Cockpit Setup Roadmap</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          Your path from local operation to global AI compliance. Follow the 6-step blueprint to initialize your trusted infrastructure.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <div 
            key={step.id} 
            className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden group ${
              step.status === 'completed' ? 'bg-emerald-50 border-emerald-100' : 
              step.status === 'active' ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]' : 
              'bg-white border-slate-100 opacity-60'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
              step.status === 'completed' ? 'bg-emerald-500 text-white' : 
              step.status === 'active' ? 'bg-indigo-600 text-white animate-pulse' : 
              'bg-slate-100 text-slate-400'
            }`}>
              {step.status === 'completed' ? <CheckCircle2 size={24} /> : step.icon}
            </div>
            
            <h3 className={`font-black text-lg mb-1 ${step.status === 'completed' ? 'text-emerald-900' : 'text-slate-900'}`}>
              {step.id}. {step.title}
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
              {step.desc}
            </p>

            {step.status === 'active' ? (
              <button className="flex items-center gap-2 text-indigo-600 font-black text-sm group-hover:gap-3 transition-all">
                Resume Step <ChevronRight size={16} />
              </button>
            ) : step.status === 'completed' ? (
              <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                <ShieldCheck size={14} /> Step Verified
              </span>
            ) : (
              <span className="text-slate-300 font-bold text-xs flex items-center gap-1">
                <Clock size={14} /> Locked
              </span>
            )}

            {/* Background number */}
            <span className="absolute -bottom-4 -right-4 text-8xl font-black text-slate-900/5 pointer-events-none select-none">
              {step.id}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Guide Sidebar Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Configuration Hub</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                    <Cloud size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">AWS Cloud Connector</h5>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-tighter">Required for Step 2</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs">Configure</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">Regulatory Base Selection</h5>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-tighter">India DPDPA + NIST RMF</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-200 text-slate-500 rounded-xl font-bold text-xs cursor-not-allowed">Modify</button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-indigo-900 rounded-3xl p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
            <h4 className="text-lg font-black tracking-tight relative z-10">AI Set-up Assistant</h4>
            <p className="text-indigo-200 text-sm font-medium leading-relaxed relative z-10">
              "Based on your Textile industry selection, I recommend enabling the **Chemical Safety Workflow** and **EU Export Compliance** modules next."
            </p>
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-white text-indigo-950 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95 relative z-10">
              Apply Suggestions <Zap size={16} />
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-700 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
