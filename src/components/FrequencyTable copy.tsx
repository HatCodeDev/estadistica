import React, { useState } from "react";
import { useData } from "../context/DataContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

const FrequencyTable: React.FC = () => {
  const { numbers } = useData();

  if (numbers.length === 0) return null;

  // Ordenar los números
  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const min = sortedNumbers[0];
  const max = sortedNumbers[sortedNumbers.length - 1];

  // Regla de Sturges para determinar el número de intervalos
  const k = Math.ceil(1 + 3.322 * Math.log10(numbers.length));

  // Cálculo del tamaño del intervalo (h)
  const h = Math.ceil((max - min) / k);

  // Generar intervalos de clase
  const intervals = [];
  let lowerLimit = min;

  for (let i = 0; i < k; i++) {
    let upperLimit = lowerLimit + h - 1; // Definir límite superior
    intervals.push({ lower: lowerLimit, upper: upperLimit });
    lowerLimit = upperLimit + 1; // El siguiente intervalo empieza después del límite superior
  }

  // Contar la frecuencia absoluta (fi) de cada intervalo
  const frequencies = intervals.map(({ lower, upper }) => {
    return numbers.filter(num => num >= lower && num <= upper).length;
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg px-6 py-6 ring shadow-xl ring-gray-900/5 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        Tabla de Frecuencia
      </h3>

      <Table aria-label="Tabla de Frecuencia">
        <TableHeader>
          <TableColumn>Intervalo de Clase</TableColumn>
          <TableColumn>fi</TableColumn>
        </TableHeader>
        <TableBody>
          {intervals.map((interval, index) => (
            <TableRow key={index}>
              <TableCell>{`${interval.lower} - ${interval.upper}`}</TableCell>
              <TableCell>{frequencies[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FrequencyTable;
