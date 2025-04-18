import React from 'react';
import { Outlet } from 'react-router-dom';
import UserPersonaSidebar from '../nav/UserPersonaSidebar';
import ThemeToggle from '../theme/ThemeToggle';
import FloatingAIAssistant from '../components/FloatingAIAssistant';

const AppShell = ({ persona }) => {
  return (
    <div className="flex h-screen text-sm font-sans">
      <UserPersonaSidebar onSelect={() => {}} />
      <div className="flex-1 bg-muted text-foreground overflow-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Forgeborn Dashboard</h1>
          <ThemeToggle />
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
      <FloatingAIAssistant />
    </div>
  );
};

export default AppShell;
