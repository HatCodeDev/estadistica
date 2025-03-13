import React from "react";
import { useData } from "../context/DataContext";
import { Chip } from "@heroui/chip";

const SortingStep: React.FC = () => {
  const { numbers } = useData();

  if (numbers.length === 0) return null;

  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg px-6 py-6 ring shadow-xl ring-gray-900/5">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Datos Ordenados</h3>

      <div className="flex flex-wrap gap-2">
        {sortedNumbers.map((num, index) => (
          <Chip key={index} color="secondary" className="text-sm px-3 py-1">
            {num}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default SortingStep;
