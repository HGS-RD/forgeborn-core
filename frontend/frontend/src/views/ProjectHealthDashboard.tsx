import React from 'react';
import ReactECharts from 'echarts-for-react';

const ProjectHealthDashboard = () => {
  const option = {
    title: { text: 'Milestone Status' },
    tooltip: {},
    radar: {
      indicator: [
        { name: 'Planned', max: 100 },
        { name: 'In Progress', max: 100 },
        { name: 'Complete', max: 100 },
        { name: 'Delayed', max: 100 }
      ]
    },
    series: [{
      name: 'Health',
      type: 'radar',
      data: [
        { value: [80, 60, 50, 10], name: 'Forgeborn' }
      ]
    }]
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Project Health Dashboard</h2>
      <ReactECharts option={option} />
    </div>
  );
};

export default ProjectHealthDashboard;
