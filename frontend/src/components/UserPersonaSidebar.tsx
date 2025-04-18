import React from 'react';

const personas = ['CTO', 'Agent Engineer', 'Auditor', 'Ops'];

const UserPersonaSidebar = ({ onSelect }) => {
  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Persona</h2>
      <ul className="space-y-2">
        {personas.map((persona) => (
          <li key={persona}>
            <button
              onClick={() => onSelect(persona)}
              className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              {persona}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserPersonaSidebar;
