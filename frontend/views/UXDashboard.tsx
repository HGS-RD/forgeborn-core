import React from 'react';

const UXDashboard = ({ persona }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Forgeborn UX Dashboard</h1>
      <p>Active persona: {persona}</p>
      {/* Placeholder: dynamic panel routing here */}
    </div>
  );
};

export default UXDashboard;
