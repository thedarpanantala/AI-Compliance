'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FloatingAssistant } from './FloatingAssistant';
import { NotificationCentre } from './NotificationCentre';
import { OnboardingWizard } from './OnboardingWizard';

const PUBLIC = ['/login', '/register'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const [ready, setReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Wait a tick for AuthContext to hydrate from localStorage
    setReady(true);
    
    // Check onboarding status
    const onboardingDone = typeof window !== 'undefined' ? localStorage.getItem('onboarding_completed') : 'true';
    if (!onboardingDone && user) {
      setShowOnboarding(true);
    }
  }, [user]);

  useEffect(() => {
    if (ready && !user && !PUBLIC.includes(path)) {
      router.replace('/login');
    }
  }, [ready, user, path, router]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  // Public pages — no shell
  if (PUBLIC.includes(path)) return <>{children}</>;

  // Still hydrating
  if (!ready || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex items-center gap-3 text-slate-400">
        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span className="font-semibold text-[13px]">Loading…</span>
      </div>
    </div>
  );

  const navLinks = [
    { group: 'CORE', items: [
      { label: 'Dashboard', href: '/monthly-review', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
      { label: 'AI Systems', href: '/ai-systems', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg> },
      { label: 'AI Assessment', href: '/ai-assessment', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
    ]},
    { group: 'PRIVACY & RISK', items: [
      { label: 'Processings (ROPA)', href: '/processings', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> },
      { label: 'Privacy by Design', href: '/privacy-by-design', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
      { label: 'Impact Assessments', href: '/impact-assessments', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
      { label: 'Incidents & Breaches', href: '/incidents', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> },
      { label: 'Data Subject Requests', href: '/dsr', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    ]},
    { group: 'GOVERNANCE', items: [
      { label: 'Frameworks & Controls', href: '/frameworks', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
      { label: 'Reporting & Artifacts', href: '/reports', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    ]},
    { group: 'VERTICALS', items: [
      { label: 'Healthcare Suite', href: '/healthcare', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
      { label: 'Manufacturing Suite', href: '/manufacturing', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20V9l8 2V9l8 2V9l4 2v9H2Z"/><rect width="4" height="4" x="6" y="13"/><rect width="4" height="4" x="14" y="13"/></svg> },
    ]},
    { group: 'OPERATIONS', items: [
      { label: 'Actions & Workflows', href: '/tasks', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg> },
      { label: 'Analytics & Telemetry', href: '/analytics', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg> },
    ]},
  ];

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50 font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white flex flex-col border-r border-slate-200 z-20 shrink-0 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        <div className="h-[64px] flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
            <div className="text-[22px] font-black tracking-tight text-rose-600">aiC</div>
            <div className="w-px h-5 bg-slate-300 mx-2" />
            <div className="text-sm font-semibold text-slate-600">Privacy Cockpit</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-[2px]">
          {navLinks.map(({ group, items }) => (
            <div key={group}>
              <div className="px-3 pt-5 pb-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">{group}</div>
              {items.map(({ label, href, icon }) => {
                const active = path === href || (href !== '/' && path.startsWith(href));
                return (
                  <button key={href} onClick={() => router.push(href)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 font-bold rounded-lg text-[13px] transition-colors ${active ? 'bg-indigo-50 text-indigo-700 shadow-[inset_3px_0_0_#4f46e5]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                    <span className={active ? 'text-indigo-600' : 'text-slate-400'}>{icon}</span>
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User profile at bottom */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-[12px] shrink-0">{initials}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-[12.5px] truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 font-medium truncate">{user.role}</p>
            </div>
            <button onClick={() => { logout(); router.push('/login'); }} className="text-slate-400 hover:text-rose-600 transition-colors" aria-label="Sign out">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-[64px] bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0 shadow-sm">
          <div className="flex-1 flex justify-center max-w-2xl mx-auto">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input type="text" placeholder="Search compliance records…" className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full text-[13px] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-slate-100" />
            </div>
          </div>
          <div className="flex items-center gap-5 ml-6">
            <NotificationCentre />
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[11px] font-black">{initials}</div>
              <span className="text-[12.5px] font-bold text-slate-700 hidden xl:block">{user.name.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 relative">
          {children}
          <FloatingAssistant />
        </main>
      </div>

      {showOnboarding && <OnboardingWizard onComplete={handleOnboardingComplete} />}
    </div>
  );
}
