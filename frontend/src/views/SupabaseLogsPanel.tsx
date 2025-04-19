import React, { useEffect } from 'react';
import { useSupabaseLogs } from './useSupabaseLogs';

const SupabaseLogsPanel: React.FC = () => {
  const { logs, loading, error, refresh } = useSupabaseLogs();

  // Manual refresh - we now have auto-refresh in the hook
  const handleRefresh = () => {
    refresh();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>📊 Supabase Agent Logs</h2>
        <button 
          onClick={handleRefresh} 
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--primary-color, #3b82f6)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Logs'}
        </button>
      </div>
      
      {loading && <p>Loading logs...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {logs.length === 0 && !loading && <p>No logs available.</p>}
      {logs.map((log, idx) => (
        <div key={idx} style={{
          background: "var(--bg-accent)",
          color: "var(--text-color)",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          borderRadius: "6px"
        }}>
          <strong>{log.timestamp}</strong> — <code>{log.agent}</code> [{log.level}]
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>
            {typeof log.message === 'string' ? log.message : JSON.stringify(log.message, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default SupabaseLogsPanel;
