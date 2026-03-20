'use client';
import { useState, useEffect } from "react";

const SVGIcons = {
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Pause: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>,
  Filter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>,
  Bot: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  ChevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  FileText: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
};

const fetchPendingReviews = async () => {
  return [
    { id: "IL-25-70", status: "In progress", statusBg: "bg-indigo-50", statusText: "text-indigo-600", date: "9/23/25", severity: "Critical", severityBg: "bg-rose-100", severityText: "text-rose-700", desc: "Report of Suspected Missing CDSCO Certificate", class: "License Expiry", country: "India", manager: "Alexander James", modified: "9/23/25", folder: "Hospital Compliance" },
    { id: "IL-25-69", status: "New", statusBg: "bg-rose-50", statusText: "text-rose-600", date: "9/23/25", severity: "Undefined", severityBg: "bg-slate-100", severityText: "text-slate-600", desc: "DPDPA Patient Consent form invalid", class: "Data Privacy", country: "India", manager: "-", modified: "9/23/25", folder: "Hospital Compliance" },
    { id: "IL-25-68", status: "New", statusBg: "bg-rose-50", statusText: "text-rose-600", date: "9/19/25", severity: "High", severityBg: "bg-pink-100", severityText: "text-pink-700", desc: "NABH Accreditation expiring in 10 days", class: "Accreditation", country: "India", manager: "-", modified: "9/22/25", folder: "Hospital Compliance" }
  ];
};

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState("Reporting");
  const [data, setData] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState(false);

  useEffect(() => {
    fetchPendingReviews().then(setData);
  }, []);

  const handleGenerateDocument = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDoc(true);
    }, 2000);
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto bg-white border border-slate-200 rounded-lg shadow-sm font-sans flex flex-col min-h-[700px]">
      
      {/* Top Header & Tabs Section */}
      <div className="px-8 pt-6 pb-0 border-b border-slate-200">
         <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-6">Compliance Cockpit (Hospital Overview)</h1>
         
         <div className="flex gap-8">
            {["Overview", "Cases", "Reporting", "Audit trail", "Configuration"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] font-semibold transition-colors flex items-center gap-2 ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}
              >
                {tab}
                {tab === "Cases" && <span className="bg-slate-800 text-white text-[10px] px-1.5 py-[1px] rounded-full font-bold ml-1">3</span>}
              </button>
            ))}
         </div>
      </div>

      <div className="flex-1 bg-slate-50 relative overflow-y-auto w-full">
         
         {/* -- OVERVIEW TAB RENDER -- */}
         {activeTab === "Overview" && (
           <div className="p-8 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                 <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="text-[12px] font-bold text-slate-500 mb-1">Active AI Systems</h3>
                    <p className="text-2xl font-black text-slate-800">12</p>
                 </div>
                 <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                    <h3 className="text-[12px] font-bold text-slate-500 mb-1">Fully Compliant</h3>
                    <p className="text-2xl font-black text-slate-800">7</p>
                 </div>
                 <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                    <h3 className="text-[12px] font-bold text-slate-500 mb-1">At Risk (Expiring)</h3>
                    <p className="text-2xl font-black text-rose-600">3</p>
                 </div>
                 <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="text-[12px] font-bold text-slate-500 mb-1">Overdue Actions</h3>
                    <p className="text-2xl font-black text-slate-800">8</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                 <div className="col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm p-5 h-[300px] flex items-center justify-center">
                    <p className="text-slate-400 font-medium">[Compliance Score Trend Chart]</p>
                 </div>
                 <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
                    <h3 className="font-bold text-[14px] text-slate-800 mb-2">Framework Status</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[12px] font-bold mb-1"><span className="text-slate-700">DPDPA 2023</span> <span className="text-rose-600">61% (At Risk)</span></div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[61%]"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[12px] font-bold mb-1"><span className="text-slate-700">CDSCO SaMD</span> <span className="text-rose-600">40% (At Risk)</span></div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[40%]"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[12px] font-bold mb-1"><span className="text-slate-700">NABH Standards</span> <span className="text-emerald-600">91% (Compliant)</span></div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[91%]"></div></div>
                      </div>
                    </div>
                 </div>
              </div>
           </div>
         )}
         
         {/* -- CASES TAB RENDER -- */}
         {activeTab === "Cases" && (
           <div className="bg-white">
              <div className="px-5 py-3 flex items-center justify-between border-b border-slate-200">
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <SVGIcons.Search />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search hospital cases..." 
                      className="pl-9 pr-4 py-1.5 text-[13px] border border-slate-300 rounded-full w-[260px] focus:outline-none focus:border-indigo-400 transition-all font-medium placeholder-slate-400"
                    />
                 </div>
              </div>
              <div className="w-full overflow-x-auto select-text">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 bg-white">
                      <th className="px-5 py-3.5 font-semibold text-[12px] uppercase tracking-wide">Case ID & Date</th>
                      <th className="px-5 py-3.5 font-semibold text-[12px] uppercase tracking-wide">Status</th>
                      <th className="px-5 py-3.5 font-semibold text-[12px] uppercase tracking-wide">Severity</th>
                      <th className="px-5 py-3.5 font-semibold text-[12px] uppercase tracking-wide">Description</th>
                      <th className="px-5 py-3.5 font-semibold text-[12px] uppercase tracking-wide">Manager</th>
                      <th className="px-5 py-3.5 font-semibold text-[12px] uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="px-5 py-4"><div className="font-semibold">{item.id}</div><div className="text-slate-500 text-[11px]">{item.date}</div></td>
                        <td className="px-5 py-4"><span className={`${item.statusBg} ${item.statusText} px-2.5 py-0.5 rounded text-[11px] font-bold`}>{item.status}</span></td>
                        <td className="px-5 py-4"><span className={`${item.severityBg} ${item.severityText} px-2.5 py-0.5 rounded text-[11px] font-bold`}>{item.severity}</span></td>
                        <td className="px-5 py-4"><span className="text-slate-800 font-medium">{item.desc}</span></td>
                        <td className="px-5 py-4 text-slate-700">{item.manager}</td>
                        <td className="px-5 py-4"><button className="text-indigo-600 font-semibold hover:underline" onClick={() => setActiveTab("Reporting")}>Fix Issue</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
         )}
         
         {/* -- REPORTING TAB RENDER (Interactive Generator) -- */}
         {activeTab === "Reporting" && (
           <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                 <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-[16px] font-bold text-indigo-700 flex items-center gap-2 mb-4">
                      <SVGIcons.Bot /> Generate Missing Compliance Document
                    </h2>
                    <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
                      Select the required document framework. Our AI agent will scan the existing hospital database and automatically pre-fill the missing compliance artifacts.
                    </p>
                    
                    <div className="space-y-4">
                       <div>
                         <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Document Type</label>
                         <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-indigo-500">
                           <option>NABH AI Audit Readiness Report</option>
                           <option>DPDPA Patient Consent Notice</option>
                           <option>CDSCO Clinical Safety Form</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Target AI System</label>
                         <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-indigo-500">
                           <option>ChestScan AI v3.1</option>
                           <option>SepsisAlert ICU Model</option>
                         </select>
                       </div>
                    </div>
                    
                    <div className="mt-8 border-t border-slate-100 pt-5 text-right">
                       <button 
                         onClick={handleGenerateDocument}
                         disabled={isGenerating}
                         className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded shadow-sm transition-all"
                       >
                         {isGenerating ? "Agent is Generating..." : "Generate Artifact"}
                       </button>
                    </div>
                 </div>

                 {/* Results Panel */}
                 <div>
                    <h3 className="text-[14px] font-bold text-slate-700 mb-4">Generated Artifacts</h3>
                    {generatedDoc ? (
                       <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-lg flex flex-col gap-3 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="p-2 bg-emerald-100 rounded text-emerald-700"><SVGIcons.FileText /></span>
                            <div>
                               <h4 className="font-bold text-[13px] text-emerald-800">NABH AI Audit Readiness_Draft.pdf</h4>
                               <p className="text-[11px] text-emerald-600 mt-0.5">Generated just now by Compliance Assistant</p>
                            </div>
                          </div>
                          <button className="mt-2 bg-white border border-emerald-300 text-emerald-700 font-bold px-4 py-2 text-[12px] rounded hover:bg-emerald-100 transition-colors w-full flex justify-center items-center gap-2">
                             <SVGIcons.Download /> Download for Auditor Review
                          </button>
                       </div>
                    ) : (
                       <div className="bg-slate-100 border border-slate-200 border-dashed p-10 rounded-lg flex flex-col items-center justify-center text-center">
                          <SVGIcons.FileText />
                          <p className="text-slate-400 text-[12px] font-medium mt-3">No artifacts generated today.<br/>Click generate to begin.</p>
                       </div>
                    )}
                 </div>
              </div>
           </div>
         )}
         
         {/* Catch-all for other tabs */}
         {["Audit trail", "Configuration"].includes(activeTab) && (
           <div className="p-16 flex flex-col items-center justify-center text-center opacity-50">
              <h2 className="text-[18px] font-bold text-slate-500 mb-2">{activeTab} Module</h2>
              <p className="text-[13px] text-slate-400 max-w-sm">This section is part of the broader implementation plan. Please proceed to the Reporting tab for document generation.</p>
           </div>
         )}
         
      </div>
    </div>
  );
}
