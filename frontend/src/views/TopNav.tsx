import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const TopNav: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <header style={{
      background: "var(--nav-bg)",
      color: "var(--nav-text)",
      padding: "1rem",
      fontWeight: "bold",
      fontSize: "1.2rem",
      borderBottom: "1px solid var(--border-color)"
    }}>
      Forgeborn Dashboard
      <span style={{ 
        fontSize: "0.8rem", 
        opacity: 0.7,
        marginLeft: "0.5rem"
      }}>
        [{theme} mode]
      </span>
    </header>
  );
};

export default TopNav;
