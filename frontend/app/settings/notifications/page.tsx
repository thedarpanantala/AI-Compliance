"use client";

import { useState } from "react";
import { Nav } from "../../../components/Nav";

export default function NotificationPreferencesPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Notification Preferences</h1>
        <p className="text-sm text-gray-500 mb-8">Manage how you receive compliance alerts and digests.</p>

        <div className="space-y-6">
          <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Channels</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-xs text-gray-500 mt-1">Receive critical alerts and reports via email.</p>
                </div>
                <button 
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailAlerts ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">WhatsApp Notifications <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Pro</span></h4>
                  <p className="text-xs text-gray-500 mt-1">Get immediate pings for critical compliance failures.</p>
                </div>
                <button 
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${whatsappAlerts ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${whatsappAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4"> Digests & Reports </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Weekly Executive Digest</h4>
                  <p className="text-xs text-gray-500 mt-1">A consolidated summary of compliance status across all systems.</p>
                </div>
                <button 
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${weeklyDigest ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${weeklyDigest ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
