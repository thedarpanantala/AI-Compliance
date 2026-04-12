"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [orgData, setOrgData] = useState({ name: "", type: "hospital", state: "Maharashtra", size: "" });
  const [aiSystems, setAiSystems] = useState([
    { id: 1, name: "Radiology Triage AI", type: "Clinical Decision Support", selected: true },
    { id: 2, name: "Patient Chatbot", type: "Generative AI", selected: false },
    { id: 3, name: "Billing Predictor", type: "Operational AI", selected: true }
  ]);
  const [teamMembers, setTeamMembers] = useState([{ email: "", role: "contributor" }]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const finishOnboarding = () => router.push('/ai-inventory');

  const stepTitles = [
    "Organization Profile", 
    "AI Systems Discovery", 
    "Licence Setup", 
    "Initial Assessment", 
    "Team Setup"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col min-h-[600px]">
        
        {/* Header / Progress Bar */}
        <div className="bg-gray-900 p-6 text-white">
          <h1 className="text-xl font-semibold mb-6">Setup AI Compliance Workspace</h1>
          
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
            
            {stepTitles.map((title, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep > idx ? 'bg-blue-500 text-white' : currentStep === idx + 1 ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' : 'bg-gray-800 text-gray-400'}`}>
                  {idx + 1}
                </div>
                <span className={`text-[10px] uppercase font-bold mt-2 ${currentStep >= idx + 1 ? 'text-white' : 'text-gray-500'}`}>{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* STEP 1: Organization Profile */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your organization</h2>
              <p className="text-gray-500 mb-8">This tailors your regulatory framework precisely to your footprint.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                  <input type="text" value={orgData.name} onChange={e => setOrgData({...orgData, name: e.target.value})} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Apex Biotech" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry Vertical</label>
                    <select value={orgData.type} onChange={e => setOrgData({...orgData, type: e.target.value})} className="w-full border-gray-300 rounded-lg p-3 border font-medium text-gray-900">
                      <option value="hospital">Healthcare & Hospital</option>
                      <option value="textile_manufacturing">Textile Manufacturing</option>
                      <option value="pharma_manufacturing">Pharma Manufacturing</option>
                      <option value="software">Software / SaaS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary State of Operation</label>
                    <select value={orgData.state} onChange={e => setOrgData({...orgData, state: e.target.value})} className="w-full border-gray-300 rounded-lg p-3 border text-gray-900">
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi NCR</option>
                    </select>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Organization Size</label>
                   <select value={orgData.size} onChange={e => setOrgData({...orgData, size: e.target.value})} className="w-full border-gray-300 rounded-lg p-3 border text-gray-900">
                      {orgData.type === 'hospital' ? (
                        <>
                          <option value="small">Small Clinic (&lt; 50 beds)</option>
                          <option value="medium">Medium Hospital (50-200 beds)</option>
                          <option value="large">Large/Multi-Specialty (200+ beds)</option>
                        </>
                      ) : (
                        <>
                          <option value="small">Micro/Small (&lt; 50 employees)</option>
                          <option value="medium">Medium (&lt; 250 employees)</option>
                          <option value="large">Large Enterprise</option>
                        </>
                      )}
                   </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI Discovery */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discovering your AI Systems</h2>
              <p className="text-gray-500 mb-8">We've scanned common integrations for your industry. Select the ones you actively use.</p>
              
              <div className="space-y-3">
                {aiSystems.map((sys, idx) => (
                  <div key={idx} onClick={() => {
                    const newSys = [...aiSystems];
                    newSys[idx].selected = !newSys[idx].selected;
                    setAiSystems(newSys);
                  }} className={`p-4 border rounded-lg flex items-center cursor-pointer transition-colors ${sys.selected ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-blue-300'}`}>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{sys.name}</h4>
                      <p className="text-xs text-gray-500">{sys.type}</p>
                    </div>
                    <div>
                      <input type="checkbox" readOnly checked={sys.selected} className="w-5 h-5 text-blue-600 rounded" />
                    </div>
                  </div>
                ))}
                
                <button className="w-full p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700 transition flex justify-center items-center gap-2">
                  <span>+</span> Add Custom AI System
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Licences */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Pre-populating Licences...</h2>
                <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
              <p className="text-gray-500 mb-8">Based on your {orgData.type} status in {orgData.state}, we've automatically built your compliance registry mapping.</p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
                <h4 className="text-green-800 font-semibold mb-1 flex items-center gap-2">
                  <span>✓</span> Registry Initialized
                </h4>
                <p className="text-green-700 text-sm mb-4">4 Mandatory framework licences have been added to your profile.</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm p-3 bg-white rounded shadow-sm border border-green-100">
                    <span className="font-medium text-gray-800">NABH Accreditation</span>
                    <span className="text-gray-500 uppercase text-xs">Annual</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-white rounded shadow-sm border border-green-100">
                    <span className="font-medium text-gray-800">Clinical Establishment</span>
                    <span className="text-gray-500 uppercase text-xs">Annual</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-white rounded shadow-sm border border-green-100">
                    <span className="font-medium text-gray-800">Bio-Medical Waste Auth</span>
                    <span className="text-gray-500 uppercase text-xs">Annual</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Initial Assessment */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center py-8">
               <div className="w-24 h-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                 24%
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Initial Diagnostic Complete</h2>
               <p className="text-gray-600 mb-8 max-w-md mx-auto">Your initial automated scan identified <span className="font-bold text-gray-900">3 critical gaps</span> spanning across Data Privacy and Clinical Validation criteria.</p>

               <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto text-left border border-gray-200">
                 <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Required Actions</h4>
                 <ul className="space-y-3">
                   <li className="flex gap-3 items-start text-sm text-gray-700">
                     <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
                     Upload NABH Accreditation certificate (Overdue)
                   </li>
                   <li className="flex gap-3 items-start text-sm text-gray-700">
                     <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
                     Configure Model Cards for Radiology Triage AI
                   </li>
                 </ul>
               </div>
            </div>
          )}

          {/* STEP 5: Team Setup */}
          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Invite your Team</h2>
               <p className="text-gray-500 mb-8">Compliance is a team sport. Invite legal, IT, and clinical officers to collaborate.</p>

               <div className="space-y-4">
                 {teamMembers.map((member, idx) => (
                    <div key={idx} className="flex gap-3">
                      <input type="email" value={member.email} onChange={(e) => {
                        const newMembers = [...teamMembers];
                        newMembers[idx].email = e.target.value;
                        setTeamMembers(newMembers);
                      }} placeholder="colleague@company.com" className="flex-1 border-gray-300 rounded-lg p-3 border" />
                      
                      <select value={member.role} onChange={(e) => {
                        const newMembers = [...teamMembers];
                        newMembers[idx].role = e.target.value;
                        setTeamMembers(newMembers);
                      }} className="w-48 border-gray-300 rounded-lg p-3 border">
                        <option value="risk_manager">Risk Manager</option>
                        <option value="contributor">Contributor</option>
                        <option value="auditor">Auditor (View-Only)</option>
                      </select>
                    </div>
                 ))}
                 
                 <button onClick={() => setTeamMembers([...teamMembers, {email: '', role: 'contributor'}])} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                   + Add another colleague
                 </button>
               </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white border text-gray-700 shadow-sm hover:bg-gray-50'}`}>
            Previous
          </button>
          
          <button 
            onClick={currentStep === totalSteps ? finishOnboarding : nextStep}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 hover:shadow transition flex gap-2 items-center">
            {currentStep === totalSteps ? 'Launch Workspace' : 'Continue'} 
            {currentStep !== totalSteps && <span>→</span>}
          </button>
        </div>

      </div>
    </div>
  );
}
