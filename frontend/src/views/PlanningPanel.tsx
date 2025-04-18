import React from 'react';

export default function PlanningPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">🧠 Product Planning</h2>
      <p className="text-sm text-gray-600">Use this interface to guide your AI planning phase and generate a new software product roadmap.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Select Product Template</label>
          <select className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200">
            <option>SaaS App</option>
            <option>iOS App</option>
            <option>Firmware</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Target Persona</label>
          <input
            type="text"
            placeholder="e.g. Internal R&D, external client..."
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      <button className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-indigo-600 transition">
        🚀 Generate Plan
      </button>
    </div>
  );
}