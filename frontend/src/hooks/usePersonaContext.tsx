import React, { createContext, useContext, useState, ReactNode } from 'react';

type PersonaContextType = {
  persona: string;
  setPersona: (value: string) => void;
};

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) throw new Error("usePersona must be used within a PersonaProvider");
  return context;
};

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [persona, setPersona] = useState('CTO');
  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
};
