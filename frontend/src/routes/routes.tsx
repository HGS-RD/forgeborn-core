import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from '../layout/AppShell';

import PlanningPanel from '../views/PlanningPanel';
import CatalogView from '../views/CatalogView';
import TimelineSimulation from '../views/TimelineSimulation';
import ProjectHealthDashboard from '../views/ProjectHealthDashboard';

const Router = () => {
  const persona = "CTO"; // TODO: make dynamic

  return (
    <Routes>
      <Route path="/" element={<AppShell persona={persona} />}>
        <Route index element={<PlanningPanel />} />
        <Route path="catalog" element={<CatalogView />} />
        <Route path="timeline" element={<TimelineSimulation />} />
        <Route path="dashboard" element={<ProjectHealthDashboard />} />
      </Route>
    </Routes>
  );
};

export default Router;
