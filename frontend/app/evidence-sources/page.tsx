"use client";

import { useState, useEffect } from "react";
import { Nav } from "../../components/Nav";

// Use standard emojis for icons since we aren't using lucide-react yet
const SourceIcons: Record<string, string> = {
  github: "🐙",
  filesystem: "📁",
  email: "✉️"
};

export default function EvidenceSourcesPage() {
  const [sources, setSources] = useState([
    {
      id: "1",
      name: "GitHub Repository",
      source_type: "github",
      is_active: true,
      last_run: "2026-03-27T08:00:00Z",
      last_success: "2026-03-27T08:00:00Z"
    },
    {
      id: "2",
      name: "Compliance Shared Box",
      source_type: "email",
      is_active: true,
      last_run: "2026-03-27T09:00:00Z",
      last_success: "2026-03-27T09:00:00Z"
    }
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newSourceParams, setNewSourceParams] = useState({ name: "", type: "github", repo: "", token: "" });

  const handleSync = async (id: string) => {
    // Stub for sync functionality hitting exactly the /sync API we created
    alert(`Triggered manual sync for source ${id}`);
  };

  const handleSaveSource = async () => {
    // Stub for POST /api/evidence-sources/ API request functionality
    const source = {
      id: Math.random().toString(),
      name: newSourceParams.name,
      source_type: newSourceParams.type,
      is_active: true,
      last_run: "Never",
      last_success: "Never"
    };
    setSources([...sources, source]);
    setIsAdding(false);
    setNewSourceParams({ name: "", type: "github", repo: "", token: "" });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Evidence Sources</h1>
            <p className="text-sm text-gray-500 mt-1">Manage automated connections that pipe evidence into your compliance portal</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
            + Add New Source
          </button>
        </div>

        {isAdding && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-medium mb-4">Add Evidence Connector</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Name</label>
                <input 
                  type="text" 
                  value={newSourceParams.name}
                  onChange={(e) => setNewSourceParams({...newSourceParams, name: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" 
                  placeholder="e.g. Core Repositories" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  value={newSourceParams.type}
                  onChange={(e) => setNewSourceParams({...newSourceParams, type: e.target.value})}
                >
                  <option value="github">GitHub Webhooks</option>
                  <option value="filesystem">Local File System</option>
                  <option value="email">IMAP Mailbox</option>
                </select>
              </div>
              {newSourceParams.type === "github" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repository Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="org/repo-name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Access Token</label>
                    <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="ghp_***" />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsAdding(false)} 
                className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button 
                onClick={handleSaveSource}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                Test & Save Source
              </button>
            </div>
          </div>
        )}

        {/* Table View */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 rounded-tl-lg">Type</th>
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Sync</th>
                <th className="p-4 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {sources.map((source) => (
                 <tr key={source.id} className="hover:bg-gray-50">
                   <td className="p-4 text-xl">{SourceIcons[source.source_type] || "🌐"}</td>
                   <td className="p-4 font-medium text-gray-900">{source.name}</td>
                   <td className="p-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${source.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {source.is_active ? 'Active' : 'Disabled'}
                     </span>
                   </td>
                   <td className="p-4 text-gray-500">{new Date(source.last_run).toLocaleString()}</td>
                   <td className="p-4">
                     <button 
                       onClick={() => handleSync(source.id)}
                       className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-3">
                       Sync Now
                     </button>
                     <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">
                       Configure
                     </button>
                   </td>
                 </tr>
              ))}
              {sources.length === 0 && (
                <tr>
                   <td colSpan={5} className="p-8 text-center text-gray-500">
                     No evidence sources connected. Click "Add New Source" to create one.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
