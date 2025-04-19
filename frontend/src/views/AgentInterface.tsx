import React from 'react';
// Fix for TypeScript import error
import AgentForm from './AgentForm';
import ResultDisplay from './ResultDisplay';

const AgentInterface: React.FC = () => (
  <div>
    <AgentForm />
    <ResultDisplay />
  </div>
);

export default AgentInterface;
