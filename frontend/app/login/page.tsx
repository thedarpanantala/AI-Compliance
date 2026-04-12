'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const err = login(username.trim(), password);
    setLoading(false);
    if (err) { setError(err); return; }
    router.push('/monthly-review');
  }

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex w-[480px] bg-slate-900 flex-col p-12 relative overflow-hidden shrink-0">
        {/* decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-500/15 rounded-full blur-2xl" />

        <div className="flex items-center gap-3 mb-auto relative z-10">
          <span className="text-[28px] font-black text-rose-500 tracking-tighter">aiC</span>
          <div className="w-px h-6 bg-slate-600" />
          <span className="text-slate-300 text-[14px] font-semibold">Privacy Cockpit</span>
        </div>

        <div className="relative z-10 mb-auto">
          <h2 className="text-[34px] font-black text-white leading-tight mb-4">Enterprise AI Compliance Platform</h2>
          <p className="text-slate-400 text-[14px] font-medium leading-relaxed">
            Manage EU AI Act, DPDPA, NABH, and CDSCO compliance from a single unified cockpit. Designed for healthcare, manufacturing, and regulated industries.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {['EU AI Act 2024','DPDPA 2023','NABH','ISO 42001','CDSCO SaMD'].map(t => (
              <span key={t} className="bg-white/10 text-white/80 text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/10">{t}</span>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-slate-600 relative z-10">© 2025 AI Compliance Platform — Enterprise Edition</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[420px]">
          {/* mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <span className="text-[24px] font-black text-rose-500">aiC</span>
            <span className="text-slate-500 text-[13px] font-semibold">Privacy Cockpit</span>
          </div>

          <h1 className="text-[28px] font-black text-slate-800 mb-1">Welcome back</h1>
          <p className="text-[13.5px] text-slate-500 font-medium mb-8">Sign in to your compliance workspace</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Username or Email</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. darpa"
                autoComplete="username"
                required
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white placeholder-slate-300"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 pr-12 text-[13.5px] font-medium text-slate-800 outline-none focus:border-indigo-500 transition-colors bg-white placeholder-slate-300"
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-[12.5px] font-semibold" role="alert">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading || !username || !password}
              className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl text-[13.5px] hover:bg-slate-800 disabled:opacity-40 shadow-lg transition-all uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
              {loading
                ? <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Signing in…</>
                : 'Sign In →'}
            </button>

            <p className="text-center text-[12.5px] text-slate-500 font-medium pt-2">
              New to the platform?{' '}
              <a href="/register" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors">Create an account</a>
            </p>
          </form>

          <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-[11px] font-black text-indigo-500 uppercase tracking-widest mb-2">Demo Credentials</p>
            <p className="text-[12px] font-bold text-indigo-800">Username: <code className="bg-indigo-100 px-1.5 py-0.5 rounded">darpa</code></p>
            <p className="text-[12px] font-bold text-indigo-800 mt-1">Password: <code className="bg-indigo-100 px-1.5 py-0.5 rounded">12345</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
