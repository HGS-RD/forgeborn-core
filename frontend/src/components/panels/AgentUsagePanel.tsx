import React, { useEffect, useState } from 'react';

export default function AgentUsagePanel() {
  const [usage, setUsage] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/agent-usage')
      .then(res => res.json())
      .then(data => setUsage(data))
      .catch(err => console.error('Agent usage fetch failed:', err));
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">📊 Agent Usage</h2>
      {usage ? (
        <ul className="list-disc ml-5 text-sm">
          {Object.entries(usage).map(([agent, count]) => (
            <li key={agent}>
              <strong>{agent}</strong>: {count}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No agent usage data available.</p>
      )}
    </div>
  );
}
