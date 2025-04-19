import { useState, useCallback, useEffect } from 'react';

// API endpoint for logs
const LOGS_API_ENDPOINT = 'http://localhost:2025/api/logs';

export const useSupabaseLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically refresh logs when component mounts
  useEffect(() => {
    refresh();
    
    // Optional: Set up polling for log updates
    const interval = setInterval(() => {
      refresh();
    }, 30000); // refresh every 30 seconds
    
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(LOGS_API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setLogs(data || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { logs, loading, error, refresh };
};
