import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";

const DataInput: React.FC = () => {
  const { setNumbers } = useData();
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\s*\d+(\.\d+)?(\s*,\s*\d+(\.\d+)?)*\s*$/.test(input)) {
      setAlert("Error: Solo se permiten números separados por comas.");
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    const numArray = input
      .split(",")
      .map(num => num.trim()) 
      .filter(num => num !== "") 
      .map(num => parseFloat(num)) 
      .filter(num => !isNaN(num)); 

    if (numArray.length > 50) {
      setAlert("Error: Solo se permiten hasta 50 números.");
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    if (numArray.length === 0) {
      setAlert("Error: Debes ingresar al menos un número válido.");
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setNumbers(numArray);
    setAlert("Datos guardados correctamente.");
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ingresar Datos</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          className="w-full"
          label="Números (separados por comas)"
          placeholder="Ejemplo: 5, 10, 15, 20..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />

        <Button color="secondary" variant="shadow" type="submit" className="w-full">
          Guardar Datos
        </Button>
      </form>
      {alert && (
        <div className="mt-4">
          <Alert description={alert} />
        </div>
      )}
    </div>
  );
};

export default DataInput;
