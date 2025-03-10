import React, { createContext, useContext, useState } from "react";

interface DataContextType {
  numbers: number[];
  setNumbers: (numbers: number[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [numbers, setNumbers] = useState<number[]>([]);

  return (
    <DataContext.Provider value={{ numbers, setNumbers }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook para acceder fácilmente al contexto
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData debe usarse dentro de un DataProvider");
  return context;
};
