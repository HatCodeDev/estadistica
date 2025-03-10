import React from "react";
import { useData } from "../context/DataContext";
import { Alert} from "@heroui/alert";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const SturgesRule: React.FC = () => {
  const { numbers } = useData();

  if (numbers.length === 0) return null;

  const N = numbers.length; // Número de datos
  const logN = Math.log10(N); // Logaritmo base 10 de N
  const k = Math.round(1 + 3.322 * logN); // Aplicación de la fórmula

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg px-6 py-6 ring shadow-xl ring-gray-900/5 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        Número de Intervalos (Regla de Sturges)
      </h3>

      <Alert description={`El número de intervalos es: ${k}`} />

      <div className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
        <p><strong>Fórmula:</strong></p>
        <BlockMath math="k = 1 + 3.322 \log_{10}(N)" />

        <p><strong>Valores Sustituidos:</strong></p>
        <BlockMath math={`k = 1 + 3.322 \\log_{10}(${N})`} />

        <p><strong>Cálculo:</strong></p>
        <BlockMath math={`k = 1 + 3.322 \\times ${logN.toFixed(4)}`} />

        <p><strong>Resultado Final:</strong></p>
        <BlockMath math={`k = ${k}`} />
      </div>
    </div>
  );
};

export default SturgesRule;