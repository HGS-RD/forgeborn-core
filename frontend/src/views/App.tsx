
import React from "react";
import PreferencesPanel from "../components/PreferencesPanel";

const App: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hello, Forgeborn</h1>
      <p>This is the custom UI engine, no Tailwind involved.</p>
      <PreferencesPanel />
    </div>
  );
};

export default App;
