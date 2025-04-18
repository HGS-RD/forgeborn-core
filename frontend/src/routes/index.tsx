import React from "react";
import { Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="p-10 bg-white text-gray-900 rounded shadow">
            <h1 className="text-2xl font-bold">🎉 Tailwind Is Working</h1>
            <p className="mt-2 text-base">Styles are now applying correctly!</p>
          </div>
        }
      />
    </Routes>
  );
}
