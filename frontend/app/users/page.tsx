'use client';

import React from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Lock,
  Clock,
  CheckCircle2
} from 'lucide-react';

const USERS_DATA = [
  { id: 1, name: 'Alexander James', role: 'Compliance Officer', email: 'alex@company.com', status: 'Active', activity: '2m ago' },
  { id: 2, name: 'Sarah Chen', role: 'Security Architect', email: 'sarah@company.com', status: 'Active', activity: '14h ago' },
  { id: 3, name: 'John Doe', role: 'DPO', email: 'john@company.com', status: 'Active', activity: '1d ago' },
  { id: 4, name: 'Maya Gupta', role: 'External Auditor', email: 'maya@firm.com', status: 'Pending', activity: '-' },
  { id: 5, name: 'Compliance Assistant', role: 'AI Agent', email: 'agent@aic.internal', status: 'Autonomous', activity: 'Live' },
];

export default function UsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Access Control
          </h1>
          <p className="text-slate-500 font-medium">Manage stakeholders and automated compliance agents.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-lg transition-all shadow-md active:scale-95">
          <UserPlus size={18} /> Invite Stakeholder
        </button>
      </div>

      {/* RBAC Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Licenses</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">12 / 25</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <Lock size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">MFA Adoption</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">100%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">System Health</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight text-emerald-600">Stable</p>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search stakeholders..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white transition-all font-medium"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all">
            <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">User / Identity</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Governance Role</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Last Activity</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {USERS_DATA.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-black text-xs">
                          {u.name === 'Compliance Assistant' ? <Shield className="text-indigo-600" /> : u.name[0]}
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-[14px]">{u.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{u.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-wider">
                       {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${u.status === 'Active' || u.status === 'Autonomous' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                       <span className={`text-[12px] font-black uppercase tracking-tight ${u.status === 'Active' || u.status === 'Autonomous' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {u.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
                       <Clock size={14} /> {u.activity}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
                          <Mail size={18} />
                       </button>
                       <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
                          <MoreVertical size={18} />
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
      <div className="p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
            <Lock size={20} /> Identity Governance
          </h3>
          <p className="text-slate-400 text-sm font-medium">Provision just-in-time access for auditors or integrate with Azure AD / Okta SSO.</p>
        </div>
        <button className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-lg relative z-10">
          Enable SSO Provider
        </button>
      </div>
    </div>
  );
}
