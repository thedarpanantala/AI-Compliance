import { Nav } from "../../components/Nav";

export default function WorkflowsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <div className="flex-1 p-8 w-full max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Active Workflows</h1>
            <p className="text-sm text-gray-500 mt-1">Track ongoing approvals, assessments, and tasks</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
            + Start Workflow
          </button>
        </div>

        {/* Tab bar */}
        <div className="border-b border-gray-200 mb-6 flex gap-6">
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">My Tasks</button>
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">All Tasks</button>
          <button className="pb-3 text-gray-500 text-sm hover:text-gray-700">Approvals</button>
          <button className="pb-3 border-b-2 border-blue-600 text-blue-600 text-sm font-medium">Workflows</button>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow transition cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Clinical Risk Assessment - ChestScan AI</h3>
                <p className="text-sm text-gray-500 mt-1">Template: Healthcare Clinical AI Assessment</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">In Progress</span>
            </div>
            
            <div className="mb-4 text-sm text-gray-700 grid grid-cols-2 gap-4">
              <div><span className="text-gray-500 block">Started:</span> 2026-03-25</div>
              <div><span className="text-gray-500 block">Owner:</span> Compliance Team</div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">Step 3 of 5: Risk Analysis</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow transition cursor-pointer border-l-4 border-l-red-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">DPDPA Incident Report #INC-942</h3>
                <p className="text-sm text-gray-500 mt-1">Template: Data Breach Notification</p>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Blocked</span>
            </div>
            
            <div className="mb-4 text-sm text-gray-700 grid grid-cols-2 gap-4">
              <div><span className="text-gray-500 block">Started:</span> 2026-03-26</div>
              <div><span className="text-gray-500 block">Owner:</span> Security Officer</div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-red-600">Step 2 of 4: Awaiting Log Export (Blocked)</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
