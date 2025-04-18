import React, { useState } from "react";
import { useAgentStore } from "../store/useAgentStore";
import { invokeAgent } from "../services/invokeAgent";
import ErrorBoundary from "./ErrorBoundary";

const MainContent: React.FC = () => {
  const { results, isLoading, error, addResult, setLoading, setError } = useAgentStore();
  const [input, setInput] = useState("Hello, Forgeborn");

  const runAgent = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await invokeAgent(input);
      addResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("LangGraph invoke failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Hello, Forgeborn</h1>
      <p>This is the custom UI engine, no Tailwind involved.</p>

      <div style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Agent Input:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              background: "var(--bg-color)",
              color: "var(--text-color)"
            }}
          />
        </div>
        
        <button 
          onClick={runAgent} 
          disabled={isLoading}
          style={{
            padding: "0.5rem 1rem",
            background: "var(--button-bg)",
            color: "var(--button-text)",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "wait" : "pointer",
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? "Running..." : "🚀 Run Agent"}
        </button>

        {error && (
          <div style={{ 
            marginTop: "1rem", 
            color: "red", 
            padding: "0.5rem",
            border: "1px solid red",
            borderRadius: "4px"
          }}>
            Error: {error}
          </div>
        )}

        <ErrorBoundary>
          {results.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <h3>Agent Results:</h3>
              {results.map((result, index) => (
                <pre key={index} style={{ 
                  marginTop: "0.5rem", 
                  background: "var(--bg-accent)", 
                  color: "var(--text-color)",
                  padding: "1rem",
                  borderRadius: "4px",
                  overflowX: "auto"
                }}>
                  {result}
                </pre>
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MainContent;
