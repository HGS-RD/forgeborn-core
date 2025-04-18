import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from '@layouts/AppShell';
import PlanningPanel from '@views/PlanningPanel';
import CatalogView from '@views/CatalogView';
import TimelineSimulation from '@views/TimelineSimulation';
import ProjectHealthDashboard from '@views/ProjectHealthDashboard';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppShell persona="CTO" />}>
        <Route index element={<PlanningPanel />} />
        <Route path="catalog" element={<CatalogView />} />
        <Route path="timeline" element={<TimelineSimulation />} />
        <Route path="dashboard" element={<ProjectHealthDashboard />} />
      </Route>
    </Routes>
  );
}
