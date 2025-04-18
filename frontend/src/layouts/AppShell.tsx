import React from 'react';
import { Outlet } from 'react-router-dom';
import UserPersonaSidebar from '../components/UserPersonaSidebar';
import ThemeToggle from '../components/ThemeToggle';
import FloatingAIAssistant from '../components/FloatingAIAssistant';

const AppShell = ({ persona }) => {
  return (
    <div className="flex h-screen font-sans bg-gray-100 text-gray-900">
      <UserPersonaSidebar onSelect={() => {}} />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
          <h1 className="text-2xl font-semibold">Forgeborn Dashboard</h1>
          <ThemeToggle />
        </div>
        <main className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <FloatingAIAssistant />
    </div>
  );
};

export default AppShell;
