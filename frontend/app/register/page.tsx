'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const ROLES = ['Compliance Officer','Data Protection Officer (DPO)','Clinical Informatics Lead','IT Security Manager','Regulatory Affairs','Executive Sponsor','Auditor'];
const SECTORS = ['Healthcare / Hospital','Manufacturing / MSME','Financial Services','Insurance','Government / Public Sector','Technology / IT','Other'];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'', organisation:'', sector:'', role:'' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  function nextStep(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (step === 1) {
      if (!form.name || !form.email) { setError('Please fill in all fields.'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return; }
      setStep(2);
    } else if (step === 2) {
      if (!form.organisation || !form.sector || !form.role) { setError('Please fill in all fields.'); return; }
      setStep(3);
    } else {
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
      if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
      handleRegister();
    }
  }

  async function handleRegister() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const err = register({ name: form.name, email: form.email, password: form.password, organisation: form.organisation, role: form.role });
    setLoading(false);
    if (err) { setError(err); return; }
    router.push('/monthly-review');
  }

  const STEPS = ['Personal Info','Organisation','Set Password'];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex w-[420px] bg-slate-900 flex-col p-12 relative overflow-hidden shrink-0">
        <div className="absolute -top-24 -right-16 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-8 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="flex items-center gap-3 mb-auto relative z-10">
          <span className="text-[28px] font-black text-rose-500 tracking-tighter">aiC</span>
          <div className="w-px h-6 bg-slate-600" />
          <span className="text-slate-300 text-[14px] font-semibold">Privacy Cockpit</span>
        </div>
        <div className="relative z-10 mb-auto space-y-6">
          <h2 className="text-[28px] font-black text-white leading-tight">Join the compliance revolution</h2>
          <p className="text-slate-400 text-[13.5px] font-medium leading-relaxed">Manage AI compliance across EU AI Act, DPDPA, NABH, CDSCO, and GPCB — all from one enterprise platform.</p>
          <div className="space-y-3">
            {['Real-time risk classification','DPDPA 30-day DSR tracking','NABH audit automation','ABDM consent management','AI Act conformity assessments'].map(f => (
              <div key={f} className="flex items-center gap-3 text-[13px] font-semibold text-slate-300">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-slate-600 relative z-10">© 2025 AI Compliance Platform</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[440px]">
          <div className="mb-8">
            <h1 className="text-[26px] font-black text-slate-800 mb-1">Create your account</h1>
            <p className="text-[13px] text-slate-500 font-medium">Step {step} of {STEPS.length} — {STEPS[step - 1]}</p>
          </div>

          {/* progress */}
          <div className="flex gap-1.5 mb-8">
            {STEPS.map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            ))}
          </div>

          <form onSubmit={nextStep} className="space-y-4" noValidate>
            {step === 1 && (
              <>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name *</label>
                  <input value={form.name} onChange={set('name')} placeholder="e.g. Darpan Antala" autoFocus
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white placeholder-slate-300" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Work Email *</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@hospital.co.in"
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white placeholder-slate-300" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Organisation Name *</label>
                  <input value={form.organisation} onChange={set('organisation')} placeholder="e.g. City General Hospital" autoFocus
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white placeholder-slate-300" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Industry Sector *</label>
                  <select value={form.sector} onChange={set('sector')}
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white">
                    <option value="">Select sector…</option>
                    {SECTORS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Your Role *</label>
                  <select value={form.role} onChange={set('role')}
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white">
                    <option value="">Select role…</option>
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Password *</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Minimum 6 characters" autoFocus
                      className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 pr-12 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white placeholder-slate-300" />
                    <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPw
                        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                  </div>
                  {/* strength bar */}
                  {form.password && (
                    <div className="mt-2 flex gap-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`flex-1 h-1 rounded-full ${form.password.length >= i * 2 ? (i <= 2 ? 'bg-amber-400' : 'bg-emerald-500') : 'bg-slate-100'}`} />
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Confirm Password *</label>
                  <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Re-enter password"
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white placeholder-slate-300" />
                </div>
                <p className="text-[11.5px] text-slate-500 font-medium">By creating an account you agree to our Terms of Service and Privacy Policy.</p>
              </>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-[12.5px] font-semibold" role="alert">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button type="button" onClick={() => { setError(''); setStep(s => s - 1); }}
                  className="px-6 py-3 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 hover:text-slate-800 transition-all">
                  ← Back
                </button>
              )}
              <button type="submit" disabled={loading}
                className="flex-1 bg-slate-900 text-white font-black py-3 rounded-xl text-[13.5px] hover:bg-slate-800 disabled:opacity-40 shadow-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                {loading
                  ? <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Creating account…</>
                  : step < 3 ? 'Continue →' : '✓ Create Account'}
              </button>
            </div>

            <p className="text-center text-[12.5px] text-slate-500 font-medium pt-1">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
