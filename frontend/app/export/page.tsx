"use client";

import { useState, useEffect } from "react";
import { Nav } from "../../components/Nav";

export default function ExportDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const [shipments] = useState([
    { id: "EXP-SH-001", invoice: "INV/23/0441", dest: "United Kingdom", value: "$45,200", status: "Pre-shipment", score: 0.85, status_color: "primary" },
    { id: "EXP-SH-002", invoice: "INV/23/0445", dest: "USA", value: "$128,000", status: "Shipped", score: 0.98, status_color: "success" },
    { id: "EXP-SH-003", invoice: "INV/24/0012", dest: "Germany", value: "$12,500", status: "Payment Realized", score: 1.0, status_color: "slate" },
  ]);

  const [calendar] = useState([
    { item: "FSSAI License Renewal", due: "May 12, 2026", status: "Upcoming", color: "primary" },
    { item: "Spice Board RCMC", due: "April 08, 2026", status: "Critical", color: "critical" },
    { item: "GST LUT Filing (FY 26-27)", due: "March 31, 2026", status: "Due Now", color: "warning" },
  ]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Export Intelligence</h1>
          <p className="text-slate-500 font-medium tracking-tight">Global logistics compliance & jurisdictional rules mapping.</p>
        </div>
        <div className="text-right">
           <span className="block text-3xl font-display font-black text-primary">94.2%</span>
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Aggregate Compliance</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
             <h2 className="text-lg font-display font-bold text-slate-900">Active Shipment Pipeline</h2>
             <button className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                New Shipment
             </button>
          </div>
          
          <div className="card !p-0 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Intel Score</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {shipments.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-5 font-bold text-slate-900">{s.id}</td>
                    <td className="px-6 py-5 font-medium text-slate-500 text-xs">{s.invoice}</td>
                    <td className="px-6 py-5 font-bold text-slate-700">{s.dest}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: loading ? '0%' : `${s.score * 100}%` }} 
                          />
                        </div>
                        <span className="font-bold text-xs text-slate-900">{(s.score * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className={`pill ${
                        s.status_color === 'primary' ? 'bg-primary/10 text-primary' : 
                        s.status_color === 'success' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
           <h2 className="text-lg font-display font-bold text-slate-900">Compliance Calendar</h2>
           <div className="space-y-4">
             {calendar.map((c, i) => (
               <div key={i} className="card group hover:border-primary/50 cursor-pointer relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="font-display font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{c.item}</h4>
                     <div className={`w-2 h-2 rounded-full ${c.color === 'critical' ? 'bg-critical animate-pulse' : c.color === 'warning' ? 'bg-warning' : 'bg-primary'}`} />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                       <p className="text-sm font-bold text-slate-700">{c.due}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${
                      c.color === 'critical' ? 'text-critical' : 'text-slate-300'
                    }`}>
                      {c.status}
                    </span>
                  </div>
               </div>
             ))}
           </div>
           <button className="w-full py-4 bg-sidebar text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-sidebar/20">
              Export Filing Console
           </button>
        </aside>
      </div>

      <section>
         <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
            <span className="block h-px w-8 bg-slate-200"></span>
            VERTICAL INTELLIGENCE NODES
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "GST LUT Monitoring", icon: "⌗" },
              { title: "FSSAI Export Vault", icon: "♨" },
              { title: "Shiprocket API Hook", icon: "⎋" },
              { title: "Realization Tracker", icon: "⌬" }
            ].map(node => (
              <button key={node.title} className="card flex flex-col items-center text-center p-8 hover:border-primary transition-all group">
                 <div className="text-3xl mb-4 text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all">{node.icon}</div>
                 <h5 className="font-bold text-slate-800 text-sm">{node.title}</h5>
                 <p className="text-[10px] font-bold text-success mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Active & Syncing</p>
              </button>
            ))}
         </div>
      </section>
    </div>
  );
}
