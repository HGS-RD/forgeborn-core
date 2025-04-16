import React, { useEffect, useState } from 'react';

export default function MemoryView() {
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/memory-summary')
      .then(res => res.json())
      .then(data => setMemory(data))
      .catch(err => console.error('Error fetching memory:', err));
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">🧠 Memory Summary</h2>
      {memory ? (
        <pre className="text-sm overflow-auto whitespace-pre-wrap">
          {JSON.stringify(memory, null, 2)}
        </pre>
      ) : (
        <p className="text-gray-500">No memory data available.</p>
      )}
    </div>
  );
}
