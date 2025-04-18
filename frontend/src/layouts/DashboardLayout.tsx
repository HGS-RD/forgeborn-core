import React from "react";
import TopNav from "../views/TopNav";
import SideNav from "../views/SideNav";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideNav />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopNav />
        <main style={{ padding: "1rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
