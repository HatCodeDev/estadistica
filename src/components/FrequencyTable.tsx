import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Button } from "@heroui/button";
import { generateIntervals, calculateFrequencyMetrics, calculateColumnSums } from "../utils/statistics";

const FrequencyTable: React.FC = () => {
  const { numbers } = useData();
  if (numbers.length === 0) return null;

  const [selectedColumns, setSelectedColumns] = useState({
    classMark: false, 
    cumulativeFrequency: false,
    relativeFrequency: false,
    relativeCumulativeFrequency: false,
  });

  let intervals = generateIntervals(numbers);
  intervals = calculateFrequencyMetrics(intervals, numbers.length);

  const totals = calculateColumnSums(intervals);

  const baseColumns = [
    { key: "interval", label: "Intervalo de Clase" },
    { key: "fi", label: "Frecuencia (fi)" },
  ];
  if (selectedColumns.classMark) baseColumns.push({ key: "mc", label: "Marca de Clase" });
  if (selectedColumns.cumulativeFrequency) baseColumns.push({ key: "Fi", label: "Frecuencia Acumulada (Fi)" });
  if (selectedColumns.relativeFrequency) baseColumns.push({ key: "fr", label: "Frecuencia Relativa (fi/N)" });
  if (selectedColumns.relativeCumulativeFrequency) baseColumns.push({ key: "Fra", label: "Frecuencia Relativa Acumulada (Fi/N)" });

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg px-6 py-6 ring shadow-xl ring-gray-900/5 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Tabla de Frecuencia</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button color="secondary" variant="shadow" onClick={() => setSelectedColumns(prev => ({ ...prev, classMark: !prev.classMark }))}>
          {selectedColumns.classMark ? "Ocultar" : "Mostrar"} Marca de Clase
        </Button>

        <Button color="secondary" variant="shadow" onClick={() => setSelectedColumns(prev => ({ ...prev, cumulativeFrequency: !prev.cumulativeFrequency }))}>
          {selectedColumns.cumulativeFrequency ? "Ocultar" : "Mostrar"} Frecuencia Acumulada
        </Button>

        <Button color="secondary" variant="shadow" onClick={() => setSelectedColumns(prev => ({ ...prev, relativeFrequency: !prev.relativeFrequency }))}>
          {selectedColumns.relativeFrequency ? "Ocultar" : "Mostrar"} Frecuencia Relativa
        </Button>

        <Button color="secondary" variant="shadow" onClick={() => setSelectedColumns(prev => ({ ...prev, relativeCumulativeFrequency: !prev.relativeCumulativeFrequency }))}>
          {selectedColumns.relativeCumulativeFrequency ? "Ocultar" : "Mostrar"} Frecuencia Relativa Acumulada
        </Button>
      </div>

      <Table aria-label="Tabla de Frecuencia">
        <TableHeader columns={baseColumns}>
          {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={[...intervals, { key: "total", ...totals, interval: "Total" }]}>
          {item => (
            <TableRow key={item.key} className={item.key === "total" ? "font-bold bg-gray-200 dark:bg-gray-800" : ""}>
              {columnKey => (
                <TableCell>
                  {item.key === "total" && columnKey !== "interval"
                    ? typeof item[columnKey] === "number" 
                      ? item[columnKey].toFixed(4) 
                      : item[columnKey]
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  );
};

export default FrequencyTable;
