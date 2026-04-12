"use client";

import { useState } from "react";
import { Nav } from "../../../components/Nav";

export default function ScheduledJobsPage() {
  const [jobs] = useState([
    {
      id: "1",
      name: "Daily Licence Expiry Check",
      schedule: "Every day at 11:00 PM",
      status: "active",
      lastRun: "2026-03-26T23:00:00Z",
      nextRun: "2026-03-27T23:00:00Z"
    },
    {
      id: "2",
      name: "Weekly Compliance Summary",
      schedule: "Every Monday at 9:00 AM",
      status: "active",
      lastRun: "2026-03-23T09:00:00Z",
      nextRun: "2026-03-30T09:00:00Z"
    },
    {
      id: "3",
      name: "Monthly Full AI Scan",
      schedule: "1st of every month at 6:00 AM",
      status: "active",
      lastRun: "2026-03-01T06:00:00Z",
      nextRun: "2026-04-01T06:00:00Z"
    }
  ]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Automated Triggers</h1>
        <p className="text-sm text-gray-500 mb-8">Monitor background jobs automatically performing compliance verifications.</p>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Name</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Next Run</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{job.name}</td>
                  <td className="p-4 text-gray-600">{job.schedule}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{new Date(job.lastRun).toLocaleString()}</td>
                  <td className="p-4 text-gray-500">{new Date(job.nextRun).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
