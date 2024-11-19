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
  const [nombre, setNombre] = useState(initialData?.nombre || ""); // Estado para el nombre
  const [capacidad, setCapacidad] = useState(initialData?.capacidad || 0); // Estado para la capacidad
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || ""); // Estado para la descripción
  const [fechaProgramada, setFechaProgramada] = useState(
    initialData?.fechaProgramada || ""
  ); // Estado para la fecha programada

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
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{initialData ? "Editar Embarcación" : "Crear Embarcación"}</h2>

      <input
        type="text"
        placeholder="Nombre de la embarcación"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        style={{ marginBottom: "10px", marginRight: "10px" }}
      />

      <input
        type="number"
        placeholder="Capacidad (toneladas)"
        value={capacidad}
        onChange={(e) => setCapacidad(Number(e.target.value))}
        required
        min={0}
        style={{ marginBottom: "10px", marginRight: "10px" }}
      />

      <textarea
        placeholder="Descripción de la embarcación"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ marginBottom: "10px", marginRight: "10px", width: "100%" }}
      />

      <input
        type="date"
        value={fechaProgramada}
        onChange={(e) => setFechaProgramada(e.target.value)}
        required
        style={{ marginBottom: "10px", marginRight: "10px" }}
      />

      <button type="submit" style={{ marginRight: "10px" }}>
        {initialData ? "Actualizar" : "Crear"}
      </button>

      {initialData && onCancel && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default EmbarcacionForm;
