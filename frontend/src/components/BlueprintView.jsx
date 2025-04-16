import React, { useEffect, useState } from "react";

export default function BlueprintView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/blueprint")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">📘 Blueprint Snapshot</h2>
      <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
