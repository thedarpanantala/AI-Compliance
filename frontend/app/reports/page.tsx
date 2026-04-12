"use client";

import { useState } from "react";
import { Nav } from "../../components/Nav";

export default function ReportsGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    orgName: "Apex Biotech",
    period: "March 2026",
    reportType: "monthly_executive"
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setDownloadLink(null);

    // Mock API payload for the backend /api/reports/generate endpoint
    const payload = {
      org_name: formData.orgName,
      period: formData.period,
      compliance_data: {
        licences: { valid: 12, expiring: 3, expired: 1 },
        ai_systems: { registered: 4, non_compliant: 2 },
        evidence: { uploaded: 56, overdue: 4 },
        actions_taken: [
          "Updated AWS CloudTrail access policies.",
          "Requested renewed Fire NOC from State Dept.",
          "Completed HITL validation for Radiology triage module."
        ]
      }
    };

    try {
      // Stub for real API hook
      setTimeout(() => {
        setIsGenerating(false);
        const stubbedFilename = `report_${payload.org_name.replace(' ', '_').toLowerCase()}_${payload.period.replace(' ', '_')}.pdf`;
        setDownloadLink(`/api/reports/download/${stubbedFilename}`);
      }, 2000);
      
      // Real API logic would look like:
      // const res = await fetch("/api/reports/generate", { method: "POST", body: JSON.stringify(payload) });
      // const json = await res.json();
      // setDownloadLink(json.download_url);

    } catch (e) {
      console.error(e);
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Automated Report Generator</h1>
        <p className="text-sm text-gray-500 mb-8">Generate audit-ready, digitally verifiable PDF documents for regulatory submissions.</p>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Report Configuration</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Alias</label>
              <input 
                type="text" 
                value={formData.orgName} 
                onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                className="w-full border-gray-300 rounded px-3 py-2 border text-sm" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
                <select 
                  value={formData.period} 
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="w-full border-gray-300 rounded px-3 py-2 border text-sm">
                  <option value="March 2026">March 2026</option>
                  <option value="February 2026">February 2026</option>
                  <option value="January 2026">January 2026</option>
                  <option value="Q1 2026">Q1 2026 (Jan-Mar)</option>
                  <option value="Annual 2025">Annual 2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Standard</label>
                <select 
                  value={formData.reportType} 
                  onChange={(e) => setFormData({...formData, reportType: e.target.value})}
                  className="w-full border-gray-300 rounded px-3 py-2 border text-sm text-gray-900 font-medium">
                  <option value="monthly_executive">Monthly Executive Summary</option>
                  <option value="nabh_audit">NABH Audit Submission</option>
                  <option value="eu_ai_act_annex_iv">EU AI Act (Annex IV)</option>
                  <option value="gpcb_emission">GPCB Stack Emission Log</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-4 border border-gray-100 flex items-start gap-4">
               <div className="bg-blue-100 text-blue-600 p-2 rounded shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
               </div>
               <div>
                 <h4 className="text-sm font-bold text-gray-900">What's included in this output?</h4>
                 <p className="text-xs text-gray-500 mt-1">This report dynamically pulls real-time metric trackers covering valid vs non-compliant modules. Actions logged by the system over the {formData.period} cycle are automatically embedded.</p>
               </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-6">
              <div>
                {isGenerating && <p className="text-sm font-medium text-blue-600 animate-pulse flex items-center gap-2">Generating secure PDF...</p>}
                {downloadLink && !isGenerating && (
                  <p className="text-sm font-medium text-green-600 flex items-center gap-2">✓ Report Ready</p>
                )}
              </div>
              
              <div className="flex gap-3">
                {downloadLink && !isGenerating && (
                  <button 
                    onClick={() => alert(`In a real environment, you would download from: ${downloadLink}`)}
                    className="px-5 py-2.5 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 shadow flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download Output
                  </button>
                )}
                
                <button 
                  disabled={isGenerating}
                  onClick={handleGenerate} 
                  className={`px-5 py-2.5 text-white rounded-md text-sm font-semibold transition shadow flex items-center gap-2 ${isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {isGenerating ? 'Processing...' : 'Generate New PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
