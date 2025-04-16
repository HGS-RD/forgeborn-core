import React, { useEffect, useState } from 'react';

export default function ReflectionView() {
  const [reflection, setReflection] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/reflection-latest')
      .then(res => res.json())
      .then(data => setReflection(data))
      .catch(err => console.error('Error fetching reflection:', err));
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">🔍 Reflection Snapshot</h2>
      {reflection ? (
        <pre className="text-sm overflow-auto whitespace-pre-wrap">
          {JSON.stringify(reflection, null, 2)}
        </pre>
      ) : (
        <p className="text-gray-500">No reflection data available.</p>
      )}
    </div>
  );
}
