import React from 'react';

export default function TimelineSimulation() {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">📅 Timeline Simulator</h2>
      <p className="text-sm text-gray-600">Choose a simulation mode and project scale to visualize delivery velocity.</p>
      <div className="flex flex-col md:flex-row gap-4">
        <select className="w-full md:w-1/2 px-3 py-2 border rounded-md shadow-sm">
          <option>Balanced Speed</option>
          <option>Fastest Build</option>
          <option>Thorough Testing</option>
        </select>
        <input type="range" min="1" max="10" className="w-full md:w-1/2" />
      </div>
      <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded flex items-center justify-center text-indigo-600">
        [📈 Gantt Chart Placeholder]
      </div>
    </div>
  );
}