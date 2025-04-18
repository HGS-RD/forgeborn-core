import React from "react";

const SideNav: React.FC = () => {
  return (
    <nav style={{
      width: "200px",
      background: "var(--sidebar-bg)",
      color: "var(--sidebar-text)",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      borderRight: "1px solid var(--border-color)"
    }}>
      <div>📁 Memory</div>
      <div>🤖 Agents</div>
      <div>🧠 Reflections</div>
      <div>⚙️ Settings</div>
    </nav>
  );
};

export default SideNav;
