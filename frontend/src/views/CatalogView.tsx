import React from 'react';

export default function CatalogView() {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-bold text-gray-800">🎨 UI Style Catalog</h2>
      <p className="text-sm text-gray-600">Preview and apply visual themes and component templates.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="border rounded p-4 bg-gray-50 text-center">Minimal</div>
        <div className="border rounded p-4 bg-gray-50 text-center">Playful</div>
        <div className="border rounded p-4 bg-gray-50 text-center">Enterprise</div>
      </div>
    </div>
  );
}