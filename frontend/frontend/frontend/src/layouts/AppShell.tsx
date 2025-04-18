
import React from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Forgeborn Dashboard</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default AppShell;
