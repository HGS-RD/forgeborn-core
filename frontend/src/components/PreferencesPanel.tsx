import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const PreferencesPanel: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ 
      padding: "1rem", 
      marginTop: "1rem",
      background: "var(--bg-accent)",
      borderRadius: "6px",
      border: "1px solid var(--border-color)"
    }}>
      <h2 style={{ marginTop: 0 }}>User Preferences</h2>
      <p>Current Theme: {theme}</p>
      <button 
        onClick={toggleTheme}
        style={{
          padding: "0.5rem 1rem",
          background: "var(--button-bg)",
          color: "var(--button-text)",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default PreferencesPanel;
