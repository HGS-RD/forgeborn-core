import React from 'react';

const UserPersonaSidebar = ({ onSelect }) => {
  const personas = ["CTO", "Agent Engineer", "Auditor", "Ops"];
  return (
    <aside className="p-4 border-r w-60 bg-white shadow">
      <h2 className="font-bold mb-2">Persona View</h2>
      <ul>
        {personas.map((p) => (
          <li key={p} className="mb-1">
            <button className="text-blue-600" onClick={() => onSelect(p)}>
              {p}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserPersonaSidebar;
