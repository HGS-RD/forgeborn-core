import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/routes';
import { PersonaProvider } from '../hooks/usePersonaContext';

export default function App() {
  return (
    <PersonaProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </PersonaProvider>
  );
}
