import React from 'react';
import ReactECharts from 'echarts-for-react';

const TimelineSimulation = () => {
  const option = {
    title: { text: 'Development Timeline Options' },
    tooltip: {},
    legend: { data: ['Agents used'] },
    xAxis: {
      type: 'category',
      data: ['Safe', 'Balanced', 'Aggressive']
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Agents used',
      type: 'bar',
      data: [4, 8, 14]
    }]
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">⏱️ Timeline Simulation</h2>
      <ReactECharts option={option} />
    </div>
  );
};

export default TimelineSimulation;
