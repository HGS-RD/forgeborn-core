import React, { useEffect, useState } from "react";

export default function SkillChainView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/skill-chain")
      .then(res => res.json())
      .then(res => setData(res.skills || []));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">🔗 Skill Chain</h2>
      <ul className="text-sm">
        {data.map((item, idx) => (
          <li key={idx} className="mb-1">
            <span className="font-mono text-purple-700">{item.agent}</span> →
            <span className="font-mono text-blue-700 ml-1">{item.skill}</span>
            <span className="ml-2 text-gray-500">({item.status}, {item.time_ms}ms)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
