import React, { useState } from 'react';
import { useAgentStore } from '../store/useAgentStore';
import { invokeAgent } from '../services/invokeAgent';

const AgentForm: React.FC = () => {
  const [input, setInput] = useState('');
  const { addResult, setLoading, setError } = useAgentStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await invokeAgent(input);
      addResult(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your query"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AgentForm;
