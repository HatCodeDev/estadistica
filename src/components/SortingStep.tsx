import React from "react";
import { useData } from "../context/DataContext";
import { Card } from "@heroui/card";
/*import { Badge } from "@heroui/badge";*/

const SortingStep: React.FC = () => {
  const { numbers } = useData();

  if (numbers.length === 0) return null;

  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  return (
    <Card className="p-4 bg-gray-900 text-white shadow-xl rounded-lg">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        Datos Ordenados
      </h3>
      <div className="grid grid-cols-auto sm:grid-cols-10 md:grid-cols-8 gap-2 place-items-center">
        {sortedNumbers.map((num, index) => (
          <span 
            key={index} 
            className={`px-4 py-2 rounded-lg shadow text-white font-semibold text-lg ${
              ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", 
                "bg-blue-500", "bg-purple-500", "bg-pink-500"][index % 7]
            }`}
          >
            {num}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default SortingStep;
