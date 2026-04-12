'use client';
export default function StubPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-2">Coming Soon</h1>
      <p className="text-slate-500 max-w-sm">We are currently integrating the deep compliance logic for this module from the aic Intelligence Engine.</p>
    </div>
  );
}
