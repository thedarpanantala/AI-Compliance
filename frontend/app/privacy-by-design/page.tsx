'use client';
import { useState } from 'react';

type YesNo = 'yes' | 'no' | '';
const ChevDown = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
);
const ChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

function Sec({ n, title, children, open: init = false }: { n: number; title: string; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(init);
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left" aria-expanded={open}>
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 bg-indigo-600 text-white rounded-full text-[11px] font-black flex items-center justify-center shrink-0">{n}</span>
          <span className="font-bold text-[13.5px] text-slate-800">{title}</span>
        </div>
        <ChevDown open={open} />
      </button>
      {open && <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4">{children}</div>}
    </div>
  );
}

function Lbl({ children, req }: { children: React.ReactNode; req?: boolean }) {
  return <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{children}{req && <span className="text-rose-500 ml-1">*</span>}</label>;
}

function Row({ q, val, set, id }: { q: string; val: YesNo; set: (v: YesNo) => void; id: string }) {
  return (
    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
      <p id={id} className="text-[13px] font-semibold text-slate-700 flex-1">{q}</p>
      <div className="flex gap-2 shrink-0" role="group" aria-labelledby={id}>
        {(['yes','no'] as const).map(v => (
          <button key={v} onClick={() => set(v)} aria-pressed={val === v}
            className={`px-4 py-2 rounded-lg border-2 text-[12px] font-black uppercase tracking-wider transition-all ${val === v ? (v === 'yes' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-rose-600 border-rose-600 text-white') : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}>
            {v === 'yes' ? '✓ Yes' : '✗ No'}
          </button>
        ))}
      </div>
    </div>
  );
}

function Inp({ placeholder, full }: { placeholder: string; full?: boolean }) {
  return (
    <input placeholder={placeholder}
      className={`${full ? 'w-full' : ''} border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors`} />
  );
}

function Txt({ placeholder, rows = 3 }: { placeholder: string; rows?: number }) {
  return (
    <textarea rows={rows} placeholder={placeholder}
      className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors resize-none" />
  );
}

const ASSESSMENTS = [
  { id: 'PBD-001', project: 'Hospital Patient Portal v2.0', dept: 'Product & Engineering', by: 'Sarah Johnson (DPO)', status: 'Completed', risk: 'Low', rCls: 'bg-emerald-100 text-emerald-700', updated: '15 Mar 2025' },
  { id: 'PBD-002', project: 'ChestScan AI Integration', dept: 'Clinical Radiology', by: 'James Wilson (IT)', status: 'In Progress', risk: 'High', rCls: 'bg-rose-100 text-rose-700', updated: '20 Mar 2025' },
  { id: 'PBD-003', project: 'Tele-Health App Launch', dept: 'Operations', by: 'Maria Garcia', status: 'Under Review', risk: 'Medium', rCls: 'bg-amber-100 text-amber-700', updated: '18 Mar 2025' },
];

export default function PrivacyByDesignPage() {
  const [tab, setTab] = useState('Assessments');
  const [view, setView] = useState<'list' | 'form'>('list');

  // S4 state for conditional logic
  const [intlTransfer, setIntlTransfer] = useState<YesNo>('');

  // Recommendation state (auto-computed)
  const recColor = intlTransfer === 'yes' ? 'rose' : 'amber';
  const recLabel = intlTransfer === 'yes' ? 'High Risk — Action Required' : 'Partial Compliance';

  if (view === 'form') {
    return (
      <div className="w-full max-w-[1380px] mx-auto flex flex-col font-sans">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
              <span>Home</span><ChevR />
              <button onClick={() => setView('list')} className="hover:text-indigo-600 transition-colors">Privacy by Design</button>
              <ChevR /><span className="text-slate-800 font-bold">New Assessment</span>
            </nav>
            <h1 className="text-2xl font-black text-slate-800">New Project Assessment</h1>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* ─── sections ─── */}
          <div className="col-span-8 flex flex-col gap-4">

            {/* S1 */}
            <Sec n={1} title="Project Overall Information" open>
              <div className="grid grid-cols-2 gap-5 pt-1">
                <div className="col-span-2">
                  <Lbl req>What project is involved?</Lbl>
                  <Inp placeholder="e.g. Hospital Patient Portal v2.0" full />
                </div>
                <div className="col-span-2">
                  <Lbl req>Project description</Lbl>
                  <Txt placeholder="Brief overview of the IT project's goals…" />
                </div>
                <div>
                  <Lbl req>Department</Lbl>
                  <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                    {['Product & Engineering','Clinical Radiology','Operations','Finance','HR'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <Lbl req>Start date</Lbl>
                  <input type="date" className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors" />
                </div>
              </div>
            </Sec>

            {/* S2 */}
            <Sec n={2} title="Purposes & Legal Basis">
              <div>
                <Lbl req>Processing purposes</Lbl>
                <Txt placeholder="Clinical or administrative reasons for processing personal data…" />
              </div>
              <div>
                <Lbl>Data life cycle</Lbl>
                <Txt placeholder="Describe how data flows through the project from collection to deletion…" rows={2} />
              </div>
              <div>
                <Lbl req>Applicable legal bases</Lbl>
                <div className="grid grid-cols-2 gap-2">
                  {['Explicit Consent (DPDPA)','Legal Obligation','Vital Interest','Public Interest / Public Task','Contractual Necessity','Legitimate Interest'].map(b => (
                    <label key={b} className="flex items-center gap-2 p-3 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-[12px] font-bold text-slate-700">{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Sec>

            {/* S3 */}
            <Sec n={3} title="Personal Data & Retention">
              <div>
                <Lbl req>Categories of data subjects</Lbl>
                <div className="flex flex-wrap gap-2">
                  {['Patients (Public)','Hospital Staff','Minors','Third-Party Vendors','Deceased Persons'].map(x => (
                    <label key={x} className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-[12px] font-bold text-slate-700">{x}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Lbl req>Personal data collected</Lbl>
                <div className="flex flex-wrap gap-2">
                  {['Name & Identity','Contact Details','Health Records','Biometric','Financial','Location','Device Identifiers'].map(x => (
                    <label key={x} className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-[12px] font-bold text-slate-700">{x}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Lbl>Retention period</Lbl>
                  <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                    {['1 year','2 years','5 years','10 years','Legal mandate','Indefinite'].map(x => <option key={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <Lbl>Deletion mechanism</Lbl>
                  <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                    {['Automated purge system','Manual deletion on request','Anonymisation / de-identification','Archival then deletion'].map(x => <option key={x}>{x}</option>)}
                  </select>
                </div>
              </div>
            </Sec>

            {/* S4 Data Transfers */}
            <Sec n={4} title="Data Transfers">
              <Row q="Does this project involve international data transfers?" val={intlTransfer} set={setIntlTransfer} id="q-s4-itf" />
              {intlTransfer === 'yes' && (
                <>
                  <div>
                    <Lbl>Destination countries</Lbl>
                    <Inp placeholder="e.g. United States, Germany, Singapore" full />
                  </div>
                  <div>
                    <Lbl>Transfer mechanism</Lbl>
                    <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                      <option>Adequacy Decision</option>
                      <option>Standard Contractual Clauses (SCCs)</option>
                      <option>Binding Corporate Rules</option>
                      <option>Explicit consent for transfer (DPDPA §16)</option>
                    </select>
                  </div>
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                    <p className="text-[12px] font-black text-rose-900 uppercase tracking-widest mb-1">DPDPA Section 16 — Cross-Border Transfer Restricted</p>
                    <p className="text-[12px] text-rose-800 font-medium">Transfer of Indian personal data abroad must comply with the Government-approved territory list. A specific consent mechanism valid for international transfer and a cross-border DPIA are required before finalising this assessment.</p>
                  </div>
                </>
              )}
            </Sec>

            {/* S5 Security */}
            <Sec n={5} title="Security Measures">
              <div>
                <Lbl>Technical measures</Lbl>
                <div className="flex flex-wrap gap-2">
                  {['AES-256 Encryption at Rest','TLS 1.3 in Transit','Role-Based Access Control','Multi-Factor Authentication','Audit Logging','Data Masking','Penetration Testing'].map(m => (
                    <label key={m} className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer hover:border-indigo-200">
                      <input type="checkbox" className="rounded text-indigo-600" defaultChecked={m.includes('Encrypt')} />
                      <span className="text-[12px] font-bold text-slate-700">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Lbl>Organisational measures</Lbl>
                <Txt placeholder="Staff training programmes, DPDPA policies, DPO review cycle, vendor audits…" />
              </div>
            </Sec>

            {/* S6 Data Subject Rights */}
            <Sec n={6} title="Data Subject Rights (DPDPA)">
              <div>
                <Lbl>How are DPDPA data principal rights handled?</Lbl>
                <Txt placeholder="Describe processes for access, correction, erasure, and grievance redressal…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Lbl req>Grievance Officer Name</Lbl>
                  <Inp placeholder="Full name" full />
                </div>
                <div>
                  <Lbl req>Contact / Email</Lbl>
                  <Inp placeholder="dpo@hospital.co.in" full />
                </div>
              </div>
              <div>
                <Lbl>Response window</Lbl>
                <select className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-800 outline-none focus:border-indigo-400 transition-colors">
                  <option>30 days (DPDPA standard)</option>
                  <option>15 days (internal SLA)</option>
                  <option>45 days (extended with justification)</option>
                </select>
              </div>
            </Sec>

          </div>

          {/* ─── sticky Recommendation ─── */}
          <div className="col-span-4">
            <div className="sticky top-6 flex flex-col gap-4">


              <div className={`rounded-2xl border-2 border-${recColor}-300 bg-${recColor}-50 p-6 shadow-sm`}>
                <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-3">AI RECOMMENDATION</p>
                <p className={`text-[16px] font-black tracking-tight text-${recColor}-700 mb-3`}>{recLabel}</p>
                <p className={`text-[12px] text-${recColor}-800 font-medium leading-relaxed`}>
                  {intlTransfer === 'yes'
                    ? 'Cross-border data transfer without DPDPA §16 compliance detected. A cross-border DPIA is mandatory. Risk Score: 8.2/10.'
                    : 'Review international transfer and security sections to fully assess compliance posture. Risk Score: 5.4/10.'}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-3">REQUIRED ACTIONS</p>
                <div className="space-y-2">
                  {[
                    intlTransfer === 'yes' && { txt: 'Conduct Cross-Border DPIA', done: false },
                    { txt: 'Update Patient Privacy Notice', done: false },
                    { txt: 'Appoint / Confirm Grievance Officer', done: false },
                    { txt: 'Enable incident logging for project', done: true },
                  ].filter(Boolean).map((item: any, i) => (
                    <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${item.done ? 'border-emerald-100 bg-emerald-50' : 'border-slate-100 bg-slate-50 hover:border-indigo-200'}`}>
                      <input type="checkbox" defaultChecked={item.done} className="rounded text-indigo-600" />
                      <span className={`text-[12px] font-bold ${item.done ? 'text-emerald-700 line-through' : 'text-slate-700'}`}>{item.txt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl text-[13px] hover:bg-slate-800 shadow-xl transition-all uppercase tracking-widest">
                Log Assessment →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── LIST VIEW ─── */
  return (
    <div className="w-full max-w-[1380px] mx-auto flex flex-col font-sans">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <nav className="text-[11.5px] text-slate-400 flex items-center gap-1.5 mb-2">
            <span>Home</span><ChevR /><span className="text-slate-800 font-bold">Privacy by Design</span>
          </nav>
          <h1 className="text-2xl font-black text-slate-800">Assessments & Projects</h1>
        </div>
        <button onClick={() => setView('form')}
          className="bg-indigo-600 text-white font-black px-4 py-2.5 rounded-xl text-[13px] flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all">
          <Plus /> Start New Assessment
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-slate-200 px-6 pt-4 flex">
          {['Assessments','Templates','Translations','Settings'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 pb-3.5 text-[13px] font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-slate-50/60 overflow-y-auto">
          {tab === 'Assessments' && (
            <table className="w-full text-left text-[13px] bg-white">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Project Name','Department','Created By','Status','Risk Score','Updated'].map(h => (
                    <th key={h} className="px-6 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {ASSESSMENTS.map(a => (
                  <tr key={a.id} onClick={() => setView('form')} className="hover:bg-slate-50 cursor-pointer transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{a.project}</div>
                      <div className="text-[11px] text-slate-400">{a.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{a.dept}</td>
                    <td className="px-6 py-4 text-slate-600">{a.by}</td>
                    <td className="px-6 py-4"><span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded text-[11px] font-bold">{a.status}</span></td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded text-[11px] font-bold ${a.rCls}`}>{a.risk}</span></td>
                    <td className="px-6 py-4 text-slate-400 text-right">{a.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab !== 'Assessments' && (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
              <p className="font-black text-slate-500 uppercase tracking-widest">{tab}</p>
              <p className="text-[12px] text-slate-400 mt-1">Part of the enterprise admin workflow roadmap.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
