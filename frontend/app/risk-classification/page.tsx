'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Scale,
  Zap,
  Lock
} from 'lucide-react';

type RiskLevel = 'Unacceptable' | 'High' | 'Limited' | 'Minimal' | null;

interface Question {
  id: number;
  text: string;
  description: string;
  options: { label: string; value: string; risk: RiskLevel }[];
}

export default function RiskClassificationPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<RiskLevel>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "Does the AI system use prohibited practices?",
      description: "e.g., Social scoring, biometric identification in public spaces (with exceptions), or subliminal manipulation.",
      options: [
        { label: "Yes, it involves prohibited practices", value: "yes", risk: "Unacceptable" },
        { label: "No, it follows ethical guidelines", value: "no", risk: null }
      ]
    },
    {
      id: 2,
      text: "Is the AI system a safety component of a regulated product?",
      description: "e.g., Medical devices, aviation, elevators, or motor vehicles subject to third-party assessment.",
      options: [
        { label: "Yes, it is a safety component", value: "yes", risk: "High" },
        { label: "No", value: "no", risk: null }
      ]
    },
    {
      id: 3,
      text: "Does the system fall under Annex III / High-Impact areas?",
      description: "e.g., Biometrics, Critical Infrastructure, Education, Employment, Essential Private/Public Services (Credit scoring, etc.)",
      options: [
        { label: "Yes (Annex III Annexed)", value: "yes", risk: "High" },
        { label: "No", value: "no", risk: null }
      ]
    },
    {
      id: 4,
      text: "Is it a General Purpose AI (GPAI)?",
      description: "Large language models or foundation models that can be used for various purposes.",
      options: [
        { label: "Yes, it is a GPAI / Foundation Model", value: "yes", risk: "Limited" },
        { label: "No, it's a specific narrow AI", value: "no", risk: "Minimal" }
      ]
    }
  ];

  const handleOption = (value: string, risk: RiskLevel) => {
    setAnswers({ ...answers, [questions[step].id]: value });
    if (risk) {
      setResult(risk);
      setStep(questions.length); // Skip to result
    } else if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult('Minimal');
      setStep(questions.length);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <Scale className="text-indigo-600" size={36} /> Risk Classification
        </h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          EU AI Act Tiering Tool. Determine your regulatory obligations in under 2 minutes.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {step < questions.length ? (
          <div className="p-8 md:p-12">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-12">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-indigo-600' : 'bg-slate-100'}`} />
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black flex-shrink-0">
                  {step + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">{questions[step].text}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">{questions[step].description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                {questions[step].options.map((opt) => (
                  <button 
                    key={opt.value}
                    onClick={() => handleOption(opt.value, opt.risk)}
                    className="p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-slate-800 text-lg">{opt.label}</span>
                      <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-12 flex justify-between items-center text-slate-400">
              <button 
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 font-bold hover:text-slate-600 disabled:opacity-0 transition-all"
              >
                <ChevronLeft size={20} /> Previous
              </button>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                <Lock size={12} /> Confidential Assessment
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 mb-4 animate-bounce">
              <ShieldAlert size={48} />
            </div>
            
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Classification Result</p>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
                {result} Risk
              </h2>
            </div>

            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-50 border border-slate-200 text-left space-y-6">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  result === 'High' ? 'bg-amber-100 text-amber-600' : 
                  result === 'Unacceptable' ? 'bg-rose-100 text-rose-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {result === 'High' || result === 'Unacceptable' ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-lg mb-1">Regulatory Mandate</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {result === 'High' ? (
                      "Your system requires mandatory Fundamental Rights Impact Assessments (FRIA), Registration in the EU database, and Post-market Monitoring."
                    ) : result === 'Unacceptable' ? (
                      "This system violates EU safety standards and cannot be deployed in its current form."
                    ) : (
                      "Your system is subject to transparency requirements but does not fall under the heavy compliance burden of Annex III."
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[13px] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  <FileText size={16} /> Generate Report
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-black text-[13px] hover:bg-slate-50 transition-all">
                  <Zap size={16} /> Action Items
                </button>
              </div>
            </div>

            <button onClick={reset} className="text-slate-400 font-bold hover:text-indigo-600 transition-colors">
              Restart Classification
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex gap-4">
          <Scale className="text-indigo-200" size={32} />
          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-1">Annex III Alignment</h5>
            <p className="text-slate-500 text-xs font-medium leading-normal">Our tool is updated with the latest compromise text of the EU AI Act (2024).</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex gap-4">
          <HelpCircle className="text-indigo-200" size={32} />
          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-1">Human Review</h5>
            <p className="text-slate-500 text-xs font-medium leading-normal">Always consult with legal counsel for final determination of high-risk status.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
