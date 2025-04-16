import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
//- import htmlToImage from 'html-to-image';
 import * as htmlToImage from 'html-to-image';


export default function ExecutionTimelineView() {
  const [timelineData, setTimelineData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/execution-timeline')
      .then(res => res.json())
      .then(data => {
        const baseTime = new Date(data.timeline[0].started).getTime();
        const parsed = data.timeline.map(item => {
          const startTime = new Date(item.started).getTime();
          return {
            name: item.agent,
            startOffset: (startTime - baseTime) / 1000,
            duration: item.duration_ms / 1000,
            started: item.started
          };
        });
        setTimelineData(parsed);
      })
      .catch(err => console.error('Error loading timeline:', err));
  }, []);

  const exportPNG = () => {
    if (chartRef.current) {
      htmlToImage.toPng(chartRef.current)
        .then(dataUrl => {
          const link = document.createElement('a');
          link.download = 'agent_timeline.png';
          link.href = dataUrl;
          link.click();
        });
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">📊 Agent Execution Timeline</h2>
      <div ref={chartRef} className="bg-white border rounded p-2 shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={timelineData}
            margin={{ top: 10, right: 20, left: 100, bottom: 20 }}
          >
            <XAxis type="number" label={{ value: 'Start Time (s)', position: 'insideBottomRight', offset: -5 }} />
            <YAxis dataKey="name" type="category" />
            <Tooltip
              formatter={(value, name, props) => {
                const { payload } = props;
                return [
                  `${value}s`,
                  `${payload.name} started at ${new Date(payload.started).toLocaleTimeString()}`
                ];
              }}
            />
            <Bar dataKey="duration" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button
        onClick={exportPNG}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Timeline as PNG
      </button>
    </div>
  );
}
