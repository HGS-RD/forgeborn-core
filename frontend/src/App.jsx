
import React from 'react';
import MemoryView from './components/MemoryView';
import AgentUsageView from './components/AgentUsageView';
import ReflectionView from './components/ReflectionView';

export default function App() {
  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Forgeborn Dashboard</h1>
      <MemoryView />
      <AgentUsageView />
      <ReflectionView />
    </div>
  );
}
