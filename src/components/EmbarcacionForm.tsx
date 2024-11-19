import React, { useState, useEffect } from "react";
import { Embarcacion } from "../types";

interface EmbarcacionFormProps {
  onSubmit: (embarcacion: Embarcacion | Omit<Embarcacion, "id">) => void;
  initialData?: Embarcacion;
  onCancel?: () => void;
}

const EmbarcacionForm: React.FC<EmbarcacionFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [capacidad, setCapacidad] = useState(initialData?.capacidad || 0);
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");
  const [fechaProgramada, setFechaProgramada] = useState(
    initialData?.fechaProgramada || ""
  );

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setCapacidad(initialData.capacidad || 0);
      setDescripcion(initialData.descripcion || "");
      setFechaProgramada(initialData.fechaProgramada || "");
    } else {
      setNombre("");
      setCapacidad(0);
      setDescripcion("");
      setFechaProgramada("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      nombre,
      capacidad,
      descripcion,
      fechaProgramada,
    });

    if (!initialData) {
      setNombre("");
      setCapacidad(0);
      setDescripcion("");
      setFechaProgramada("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Editar Embarcación" : "Crear Embarcación"}</h2>

      <label>
        Nombre de la embarcación
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>

      <label>
        Capacidad (toneladas)
        <input
          type="number"
          value={capacidad}
          onChange={(e) => setCapacidad(Number(e.target.value))}
          required
          min={0}
        />
      </label>

      <label>
        Descripción de la embarcación
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>

      <label>
        Fecha Programada
        <input
          type="date"
          value={fechaProgramada}
          onChange={(e) => setFechaProgramada(e.target.value)}
          required
        />
      </label>

      <div className="button-group">
        <button type="submit">
          {initialData ? "Actualizar" : "Crear"}
        </button>
        {initialData && onCancel && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default EmbarcacionForm;