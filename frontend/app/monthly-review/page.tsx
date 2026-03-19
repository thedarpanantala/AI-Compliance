'use client';
import { useState, useEffect } from "react";

// Mock querying layer since we don't have typical 'useQuery' react-query setup 
const fetchPendingReviews = async () => {
  return {
    critical: 3,
    warnings: 8,
    estimated_minutes: 22,
    critical_items: [
      { id: 1, name: "SepsisAlert ICU Model", detail: "Missing DPDPA consent flow", can_upload: false },
      { id: 2, name: "ETP Effluent Lab Report", detail: "Overdue from March 2025", can_upload: true },
      { id: 3, name: "Consent to Operate Renewal", detail: "Expired", can_upload: true }
    ],
    warning_items: [
      { id: 4, name: "ChestScan AI Risk Assessment", detail: "Review required within 30 days", can_upload: true }
    ],
    green_items: [
      { id: 5, name: "Fire NOC Review", detail: "Current as of yesterday", can_upload: false }
    ]
  };
};

export default function MonthlyReviewDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchPendingReviews().then(setData);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monthly Compliance Review</h1>
          <p className="text-gray-500 mt-1">
            {data?.critical} critical · {data?.warnings} warnings ·
            Estimated review time: {data?.estimated_minutes} minutes
          </p>
        </div>
        <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 transition text-white font-medium rounded-lg">
          Approve All Green Items
        </button>
      </div>

      {/* Critical items first */}
      <Section title="🔴 Critical — Action Required" items={data?.critical_items} />
      <Section title="🟡 Due Soon — Review Needed"  items={data?.warning_items} />
      <Section title="✅ Compliant — One-click confirm" items={data?.green_items} />
    </div>
  );
}

function Section({ title, items }: any) {
  if (!items || items.length === 0) return null;

  return (
    <div className="border border-gray-200 shadow-sm rounded-xl overflow-hidden mb-6">
      <div className="px-5 py-3 bg-gray-50 font-semibold text-sm border-b uppercase tracking-wider text-gray-700">{title}</div>
      <div className="divide-y divide-gray-100 bg-white">
        {items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm mt-0.5 text-gray-500">{item.detail}</p>
            </div>
            <div className="flex gap-2">
              {item.can_upload && (
                <label className="cursor-pointer text-sm font-medium px-4 py-2 border shadow-sm rounded-lg hover:bg-gray-50 transition active:scale-95">
                  <input type="file" className="hidden" />
                  Upload
                </label>
              )}
              <button className="text-sm font-medium px-4 py-2 bg-green-100 text-green-700 rounded-lg outline-none hover:bg-green-200 transition active:scale-95">
                Approve
              </button>
              <button className="text-sm font-medium px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 outline-none transition active:scale-95">
                Flag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
