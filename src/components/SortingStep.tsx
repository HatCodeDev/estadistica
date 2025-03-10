import React from "react";
import { useData } from "../context/DataContext";

const SortingStep: React.FC = () => {
  const { numbers } = useData();

  if (numbers.length === 0) return null;

  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  return (
    <div>
      <h3>Datos Ordenados</h3>
      <p>{sortedNumbers.join(", ")}</p>
    </div>
  );
};

export default SortingStep;
