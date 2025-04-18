import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardWelcomeCard from '@/components/DashboardWelcomeCard';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DashboardWelcomeCard />} />
    </Routes>
  );
}
