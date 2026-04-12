"use client";

import { useState } from "react";
import { Nav } from "../../components/Nav";

export default function ConsentManagementPage() {
  const [consents, setConsents] = useState([
    { id: "1", principal: "Amitabh Shah", purpose: "Personalized Recommendations", status: "Active", date: "Mar 15, 2026" },
    { id: "2", principal: "Priya Varma", purpose: "Medical Research Data Sharing", status: "Active", date: "Mar 20, 2026" },
    { id: "3", principal: "John Doe", purpose: "Operational Analytics", status: "Withdrawn", date: "Jan 12, 2026" },
  ]);

  const [withdrawModal, setWithdrawModal] = useState<string | null>(null);

  const withdrawConsent = (id: string) => {
    setConsents(consents.map(c => c.id === id ? { ...c, status: "Withdrawn" } : c));
    setWithdrawModal(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-semibold text-gray-900 mb-2">Consent Management Platform (CMP)</h1>
             <p className="text-sm text-gray-500">DPDPA Section 6 Compliance: Granular tracking of Data Principal notices and approvals.</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
            + New Consent Collection
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Active Consents</h3>
              <p className="text-3xl font-black text-blue-600">{consents.filter(c=>c.status==='Active').length}</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Withdrawals (30d)</h3>
              <p className="text-3xl font-black text-amber-600">4</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Audit Trail Status</h3>
              <p className="text-3xl font-black text-green-600">Verified</p>
           </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Data Principal</th>
                <th className="p-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Purpose</th>
                <th className="p-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Collected Date</th>
                <th className="p-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Status</th>
                <th className="p-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {consents.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{c.principal}</td>
                  <td className="p-4 text-gray-600">{c.purpose}</td>
                  <td className="p-4 text-gray-500">{c.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {c.status === 'Active' && (
                      <button 
                        onClick={() => setWithdrawModal(c.id)}
                        className="text-amber-600 hover:text-amber-800 font-bold text-xs uppercase underline">
                        Withdraw
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {withdrawModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-black text-gray-900 mb-4">Confirm Consent Withdrawal</h2>
              <p className="text-gray-500 text-sm mb-6">DPDPA Section 12 mandates an easy "One-Click Withdrawal" mechanism. By confirming, this consent will be marked as inactive and an audit log will be generated.</p>
              <div className="flex gap-4">
                 <button onClick={() => setWithdrawModal(null)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500">Cancel</button>
                 <button onClick={() => withdrawConsent(withdrawModal)} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black">Confirm Withdrawal</button>
              </div>
           </div>
        </div>
      )}
    </main>
  );
}
