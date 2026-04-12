'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Settings, 
  Activity, 
  Play, 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon, 
  MoreVertical,
  ChevronRight,
  Clock,
  ShieldAlert,
  Beaker,
  Factory,
  Stethoscope,
  CheckCircle2
} from 'lucide-react';

const WORKFLOW_TEMPLATES = [
  {
    code: 'TEXTILE_MONTHLY',
    name: 'Textile Environmental Review',
    industry: 'Textile',
    icon: <Factory className="text-emerald-500" size={24} />,
    steps: 3,
    triggers: 'Scheduled (Monthly)',
    desc: 'Automated ZDHC chemical inventory check and pollution board logbook submission.',
    popularity: 'High'
  },
  {
    code: 'CHEM_SPILL_RESPONSE',
    name: 'Chemical Spill Orchestration',
    industry: 'Chemical',
    icon: <Beaker className="text-amber-500" size={24} />,
    steps: 5,
    triggers: 'Event-Based',
    desc: 'Instant emergency protocol activation, SPB notification, and evidence logging.',
    popularity: 'Critical'
  },
  {
    code: 'HEALH_CLINICAL_VAL',
    name: 'AI Clinical Validation',
    industry: 'Healthcare',
    icon: <Stethoscope className="text-indigo-500" size={24} />,
    steps: 6,
    triggers: 'Manual / Onboarding',
    desc: 'Step-by-step CDSCO/NABH validation flow for medical AI high-risk systems.',
    popularity: 'Medium'
  }
];

const ACTIVE_WORKFLOWS = [
  {
    id: 'WF-742',
    name: 'Monthly Water Discharge Audit - Q1',
    status: 'In Progress',
    progress: 65,
    started: '2 hours ago',
    owner: 'Arjun S. (Env. Lead)',
    industry: 'Textile'
  },
  {
    id: 'WF-819',
    name: 'Clinical Pilot: CardiacAI v2.1',
    status: 'Review Required',
    progress: 82,
    started: '3 days ago',
    owner: 'Dr. Sarah K.',
    industry: 'Healthcare'
  }
];

export default function WorkflowsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Workflow Orchestration</h1>
          <p className="text-slate-500 mt-1">Automated multi-step compliance execution & industry blueprints</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-shadow shadow-sm">
            <Zap size={18} />
            Instant Trigger
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Workflows', value: '12', trend: '+2 this week' },
          { label: 'Tasks Pending', value: '45', trend: '12 critical' },
          { label: 'Automation %', value: '68%', trend: 'Industry benchmark: 42%' },
          { label: 'Saved Hours', value: '240', trend: 'Last 30 days' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              <span className="text-[10px] font-medium text-emerald-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Template Library */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="text-indigo-600" size={20} />
              Automation Blueprint Library
            </h2>
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
              <button 
                onClick={() => setView('grid')}
                className={`p-1.5 rounded ${view === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-1.5 rounded ${view === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>

          <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {WORKFLOW_TEMPLATES.map((tmpl) => (
              <div 
                key={tmpl.code} 
                className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ring-0 hover:ring-2 hover:ring-indigo-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-inner transition-all">
                    {tmpl.icon}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase">
                      {tmpl.industry}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{tmpl.name}</h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{tmpl.desc}</p>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock size={14} /> {tmpl.triggers}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Activity size={14} /> {tmpl.steps} Steps
                    </div>
                  </div>
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Instances Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Active Runs</h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Real-time</span>
          </div>

          <div className="space-y-4">
            {ACTIVE_WORKFLOWS.map((run) => (
              <div key={run.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{run.name}</h4>
                    <span className="text-[10px] text-slate-500">{run.id} • {run.started}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                    run.status === 'In Progress' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {run.status}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>PROGRESS</span>
                    <span>{run.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${run.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex -space-x-2">
                    {[1, 2].map(u => (
                      <div key={u} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                  </div>
                  <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                    View Run <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}

            <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-medium hover:border-indigo-200 hover:text-indigo-400 transition-all">
              See All Instances
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
