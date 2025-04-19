import React from 'react';
import AgentInterface from './AgentInterface';
import ErrorBoundary from './ErrorBoundary';
// cSpell:ignore Supabase
import SupabaseLogsPanel from './SupabaseLogsPanel';


const MainContent: React.FC = () => (
  <ErrorBoundary>
    <div style={{ padding: '1rem' }}>
      <AgentInterface />
      <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
        <SupabaseLogsPanel />
      </div>
    </div>
  </ErrorBoundary>
);

export default MainContent;
