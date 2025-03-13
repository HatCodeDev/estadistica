import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useData } from "../context/DataContext";
import { generateIntervals, calculateFrequencyMetrics } from "../utils/statistics";

const FrequencyChart: React.FC = () => {
  const { numbers } = useData();
  if (numbers.length === 0) return null;

  let intervals = generateIntervals(numbers);
  intervals = calculateFrequencyMetrics(intervals, numbers.length);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl mt-6">
      <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-4">Gráfica de Frecuencia</h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={intervals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fi" fill="#9353D3" name="Frecuencia (fi)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyChart;
