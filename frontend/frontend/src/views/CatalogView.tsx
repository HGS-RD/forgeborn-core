import React from 'react';

const CatalogView = () => {
  const templates = [
    { name: "Mobile App", style: "Modern", color: "blue" },
    { name: "Embedded System", style: "Minimal", color: "gray" },
    { name: "SaaS App", style: "Dashboard", color: "purple" }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🎨 UI Template Catalog</h2>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((t, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{t.name}</h3>
            <p>{t.style} style</p>
            <p className={`text-${t.color}-600`}>Theme color: {t.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogView;
