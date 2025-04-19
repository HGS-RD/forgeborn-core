import React from 'react';
import { useAgentStore } from '../store/useAgentStore';

const ResultDisplay: React.FC = () => {
  const { results } = useAgentStore();

  return (
    <div>
      {results.map((result, index) => (
        <pre key={index} style={{ background: 'var(--bg-accent)', color: 'var(--text-color)', padding: '1rem' }}>
          {result}
        </pre>
      ))}
    </div>
  );
};

export default ResultDisplay;
