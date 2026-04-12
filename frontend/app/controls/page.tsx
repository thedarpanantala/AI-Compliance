import { Nav } from "../../components/Nav";

export default function ControlsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Control Library</h1>
          <p className="text-sm text-gray-500 mt-1">Cross-framework compliance controls and statuses</p>
        </div>

        {/* Tab bar */}
        <div className="border-b border-gray-200 mb-6 flex gap-6">
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">Active Frameworks</button>
          <button className="pb-3 border-b-2 border-blue-600 text-blue-600 text-sm font-medium">Control Library</button>
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">Mappings</button>
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">Policy Packs</button>
        </div>

        {/* Filter Bar */}
        <div className="mb-4 flex gap-4">
          <input type="text" placeholder="Search controls..." className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64" />
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option>Framework</option>
            <option>EU AI Act</option>
            <option>DPDPA</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option>Obligation Type</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option>Status</option>
          </select>
        </div>

        {/* Table View */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Code</th>
                <th className="p-4">Title</th>
                <th className="p-4">Framework</th>
                <th className="p-4">Obligation</th>
                <th className="p-4">Status</th>
                <th className="p-4">Evidence</th>
                <th className="p-4">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td className="p-4 font-medium text-gray-900">EUAIA-14</td>
                <td className="p-4">Human Oversight Mechanisms</td>
                <td className="p-4"><span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded inline-block mt-2">EU AI Act</span></td>
                <td className="p-4">Mandatory</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Compliant</span></td>
                <td className="p-4 font-medium text-gray-900">3 Linked</td>
                <td className="p-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">High Risk</span></td>
              </tr>
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td className="p-4 font-medium text-gray-900">DPDPA-S7</td>
                <td className="p-4">Consent Management</td>
                <td className="p-4"><span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded inline-block mt-2">DPDPA</span></td>
                <td className="p-4">Conditional</td>
                <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Partial</span></td>
                <td className="p-4 text-gray-400">0 Linked</td>
                <td className="p-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Healthcare</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
