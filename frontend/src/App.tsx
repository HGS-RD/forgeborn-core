import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./layouts/DashboardLayout";
import MainContent from "./components/MainContent";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <DashboardLayout>
          <MainContent />
        </DashboardLayout>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
