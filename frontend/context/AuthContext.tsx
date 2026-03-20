'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User { id: string; name: string; email: string; role: string; organisation: string; }
interface AuthCtx { user: User | null; login: (u: string, p: string) => string | null; register: (d: RegisterData) => string | null; logout: () => void; }
interface RegisterData { name: string; email: string; password: string; organisation: string; role: string; }

const SEED_USERS: Array<User & { password: string; username: string }> = [
  { id: '1', username: 'darpa', name: 'Darpan Antala', email: 'darpa@hospital.co.in', password: '12345', role: 'Compliance Officer', organisation: 'City General Hospital' },
];

const AuthContext = createContext<AuthCtx>({ user: null, login: () => null, register: () => null, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aic_user');
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  function login(username: string, password: string): string | null {
    try {
      // Check seed users
      const seed = SEED_USERS.find(u => u.username === username && u.password === password);
      if (seed) {
        const { id, name, email, role, organisation } = seed;
        const u: User = { id, name, email, role, organisation };
        setUser(u);
        localStorage.setItem('aic_user', JSON.stringify(u));
        return null;
      }
      // Check registered users
      const registered: Array<User & { username: string; password: string }> = JSON.parse(localStorage.getItem('aic_reg_users') || '[]');
      const found = registered.find(u => (u.email === username || (u as any).username === username) && u.password === password);
      if (found) {
        const { id, name, email, role, organisation } = found;
        const u: User = { id, name, email, role, organisation };
        setUser(u);
        localStorage.setItem('aic_user', JSON.stringify(u));
        return null;
      }
      return 'Invalid username or password.';
    } catch {
      return 'An error occurred. Please try again.';
    }
  }

  function register(data: RegisterData): string | null {
    try {
      const existing: Array<User & { username: string; password: string }> = JSON.parse(localStorage.getItem('aic_reg_users') || '[]');
      if (existing.find(u => u.email === data.email)) return 'An account with this email already exists.';
      const newUser = { id: Date.now().toString(), username: data.email, name: data.name, email: data.email, password: data.password, role: data.role, organisation: data.organisation };
      localStorage.setItem('aic_reg_users', JSON.stringify([...existing, newUser]));
      const { id, name, email, role, organisation } = newUser;
      const u: User = { id, name, email, role, organisation };
      setUser(u);
      localStorage.setItem('aic_user', JSON.stringify(u));
      return null;
    } catch {
      return 'Registration failed. Please try again.';
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('aic_user');
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
