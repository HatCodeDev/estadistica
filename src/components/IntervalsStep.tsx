import React from "react";
import { useData } from "../context/DataContext";
import { Alert} from "@heroui/alert";
import "katex/dist/katex.min.css"; 
import { BlockMath } from "react-katex";

const IntervalsStep: React.FC = () => {
  const { numbers } = useData();

  if (numbers.length === 0) return null;

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const min = sortedNumbers[0];
  const max = sortedNumbers[sortedNumbers.length - 1];

  const k = Math.round(1 + 3.322 * Math.log10(numbers.length));

  const h = Math.round((max - min) / k);

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg px-6 py-6 ring shadow-xl ring-gray-900/5 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
         Cálculo del Tamaño del Intervalo
      </h3>

      <Alert description={`El tamaño del intervalo es: ${h}`} />

      <div className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
        <p><strong>Fórmula del tamaño del intervalo:</strong></p>
        <BlockMath math="h = \frac{\max - \min}{k}" />

        <p><strong>Valores Sustituidos:</strong></p>
        <BlockMath math={`h = \\frac{${max} - ${min}}{${k}}`} />

        <p><strong>Cálculo:</strong></p>
        <BlockMath math={`h = \\frac{${max - min}}{${k}} = ${h}`} />

        
      </div>
    </div>
  );
};

export default IntervalsStep;
