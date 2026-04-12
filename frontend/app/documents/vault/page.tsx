"use client";

import { useState, useEffect } from "react";

export default function DocumentVaultPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const [documents] = useState([
    { id: "DOC-V-001", name: "Apex Global Traders - INV #3341", type: "Invoice", date: "Mar 22, 2026", confidence: 0.98, status: "Verified" },
    { id: "DOC-V-002", name: "FSSAI Board License - Spice Hub", type: "Certificate", date: "Mar 25, 2026", confidence: 0.82, status: "Needs Review" },
    { id: "DOC-V-003", name: "Schenker Packing List - B0012", type: "Packing List", date: "Mar 22, 2026", confidence: 0.95, status: "Verified" },
    { id: "DOC-V-004", name: "UKCA Declaration of Conformity", type: "EU Compliance", date: "Mar 26, 2026", confidence: 0.99, status: "Verified" }
  ]);

  const [search, setSearch] = useState("");

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Document Intelligence</span>
          <h1 className="text-2xl font-display font-bold text-slate-900">IDP Vault</h1>
          <p className="text-sm font-medium text-slate-500">Layout-aware AI Ingestion & Full-text OCR Search.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all flex items-center gap-2">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
           Ingest Documents
        </button>
      </header>

      <div className="card !p-0 overflow-hidden border-2 border-primary/10 shadow-xl shadow-primary/5">
        <div className="flex items-center px-8 py-6 gap-6 bg-slate-50/50">
          <svg className="text-slate-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Search extracted entities, license numbers, or metadata..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xl font-display font-bold text-slate-900 placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="card group hover:border-primary/50 cursor-pointer relative overflow-hidden flex flex-col h-full">
             <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 text-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {doc.type[0]}
                </div>
                <span className={`pill ${
                  doc.status === 'Verified' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                }`}>
                  {doc.status}
                </span>
             </div>
             
             <h3 className="text-base font-display font-bold text-slate-900 leading-tight mb-4 group-hover:text-primary transition-colors flex-1">{doc.name}</h3>
             
             <div className="space-y-2 mb-6 opacity-60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <div className="flex justify-between"><span>Type</span> <span className="text-slate-900">{doc.type}</span></div>
                <div className="flex justify-between"><span>Ingested</span> <span className="text-slate-900">{doc.date}</span></div>
             </div>

             <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Extraction</p>
                <span className={`text-lg font-display font-black ${doc.confidence > 0.9 ? 'text-success' : 'text-warning'}`}>
                  {(doc.confidence * 100).toFixed(0)}%
                </span>
             </div>
             
             <div className="absolute top-0 right-0 h-full w-0.5 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center gap-4 hover:border-primary/50 hover:bg-slate-50/50 transition-all group">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">+</div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed group-hover:text-slate-600">Drop Bundle for<br/>Batch IDP Processing</p>
        </button>
      </div>

      <section className="bg-gradient-to-br from-sidebar to-slate-800 rounded-2xl p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl">
               <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-success rounded uppercase text-[10px] font-black tracking-widest">Privacy Shield Active</span>
               </div>
               <h2 className="text-2xl font-display font-bold mb-3">Automated PII Redaction Active</h2>
               <p className="text-slate-300 text-sm leading-relaxed">aic Privacy Cockpit is automatically masking sensitive identifiers (Aadhaar, PAN, GSTIN) across all OCR-processed archives to ensure regulatory compliance.</p>
            </div>
            <button className="px-6 py-3 bg-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-all whitespace-nowrap">
               Privacy Governance
            </button>
         </div>
         <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-9xl font-black">🛡️</div>
      </section>
    </div>
  );
}
