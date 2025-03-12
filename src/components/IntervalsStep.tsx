import React from "react";
import { useData } from "../context/DataContext";
import { Alert } from "@heroui/alert";
import "katex/dist/katex.min.css"; 
import { BlockMath } from "react-katex";
import { calculateSturgesRule, calculateIntervalSize } from "../utils/statistics";

const IntervalsStep: React.FC = () => {
  const { numbers } = useData();
  if (numbers.length === 0) return null;

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const min = sortedNumbers[0];
  const max = sortedNumbers[sortedNumbers.length - 1];

  const k = calculateSturgesRule(numbers.length);
  const h = calculateIntervalSize(min, max, k);

  return (
    <div className="w-full md:w-1/2 max-w-lg bg-white dark:bg-gray-900 rounded-lg px-6 py-6 ring shadow-xl ring-gray-900/5">
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
        <BlockMath math={`h = \\frac{${max} - ${min}}{${k}} = ${h}`} />
      </div>
    </div>
  );
};

export default IntervalsStep;
