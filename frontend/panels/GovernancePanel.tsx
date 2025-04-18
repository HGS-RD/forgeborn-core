import React, { useEffect, useState } from 'react';
import YAML from 'yaml';
import fs from 'fs/promises';

const GovernancePanel = () => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const file = await fs.readFile('logs/governance_summary.yaml', 'utf-8');
        const parsed = YAML.parse(file);
        setSummary(parsed);
      } catch (err) {
        console.error("Failed to load governance summary", err);
      }
    };
    loadSummary();
  }, []);

  if (!summary) return <div>Loading governance data...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Governance Compliance</h2>
      <p className="mb-1">Issues Found: <strong>{summary.issue_count}</strong></p>
      <ul className="list-disc list-inside">
        {summary.issues.map((i: any, idx: number) => (
          <li key={idx}>{i.agent}: {i.issue}</li>
        ))}
      </ul>
    </div>
  );
};

export default GovernancePanel;
