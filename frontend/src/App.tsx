import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardWelcomeCard from "./components/DashboardWelcomeCard";

export default function App() {
  return (
    <BrowserRouter>
      <main className="p-8">
        <Routes>
          <Route path="/" element={<DashboardWelcomeCard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}