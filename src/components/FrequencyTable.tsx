import React, { useState } from "react";
import { useData } from "../context/DataContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Button } from "@heroui/button";


const FrequencyTable: React.FC = () => {
    const { numbers } = useData();
  
    if (numbers.length === 0) return null;
  
    // Hooks: Definir qué columnas opcionales mostrar
    const [selectedColumns, setSelectedColumns] = useState({
      cumulativeFrequency: false,
      relativeFrequency: false,
      relativeCumulativeFrequency: false,
      classMark: false,
    });
  
    // Ordenar los números
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const min = sortedNumbers[0];
    const max = sortedNumbers[sortedNumbers.length - 1];
  
    // Número de intervalos (Regla de Sturges)
    const k = Math.round(1 + (3.322 * Math.log10(numbers.length)));

    // Tamaño del intervalo (h) asegurando que cubra todo el rango
    const h = Math.round((max - min) / k);

    // Generar intervalos de clase
    const intervals = [];
    let lowerLimit = min;

    for (let i = 0; i < k; i++) {
      let upperLimit = lowerLimit + h;
      intervals.push({
        key: i.toString(),
        interval: `${lowerLimit} - ${upperLimit}`,
        fi: numbers.filter(num => num >= lowerLimit && num < upperLimit).length,
      });

      lowerLimit = upperLimit;
    }
  
    // Calcular métricas adicionales
    let cumulativeSum = 0;
    intervals.forEach((interval, index) => {
      cumulativeSum += interval.fi;
      intervals[index].Fi = cumulativeSum;
      intervals[index].fr = (interval.fi / numbers.length).toFixed(4);
      intervals[index].Fra = (cumulativeSum / numbers.length).toFixed(4);
      intervals[index].mc = ((parseFloat(interval.interval.split(" - ")[0]) + parseFloat(interval.interval.split(" - ")[1])) / 2).toFixed(2);
    });
  
    // Configurar columnas dinámicamente
    const baseColumns = [
      { key: "interval", label: "Intervalo de Clase" },
      { key: "fi", label: "Frecuencia (fi)" },
    ];
  
    if (selectedColumns.cumulativeFrequency) baseColumns.push({ key: "Fi", label: "Frecuencia Acumulada (Fi)" });
    if (selectedColumns.relativeFrequency) baseColumns.push({ key: "fr", label: "Frecuencia Relativa (fi/N)" });
    if (selectedColumns.relativeCumulativeFrequency) baseColumns.push({ key: "Fra", label: "Frecuencia Relativa Acumulada (Fi/N)" });
    if (selectedColumns.classMark) baseColumns.push({ key: "mc", label: "Marca de Clase" });
  
    return (
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg px-6 py-6 ring shadow-xl ring-gray-900/5 mt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Tabla de Frecuencia
        </h3>
  
        {/* Botones para activar/desactivar columnas */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            color="secondary"
            variant="shadow"
            onClick={() =>
              setSelectedColumns(prev => ({ ...prev, cumulativeFrequency: !prev.cumulativeFrequency }))
            }
          >
            {selectedColumns.cumulativeFrequency ? "Ocultar" : "Mostrar"} Frecuencia Acumulada
          </Button>
  
          <Button
            color="secondary"
            variant="shadow"
            onClick={() =>
              setSelectedColumns(prev => ({ ...prev, relativeFrequency: !prev.relativeFrequency }))
            }
          >
            {selectedColumns.relativeFrequency ? "Ocultar" : "Mostrar"} Frecuencia Relativa
          </Button>
  
          <Button
            color="secondary"
            variant="shadow"
            onClick={() =>
              setSelectedColumns(prev => ({ ...prev, relativeCumulativeFrequency: !prev.relativeCumulativeFrequency }))
            }
          >
            {selectedColumns.relativeCumulativeFrequency ? "Ocultar" : "Mostrar"} Frecuencia Relativa Acumulada
          </Button>
  
          <Button
            color="secondary"
            variant="shadow"
            onClick={() =>
              setSelectedColumns(prev => ({ ...prev, classMark: !prev.classMark }))
            }
          >
            {selectedColumns.classMark ? "Ocultar" : "Mostrar"} Marca de Clase
          </Button>
        </div>
  
        {/* Tabla de Frecuencia */}
        <Table aria-label="Tabla de Frecuencia">
          <TableHeader columns={baseColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={intervals}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default FrequencyTable;
