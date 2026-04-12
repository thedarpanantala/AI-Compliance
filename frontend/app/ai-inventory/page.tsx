import { Nav } from "../../components/Nav";

export default function AIInventoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">AI Systems Inventory</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track all connected AI systems</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
            + Add New System
          </button>
        </div>

        {/* Tab bar */}
        <div className="border-b border-gray-200 mb-6 flex gap-6">
          <button className="pb-3 border-b-2 border-blue-600 text-blue-600 text-sm font-medium">All Systems</button>
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">Add New</button>
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">Import</button>
        </div>

        {/* Filter Bar */}
        <div className="mb-4 flex gap-4">
          <input type="text" placeholder="Search by name..." className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64" />
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option>Risk Tier</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option>Status</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option>Framework</option>
          </select>
        </div>

        {/* Table View */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">System Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Risk Tier</th>
                <th className="p-4">Status</th>
                <th className="p-4">Framework Score</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Last Assessed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td className="p-4 font-medium text-gray-900">ChestScan AI v3.1</td>
                <td className="p-4">Diagnostic</td>
                <td className="p-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">High</span></td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span></td>
                <td className="p-4 flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 max-w-[80px]">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                  <span className="text-xs font-medium">72%</span>
                </td>
                <td className="p-4">Dr. A. Sharma</td>
                <td className="p-4">2026-03-20</td>
              </tr>
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td className="p-4 font-medium text-gray-900">SepsisAlert ICU</td>
                <td className="p-4">Monitoring</td>
                <td className="p-4"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">Limited</span></td>
                <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Draft</span></td>
                <td className="p-4 flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 max-w-[80px]">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <span className="text-xs font-medium">45%</span>
                </td>
                <td className="p-4">ICU Dept</td>
                <td className="p-4">2026-03-24</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
