'use client';
import { useState } from "react";

const SVGIcons = {
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>,
  ArrowLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Activity: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  ShieldAlert: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  FileText: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
};

const SYSTEMS_DB = [
  { id: "SYS-001", name: "ChestScan AI v3.1", type: "Diagnostic SaMD", risk: "High", riskBg: "bg-rose-100", riskText: "text-rose-700", status: "Active", statusBg: "bg-emerald-100", statusText: "text-emerald-700", score: 72, owner: "Dr. Sarah Chen", assessed: "14 Feb 2025" },
  { id: "SYS-002", name: "SepsisAlert ICU Model", type: "Clinical Triage", risk: "High", riskBg: "bg-rose-100", riskText: "text-rose-700", status: "Draft", statusBg: "bg-amber-100", statusText: "text-amber-700", score: 45, owner: "James Wilson (IT)", assessed: "Needs Assessment" },
  { id: "SYS-003", name: "Patient Flow Optimizer", type: "Operational", risk: "Limited", riskBg: "bg-orange-100", riskText: "text-orange-700", status: "Active", statusBg: "bg-emerald-100", statusText: "text-emerald-700", score: 95, owner: "Maria Garcia", assessed: "01 Mar 2025" },
  { id: "SYS-004", name: "Automated Billing Coder", type: "Administrative", risk: "Minimal", riskBg: "bg-emerald-100", riskText: "text-emerald-700", status: "Active", statusBg: "bg-emerald-100", statusText: "text-emerald-700", score: 98, owner: "Finance Dept", assessed: "28 Feb 2025" }
];

export default function AiSystemsModule() {
  const [activeTab, setActiveTab] = useState("All Systems");
  const [selectedSystem, setSelectedSystem] = useState<any>(null);
  const [detailSubTab, setDetailSubTab] = useState("Overview");

  // AI System Detail View Tracker
  const drillDown = (sys: any) => {
    setSelectedSystem(sys);
    setDetailSubTab("Overview");
  };

  const goBack = () => setSelectedSystem(null);

  if (selectedSystem) {
     return (
        <div className="w-full max-w-[1300px] mx-auto min-h-[700px] flex flex-col font-sans">
           {/* Detailed View Breadcrumb & Header */}
           <div className="mb-6 flex items-center justify-between">
              <div>
                 <div className="text-[12px] text-slate-500 font-medium flex items-center gap-2 mb-2">
                    <button onClick={goBack} className="hover:text-indigo-600 transition-colors">AI Systems</button>
                    <SVGIcons.ChevronRight />
                    <span className="text-slate-800 font-bold">{selectedSystem.name}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-black text-slate-800">{selectedSystem.name}</h1>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${selectedSystem.riskBg} ${selectedSystem.riskText} uppercase tracking-wide`}>
                       {selectedSystem.risk} Risk
                    </span>
                 </div>
              </div>
              <div className="flex gap-3">
                 <button className="px-4 py-2 bg-white border border-slate-300 rounded text-[13px] font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">Edit Metadata</button>
                 <button className="px-4 py-2 bg-indigo-600 text-white rounded text-[13px] font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"><SVGIcons.Activity /> Run Compliance Check</button>
              </div>
           </div>

           {/* Detail Sub Tabs */}
           <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
              <div className="border-b border-slate-200 px-6 pt-4 flex gap-6 overflow-x-auto">
                 {["Overview", "Controls", "Evidence", "Validation", "Incidents", "Tasks", "Documents"].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setDetailSubTab(tab)}
                      className={`pb-3 text-[13px] font-bold transition-colors whitespace-nowrap ${detailSubTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}
                    >
                      {tab}
                    </button>
                 ))}
              </div>
              
              <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
                 {detailSubTab === "Overview" && (
                    <div className="grid grid-cols-5 gap-8">
                       <div className="col-span-3 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                          <h3 className="text-[14px] font-bold text-slate-800 mb-5">System Metadata</h3>
                          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                             <div><p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Purpose</p><p className="text-[13px] text-slate-800 font-medium">Automatic radiological scan analysis for pulmonary anomalies.</p></div>
                             <div><p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Clinical Type</p><p className="text-[13px] text-slate-800 font-medium">Diagnostic Software as Medical Device (SaMD)</p></div>
                             <div><p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Intended Setting</p><p className="text-[13px] text-slate-800 font-medium">Emergency Room / General Radiology</p></div>
                             <div><p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target Population</p><p className="text-[13px] text-slate-800 font-medium">Adults 18+ presenting with chest symptoms</p></div>
                             <div><p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Vendor</p><p className="text-[13px] text-indigo-600 font-medium">MedVision Technologies (Third Party)</p></div>
                             <div><p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Deployment Date</p><p className="text-[13px] text-slate-800 font-medium">10 October 2024</p></div>
                          </div>
                          <div className="mt-6 pt-5 border-t border-slate-100 flex gap-2">
                             <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">Deep Learning</span>
                             <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">Computer Vision</span>
                          </div>
                       </div>

                       <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center">
                          <h3 className="text-[14px] font-bold text-slate-800 w-full mb-6 text-left">Compliance Score</h3>
                          {/* Circular Progress Ring Mock */}
                          <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-slate-50 border-[8px] border-indigo-100 mb-8">
                             <div className="absolute inset-0 rounded-full border-[8px] border-indigo-600" style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, opacity: 0.9, transform: `rotate(${selectedSystem.score * 3.6}deg)` }}></div>
                             <span className="text-3xl font-black text-slate-800">{selectedSystem.score}%</span>
                          </div>
                          
                          <div className="w-full space-y-3">
                             <div className="flex items-center justify-between text-[12px] font-semibold"><span className="text-slate-600">EU AI Act</span> <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">72% 🟡 Partial</span></div>
                             <div className="flex items-center justify-between text-[12px] font-semibold"><span className="text-slate-600">DPDPA 2023</span> <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded">45% 🔴 At Risk</span></div>
                             <div className="flex items-center justify-between text-[12px] font-semibold"><span className="text-slate-600">CDSCO SaMD</span> <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded">30% 🔴 At Risk</span></div>
                             <div className="flex items-center justify-between text-[12px] font-semibold"><span className="text-slate-600">ISO 42001</span> <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">88% 🟢 Compliant</span></div>
                          </div>
                       </div>
                    </div>
                 )}
                 {detailSubTab === "Controls" && (
                    <div className="bg-white border border-slate-200 rounded-lg w-full overflow-hidden shadow-sm">
                       <table className="w-full text-left text-[13px]">
                          <thead>
                             <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <th className="px-5 py-3 font-bold text-[11px] uppercase tracking-wider">Control Code</th>
                                <th className="px-5 py-3 font-bold text-[11px] uppercase tracking-wider">Title</th>
                                <th className="px-5 py-3 font-bold text-[11px] uppercase tracking-wider">Framework</th>
                                <th className="px-5 py-3 font-bold text-[11px] uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 font-bold text-[11px] uppercase tracking-wider">Evidence</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             <tr className="hover:bg-slate-50 cursor-pointer group">
                                <td className="px-5 py-3 font-bold text-slate-800">C-DPDPA-07</td>
                                <td className="px-5 py-3 font-medium text-slate-600">Verifiable Patient Consent Mechanism</td>
                                <td className="px-5 py-3"><span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-[11px] font-bold">DPDPA</span></td>
                                <td className="px-5 py-3"><span className="text-rose-600 font-bold flex items-center gap-1">❌ Non-Compliant</span></td>
                                <td className="px-5 py-3 text-slate-500 font-medium">0 items</td>
                             </tr>
                             <tr className="hover:bg-slate-50 cursor-pointer group">
                                <td className="px-5 py-3 font-bold text-slate-800">C-CDSCO-12</td>
                                <td className="px-5 py-3 font-medium text-slate-600">SaMD Performance Validation Study</td>
                                <td className="px-5 py-3"><span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-[11px] font-bold">CDSCO</span></td>
                                <td className="px-5 py-3"><span className="text-amber-600 font-bold flex items-center gap-1">⚠️ Partial</span></td>
                                <td className="px-5 py-3 text-slate-500 font-medium">1 item</td>
                             </tr>
                             <tr className="hover:bg-slate-50 cursor-pointer group">
                                <td className="px-5 py-3 font-bold text-slate-800">C-EUAI-14</td>
                                <td className="px-5 py-3 font-medium text-slate-600">Human Oversight Protocol</td>
                                <td className="px-5 py-3"><span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-[11px] font-bold">EU AI Act</span></td>
                                <td className="px-5 py-3"><span className="text-emerald-600 font-bold flex items-center gap-1">✅ Compliant</span></td>
                                <td className="px-5 py-3 text-slate-500 font-medium">3 items</td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                 )}
                 {["Evidence", "Validation", "Incidents", "Tasks", "Documents"].includes(detailSubTab) && (
                    <div className="flex flex-col items-center justify-center p-20 opacity-60">
                       <SVGIcons.FileText />
                       <p className="mt-4 font-bold text-slate-500">{detailSubTab} Module Loaded</p>
                       <p className="text-[12px] text-slate-400 mt-1">Data components for this tab are securely locked under enterprise encryption.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto bg-white border border-slate-200 rounded-lg shadow-sm font-sans flex flex-col min-h-[700px]">
      
      {/* Top Section */}
      <div className="px-8 pt-8 pb-0 border-b border-slate-200">
         <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-8">AI Record</h1>
         
         <div className="flex gap-8">
            {["Overview", "All Systems", "Add New", "Import"].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`pb-4 text-[13px] font-bold transition-colors border-b-2 ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-transparent'}`}
               >
                  {tab}
               </button>
            ))}
         </div>
      </div>

      {activeTab === "All Systems" && (
         <div className="flex-1 bg-slate-50">
            {/* Filter Bar */}
            <div className="px-6 py-3 bg-white border-b border-slate-200 flex gap-3">
               <div className="relative flex-1 max-w-[300px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><SVGIcons.Search /></div>
                  <input type="text" placeholder="Search by name..." className="w-full pl-9 pr-4 py-1.5 border border-slate-300 rounded text-[13px] focus:outline-none focus:border-indigo-500" />
               </div>
               <button className="px-4 py-1.5 bg-white border border-slate-300 rounded text-[13px] text-slate-600 font-medium hover:bg-slate-50 flex items-center gap-2">Risk Tier ▼</button>
               <button className="px-4 py-1.5 bg-white border border-slate-300 rounded text-[13px] text-slate-600 font-medium hover:bg-slate-50 flex items-center gap-2">Status ▼</button>
               <button className="px-4 py-1.5 bg-white border border-slate-300 rounded text-[13px] text-slate-600 font-medium hover:bg-slate-50 flex items-center gap-2">Framework ▼</button>
            </div>
            
            {/* Ledger Table */}
            <div className="w-full overflow-x-auto">
               <table className="w-full text-left text-[13px] bg-white">
                 <thead>
                   <tr className="border-b border-slate-200 text-slate-500">
                     <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">System Name</th>
                     <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Type</th>
                     <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Risk Tier</th>
                     <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Status</th>
                     <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Framework Score</th>
                     <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Owner</th>
                     <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider">Last Assessed</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {SYSTEMS_DB.map(sys => (
                     <tr key={sys.id} className="hover:bg-indigo-50/50 cursor-pointer transition-colors" onClick={() => drillDown(sys)}>
                        <td className="px-6 py-4">
                           <div className="font-bold text-slate-800">{sys.name}</div>
                           <div className="text-[11px] text-slate-500 font-medium mt-0.5">{sys.id}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-700 font-medium">{sys.type}</td>
                        <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded text-[11px] font-bold ${sys.riskBg} ${sys.riskText}`}>{sys.risk}</span></td>
                        <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded text-[11px] font-bold ${sys.statusBg} ${sys.statusText}`}>{sys.status}</span></td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             <div className="w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${sys.score > 80 ? 'bg-emerald-500' : sys.score > 50 ? 'bg-indigo-500' : 'bg-rose-500'}`} style={{width: `${sys.score}%`}}></div>
                             </div>
                             <span className="font-bold text-[11px] text-slate-600">{sys.score}%</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-slate-700 font-medium">{sys.owner}</td>
                        <td className="px-6 py-4 text-slate-500 text-[12px] font-medium">{sys.assessed}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
         </div>
      )}
      
      {activeTab !== "All Systems" && (
         <div className="flex-1 p-16 flex flex-col items-center justify-center text-center opacity-50 bg-slate-50">
            <h2 className="text-[18px] font-bold text-slate-500">{activeTab} Interface</h2>
            <p className="text-[13px] text-slate-400 mt-2">Navigate to "All Systems" to view the active AI Registry ledger and drill down into compliance records.</p>
         </div>
      )}

    </div>
  );
}
